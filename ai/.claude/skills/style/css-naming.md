# CSS 클래스 네이밍 규칙

- 클래스명은 kebab-case를 사용한다.
- `--modifier`처럼 하이픈을 두 개 연속으로 사용하는 표기법은 사용하지 않는다.
- 클래스명 하나에 사용하는 하이픈은 최대 2개까지만 허용한다.
- 하이픈이 3개 이상 필요한 긴 클래스명은 의미를 단순화하거나 구조를 재정리한다.

예시:

```css
/* 사용 가능 */
.content-label {}
.content-label-tag {}

/* 사용하지 않음 */
.content-label--tag {}
.content-label-tag-text {}
```
