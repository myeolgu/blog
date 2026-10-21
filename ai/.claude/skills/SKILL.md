---
name: publishing
description: 퍼블리싱 작업(HTML 마크업, SCSS, 페이지 작성, UI 컴포넌트, 아이콘, Figma 변환, 커밋 메시지) 전에 읽는 지침 인덱스. 작업 종류에 맞는 하위 문서를 아래 표에서 골라 먼저 읽고 따른다.
---

# 퍼블리싱 지침 인덱스

작업을 시작하기 전에 아래 표에서 해당하는 문서를 Read로 읽고, 그 안의 규칙을 따른다. 여러 작업이 겹치면 관련 문서를 모두 읽는다.

| 문서 | 읽는 경우 |
| --- | --- |
| [commit.md](commit.md) | 사용자가 "커밋 내용"을 요청했을 때 staged 변경사항만 분석해 Conventional Commits 형식의 커밋 메시지를 제안한다. 커밋, stage, unstage는 직접 실행하지 않는다. |
| [component-accordion.md](component-accordion.md) | 아코디언(component-accordion) 마크업 구조, 다중/단일 활성화 패턴, 단독 접기/펼치기 패널을 안내한다. 접기/펼치기 UI를 마크업하기 전에 사용한다. |
| [component-button.md](component-button.md) | 버튼(.btn) 마크업 구조와 버튼 그룹(component-btns) 사용법을 안내한다. 새 버튼이나 버튼 그룹을 마크업하기 전에 사용한다. |
| [component-checkbox.md](component-checkbox.md) | 체크박스는 component-input 클래스를 쓴다(Input.js 동작 전제). 체크박스·스위치·약관 동의 그룹 마크업 구조와 상태를 안내한다. 체크박스를 마크업하기 전에 사용한다. |
| [component-dialog.md](component-dialog.md) | alert/confirm/이미지 미리보기 팝업(component-dialog)을 etUI.dialog API로 여는 방법을 안내한다. 확인·경고 팝업이 필요할 때 사용한다. "alert"으로 요청받아도 이 스킬을 따른다. |
| [component-form.md](component-form.md) | 폼(component-form) 마크업 구조, form-element/form-group 조합 패턴을 안내한다. 모달·상세 화면의 입력 폼을 마크업하기 전에 사용한다. |
| [component-icon.md](component-icon.md) | 아이콘은 SVG 파일이 아니라 _svg.scss의 인라인 data-URI 믹스인으로 그린다. <i class="ico ico-xxx" data-size="24"> 마크업과 색상 파라미터 사용법, 접근성 규칙을 안내한다. |
| [component-input.md](component-input.md) | 입력 필드(component-input) 마크업 구조, 버튼/아이콘 포함형, 상태 클래스를 안내한다. 입력 필드를 마크업하기 전에 사용한다. |
| [component-list.md](component-list.md) | 목록 마크업 정책을 안내한다. 별도 공통 List 컴포넌트가 없으므로 ul/ol/테이블 중 데이터 성격에 맞는 마크업을 직접 구성하도록 안내한다. |
| [component-modal.md](component-modal.md) | 모달(component-modal) 마크업 구조와 etUI Modal 컴포넌트의 열기/닫기 동작을 안내한다. 모달을 마크업하기 전에 사용한다. |
| [component-pagination.md](component-pagination.md) | 페이지네이션(component-pagination) 마크업 구조와 미니 페이지네이션을 안내한다. 페이지 이동 UI를 마크업하기 전에 사용한다. |
| [component-picker.md](component-picker.md) | 날짜 선택(component-datepicker) 마크업 구조를 안내한다. "picker" 또는 날짜 입력 요청 시 사용한다. |
| [component-radio.md](component-radio.md) | 라디오 버튼 마크업 구조, 상태, 접근성 규칙을 안내한다. 라디오 버튼을 마크업하기 전에 사용한다. |
| [component-select.md](component-select.md) | 셀렉트(component-select) 마크업 구조(기본 select, 커스텀 셀렉트)를 안내한다. 셀렉트 박스를 마크업하기 전에 사용한다. |
| [component-snackbar.md](component-snackbar.md) | 스낵바(component-snackbar) 마크업이 왜 공용 JS 컴포넌트가 아닌지, 새 화면에는 언제 component-toast를 대신 써야 하는지 안내한다. |
| [component-swiper.md](component-swiper.md) | 스와이퍼(component-swiper) 마크업 구조와 data-props-* 옵션(네비게이션, 페이지네이션, 반응형)을 안내한다. 슬라이더를 마크업하기 전에 사용한다. |
| [component-table.md](component-table.md) | 테이블(component-table) 마크업 구조, caption/scope/rowspan 규칙을 안내한다. 표를 마크업하기 전에 사용한다. |
| [component-tabs.md](component-tabs.md) | 탭(component-tab) 마크업 구조와 중첩 탭 패턴을 안내한다. 탭 UI를 마크업하기 전에 사용한다. |
| [component-textarea.md](component-textarea.md) | 텍스트영역(component-input의 textarea 변형) 마크업 구조와 글자 수 카운트(data-props-count) 사용법을 안내한다. 텍스트영역을 마크업하기 전에 사용한다. |
| [component-toast.md](component-toast.md) | 하단 토스트 메시지(component-toast, etUI.dialog.toast* API)를 사용하는 방법을 안내한다. 짧은 결과 알림이 필요할 때 사용한다. |
| [component-tooltip.md](component-tooltip.md) | 툴팁(component-tooltip) 마크업 구조와 트리거/닫기 버튼, data-props 옵션을 안내한다. 툴팁을 마크업하기 전에 사용한다. |
| [figma-to-page.md](figma-to-page.md) | 연결된 Figma MCP(get_design_context 등)로 받은 결과를 이 프로젝트의 실제 정적 HTML·SCSS·컴포넌트 체계로 바꾸는 방법을 안내한다. Figma 링크/node로 페이지나 화면을 구현하기 전에 사용한다. |
| [icon-asset-naming.md](icon-asset-naming.md) | 이 프로젝트의 아이콘은 SVG 파일이 아니라 _svg.scss의 인라인 data-URI 믹스인이다. 새 아이콘을 추가하기 전에 기존 믹스인 재사용 여부와 새 믹스인 작성 절차를 안내한다. |
| [layout-page.md](layout-page.md) | 신규 정적 HTML 페이지 작성 시 sample.html 기준 구조, 작업 가능 범위, 페이지 최상위 클래스 규칙을 안내한다. 새 페이지를 만들기 전에 사용한다. |
| [markup-html.md](markup-html.md) | HTML 마크업 공통 규칙(시맨틱 태그, h1~h6 헤딩 계층, a href 값, HTML 주석·수정 표시, void 요소 자체 닫힘)을 안내한다. 페이지나 컴포넌트의 HTML을 작성하거나 수정하기 전에 사용한다. |
| [style-scss.md](style-scss.md) | SCSS 작성 규칙(상위 클래스 중심 중첩, kebab-case, rem() 믹스인, 색상 변수, gap 금지, 태그 선택자 제한 등)을 안내한다. 페이지·컴포넌트 스타일을 작성하거나 수정하기 전에 사용한다. |
