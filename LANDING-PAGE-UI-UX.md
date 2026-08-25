# Landing Page UI/UX

This document describes the visual language, component behavior, content hierarchy, accessibility rules, and test expectations for the landing page.

The page is a small Material Design 3-inspired link hub. It is intentionally focused: one identity block, one link list, and a quiet footer. New UI should preserve this simplicity.

## Experience Goals

- Make the identity immediately clear on first view.
- Give every external destination a consistent, touch-friendly target.
- Keep the visual language aligned with the portfolio repository.
- Use motion as feedback and orientation, not decoration.
- Remain usable on narrow screens, keyboard navigation, touch devices, and reduced-motion settings.

## Page Structure

```text
body
├── #loading
├── main.profile
│   ├── img.avatar
│   ├── p.eyebrow
│   ├── h1
│   └── p.role
├── nav.links
│   └── a × 5
└── footer
```

The page must keep one clear `h1`. The link list belongs inside a labelled `nav`, and all destinations are real anchors rather than JavaScript-only buttons.

## Design Tokens

The token values mirror the portfolio's Material 3 foundation layer.

| Token | Value | Usage |
| --- | --- | --- |
| `--primary` | `#b9c5ff` | Accent text, avatar border, focus ring, loading indicator |
| `--on-primary` | `#101b4d` | Content placed on primary surfaces |
| `--primary-container` | `#29366d` | Hover state for link controls |
| `--on-primary-container` | `#e0e5ff` | Text on primary-container surfaces |
| `--secondary` | `#c5c5d0` | Supporting tonal value |
| `--surface` | `#111318` | Page background |
| `--surface-container` | `#1d1e24` | Link control background |
| `--surface-variant` | `#45464f` | Loading track and supporting surface |
| `--on-surface` | `#e4e1e9` | Primary text |
| `--on-surface-variant` | `#c5c5d0` | Supporting text and footer |
| `--outline` | `#8f9099` | Available outline token for future controls |
| `--radius-sm` | `0.75rem` | Small controls if added later |
| `--radius-md` | `1rem` | Medium containers if added later |
| `--radius-lg` | `1.75rem` | Avatar shape |
| `--shadow-1` | `0 2px 8px #0005` | Link hover elevation |
| `--shadow-2` | `0 12px 32px #0006` | Avatar elevation |

### Typography

- Body font: `DM Sans`, with system fallback.
- Heading font: `Space Grotesk`, with system fallback.
- Eyebrow: `0.75rem`, bold, uppercase, `0.1em` letter spacing, primary color.
- Name: responsive `clamp(1.5rem, 4.5vw, 2.1rem)`, bold, `1.2` line height.
- Supporting role: `0.9rem`, on-surface-variant color.
- Footer: `0.75rem`, on-surface-variant color.

If the Google Fonts request fails, the page must remain readable with the declared fallback fonts.

## Components

### Loading Overlay

**Selector:** `#loading`

The loading overlay is only visible while the document is loading. It is centered in the viewport and contains a `Loading` label plus a circular indicator.

Behavior:

- The indicator rotates linearly at `0.75s` per cycle.
- The indicator uses `--primary` for the active arc and `--surface-variant` for the track.
- On `window.load`, the overlay fades to `opacity: 0` over `150ms` and is removed after the fade.
- The overlay must not remain in the document after page load.

Do not add a long entrance animation to the page while the loader is visible. The loader is feedback for document readiness, not a branded splash screen.

### Profile Block

**Selector:** `.profile`

The profile is the page's primary content group. It is centered, constrained to `420px`, and uses a small vertical gap between elements.

Current content hierarchy:

1. `AWS Certified · DevOps Engineer`
2. `Akhmad Prasetya Atmanegara`
3. `Cloud AI & Automation · Vibe Coder`

Keep this hierarchy concise. Do not reintroduce a long marketing paragraph or a multi-line greeting unless the link list is moved below the fold intentionally.

### Avatar

**Selector:** `.avatar`

- Source: `saya.png`.
- Accessible name: `Portrait of Akhmad Prasetya Atmanegara`.
- Size: `9rem` square with `aspect-ratio: 1`.
- Crop: `object-fit: cover`.
- Shape: `--radius-lg` rounded square, not a circle.
- Border: `2px solid var(--primary)`.
- Elevation: `--shadow-2`.

On pointer devices, hovering raises the avatar by `2px`. This is optional decoration and must not be the only indication that the image is interactive. The avatar is not currently a link.

### Eyebrow

**Selector:** `.eyebrow`

The eyebrow is a supporting label, not a heading. It identifies the professional role before the name and uses the primary color to establish the page accent.

The current text is `AWS Certified · DevOps Engineer`. Keep it short enough to wrap cleanly on a `320px` viewport.

### Name Heading

**Selector:** `.profile h1`

The name is the only page heading and must remain a normal text heading for screen readers. Avoid rendering the name through pseudo-elements or an image.

The `.accent` class is available for selective primary-color emphasis, but the current simplified profile does not use it. Do not add color variation unless it improves hierarchy without reducing readability.

### Role Summary

**Selector:** `.role`

The role summary is intentionally short: `Cloud AI & Automation · Vibe Coder`. It uses the supporting text color and has no decorative divider lines. Keep it visually subordinate to the name.

### Link Control

**Selector:** `.links a`

Each link is a full-width M3-inspired tonal control:

- Minimum height: `3rem`.
- Horizontal padding: `1.25rem`.
- Background: `var(--surface-container)`.
- Text: `var(--on-surface)`.
- Border: `1px solid #8f909955`.
- Shape: pill with `2rem` radius.
- Label: `0.92rem`, semibold.
- Gap between links: `var(--space-2)`.
- Maximum list width: `400px`.

Current destinations:

| Label | Destination | Opens |
| --- | --- | --- |
| Instagram | `https://instagram.com/leftprazz` | New tab |
| Web Portfolio | `https://portfolio.akhmadprasetya.com` | New tab |
| GitHub | `https://github.com/leftprazz` | New tab |
| LinkedIn | `https://www.linkedin.com/in/akhmadprasetya27/` | New tab |
| Stream Last Voice — Spotify, iTunes, etc | `https://songwhip.com/lastvoice` | New tab |

Every external link must use `target="_blank"` and `rel="noopener noreferrer"`. Use descriptive visible labels. Do not add back the removed game link without an explicit content decision.

### Link States

| State | Behavior |
| --- | --- |
| Default | Surface-container background, outline border, on-surface text |
| Hover | Primary-container background, primary border, on-primary-container text, `--shadow-1`, `translateY(-1px)` |
| Pressed | `scale(0.97)` for immediate tactile feedback |
| Keyboard focus | `3px solid var(--primary)` outline with `3px` offset |
| Touch | No hover-only styling is applied on touch devices |
| Disabled | Not currently supported; do not simulate disabled links with opacity |

The arrow indicator is hidden by default and gently moves into view on pointer hover. It is `aria-hidden` because the visible link label already communicates the destination.

### Footer

**Selector:** `footer`

The footer is intentionally quiet and uses supporting text color. The year is populated from `new Date().getFullYear()` so it does not become stale.

Do not increase footer contrast or add competing navigation unless the page grows beyond the current link-hub scope.

## Motion System

Motion is short, interruptible where possible, and subordinate to content.

| Animation | Trigger | Motion | Timing |
| --- | --- | --- | --- |
| Profile entrance | Initial render | `translateY(0.65rem)` + opacity to visible | `400ms`, custom ease-out |
| Avatar entrance | Initial render | `scale(0.96)` + small upward movement to full size | `500ms`, custom ease-out |
| Link entrance | Initial render | `translateY(0.65rem)` + opacity to visible | `400ms`, delays from `120ms` to `360ms` |
| Footer entrance | Initial render | Opacity fade | `400ms`, `550ms` delay |
| Avatar hover | Pointer hover | `translateY(-2px)` | `160ms`, custom ease-out |
| Link hover | Pointer hover | Small lift, state color, shadow, arrow reveal | `160-250ms`, custom ease-out |
| Link press | Pointer or touch press | `scale(0.97)` | `160ms`, custom ease-out |

Rules:

- No perpetual or looping decorative animation is used.
- No element enters from `scale(0)`.
- The page does not animate layout properties such as width, height, margin, or padding.
- Hover styles are wrapped in `(hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion: reduce` removes movement from entrance animations and shortens transitions to opacity-focused changes.

## Responsive Behavior

- Minimum supported width: `320px`.
- The body uses `min-height: 100svh` and can scroll vertically when content exceeds the viewport.
- Horizontal overflow is prevented without globally hiding overflow on every element.
- Profile width is capped at `420px`; link list width is capped at `400px`.
- Long link labels wrap naturally and remain inside their pill controls.
- The page remains centered on desktop and mobile.
- Test at `320px`, `375px`, `768px`, `1024px`, and `1440px` widths when making layout changes.

## Accessibility Contract

- Keep `lang="en"` and the responsive viewport meta tag.
- Keep one semantic `h1` containing the person's name.
- Keep descriptive avatar alt text.
- Keep the link list in `nav[aria-label="Social and project links"]`.
- Use anchors for navigation and external destinations.
- Preserve visible keyboard focus indicators.
- Do not communicate meaning with color alone.
- Respect `prefers-reduced-motion`.
- Ensure text remains readable if users zoom or increase text size.
- Keep touch targets at least `48px` high; the current links are `3rem` high before text wrapping.

## Testing Contract

Run the full browser suite with:

```bash
npx playwright test
```

The suite in `tests/e2e.spec.js` covers:

- Page title, profile name, role label, and avatar visibility.
- Removal of the old game link.
- Loading overlay removal after page load.
- All five link URLs, targets, and `noopener` protection.
- GitHub popup navigation.
- Link entrance completion.
- Current footer year.
- No horizontal overflow and visible links at a `375px` viewport.

Any change to profile content, link destinations, loading behavior, or responsive structure should update the relevant e2e assertion in the same change.

## Change Guidelines

Before adding a component, ask:

1. Does it clarify the page's identity or help users reach a destination?
2. Can it use the existing tokens and link-control states?
3. Does it fit the single-screen link-hub scope on mobile?
4. Does it need motion, and can the interaction work without it?
5. Is its keyboard, touch, reduced-motion, and external-link behavior covered by tests?

Prefer small changes that preserve the current hierarchy over adding more content or visual effects.
