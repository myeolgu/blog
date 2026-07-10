export const scssPxToRemPost = {
  id: "scss-px-to-rem",
  title: "AI를 활용한 SCSS px → rem 일괄 전환",
  author: "이주엽",
  date: "2026-05-21",
  category: "AI",
  categories: ["AI", "CSS"],
  excerpt:
    "관리자 서비스의 반응형 대응을 개선하기 위해 75개 SCSS 파일의 px 단위를 rem 기반으로 전환하고, AI로 반복 작업을 정리한 기록입니다.",
  tags: ["AI", "SCSS", "CSS", "rem", "Responsive"],
  Content: ScssPxToRemContent
};

function ScssPxToRemContent() {
  return (
    <>
      <h3>작업 배경</h3>
      <p>
        기존 관리자 서비스는 1920px PC 해상도 기준으로 디자인이 맞춰져 있었습니다. 현업에서
        노트북 화면에서도 답답함 없이 원활하게 확인하고 싶다는 요청이 들어왔고, 고정 단위인
        <code>px</code>로 작성된 스타일을 <code>rem</code> 기반으로 전환했습니다. 공통 컴포넌트,
        관리자 레이아웃, 로그인·인증, 모니터링, 입주민·단지 관리 화면까지 총
        <strong>75개 SCSS 파일</strong>을 수정했고, 변경량은 약 <strong>4,900줄</strong>에 달했습니다.
      </p>

      <figure>
        <img
          src="/posts/scss-px-to-rem-files.png"
          alt="px 단위를 rem으로 전환하며 수정된 SCSS 파일 목록"
        />
        <figcaption>px 단위를 rem으로 전환하며 수정한 SCSS 파일 목록</figcaption>
      </figure>

      <h3>전역 기준</h3>
      <p>
        핵심은 뷰포트 너비에 따라 전역 폰트 크기를 조정하는 기준을 만드는 것이었습니다. 1920px
        해상도에서는 기존 디자인 크기를 유지하고, 화면이 줄어들면 여백·폰트·버튼·모달·테두리가
        함께 비례 축소됩니다.
      </p>
      <pre>
        <code>{`html {
  font-size: clamp(7.5px, calc(0px + 0.5208vw), 10px);
}`}</code>
      </pre>

      <h3>단위 전환</h3>
      <pre>
        <code>{`// Before
padding: 20px;
border: 1px solid #ddd;
font-size: 14px;

// After
padding: 2rem;
border: 0.1rem solid #ddd;
font-size: 1.4rem;`}</code>
      </pre>

      <h3>AI를 활용한 범위 정리</h3>
      <p>
        AI는 대규모 변경 대상 파악과 반복적인 단위 변환을 빠르게 처리하는 데 활용했습니다. 단순
        변환 결과를 그대로 적용하지 않고, 전역 기준값이 기존 화면에 미치는 영향과 고정 폭
        레이아웃·외부 라이브러리 UI의 화면별 렌더링을 함께 검토했습니다.
      </p>
      <ul>
        <li>반복적인 단위 변환과 변경 대상 탐색은 자동화했습니다.</li>
        <li>전역 폰트 기준과 고정 폭 레이아웃은 실제 화면을 기준으로 검증했습니다.</li>
        <li>외부 라이브러리 UI는 화면별 렌더링 차이를 확인하며 개별 보정했습니다.</li>
      </ul>

      <h3>정리</h3>
      <p>
        반복적인 스타일 수정은 자동화하고, 실제 사용자 경험에 영향을 주는 기준 설정과 검증에는
        개발자의 판단을 집중한 작업이었습니다. AI는 많은 파일을 빠르게 다루는 보조 수단이었고,
        반응형 기준과 품질 판단은 사람이 책임져야 하는 영역이었습니다.
      </p>
    </>
  );
}
