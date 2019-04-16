import React, { useRef } from "react";
import classNames from "classnames/bind";
import cs from "./CanvasAnimation.module.css";
import martians from "./animated/martiansStroke.svg";
import math from "mathjs";
import Controls from "./Controls";

const cx = classNames.bind(cs);

const width = 700;
const height = 700;
const imgWidth = 135 * 0.2;
const imgHeight = 190 * 0.2;

const createMesh = (xCount, yCount) =>
  [...Array(xCount)]
    .reduce(
      (r, _, x) =>
        r.concat(
          [...Array(yCount)].map((_, y) => ({
            x: 0.1 * x + math.random(-0.2, 0.2),
            y: 0.1 * y + math.random(-0.2, 0.2),
            scale: math.random(0.5, 3),
            rotation: Math.PI * math.random(-0.5, 0.5),
            filter: `hue-rotate(${math.random() * 380}deg)`
          }))
        ),
      []
    )
    .filter(() => math.random(0, 1) > 0.3);

const drawContext = (ctx, imgEl, mesh, dr) =>
  requestAnimationFrame(() => {
    mesh.forEach(({ x, y, scale, rotation, filter }) => {
      ctx.translate(x * width, y * height);
      ctx.rotate(rotation + dr);
      ctx.filter = filter;

      ctx.drawImage(imgEl, 0, 0, imgWidth * scale, imgHeight * scale);
      ctx.filter = "none";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.restore();
    });
    drawContext(ctx, imgEl, mesh, dr + 0.03);
  });

const draw = (canvasEl, imgEl, mesh, dr) => {
  const ctx = canvasEl.getContext("2d");
  ctx.save();
  drawContext(ctx, imgEl, mesh, dr);
};

const CanvasAnimation = () => {
  const canvas = useRef(null);
  const img = useRef(null);
  const mesh = createMesh(
    Math.round(width / imgWidth),
    Math.round(height / imgHeight)
  );
  return (
    <React.Fragment>
      <Controls>
        <button onClick={() => draw(canvas.current, img.current, mesh, 0)}>
          draw
        </button>
      </Controls>
      <canvas
        className={cx("canvas")}
        ref={canvas}
        width={width}
        height={height}
      />
      <img src={martians} className={cx("martiansImg")} ref={img} />
    </React.Fragment>
  );
};

export default CanvasAnimation;
