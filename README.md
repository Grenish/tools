# Tools

Beautifully crafted, accessible UI components and blocks built on top of [shadcn/ui](https://ui.shadcn.com). Installable via the shadcn CLI through the `@grenish` registry.

## Quick Start

Add the registry to your `components.json`:

```json
{
  "registries": {
    "@grenish": {
      "url": "https://tools-grenish.vercel.app/r"
    }
  }
}
```

Install any component:

```bash
npx shadcn@latest add @grenish/tweet-card
```

## Components

| Component            | Description                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `tweet-card`         | A responsive tweet/X post card with multi-size support, media grids, and engagement stats. |
| `instagram-card`     | An Instagram-style post card with photo grid layouts and profile info.                     |
| `google-button`      | A Google sign-in button with icon-only and full-text variants.                             |
| `x-button`           | An X (Twitter) sign-in button with icon-only and full-text variants.                       |
| `delete-button`      | A destructive action button with a built-in confirmation dialog.                           |
| `view-password`      | A password input with an inline visibility toggle.                                         |
| `horizontal-stripes` | A decorative horizontal stripe pattern using CSS repeating gradients.                      |
| `vertical-stripes`   | A decorative vertical stripe pattern using CSS repeating gradients.                        |
| `editor`             | A rich text editor with formatting toolbar, font selector, and preview mode.               |

## Blocks

| Block            | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `signin-form`    | A sign-in form with social login and password recovery.          |
| `signup-form`    | A registration form with email, password, and social auth.       |
| `reset-password` | A password reset flow with new password and confirmation fields. |

### Project Structure

```
├── app/
│   ├── (home)/          Landing page
│   └── docs/            Documentation layout and pages
├── components/
│   ├── tools/           Source components used in docs previews
│   └── ui/              shadcn/ui base components
├── content/docs/        MDX documentation files
├── registry/
│   └── new-york/        Registry source files (self-contained)
├── public/r/            Generated registry JSON artifacts
└── registry.json        Registry manifest
```

## Documentation

Visit [tools-grenish.vercel.app](https://tools-grenish.vercel.app) for full documentation, live previews, and usage examples.

## License

Open source.
