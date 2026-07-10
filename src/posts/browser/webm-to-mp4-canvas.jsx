import { useEffect, useRef } from "react";

export const webmToMp4CanvasPost = {
  id: "webm-to-mp4-canvas",
  title: "WebM을 MP4로 변환해 HTML Canvas에서 투명 영상 사용하기",
  author: "이주엽",
  date: "2026-05-11",
  category: "Browser",
  excerpt:
    "iOS에서 VP9 WebM의 알파 채널을 안전하게 표현하기 위해, 컬러 프레임과 알파 마스크를 세로로 결합한 H.264 MP4를 Canvas에서 복원하는 방법입니다.",
  tags: ["WebM", "MP4", "Canvas", "iOS", "FFmpeg"],
  Content: WebmToMp4CanvasContent
};

function WebmToMp4CanvasContent() {
  return (
    <>
      <h3>작업 공간</h3>
      <p>
        영상 기획, 스크립트 작성, 에셋 관리, 편집 파일 관리, export 전달을 위한 작업 공간에서
        원본 미디어는 <code>assets/raw/</code>, 변환·리사이즈·생성된 미디어는
        <code>assets/processed/</code>에 분리해 관리했습니다. 현재 작업 중인 WebM과 변환 결과는
        <code>videos/</code>, MP4 결과물은 <code>videos/mp4/</code>에 둡니다.
      </p>

      <h3>폴더 구조</h3>
      <p>영상의 기획부터 변환, 편집, 검수, 최종 전달까지 파일 성격에 따라 경로를 분리합니다.</p>
      <pre>
        <code>{`video-create/
├── AGENTS.md
├── .codex/skills/
├── docs/
├── content/
│   ├── briefs/
│   └── scripts/
├── assets/
│   ├── raw/
│   └── processed/
├── videos/
│   └── mp4/
├── projects/
└── exports/
    ├── drafts/
    └── final/`}</code>
      </pre>
      <ul>
        <li><code>content/briefs/</code>와 <code>content/scripts/</code>에는 목표·대상·대본·씬 구성 같은 기획 자료를 둡니다.</li>
        <li><code>assets/raw/</code>는 수정하지 않는 원본, <code>assets/processed/</code>는 변환·리사이즈·생성된 에셋을 관리합니다.</li>
        <li><code>videos/</code>는 현재 샘플과 변환 기준 파일, <code>videos/mp4/</code>는 WebM에서 생성된 MP4 결과물 전용입니다.</li>
        <li><code>projects/</code>에는 편집 프로젝트를, <code>exports/drafts/</code>와 <code>exports/final/</code>에는 리뷰본과 최종본을 버전별로 저장합니다.</li>
      </ul>

      <h3>AI 지침 기반 변환</h3>
      <p>
        <code>video-create</code> 폴더에는 Codex가 따르는 <code>AGENTS.md</code>와
        <code>.codex/skills/</code> 지침이 설치되어 있습니다. 사용자가 WebM 파일을 제공하면 이
        지침에 따라 원본은 보존하고, FFmpeg로 iOS Canvas용 MP4를 생성하는 흐름입니다.
      </p>
      <ul>
        <li><code>video-content-planning</code>은 영상 기획·대본·씬 구성 작업을 정리합니다.</li>
        <li><code>video-asset-workflow</code>는 원본·가공 에셋·프로젝트·export 파일의 위치와 이름을 관리합니다.</li>
        <li>VP9 알파 WebM은 <code>libvpx-vp9</code> 디코더로 읽고, 변환 결과는 기본적으로 <code>videos/mp4/&lt;원본명&gt;_mp4.mp4</code>에 저장합니다.</li>
        <li>변환 전에는 FFmpeg 설치 여부를, 변환 후에는 <code>ffprobe</code>로 코덱·크기·프레임레이트를 확인합니다.</li>
      </ul>

      <h3>문제</h3>
      <p>
        <code>cat_health_report.webm</code>은 알파 메타데이터가 포함된 VP9 WebM입니다. iOS에서는
        WebM을 직접 사용했을 때 투명 영역이 검은 배경으로 보일 수 있어, H.264 MP4로 변환한 뒤
        HTML Canvas에서 알파를 복원하는 방식으로 처리했습니다.
      </p>
      <ul>
        <li>원본 WebM: 520 × 424</li>
        <li>변환 MP4: 520 × 848</li>
        <li>상단 절반: 컬러 프레임 / 하단 절반: 알파 마스크</li>
        <li>코덱: H.264, 픽셀 포맷: yuv420p, 프레임레이트: 30fps</li>
      </ul>

      <h3>예시 영상</h3>
      <div className="video-examples">
        <figure>
          <video autoPlay controls loop muted playsInline preload="metadata">
            <source src="/posts/cat_health_report.webm" type="video/webm" />
            브라우저가 WebM 영상을 지원하지 않습니다.
          </video>
          <figcaption>원본 VP9 WebM (알파 채널 포함)</figcaption>
        </figure>
        <figure>
          <video autoPlay controls loop muted playsInline preload="metadata">
            <source src="/posts/cat_health_report.mp4" type="video/mp4" />
            브라우저가 MP4 영상을 지원하지 않습니다.
          </video>
          <figcaption>변환된 H.264 MP4 (컬러·마스크 세로 결합)</figcaption>
        </figure>
      </div>

      <h3>FFmpeg 변환</h3>
      <p>
        일반적인 브라우저 호환용 변환은 H.264와 AAC를 사용합니다. 오디오가 없다면
        <code>-an</code> 옵션으로 제외합니다.
      </p>
      <pre>
        <code>{`ffmpeg -i "assets/raw/input.webm" -c:v libx264 -pix_fmt yuv420p -an -movflags +faststart "assets/processed/output.mp4"`}</code>
      </pre>
      <p>
        알파가 있는 VP9 WebM은 컬러 프레임을 가장자리 바깥으로 1px 확장하고, 알파 마스크 경계는
        1px 안쪽으로 정리한 뒤 세로로 쌓아 MP4로 저장합니다. 이 color bleed 처리로 움직이는
        가장자리에서 검은색·회색 매트가 드러나는 현상을 줄입니다.
      </p>
      <pre>
        <code>{`ffmpeg -c:v libvpx-vp9 -i "videos/cat_health_report.webm" -filter_complex "[0:v]format=rgba,split[color][alpha];[alpha]alphaextract,erosion=coordinates=255[mask];[color]format=rgb24,dilation=coordinates=255,format=yuv420p[colorout];[colorout][mask]vstack=inputs=2" -c:v libx264 -preset slow -crf 10 -pix_fmt yuv420p -movflags +faststart "videos/mp4/cat_health_report_mp4.mp4"`}</code>
      </pre>

      <h3>Canvas에서 알파 복원</h3>
      <p>
        비디오는 화면에 숨기고, 상단 컬러 프레임과 하단 마스크 프레임을 각각 별도 Canvas에 그립니다.
        마스크의 RGB 평균값을 컬러 프레임의 alpha 값으로 넣은 뒤 최종 Canvas에 렌더링합니다. H.264
        압축으로 생길 수 있는 검은 잔상은 낮은 마스크값을 제거한 뒤 남은 범위를 다시 보정해 줄입니다.
      </p>
      <pre>
        <code>{`const drawFrame = () => {
  if (!video.paused && !video.ended) {
    const frameWidth = video.videoWidth
    const frameHeight = video.videoHeight / 2

    colorCtx.drawImage(video, 0, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight)
    maskCtx.drawImage(video, 0, frameHeight, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight)

    const colorFrame = colorCtx.getImageData(0, 0, frameWidth, frameHeight)
    const maskFrame = maskCtx.getImageData(0, 0, frameWidth, frameHeight)
    const maskBlackPoint = 20

    for (let i = 0; i < colorFrame.data.length; i += 4) {
      const maskValue = (maskFrame.data[i] + maskFrame.data[i + 1] + maskFrame.data[i + 2]) / 3
      const correctedAlpha = Math.max(0, (maskValue - maskBlackPoint) / (255 - maskBlackPoint))

      colorFrame.data[i + 3] = Math.round(correctedAlpha * 255)
    }

    ctx.putImageData(colorFrame, 0, 0)
    requestAnimationFrame(drawFrame)
  }
};`}</code>
      </pre>

      <h3>적용 영상</h3>
      <p>변환된 MP4를 숨겨진 video 요소에서 재생하고, 스크립트로 알파를 복원한 Canvas 결과입니다.</p>
      <figure>
        <MaskedVideoCanvas />
        <figcaption>Canvas에서 컬러 프레임과 알파 마스크를 합성한 적용 결과</figcaption>
      </figure>

      <h3>확인과 주의점</h3>
      <ul>
        <li><code>ffprobe -hide_banner -show_format -show_streams</code>로 원본과 결과물을 확인합니다.</li>
        <li>모바일 자동 재생을 위해 video 요소에 <code>muted</code>와 <code>playsinline</code>을 지정합니다.</li>
        <li>자동 재생이 막히는 환경을 위해 탭하여 재생하는 fallback UI를 둡니다.</li>
        <li>일반 H.264 MP4는 알파를 보존하지 않으므로, 투명 영상에는 마스크 복원 방식이 필요합니다.</li>
        <li>Android에서 WebM을 직접 재생할지, 모든 플랫폼에서 Canvas 방식을 통일할지는 성능과 구현 복잡도를 기준으로 결정합니다.</li>
      </ul>
    </>
  );
}

function MaskedVideoCanvas() {
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
        src="/posts/cat_health_report.mp4"
      />
      <canvas
        aria-label="Canvas에서 투명도를 복원해 재생하는 영상"
        className="masked-video-canvas"
        ref={canvasRef}
      />
    </>
  );
}
