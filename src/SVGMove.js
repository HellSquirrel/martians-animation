import React, { useRef, useEffect, useState } from "react";
import classNames from "classnames/bind";
import cs from "./SVGMove.modules.css";
import { ReactComponent as Path } from "./images/path.svg";

const cx = classNames.bind(cs);

const numPoints = 400;

const SVGMove = () => {
  const ref = useRef(null);
  const unicorn = useRef(null);
  const bear = useRef(null);
  const [styleText, setStyleText] = useState("");
  const [pathLen, setPathLen] = useState(0);
  useEffect(() => {
    const data = ref.current.querySelector("path");
    const length = data.getTotalLength();
    const dist = length / numPoints;
    const points = [...Array(numPoints)].map((_, index) => {
      const { x, y } = data.getPointAtLength(index * dist);
      return { transform: `translateX(${x}px) translateY(${y}px)` };
    });
    unicorn.current.animate(points, {
      duration: 20000,
      iterations: Infinity
    });

    const keyFrames = `@keyframes fly {
        ${points
          .map(
            (point, index) =>
              `${((index * 100) / numPoints).toFixed(2)}% { transform: ${
                point.transform
              }; }`
          )
          .join("\n")}
    }`;

    setStyleText(keyFrames);
    setPathLen(length);
  }, []);
  return (
    <div className={cx("svgMove")}>
      <style>{styleText}</style>
      <Path
        ref={ref}
        style={{
          position: "absolute",
          strokeDasharray: pathLen,
          strokeDashoffset: pathLen,
          animation: "dash 20s infinite linear"
        }}
      />
      <p ref={unicorn} style={{ fontSize: 30 }}>
        🦄
      </p>
      {styleText && (
        <p ref={bear} style={{ fontSize: 30, animation: "fly 20s infinite" }}>
          🐻
        </p>
      )}
      <button
        onClick={() => {
          let a = 0;
          for (var i = 0; i < 1000000000; i++) {
            a += Math.sqrt(i * 201002);
          }

          console.log(a);
        }}
      >
        Calculate it!
      </button>
    </div>
  );
};

export default SVGMove;
