# Tokens: Spacing — Zoho Analytics Design System

> **File:** `foundations/tokens-spacing.json`
> **Role:** Defines radius, shadow, padding, gap, and border-width values for Desktop (L), Tablet (M), and Mobile (S) breakpoints. All values reference the base spacing scale in `primitives.json`.

---

## Breakpoints

| Mode | Key | Target device |
|------|-----|---------------|
| Desktop | `Desktop/L` | Desktop / large screen |
| Tablet | `Tab/M` | Tablet / medium screen |
| Mobile | `Mobile/S` | Mobile / small screen |

---

## Radius

| Token | Desktop/L | Tab/M | Mobile/S | Primitive ref |
|-------|-----------|-------|----------|---------------|
| `Radius.XS` | `2` | `2` | `2` | `Spacing.2` |
| `Radius.S` | `4` | `4` | `4` | `Spacing.#4` |
| `Radius.M` | `8` | `8` | `8` | `Spacing.#8` |
| `Radius.L` | `12` | `12` | `12` | `Spacing.#12` |
| `Radius.XL` | `16` | `16` | `16` | `Spacing.#16` |
| `Radius.2XL` | `24` | `24` | `24` | `Spacing.#24` |
| `Radius.3XL` | `32` | `32` | `32` | `Spacing.#32` |
| `Radius.4XL` | `40` | `40` | `40` | `Spacing.#40` |
| `Radius.Radius-ICON` | `1` | `1` | `1` | `Spacing.#1` |

> **Component reference:** Corner radius tokens are used via `{Spacing System.Radius.M}` etc.

---

## Drop Shadow Blur

| Token | All Breakpoints | Primitive ref |
|-------|----------------|---------------|
| `DropShadow.S` | `4` | `Spacing.#4` |
| `DropShadow.M` | `8` | `Spacing.#8` |
| `DropShadow.L` | `12` | `Spacing.#12` |
| `DropShadow.XL` | `16` | `Spacing.#16` |

---

## Padding / Gap / Spacing Scale

| Token | Desktop/L | Tab/M | Mobile/S | Primitive ref |
|-------|-----------|-------|----------|---------------|
| `XXXS` | `2` | `2` | `1` | `Spacing.2` / `Spacing.#1` |
| `XXS` | `4` | `4` | `2` | `Spacing.#4` / `Spacing.2` |
| `XS` | `8` | `8` | `4` | `Spacing.#8` / `Spacing.#4` |
| `S` | `12` | `12` | `8` | `Spacing.#12` / `Spacing.#8` |
| `M` | `16` | `16` | `12` | `Spacing.#16` / `Spacing.#12` |
| `L` | `24` | `24` | `24` | `Spacing.#24` |
| `XL` | `32` | `32` | `32` | `Spacing.#32` |
| `2XL` | `40` | `40` | `40` | `Spacing.#40` |

---

## Gap Scale

| Token | Desktop/L | Tab/M | Mobile/S |
|-------|-----------|-------|----------|
| `Gap.xS` | `2` | `4` | `2` |
| `Gap.S` | `4` | `8` | `4` |
| `Gap.M` | `8` | `12` | `8` |
| `Gap.L` | `12` | `16` | `12` |
| `Gap.XL` | `12` | `16` | `12` |

---

## Border Width

| Token | All Breakpoints | Primitive ref |
|-------|----------------|---------------|
| `Width.M` | `1` | `Spacing.#1` |
| `Width.L` | `2` | `Spacing.2` |

---

## Quick Reference — Common Component Values

| Use Case | Token | Value (Desktop) |
|----------|-------|----------------|
| Input / Button corner radius | `Radius.M` | `8` |
| Card corner radius | `Radius.XL` | `16` |
| Small badge radius | `Radius.S` | `4` |
| Icon corner radius | `Radius.Radius-ICON` | `1` |
| Button horizontal padding | `Padding.S` | `12` |
| Card padding | `Padding.L` | `24` |
| Inline gap between elements | `Gap.M` | `8` |
| Section gap between groups | `Gap.L` | `12` |
| Border / stroke width | `Width.M` | `1` |
| Shadow blur (cards) | `DropShadow.M` | `8` |
