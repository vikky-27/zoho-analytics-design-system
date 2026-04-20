# Token Colors — Zoho Analytics Design System

> **File:** `foundations/token-colors.json`
> **Role:** Semantic color tokens for Light and Dark modes. These reference primitive values from `primitives.json`. Use these tokens in components — never reference primitives directly in component code.

---

## Structure Overview

```
Token: Colors
├── Light    → All semantic colors for light mode
└── Dark     → All semantic colors for dark mode
```

---

## Light Mode

### Background

| Token | Resolved Hex | Usage |
|-------|-------------|-------|
| `BG-Primary-Default` | `#FFFFFF` | Main page/canvas background (Explorer, Settings) |
| `BG-Primary-Grey` | `#F5F5F5` | Alternate grey background |
| `BG-Primary-Subtle` | `#F5F7F9` | Subtle surface (cards, panels) |
| `BG-Primary-Raised` | `#EBEFF3` | Elevated surfaces |

### Text

| Token | Resolved Hex | Usage |
|-------|-------------|-------|
| `Text Primary` | `#0C0E11` | Main body text, labels |
| `Text Description` | `#3D4653` | Secondary text, descriptions |
| `Text Disabled` | `#93A2B6` | Disabled text |
| `Text Placeholder` | `#93A2B6` | Input placeholder text |
| `Text On AccentColor` | `#FFFFFF` | Text on colored buttons/badges |

### Button Fill

| Token | Resolved Hex | Usage |
|-------|-------------|-------|
| `Button Primary` | accent color | Primary button background |
| `Primary Disabled` | accent tint 50% | Disabled primary button |
| `Secondary Disabled` | `#F5F7F9` | Disabled secondary button |
| `Secondary` | `#E7E7E7` | Secondary button background |
| `Input Fill` | `#FFFFFF` | Input field background |
| `Accent Hover` | accent shade 30% | Primary button on hover |
| `ON OFF` | `#A0ADBF` | Toggle off state |
| `ON OFF Disabled` | `#C6CED9` | Toggle disabled |

### Button Stroke

| Token | Resolved Hex | Usage |
|-------|-------------|-------|
| `Secondary` | `#494949` | Secondary button border |
| `Secondary Disabled` | `#494949` | Disabled secondary button border |

### Stroke

| Token | Resolved Hex | Usage |
|-------|-------------|-------|
| `Stroke 1` | `#DFE4EB` | Subtle dividers |
| `Stroke 2` | `#D2D9E2` | Standard borders |
| `Stroke 3` | `#C6CED9` | Input borders, stronger dividers |
| `Stroke Disabled` | `#D2D9E2` | Disabled input/component borders |

### Card

| Token | Resolved Hex | Usage |
|-------|-------------|-------|
| `BG-Primary` | `#FFFFFF` | Default card background |
| `BG-Primary 2` | `#F5F7F9` | Alternate card background |
| `BG-Primary 3` | `#F5F5F5` | Grey card background |
| `BG-Primary 4` | `#EBEFF3` | Raised card background |

### Other Light Tokens

| Token | Resolved Hex | Usage |
|-------|-------------|-------|
| `Error` | `#CC3929` | Error states, destructive actions |
| `Always White` | `#FFFFFF` | White in both modes |
| `Text Link` | `#006AFF` | Hyperlinks |
| `Link Disabled` | `#66A6FF` | Disabled link |
| `Hover` | `#2C66DD33` | Hover overlay on elements |
| `Tooltip` | `#252A32` | Tooltip background |
| `Side nav bar bg` | — | Sidebar background |
| `Side bar BG hove` | `#E0E6F4` | Sidebar item hover |
| `Dropshadow S` | `#181C210A` | Small shadow |
| `Dropshadow M` | `#181C210F` | Medium shadow |
| `Dropshadow L` | `#181C2114` | Large shadow |

---

## Dark Mode

### Background

| Token | Resolved Hex | Usage |
|-------|-------------|-------|
| `BG-Primary-Default` | `#0C0E11` | Main dark canvas |
| `BG-Primary-Grey` | `#07080A` | Alternate dark background |
| `BG-Primary-Subtle` | `#181C21` | Subtle dark surface |
| `BG-Primary-Raised` | `#0C0E11` | Elevated dark surface |

### Text

| Token | Resolved Hex | Usage |
|-------|-------------|-------|
| `Text Primary` | `#FFFFFF` | Main body text |
| `Text Description` | `#556274` | Secondary text |
| `Text Disabled` | `#556274` | Disabled text |
| `Text Placeholder` | `#C6CED9` | Input placeholder |
| `Text On AccentColor` | `#0C0E11` | Text on colored buttons in dark mode |

### Button Fill

| Token | Resolved Hex | Usage |
|-------|-------------|-------|
| `Button Primary` | accent color | Primary button background |
| `Primary Disabled` | accent shade 40% | Disabled primary button |
| `Secondary Disabled` | `#181C21` | Disabled secondary button |
| `Secondary` | `#181C21` | Secondary button background |
| `Input Fill` | `#0C0E11` | Dark input field background |
| `Accent Hover` | accent tint 30% | Primary button hover (dark) |
| `ON OFF` | `#556274` | Toggle off (dark) |
| `ON OFF Disabled` | `#313842` | Toggle disabled (dark) |

### Button Stroke

| Token | Resolved Hex | Usage |
|-------|-------------|-------|
| `Secondary` | `#C4C4C4` | Secondary button border (dark) |
| `Secondary Disabled` | `#C4C4C4` | Disabled secondary border (dark) |

### Stroke

| Token | Resolved Hex | Usage |
|-------|-------------|-------|
| `Stroke 1` | `#252A32` | Subtle dividers (dark) |
| `Stroke 2` | `#313842` | Standard borders (dark) |
| `Stroke 3` | `#3D4653` | Input borders (dark) |
| `Stroke Disabled` | `#3D4653` | Disabled borders (dark) |

### Card

| Token | Resolved Hex | Usage |
|-------|-------------|-------|
| `BG-Primary` | `#181C21` | Default card (dark) |
| `BG-Primary 2` | `#252A32` | Alternate card (dark) |
| `BG-Primary 3` | `#181C21` | Grey card (dark) |
| `BG-Primary 4` | `#0C0E11` | Raised card (dark) |

### Other Dark Tokens

| Token | Resolved Hex | Usage |
|-------|-------------|-------|
| `Error` | `#CC3929` | Error (same in both modes) |
| `Always White` | `#FFFFFF` | Always white |
| `Text Link` | `#00A6FF` | Hyperlinks (dark) |
| `Link Disabled` | `#006499` | Disabled link (dark) |
| `Hover` | `#FFFFFF33` | Hover overlay (dark) |
| `Tooltip` | `#DFE4EB` | Tooltip background (dark) |
| `Dropshadow S` | `#313842` | Small shadow (dark) |
| `Dropshadow M/L` | `#181C21` | Large shadow (dark) |

---

## Light vs Dark Quick Comparison

| Property | Light | Dark |
|----------|-------|------|
| Page background | `#FFFFFF` | `#0C0E11` |
| Card background | `#FFFFFF` | `#181C21` |
| Primary text | `#0C0E11` | `#FFFFFF` |
| Secondary text | `#3D4653` | `#556274` |
| Input fill | `#FFFFFF` | `#0C0E11` |
| Input stroke | `#C6CED9` | `#3D4653` |
| Link color | `#006AFF` | `#00A6FF` |
| Error | `#CC3929` | `#CC3929` |
