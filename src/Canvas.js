import React, { useRef } from "react";
import classNames from "classnames/bind";
import cs from "./Canvas.module.css";
import martians from "./animated/martians.svg";
import * as bodyPix from "@tensorflow-models/body-pix";
import Controls from "./Controls";

const cx = classNames.bind(cs);

const width = 266 * 2;
const height = 190 * 2;
const outputStride = 8;
const segmentationThreshold = 0.5;

const toMask = (partSegmentation, originalImageData) => {
  const { width, height, data } = partSegmentation;
  console.log(width, height);
  let { x0, y0, x1, y1 } = { x0: 0, y0: 0, x1: width, y1: height };
  const originalBytes = originalImageData.data;
  const bytes = new Uint8ClampedArray(width * height * 4);

  for (let i = 0; i < height * width; ++i) {
    const partId = Math.round(data[i]);
    const j = i * 4;

    if (partId === 0 || partId === 1) {
      const x = i % width;
      const y = Math.ceil(i / width);

      if (x > x0) {
        x0 = x;
      }

      if (y > y0) {
        y0 = y;
      }

      if (x < x1) {
        x1 = x;
      }

      if (y < y1) {
        y1 = y;
      }

      bytes[j + 0] = originalBytes[j + 0];
      bytes[j + 1] = originalBytes[j + 1];
      bytes[j + 2] = originalBytes[j + 2];
      bytes[j + 3] = 255;
    } else {
      bytes[j + 0] = 0;
      bytes[j + 1] = 0;
      bytes[j + 2] = 0;
      bytes[j + 3] = 0;
    }
  }

  return {
    image: new ImageData(bytes, width, height),
    dims: { x: x0, y: y0, width: x1 - x0, height: y1 - y0 }
  };
};

const getUserMedia = async (canvas, video) => {
  const net = await bodyPix.load();
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
    video.onloadedmetadata = async () => {
      video.play();
      const ctx = canvas.getContext("2d");
      requestAnimationFrame(() => {
        ctx.clearRect(0, 0, width, height);
        const img = new Image();
        img.src = martians;
        img.onload = () =>
          requestAnimationFrame(async () => {
            ctx.drawImage(img, 0, 0, width, height);

            const personSegmentation = await net.estimatePartSegmentation(
              video,
              outputStride,
              segmentationThreshold
            );

            const offscreenCanvas = document.createElement("canvas");
            offscreenCanvas.width = width;
            offscreenCanvas.height = height;
            const offscreenContext = offscreenCanvas.getContext("2d");
            offscreenContext.drawImage(video, 0, 0);
            const masked = toMask(
              personSegmentation,
              offscreenContext.getImageData(0, 0, width, height)
            );
            offscreenContext.putImageData(masked.image, 0, 0);

            console.log(masked.dims);
            ctx.drawImage(
              offscreenCanvas,
              masked.dims.x,
              masked.dims.y,
              masked.dims.width,
              masked.dims.height,
              width * 0.594,
              height * 0.04,
              width * 0.296,
              height * 0.4
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
      link.download = "photo.png";
      link.click();
      URL.revokeObjectURL(blob);
    }, "image/png");
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
      <Controls>
        <button onClick={() => getUserMedia(canvas.current, video.current)}>
          Take a photo
        </button>
        <button onClick={() => loadPhoto(canvas.current, link.current)}>
          Load photo
        </button>
        <a className={cx("link")} ref={link} />
      </Controls>
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
    </React.Fragment>
  );
};

export default Canvas;
