# Coding Standards

## TypeScript

- strict mode enabled
- No `any` — use `unknown` and type narrowing
- No `@ts-ignore` or `@ts-expect-error`
- Prefer `interface` over `type` for object shapes
- Use `type` for unions, intersections, and utility types
- All props interfaces are PascalCase with `Props` suffix: `ButtonProps`
- All functions have explicit return types

## React

- Server Components by default
- `'use client'` only when state, effects, or browser APIs are needed
- Keep components under 250 lines
- Extract reusable logic into hooks (`use-*.ts`)
- Extract reusable UI into `components/ui/`
- Use `cn()` from `@/lib/utils` for className merging
- No inline styles
- No dangerouslySetInnerHTML

## Server Functions

```ts
'use server'

import { verifySession } from '@/lib/dal'

export async function createLead(formData: FormData) {
  const session = await verifySession()
  const { organizationId } = session

  // validate with Zod
  // mutate database
  // revalidatePath()
  // return result
}
```

## File Structure

```
src/
  app/                  # Next.js App Router pages
    (dashboard)/        # Authenticated routes (shared layout)
    auth/               # Login/signup routes
    api/                # Route handlers (webhooks)
  components/
    ui/                 # shadcn/ui components
    layout/             # Application shell components
    {feature}/          # Feature-specific components
  hooks/                # Custom React hooks
  lib/                  # Utilities, DAL, server actions
  providers/            # React context providers
  services/             # External API clients
  types/                # TypeScript type definitions
```

## Naming Conventions

- Files: `kebab-case.ts` for utilities, `PascalCase.tsx` for components
- Hooks: `use-pascal-case.ts` or just `use-name.ts`
- Server Actions: grouped by domain in `lib/actions/{domain}.ts`
- Database queries: grouped in `lib/queries/{domain}.ts`

## Error Handling

Every Server Function must:
1. Verify auth (call `verifySession`)
2. Verify org membership
3. Validate input with Zod
4. Wrap DB operations in try/catch
5. Return typed errors (not throw)

## Loading States

Every page must have:
- `loading.tsx` — skeleton/loading UI
- `error.tsx` — error boundary
- `not-found.tsx` — 404 UI

## Accessibility

- All buttons need `aria-label` if icon-only
- All forms have proper `<label>` associations
- Color contrast ratios meet WCAG AA
- Focus-visible styles on all interactive elements
- Keyboard navigation supported
