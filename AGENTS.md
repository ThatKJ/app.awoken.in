<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Key differences in Next.js 16:
- **Middleware → Proxy**: Use `proxy.ts` (not `middleware.ts`) — see `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md`
- **Server Actions → Server Functions**: The `'use server'` directive works the same, but the term is "Server Functions"
- **`params` is a Promise**: In pages, `params` is `Promise<{ id: string }>` — must `await`
- **`cookies()` is async**: Must `await cookies()`
- **`refresh()` from `next/cache`**: Replaces `router.refresh()` in Server Functions
- **`useActionState`**: React 19 hook for form pending states (replaces `useFormState`)
- **`revalidatePath`/`revalidateTag` from `next/cache`**: Not `next/server`
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-docs -->
# Project Documentation

Consult these docs before writing any code:

- `docs/architecture.md` — Overall architecture, routing, data flow
- `docs/database.md` — Complete schema, enums, computed fields
- `docs/api-contracts.md` — Server Function contracts, query patterns
- `DESIGN.md` — Brand identity, design principles, visual philosophy (read before any UI work)
- `docs/design-system.md` — Colors, typography, spacing, components, tokens
- `docs/coding-standards.md` — TypeScript, React, file structure rules
- `docs/ui-spec.md` — Layout, page specs, responsive behavior
- `docs/workers.md` — Worker types, modes, task lifecycle, health
- `docs/coding-standards.md` — TypeScript, React, file structure rules
- `docs/ui-spec.md` — Layout, page specs, responsive behavior
- `docs/workers.md` — Worker types, modes, task lifecycle, health
<!-- END:project-docs -->
