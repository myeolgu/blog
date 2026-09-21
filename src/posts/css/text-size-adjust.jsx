import { assetUrl } from "../../lib/asset";

export const textSizeAdjustPost = {
  id: "text-size-adjust",
  title: "text-size-adjust",
  author: "이주엽",
  date: "2024-08-26",
  category: "CSS",
  excerpt:
    "모바일 브라우저가 글자 크기를 임의로 키우는 현상은 왜 생기고, text-size-adjust에서 none과 100% 중 무엇을 써야 하는지 정리했습니다.",
  tags: ["CSS", "Mobile", "Browser"],
  sourceUrl: "https://velog.io/@juyeop198/text-size-adjust",
  Content: TextSizeAdjustContent
};

function TextSizeAdjustContent() {
  return (
    <>
      <h3>어떤 문제를 해결하는 속성인가</h3>
      <p>
        모바일 브라우저는 작은 화면에서 글자를 읽기 쉽게 하려고 텍스트를 자동으로 키우는
        알고리즘(text autosizing, 인플레이션)을 갖고 있습니다. 대표적으로 iOS Safari에서 화면을
        가로로 돌리면 일부 문단의 글자만 커져서 레이아웃이 어긋나 보이는 경우가 있습니다.
        <code>text-size-adjust</code>는 이 자동 조정을 끄거나 비율을 지정하는 속성이며,
        상속되는 속성이라 <code>html</code>에 한 번 지정하면 문서 전체에 적용됩니다.
      </p>

      <h3>text-size-adjust 속성</h3>
      <ul>
        <li>
          <code>text-size-adjust: none;</code> 화면 크기에 따라 텍스트 크기를 조정하지 않음을
          명시합니다. 브라우저의 인플레이션 알고리즘을 비활성화합니다.
        </li>
        <li>
          <code>text-size-adjust: auto;</code> 기본값으로, 화면 크기에 따라 텍스트 크기를 자동으로 조정할
          수 있게 합니다. 디바이스마다 크기가 달라질 수 있기 때문에 사용하지 않는 편입니다.
          브라우저의 인플레이션 알고리즘을 활성화합니다.
        </li>
        <li>
          <code>text-size-adjust: %;</code> 특정 퍼센트 값을 주어 크기를 조정합니다.
          <code>100%</code> 값을 주어 모든 디바이스에서 동일한 텍스트 크기를 만들 수도 있고,
          퍼센트 값을 낮게 주어 디바이스별로 동일하게 작게 줄 수도 있습니다. 글꼴 크기를 늘릴
          백분율 값을 지정하여 브라우저의 팽창 알고리즘을 활성화합니다.
        </li>
      </ul>

      <h3>none과 100%의 차이</h3>
      <p>
        두 값 모두 브라우저가 글자를 임의로 키우는 동작을 막지만 의미는 다릅니다.
        <code>none</code>은 조정 기능 자체를 끄는 값이고, <code>100%</code>는 "조정 비율을
        100%로 고정한다"는 값입니다. normalize.css와 Bootstrap Reboot 같은 널리 쓰이는 리셋
        스타일이 <code>none</code>이 아닌 <code>100%</code>를 쓰는 것도 이 때문입니다.
        <code>none</code>은 일부 환경에서 사용자가 브라우저·OS 설정으로 글자 크기를 키우는 동작까지
        막을 수 있어 접근성 측면에서 주의가 필요합니다. 특별한 이유가 없다면
        <code>100%</code>를 기본 선택지로 두는 편이 안전합니다.
      </p>

      <h3>예시 코드</h3>
      <p>아래는 모든 값을 <code>none</code>으로 끄는 예시입니다.</p>
      <pre>
        <code>{`html, body {
  -webkit-text-size-adjust: none; /* 크롬, 사파리, 오페라 신버전 */
  -ms-text-size-adjust: none; /* IE */
  -moz-text-size-adjust: none; /* 파이어폭스 */
  -o-text-size-adjust: none; /* 오페라 구버전 */
  text-size-adjust: none;
}`}</code>
      </pre>

      <h3>권장 리셋 코드</h3>
      <p>일반적인 페이지라면 <code>html</code>에 <code>100%</code>만 지정하는 다음 코드로 충분합니다.</p>
      <pre>
        <code>{`html {
  -webkit-text-size-adjust: 100%; /* iOS Safari, 크롬 */
  -moz-text-size-adjust: 100%; /* 파이어폭스 */
  text-size-adjust: 100%;
}`}</code>
      </pre>

      <h3>적용 전 확인할 점</h3>
      <ul>
        <li>
          <code>{`<meta name="viewport" content="width=device-width, initial-scale=1">`}</code>이
          먼저 지정되어 있어야 합니다. 뷰포트 설정이 없으면 모바일 브라우저는 데스크톱 폭으로
          렌더링한 뒤 축소하므로 이 속성만으로 해결되지 않습니다.
        </li>
        <li>
          브라우저마다 지원하는 접두사가 다르므로 표준 속성과 접두사 속성을 함께 작성하고, 지원
          현황은 Can I use에서 확인합니다.
        </li>
        <li>
          데스크톱 브라우저의 반응형 모드에서는 자동 글자 확대가 재현되지 않는 경우가 많으므로,
          실제 기기나 시뮬레이터에서 화면을 회전해 가며 확인하는 편이 정확합니다.
        </li>
      </ul>

      <figure>
        <img
          src={assetUrl("/posts/text-size-adjust.png")}
          alt="Can I use 사이트의 CSS text-size-adjust 브라우저 지원 현황"
        />
        <figcaption>Can I use 기준 CSS text-size-adjust 브라우저 지원 현황</figcaption>
      </figure>
    </>
  );
}
