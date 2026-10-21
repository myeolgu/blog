import { assetUrl } from "../../lib/asset";

export const nexacroReviewPost = {
  id: "nexacro-review",
  title: "퍼블리셔가 처음 써 본 넥사크로 후기",
  author: "이주엽",
  date: "2026-10-21",
  category: "Nexacro",
  excerpt:
    "SI 프로젝트에서 처음 넥사크로를 접한 퍼블리셔의 입문 후기입니다. 장단점과 꾸준히 쓰이는 이유, 학습할 가치가 있는지 정리했습니다.",
  tags: ["Nexacro", "Publishing", "Review"],
  Content: NexacroReviewContent
};

function NexacroReviewContent() {
  return (
    <>
      <h3>들어가며</h3>
      <p>
        SI 프로젝트에서 처음 넥사크로를 접하며 <strong>입문자 기준</strong>으로 알고 가면 좋을 내용을
        정리했습니다. 아직 깊이 아는 단계는 아니라서, 다음에 투입될 때 무엇을 준비해야 하는지
        가볍게 짚는 길잡이 정도로 읽어 주세요.
      </p>
      <p>
        넥사크로를 제대로 익히고 싶다면 시간이 될 때{" "}
        <a
          href="https://www.youtube.com/watch?v=-fPFMoD48tQ&list=PL103FbwuueMlbfWX9KVFqXNeHnHcAwTA3"
          rel="noopener noreferrer"
          target="_blank"
        >
          [퍼블리싱 기본] 01. 넥사크로 N 소개
        </a>{" "}
        강의를 정독하는 것이 가장 좋습니다.
      </p>

      <h3>넥사크로는 어떤 도구인가</h3>
      <p>
        ERP, 인트라넷, 금융권 뱅킹처럼 <strong>데이터 중심의 기업용 시스템</strong> 구축에 특화된
        도구입니다. 국내 공공기관, 은행, 대기업 SI 프로젝트에서 널리 쓰입니다.
      </p>

      <h3>장점</h3>
      <ul>
        <li>
          <strong>CRUD 개발 생산성</strong>: 컴포넌트를 드래그 앤 드롭으로 배치할 수 있고, 조회·입력·
          수정·삭제처럼 정형화된 업무 화면을 빠르게 만들 수 있습니다.
        </li>
        <li>
          <strong>대용량 데이터 처리</strong>: 가상 스크롤로 보이는 영역만 렌더링해, 수만 건을
          그리드에 올려도 브라우저가 멈추지 않습니다. 데이터셋이 수정·삭제 상태를 자동으로
          관리해 줍니다.
        </li>
        <li>
          <strong>OSMU</strong>: 하나의 소스로 PC, 태블릿, 모바일 환경에 대응할 수 있습니다.
        </li>
      </ul>

      <h3>단점</h3>
      <ul>
        <li>
          <strong>XCSS 의존</strong>: 표준 CSS를 그대로 쓰지 못하고 넥사크로 전용 문법을 따라야
          합니다. 예를 들어 <code>border</code> 대신 <code>-nexa-border</code>를 씁니다. Flex,
          Grid, 애니메이션 같은 최신 CSS 구현이 까다로워 인터랙션이 화려한 B2C 서비스에는 맞지
          않습니다.
        </li>
        <li>
          <strong>무거운 초기 로딩</strong>: 전용 엔진(프레임워크 JS)을 먼저 내려받아야 해서 일반
          웹페이지보다 첫 로딩이 느립니다.
        </li>
        <li>
          <strong>고립된 기술 스택</strong>: 숙련도가 올라가도 React, Vue 같은 모던 프론트엔드
          실력으로 이어지지 않습니다. 구글링으로 해결하기 어렵고 제조사 커뮤니티와 기술지원에
          기대는 경우가 많습니다.
        </li>
      </ul>

      <h3>그래도 꾸준히 쓰이는 이유</h3>
      <ul>
        <li>
          업무 화면에서는 엑셀처럼 수천, 수만 건의 데이터를 조회하고 필터링하고 수정하려는
          요구가 많습니다.
        </li>
        <li>
          React나 일반 HTML로 같은 규모의 데이터를 스크롤 버벅임 없이 처리하려면 상당한 구현
          역량이 필요합니다.
        </li>
        <li>
          넥사크로는 그리드 컴포넌트를 올리는 것만으로 대용량 처리, 엑셀 다운로드·업로드, 합계
          계산까지 됩니다. 이 생산성은 무시하기 어렵습니다.
        </li>
      </ul>

      <h3>앞으로도 쓰일까</h3>
      <p>
        아래는 제 생각에 AI의 도움을 받아 정리한 전망이라, 정확한 통계가 아니라 의견으로
        읽어 주세요.
      </p>
      <ul>
        <li>
          <strong>이미 깔린 시스템이 많습니다.</strong> 금융권, 공공기관, 대기업 내부 시스템의
          상당수가 넥사크로나 이전 버전으로 구축돼 있습니다. 전체를 갈아엎는 비용과 기간이
          크다 보니, 버전 업그레이드와 유지보수 일감이 계속 이어지는 구조입니다.
        </li>
        <li>
          <strong>책임질 제조사가 필요합니다.</strong> 문제가 생겼을 때 제조사에 지원을 요청할 수
          있다는 점이 보수적인 조직에서는 중요한 선택 기준이 됩니다.
        </li>
        <li>
          <strong>다루는 퍼블리셔가 줄고 있습니다.</strong> 신입은 React, Vue, Next.js 쪽으로
          몰리는데 일감은 그대로라면, 최신 감각과 넥사크로를 함께 갖춘 사람이 상대적으로
          희소해질 수 있습니다.
        </li>
      </ul>

      <h3>써 본 소감</h3>
      <p>
        최신 웹 트렌드와는 결이 다르지만, 퍼블리셔가 넥사크로를 다룰 줄 알면 참여할 수 있는
        프로젝트의 폭이 분명히 넓어진다고 느꼈습니다. 반대로 스타일 제약과 폐쇄적인 생태계는
        답답한 부분이었습니다. 검색창에 넥사크로를 치면 연관 검색어부터 심상치 않은 걸 보면, 저만 그렇게
        느낀 건 아닌 듯합니다.
      </p>

      <figure>
        <img src={assetUrl("/posts/nexacro-review-1.webp")} alt="구글 검색창에 넥사크로를 입력하면 나오는 연관 검색어" />
        <figcaption>넥사크로를 검색하면 나오는 연관 검색어</figcaption>
      </figure>
      <p>
        넥사크로가 모든 환경의 정답은 아닙니다. 다만 국내 SI 시장에서는 꽤 든든한{" "}
        <strong>보험 같은 기술 스펙트럼</strong>이 된다고 생각합니다. 모두가 최신 기술과 AI만 볼
        때, 국내 기업 환경에 깊이 자리 잡은 도구를 함께 익혀 두는 것도 나쁘지 않은 선택입니다.
      </p>

      <figure>
        <img src={assetUrl("/posts/nexacro-review-2.webp")} alt="Gemini가 정리한 넥사크로 학습의 결론" />
        <figcaption>Gemini 3.0 Pro가 정리한 넥사크로에 대한 생각</figcaption>
      </figure>
    </>
  );
}
