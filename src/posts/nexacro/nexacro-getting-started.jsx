import { assetUrl } from "../../lib/asset";

export const nexacroGettingStartedPost = {
  id: "nexacro-getting-started",
  title: "넥사크로 입문: 설치부터 Form 생성까지",
  author: "이주엽",
  date: "2026-10-21",
  category: "Nexacro",
  excerpt:
    "넥사크로 체험판을 설치하고, 연습용 프로젝트에서 Publish 폴더와 Form 파일을 만드는 과정을 순서대로 정리했습니다.",
  tags: ["Nexacro", "Setup", "Publishing"],
  Content: NexacroGettingStartedContent
};

function NexacroGettingStartedContent() {
  return (
    <>
      <h3>먼저 확인할 것: 버전</h3>
      <p>
        프로젝트에 투입되기 전에 사용 중인 넥사크로의 정확한 버전(예: N, 17, 14)을 반드시
        확인해야 합니다. 버전에 따라 지원하는 기능, 스크립트 문법, 사용할 수 있는 컴포넌트가
        크게 다릅니다. 아래 내용은 2025년 11월 20일 기준 최신 버전인 넥사크로 24를 기준으로
        작성했습니다.
      </p>

      <h3>설치</h3>
      <p>
        <a
          href="https://www.tobesoft.com/product/nexacro"
          rel="noopener noreferrer"
          target="_blank"
        >
          투비소프트 넥사크로 제품 페이지
        </a>
        에서 <strong>체험판 다운로드</strong> 버튼을 누릅니다.
      </p>

      <figure>
        <img src={assetUrl("/posts/nexacro-install-1.webp")} alt="넥사크로 제품 페이지의 체험판 다운로드 버튼" />
        <figcaption>체험판 다운로드 버튼</figcaption>
      </figure>

      <p>다운로드 팝업이 나오면 정보를 입력하고 내려받습니다.</p>

      <figure>
        <img src={assetUrl("/posts/nexacro-install-2.webp")} alt="체험판 다운로드 팝업. 성명과 이메일은 가렸습니다." />
        <figcaption>체험판 다운로드 팝업 (입력한 개인정보는 가렸습니다)</figcaption>
      </figure>

      <p>압축을 해제한 뒤 NexacroN_SetupStudio를 실행해 설치합니다.</p>

      <figure>
        <img src={assetUrl("/posts/nexacro-install-3.webp")} alt="압축 해제한 파일 목록에서 NexacroN_SetupStudio를 강조한 화면" />
        <figcaption>설치 파일 목록</figcaption>
      </figure>

      <p>설치가 끝나면 Nexacro Studio가 실행됩니다.</p>

      <figure>
        <img src={assetUrl("/posts/nexacro-install-4.webp")} alt="설치가 끝난 Nexacro Studio 시작 화면" />
        <figcaption>설치 완료 후 Nexacro Studio 시작 화면</figcaption>
      </figure>


      <h3>연습용 프로젝트 만들기</h3>
      <p>
        프로젝트 파일을 이미 받았다면 이 단계는 건너뛰어도 됩니다. 연습용이므로 이름은
        자유롭게 정합니다.
      </p>
      <p>
        <code>File &gt; New &gt; Project</code>를 선택합니다.
      </p>

      <figure>
        <img src={assetUrl("/posts/nexacro-form-1.webp")} alt="File > New > Project 메뉴" />
        <figcaption>File &gt; New &gt; Project</figcaption>
      </figure>

      <p>
        템플릿(예시는 Mobile)을 고르고 프로젝트 이름을 입력합니다. 테스트용이라 <code>test</code>로
        지었습니다.
      </p>

      <figure>
        <img src={assetUrl("/posts/nexacro-form-2.webp")} alt="Project Wizard에서 Mobile 템플릿과 프로젝트 이름 test를 입력한 화면" />
        <figcaption>Project Wizard</figcaption>
      </figure>


      <h3>Publish 폴더 만들기</h3>
      <p>
        왼쪽 Project Explorer에서 <code>design</code>을 선택하고 <code>New Folder</code>로{" "}
        <code>Publish</code> 폴더를 만듭니다.
      </p>

      <figure>
        <img src={assetUrl("/posts/nexacro-form-3.webp")} alt="design 폴더의 우클릭 메뉴에서 New Folder를 선택한 화면" />
        <figcaption>design &gt; New Folder</figcaption>
      </figure>


      <h3>Form 파일 만들기</h3>
      <p>
        방금 만든 폴더를 선택한 상태에서 <code>File &gt; New &gt; Form</code>을 누릅니다.
      </p>

      <figure>
        <img src={assetUrl("/posts/nexacro-form-4.webp")} alt="File > New > Form 메뉴" />
        <figcaption>File &gt; New &gt; Form</figcaption>
      </figure>

      <ul>
        <li>
          파일 이름은 연습할 때는 자유롭지만, 실무에서는 개발자에게 전달하는 파일이므로
          기획서의 화면 ID 같은 네이밍 기준을 따릅니다.
        </li>
        <li>
          width, height는 프로젝트마다 다르지만 연습용으로는 <code>768 x 1200</code> 정도로
          설정하고 <code>Finish</code>를 누릅니다.
        </li>
      </ul>

      <figure>
        <img src={assetUrl("/posts/nexacro-form-5.webp")} alt="Form Wizard에서 파일 이름과 위치를 입력하는 화면" />
        <figcaption>Form Wizard: 이름과 위치</figcaption>
      </figure>


      <figure>
        <img src={assetUrl("/posts/nexacro-form-6.webp")} alt="Form Wizard의 Layout 단계에서 width와 height를 설정하는 화면" />
        <figcaption>Form Wizard: 크기 설정</figcaption>
      </figure>


      <h3>다음 단계</h3>
      <p>
        여기까지 하면 빈 Form 화면이 열립니다. 다음 단계는 데이터셋을 만들고 그리드와
        연동하는 것입니다.
      </p>
    </>
  );
}
