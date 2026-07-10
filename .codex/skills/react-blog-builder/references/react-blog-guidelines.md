# React Blog Guidelines

## Product Direction

Build the project as a practical personal or editorial blog, not a marketing landing page. The first screen should show usable blog content, navigation, and reading paths.

## UI Priorities

- Make posts easy to scan by title, date, category, excerpt, and reading time.
- Keep typography comfortable for long-form reading.
- Support mobile layouts from the start.
- Use restrained visual styling with clear contrast and spacing.
- Avoid decorative elements that do not help reading, filtering, navigation, or publishing.

## Suggested Features

- Post list with featured/latest sections
- Category or tag filters
- Search input for title/excerpt/category
- Post detail route when routing is added
- About/profile section
- Archive page

## Data Model

Start with local data shaped like:

```js
{
  id: "stable-slug",
  title: "Post title",
  excerpt: "Short summary",
  category: "React",
  date: "2026-07-10",
  readTime: "4 min read"
}
```

Keep IDs slug-like and stable so routes can use them later.
