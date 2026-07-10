export const textSizeAdjustPost = {
  id: "text-size-adjust",
  title: "text-size-adjust",
  author: "이주엽",
  date: "2024-08-26",
  category: "CSS",
  excerpt:
    "모바일 환경에서 브라우저가 텍스트 크기를 자동으로 조정하는 동작을 제어하는 CSS 속성입니다.",
  tags: ["CSS", "Mobile", "Browser"],
  sourceUrl: "https://velog.io/@juyeop198/text-size-adjust",
  Content: TextSizeAdjustContent
};

function TextSizeAdjustContent() {
  return (
    <>
      <h3>text-size-adjust 속성</h3>
      <ul>
        <li>
          <code>text-size-adjust: none;</code> 기본값으로 화면 크기에 따라 텍스트 크기를 조정하지
          않음을 명시합니다. 브라우저의 인플레이션 알고리즘을 비활성화합니다.
        </li>
        <li>
          <code>text-size-adjust: auto;</code> 화면 크기에 따라 텍스트 크기를 자동으로 조정할 수
          있게 합니다. 디바이스마다 크기가 달라질 수 있기 때문에 사용하지 않는 편입니다.
          브라우저의 인플레이션 알고리즘을 활성화합니다.
        </li>
        <li>
          <code>text-size-adjust: %;</code> 특정 퍼센트 값을 주어 크기를 조정합니다.
          <code>100%</code> 값을 주어 모든 디바이스에서 동일한 텍스트 크기를 만들 수도 있고,
          퍼센트 값을 낮게 주어 디바이스별로 동일하게 작게 줄 수도 있습니다. 글꼴 크기를 늘릴
          백분율 값을 지정하여 브라우저의 팽창 알고리즘을 활성화합니다.
        </li>
      </ul>

      <h3>예시 코드</h3>
      <pre>
        <code>{`html, body {
  -webkit-text-size-adjust: none; /* 크롬, 사파리, 오페라 신버전 */
  -ms-text-size-adjust: none; /* IE */
  -moz-text-size-adjust: none; /* 파이어폭스 */
  -o-text-size-adjust: none; /* 오페라 구버전 */
  text-size-adjust: none;
}`}</code>
      </pre>

      <figure>
        <img
          src="/posts/text-size-adjust.png"
          alt="Can I use 사이트의 CSS text-size-adjust 브라우저 지원 현황"
        />
        <figcaption>Can I use 기준 CSS text-size-adjust 브라우저 지원 현황</figcaption>
      </figure>
    </>
  );
}
