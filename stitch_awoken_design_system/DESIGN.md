---
name: Warm Professionalism
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#584237'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#8c7164'
  outline-variant: '#e0c0b1'
  surface-tint: '#9d4300'
  primary: '#9d4300'
  on-primary: '#ffffff'
  primary-container: '#f97316'
  on-primary-container: '#582200'
  inverse-primary: '#ffb690'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#006398'
  on-tertiary: '#ffffff'
  tertiary-container: '#00a2f4'
  on-tertiary-container: '#003554'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#ffb690'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#783200'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#cde5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d32'
  on-tertiary-fixed-variant: '#004b74'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style

The design system is centered on a "warm premium" aesthetic, bridging the gap between clinical software and editorial elegance. It targets a professional audience that values clarity, depth, and a high degree of craftsmanship. By utilizing a layered architectural approach inspired by modern high-end interfaces, the system creates a sense of physical presence and digital permanence.

The visual style is a blend of **Modern Minimalism** and **Tactile Layering**. It moves away from flat design by using subtle tonal shifts and intentional shadow depth to communicate hierarchy. The emotional response is one of calm, reliability, and precision, achieved through a sophisticated "off-white" foundation and strategic pops of energetic orange.

## Colors

The palette is built on a foundation of warm neutrals that provide more character than standard grays. 

- **Primary Orange (#F97316):** Used exclusively for high-intent actions, active states, and critical feedback. It acts as a lighthouse in a sea of neutrals.
- **Surface Hierarchy:** The depth is defined by a progression from the darkest background to the lightest foreground:
  - Base: App Background (#F4F2EC)
  - Level 1: Sidebar (#F8F6F1)
  - Level 2: Main Content Area (#FCFBF8)
  - Level 3: Floating Elements/Cards (#FFFFFF)
- **Typography:** Deep charcoal (#171717) provides maximum legibility for headings, while muted grays (#525252 and #737373) handle the secondary and tertiary information architecture.

## Typography

This design system utilizes a multi-font strategy to balance character with utility. 

**Manrope** is used for headings to provide a modern, balanced, and slightly geometric personality. **Inter** handles the bulk of the body text for its systematic neutrality and exceptional legibility at small sizes. **JetBrains Mono** is introduced sparingly for metadata and labels to reinforce the "technical/precise" feel of the system.

Scale headings down for mobile viewports using the provided mobile tokens. Maintain tight letter spacing on display type to preserve the premium, high-density look.

## Layout & Spacing

The layout follows a **Fluid Grid** model with strict adherence to an 8px spacing rhythm. This ensures a mathematical harmony across all components.

- **Desktop:** 12-column grid, 24px gutters, and 40px side margins.
- **Tablet:** 8-column grid, 20px gutters, and 24px side margins.
- **Mobile:** 4-column grid, 16px gutters, and 16px side margins.

Content should be grouped using logical spacing containers. The 24px (`md`) unit is the default for internal card padding and element grouping. Larger 64px (`xl`) gaps are used to separate major sections of the page.

## Elevation & Depth

Depth is the defining characteristic of this design system. It is achieved through three specific techniques:

1.  **Tonal Stacking:** Objects physically "closer" to the user are lighter in color.
2.  **Layered Shadows:** Instead of a single shadow, use a dual-layer approach. A tight, low-opacity shadow (1px) provides definition, while a soft, diffused shadow (24px) provides the lift.
    - *Shadow Token:* `0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.06)`
3.  **Defined Borders:** Every surface transition is reinforced with a `#DDD7CC` border. On hover, increase the border contrast or add a subtle primary-colored glow to interactive elements.

## Shapes

The shape language is disciplined and consistent. The system uses a **Rounded (8px)** base to strike a balance between friendly and professional. 

- **Standard Elements:** 8px (`rounded-md`) for buttons, inputs, and small cards.
- **Large Containers:** 16px (`rounded-lg`) for main content areas or modal wrappers.
- **Full Rounding:** Only used for tags, chips, or circular icons.

Avoid sharp corners entirely to maintain the approachable, premium feel.

## Components

### Buttons
- **Primary:** Background `#F97316`, Text `#FFFFFF`. Bold weight. 8px radius.
- **Secondary:** Background `#FFFFFF`, Border `1px solid #DDD7CC`, Text `#171717`.
- **Tertiary:** No background or border. Text `#525252`. Hover state shifts to `#171717`.

### Cards
Cards are the primary vehicle for content. They must use the `#FFFFFF` background, the defined layered shadow, and a `1px solid #DDD7CC` border to separate them from the `#FCFBF8` surface.

### Input Fields
Inputs should feel "inset" or deeply grounded. Use the Sidebar background color (`#F8F6F1`) for the field fill with a `#DDD7CC` border. On focus, the border should transition to the Primary Orange.

### Chips & Badges
Use the neutral `#F4F2EC` background with `JetBrains Mono` labels. Active or "selected" chips should utilize a subtle tint of the primary color or a solid orange dot indicator.

### Sidebar Navigation
The sidebar uses the `#F8F6F1` background. Active navigation items should be indicated by a vertical orange pill (4px wide) on the far left and a slight shift in text weight to semi-bold.