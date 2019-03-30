import React, { useRef } from "react";
import classNames from "classnames/bind";
import cs from "./Canvas.module.css";
import martians from "./animated/martians.svg";

const cx = classNames.bind(cs);

const width = 266 * 2;
const height = 190 * 2;

const getUserMedia = async (canvas, video) => {
  console.log(canvas);
  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width,
        height
      }
    });
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
      const ctx = canvas.getContext("2d");
      requestAnimationFrame(() => {
        //ctx.clearRect(0, 0, width, height);
        const img = new Image();
        img.src = martians;
        img.onload = () =>
          requestAnimationFrame(() => {
            ctx.drawImage(img, 0, 0, width, height);
            ctx.drawImage(
              video,
              width * 0.594,
              height * 0.04,
              width * 0.296,
              height * 0.381
            );
          });
      });
    };
  } catch (err) {
    console.log("error while capturing image", err);
  }
};

const loadPhoto = (canvas, link) => {
  try {
    canvas.toBlob(blob => {
      link.href = URL.createObjectURL(blob);
      link.download = "photo.jpg";
      link.click();
      URL.revokeObjectURL(blob);
    }, "image/jpeg");
  } catch (e) {
    console.log("error while loading data", e);
  }
};

const Canvas = () => {
  const canvas = useRef(null);
  const video = useRef(null);
  const link = useRef(null);

  return (
    <React.Fragment>
      <canvas
        className={cx("canvas")}
        ref={canvas}
        width={width}
        height={height}
      />
      <video
        ref={video}
        className={cx("video")}
        muted
        width={width}
        height={height}
      />
      <button onClick={() => getUserMedia(canvas.current, video.current)}>
        Make photo
      </button>
      <button onClick={() => loadPhoto(canvas.current, link.current)}>
        Load photo
      </button>
      <a className={cx("link")} ref={link} />
    </React.Fragment>
  );
};

export default Canvas;
