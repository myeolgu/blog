"use client";

import { useEffect, useRef } from "react";
import { assetUrl } from "../lib/asset";

export default function MaskedVideoCanvas() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const colorCanvas = document.createElement("canvas");
    const maskCanvas = document.createElement("canvas");
    const colorContext = colorCanvas.getContext("2d", { willReadFrequently: true });
    const maskContext = maskCanvas.getContext("2d", { willReadFrequently: true });
    let animationFrameId;

    function resizeCanvases() {
      if (!video.videoWidth) return;

      const frameHeight = video.videoHeight / 2;

      canvas.width = video.videoWidth;
      canvas.height = frameHeight;
      colorCanvas.width = video.videoWidth;
      colorCanvas.height = frameHeight;
      maskCanvas.width = video.videoWidth;
      maskCanvas.height = frameHeight;

      if (!video.paused) startDrawing();
    }

    const drawFrame = () => {
      if (video.paused || video.ended || !video.videoWidth) return;

      const frameWidth = video.videoWidth;
      const frameHeight = video.videoHeight / 2;

      colorContext.drawImage(video, 0, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
      maskContext.drawImage(
        video,
        0,
        frameHeight,
        frameWidth,
        frameHeight,
        0,
        0,
        frameWidth,
        frameHeight
      );

      const colorFrame = colorContext.getImageData(0, 0, frameWidth, frameHeight);
      const maskFrame = maskContext.getImageData(0, 0, frameWidth, frameHeight);
      const maskBlackPoint = 20;

      for (let index = 0; index < colorFrame.data.length; index += 4) {
        const maskValue =
          (maskFrame.data[index] + maskFrame.data[index + 1] + maskFrame.data[index + 2]) / 3;
        const correctedAlpha = Math.max(
          0,
          (maskValue - maskBlackPoint) / (255 - maskBlackPoint)
        );

        colorFrame.data[index + 3] = Math.round(correctedAlpha * 255);
      }

      context.putImageData(colorFrame, 0, 0);
      animationFrameId = requestAnimationFrame(drawFrame);
    };

    function startDrawing() {
      cancelAnimationFrame(animationFrameId);
      drawFrame();
    }

    video.addEventListener("loadedmetadata", resizeCanvases);
    video.addEventListener("playing", startDrawing);

    if (video.readyState >= 1) resizeCanvases();
    if (!video.paused) startDrawing();
    else video.play().catch(() => {});

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener("loadedmetadata", resizeCanvases);
      video.removeEventListener("playing", startDrawing);
    };
  }, []);

  return (
    <>
      <video
        aria-hidden="true"
        autoPlay
        className="masked-video-source"
        loop
        muted
        playsInline
        preload="auto"
        ref={videoRef}
        src={assetUrl("/posts/cat_health_report.mp4")}
      />
      <canvas
        aria-label="Canvas에서 투명도를 복원해 재생하는 영상"
        className="masked-video-canvas"
        ref={canvasRef}
      />
    </>
  );
}
