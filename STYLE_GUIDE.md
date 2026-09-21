# 스타일 가이드

이 저장소에서 새 페이지·컴포넌트·글을 만들 때 따르는 규약입니다.
분석 시점의 `src/styles.css`(1,273줄)에서 실제로 굳어 있는 관행을 옮긴 것이며, 취향이 아니라 준수 기준입니다.

## 0. 기본 원칙

- 모든 스타일은 `src/styles.css` 한 파일에만 추가한다. 이 파일은 `src/app/layout.jsx`에서 한 번 import된다.
- CSS Modules, Tailwind, styled-components, 인라인 `style` 속성을 새로 도입하지 않는다.
- 컴포넌트는 `className` 문자열만 넘긴다.
- **색은 CSS 변수로 토큰화하지 않고 hex를 직접 쓴다.** 대신 아래 팔레트 표 밖의 색을 새로 만들지 않는다. 필요하면 표에서 가장 가까운 값을 쓴다.

## 1. 색 팔레트

표에 없는 색이 필요하다고 판단되면, 새 hex를 추가하기 전에 먼저 물어본다.

### 브랜드

| 용도 | 값 |
| --- | --- |
| 브랜드 그린 (액티브 / CTA / 링크 / 강조) | `#1f6f5b` |
| 브랜드 그린 hover | `#185947` |
| 포커스 링 | `rgba(31, 111, 91, 0.35)` |
| 카드 hover 보더 | `#9fb8aa` |
| 카드 hover 그림자 | `rgba(31, 111, 91, 0.08)` |

### 배경 / 보더

| 용도 | 값 |
| --- | --- |
| 페이지 배경 | `#f6f7f3` |
| 카드 · 패널 · 인풋 배경 | `#ffffff` |
| 기본 보더 | `#d9ded4` |
| 본문 내부 구분선 | `#e6eadf` |
| 인풋 · 점선 보더 | `#cbd5c6` |

### 텍스트

| 용도 | 값 |
| --- | --- |
| 기본 텍스트 | `#202124` |
| 글 본문(`.post-content`) | `#2f3437` |
| 보조 설명 | `#5f6368` |
| 메타 정보(날짜 · 작성자) | `#6b7280` |
| 중립 버튼 텍스트 | `#4b5563` |

### 코드 · 라벨

| 용도 | 값 |
| --- | --- |
| 코드 블록 배경 | `#202124` |
| 코드 블록 텍스트 | `#f6f7f3` |
| 코드 주석(`.code-comment`) | `#8fce7b` |
| 인라인 코드 배경 | `#eef2ea` |
| 카테고리 라벨 | 텍스트 `#1f6f5b` / 배경 `#e7f3ee` |
| 태그 라벨 | 텍스트 `#5b4b19` / 배경 `#fff4cf` |

> 기존 코드에 `#267152`, `#245b46`, `#185f47` 같은 그린 변종과 `#e8f5ee`, `#eef5f1`, `#edf8f1` 같은 연녹색 변종이 흩어져 있다. 새 코드에서는 쓰지 않는다. 9장 참고.

## 2. 타이포그래피

- 폰트는 `Pretendard Variable` 서브셋 woff2 하나뿐이다. 다른 웹폰트를 추가하지 않는다.
- 전역에 `font-synthesis: none`, `text-rendering: optimizeLegibility`가 걸려 있다. 가짜 굵기·기울임에 의존하지 않는다.
- 크기는 rem으로 쓴다.

| 용도 | 크기 |
| --- | --- |
| 글 제목 | `clamp(1.625rem, 3vw, 2.5rem)` |
| 페이지 제목 | `clamp(1.625rem, 3vw, 2.25rem)` |
| 카드 제목 | `1.5rem` |
| 섹션 제목 | `1.35rem` |
| 인트로 문단 | `1.08rem` |
| 글 본문 | `1.04rem` |
| 메타 정보 | `0.95rem` / `0.9rem` |
| 라벨 · eyebrow | `0.82rem` / `0.78rem` / `0.75rem` |

- line-height: 글 본문 `1.78`, 카드 설명 `1.7`, 패널 텍스트 `1.65`, 제목 `1.18`–`1.3`.
- font-weight는 가변 폰트를 활용한 값을 그대로 쓴다: `850`(브랜드 · eyebrow), `900`(아바타), `750`(강조 링크 · topline), `700`, `600`.
- 제목 레벨: `h1`은 사이트 브랜드 전용(`.brand-heading`), `h2`는 페이지·글 제목, `h3`은 글 소제목.

## 3. 레이아웃

- 컨테이너는 `.app-shell`(`width: min(1180px, calc(100% - 32px))`)을 그대로 쓴다. 새 페이지가 자체 최대폭을 정하지 않는다.
- **flex보다 grid를 먼저 고려한다.** 2단 구성, 카드 그리드, 아이콘 센터링(`display: grid; place-items: center`) 모두 grid다.
- 요소 사이 간격은 `margin`이 아니라 `gap`으로 잡는다.
- z-index 레이어는 셋뿐이다. 새 레이어를 만들지 말고 여기에 맞춘다.
  - 헤더 `10` → 글 하단 내비게이션 `15` → Top 버튼 `20`
- sticky 헤더는 `backdrop-filter: blur(10px)` + 반투명 배경(`rgba(246, 247, 243, 0.92)`) 조합을 유지한다.

## 4. 모양과 상호작용

### border-radius

| 용도 | 값 |
| --- | --- |
| 카드 · 패널 · 인풋 · 이미지 · 코드 블록 | `8px` |
| 신규 버튼류 | `0.5rem` |
| pill(카테고리 탭 · 라벨 · Top 버튼) | `999rem` |
| 큰 패널(`.ai-map`) | `1rem` |

### 상태

- 카드 hover: `transform: translateY(-2px)` + `border-color: #9fb8aa` + `box-shadow: 0 8px 20px rgba(31, 111, 91, 0.08)`
- transition은 `160ms ease`로 통일한다. 그 외 duration·easing을 새로 만들지 않는다.
- **포커스 링은 예외 없이 아래 한 가지다.**

```css
outline: 3px solid rgba(31, 111, 91, 0.35);
outline-offset: 3px;
```

- 카드 전체를 클릭 영역으로 만들 때는 오버레이 패턴을 쓴다. 카드에 `position: relative`, 링크에 `::after { position: absolute; inset: 0 }`, 아웃라인은 `:has(.post-card-link:focus-visible)`로 카드에 건다.

## 5. 네이밍과 상태 표현

- BEM을 쓰지 않는다. **블록 접두사 + 케밥케이스 평면 구조**다: `site-*`, `post-card-*`, `post-navigation-*`, `map-*`, `ai-*`.
- 새 페이지를 만들면 그 페이지 접두사를 하나 정하고 모든 클래스에 붙인다.
- 상태 클래스는 `.is-active`, `.is-open` 두 가지만 쓴다.
- 조건부 레이아웃은 data 속성으로 분기한다. 예: `.post-navigation[data-next="false"]`
- 페이지 스코프가 필요하면 루트 클래스로 감싼다. 예: `.post-view .top-button`

## 6. 속성 작성 순서

한 규칙 안에서 아래 순서를 지킨다.

```
position / inset / z-index
display / grid / flex / gap / align / justify
width / height / min-* / max-*
padding / margin
border / border-radius
color / background / box-shadow
cursor
font-* / line-height / letter-spacing / text-*
transition / transform / 기타
```

## 7. 반응형

- 데스크톱 퍼스트, `max-width` 기준이다. 브레이크포인트는 **1080px / 900px / 640px** 셋뿐이며 새로 추가하지 않는다.
- 미디어 쿼리는 파일 맨 아래에 모으고, **넓은 폭 → 좁은 폭 순서**로 배치한다(1080 → 900 → 640).
- 같은 브레이크포인트 블록을 두 번 선언하지 않는다.

| 폭 | 하는 일 |
| --- | --- |
| 1080px | `.post-grid` 3열 → 2열 |
| 900px | 모든 2단 그리드 → 1단, sidebar `position: static` |
| 640px | 헤더 세로 스택, 비디오 2열 → 1열, 고정 요소 여백 축소 |

## 8. 글 작성 규약

**글 본문에는 클래스를 쓰지 않는다.** `.post-content` 하위 선택자가 전부 처리한다.

- 파일 위치: `src/posts/<카테고리 소문자>/<슬러그>.jsx`
- 메타데이터 객체를 export하고 `src/posts/index.js`에 등록한다.

```jsx
export const somePost = {
  id: "slug",
  title: "제목",
  author: "이주엽",
  date: "YYYY-MM-DD",
  category: "CSS",
  excerpt: "한 문단 요약",
  tags: ["CSS", "Mobile"],
  sourceUrl: "https://...",
  Content: SomePostContent
};
```

- 본문에서 쓰는 태그: `h3`(소제목), `p`, `ul > li`, `code`, `pre > code`, `figure > figcaption`, `img`, `video`
- 예외적으로 클래스를 쓰는 곳은 코드 주석뿐이다: `<span className="code-comment">`
- 본문 폭은 `max-width: 820px`로 이미 제한돼 있다. 글에서 따로 폭을 지정하지 않는다.
- 이미지·비디오는 `.post-content` 규칙이 `width: 100%` + 보더 + radius를 이미 적용한다.

## 9. 정리 대상 (기존 부채)

새 코드에서 따라 하지 않는다. 손댈 일이 생기면 그때 정리한다.

1. **px과 rem 혼용** — 구 코드(header · intro · toolbar · post-card)는 px, 신규 코드(post-navigation · pagination · top-button · content-label · ai-*)는 rem을 쓴다. **새 코드는 rem으로 쓴다.**
2. **`.post-article` 중복 선언** — `styles.css`에 두 번 나뉘어 `padding`을 덮어쓴다.
3. **`@media (max-width: 900px)` 두 번 선언** — 게다가 900px 블록이 1080px 블록보다 앞에 있어 캐스케이드 순서가 역전돼 있다.
4. **그린·연녹색 hex 분산** — 1장 팔레트 표의 값만 쓴다.

## 10. 새 페이지 추가 체크리스트

- [ ] `.app-shell` 안에 들어가는가 (자체 최대폭을 만들지 않았는가)
- [ ] 클래스에 페이지 접두사를 붙였는가
- [ ] 색이 1장 팔레트 표 안에 있는가
- [ ] 간격을 `gap`으로 잡았는가
- [ ] 인터랙티브 요소에 표준 포커스 링이 있는가
- [ ] 크기 단위를 rem으로 썼는가
- [ ] 미디어 쿼리가 기존 3개 브레이크포인트만 쓰고, 파일 하단에 넓은 폭 → 좁은 폭 순서로 들어갔는가
- [ ] 속성 순서가 6장을 따르는가
