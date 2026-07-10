---
name: react-blog-builder
description: Build and maintain this repository's React blog application. Use when Codex is asked to create pages, components, routes, styling, content models, blog UI, editor-like interactions, or frontend behavior for this React-based blog project.
---

# React Blog Builder

## Workflow

1. Inspect the existing project structure before editing.
2. Preserve the current React/Vite conventions unless the user asks for a different stack.
3. Keep UI changes component-based and place reusable pieces in `src/components`.
4. Keep content-shaped data in `src/data` until a real CMS, API, or database is introduced.
5. Prefer accessible HTML, semantic landmarks, keyboard-friendly controls, and responsive CSS.
6. Validate with `npm run build` after code changes when dependencies are installed.

## Project Shape

- App shell: `src/App.jsx`
- React entry: `src/main.jsx`
- Global styles: `src/styles.css`
- Reusable UI: `src/components`
- Temporary content data: `src/data`
- Static assets: `public`

## React Rules

- Use functional components and hooks.
- Keep component props explicit and small.
- Avoid adding state management libraries until prop flow becomes genuinely painful.
- Use CSS modules or plain CSS consistently; this project starts with plain CSS.
- Keep visual sections unframed unless they represent repeated content cards or tool panels.

## References

- Read `references/react-blog-guidelines.md` before making broad UI, routing, content model, or styling decisions.
- Read `style/css-naming.md` before adding or changing CSS class names.
- Read `templates/post-template.md` before adding a new blog post or restructuring an existing post.
