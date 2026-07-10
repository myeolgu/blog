# Blog Post Template Rules

## Purpose

Every post uses the shared detail layout rendered by `PostDetail` in `src/App.jsx`. Post files provide only content; they must not add their own outer article, header, metadata, or bottom navigation.

## Post Data

Each post exports one object with these fields:

```jsx
export const examplePost = {
  id: "stable-kebab-slug",
  title: "Post title",
  author: "이주엽",
  date: "YYYY-MM-DD",
  category: "Primary category",
  categories: ["Primary category"],
  excerpt: "Card summary, ideally within three lines.",
  tags: ["Tag"],
  Content: ExamplePostContent
};
```

- Keep `id` stable and kebab-case.
- Set `category` as the primary category.
- Add `categories` only when a post needs to appear in more than one category filter.
- Save the file in `src/posts/<primary-category-lowercase>/` and export it from `src/posts/index.js` in newest-first order.

## Content Structure

Use this order when it fits the subject:

1. `작업 배경` or `문제`
2. 핵심 기준, 결정, 또는 접근 방식
3. 구현 예시 또는 변경 내용
4. 검증·결과·주의사항
5. `정리`

- Use `<h3>` for body sections.
- Use `<p>` for explanation and `<ul>` for concise, scannable points.
- Use `<pre><code>` for code examples.
- Keep code comments such as `// Before` and `// After` in `<span className="code-comment">` when highlighting is useful.
- Use `<figure>`, `<img>`, and `<figcaption>` for screenshots or other proof images. Store assets in `public/posts/` with descriptive kebab-case filenames.
- Add video demonstrations only when they materially help explain the post.

## Do Not Duplicate Shared Layout

Do not render these inside a post `Content` component:

- `<article className="post-article">`
- Title, author, date, or tag header
- Category eyebrow
- Previous/next/list navigation

Those elements are rendered once by the shared detail layout.
