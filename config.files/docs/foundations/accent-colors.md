# Accent Colors — Zoho Analytics Design System

> **File:** `foundations/accent-colors.json`
> **Role:** Maps interactive states (Default, Hover, Tap, Disabled) for each accent color (Blue, Red, Green, Yellow). These are the tokens consumed directly by component definitions.

---

## Structure Overview

```
Accent Colors
├── Blue    → 7 state tokens
├── Green   → 7 state tokens
├── Red     → 7 state tokens
└── Yellow  → 7 state tokens
```

Each accent color exposes the same 7 state tokens:

| Token Name | Usage |
|------------|-------|
| `Accent Color` | Default fill (resting state) |
| `Accent Hover state Light` | Hover fill in light mode |
| `Accent Hover state Dark` | Hover fill in dark mode |
| `Tap state` | Pressed/active fill |
| `Disabled Light` | Disabled fill in light mode |
| `Disabled Dark` | Disabled fill in dark mode |
| `Other Hover` | Semi-transparent hover overlay |

---

## Blue Accent

> Primary brand accent — used for CTA buttons, links, focus rings, active states.

| Token | Resolves To | Hex |
|-------|-------------|-----|
| `Accent Colors.Blue.Accent Color` | `Color.Accent Colors.Blue` | `#2C66DD` |
| `Accent Colors.Blue.Accent Hover state Light` | `Color.Accent Colors.Blue.Shades.Blue 30` | `#1B49A6` |
| `Accent Colors.Blue.Accent Hover state Dark` | `Color.Accent Colors.Blue.Tints.Blue 30` | `#5685E4` |
| `Accent Colors.Blue.Tap state` | `Color.Accent Colors.Blue.Tints.Blue 20` | `#4276E0` |
| `Accent Colors.Blue.Disabled Light` | `Color.Accent Colors.Blue.Tints.Blue 50` | `#80A3EB` |
| `Accent Colors.Blue.Disabled Dark` | `Color.Accent Colors.Blue.Shades.Blue 40` | `#184091` |
| `Accent Colors.Blue.Other Hover` | `Color.Accent Colors.Blue 20` | `#2C66DD33` |

---

## Red Accent

> Used for error states, destructive buttons, and warning badges.

| Token | Resolves To | Hex |
|-------|-------------|-----|
| `Accent Colors.Red.Accent Color` | `Color.Accent Colors.Red` | `#CC3929` |
| `Accent Colors.Red.Accent Hover state Light` | `Color.Accent Colors.Red.Shades.Blue 30` | `#95291D` |
| `Accent Colors.Red.Accent Hover state Dark` | `Color.Accent Colors.Red.Tints.Blue 30` | `#D66154` |
| `Accent Colors.Red.Tap state` | `Color.Accent Colors.Red.Tints.Blue 20` | `#D14D3F` |
| `Accent Colors.Red.Disabled Light` | `Color.Accent Colors.Red.Tints.Blue 50` | `#E0887F` |
| `Accent Colors.Red.Disabled Dark` | `Color.Accent Colors.Red.Shades.Blue 50` | `#6F1F16` |
| `Accent Colors.Red.Other Hover` | `Color.Accent Colors.Red 20` | `#CC392933` |

---

## Green Accent

> Used for success states, confirmation actions, and positive indicators.

| Token | Resolves To | Hex |
|-------|-------------|-----|
| `Accent Colors.Green.Accent Color` | `Color.Accent Colors.Green` | `#0C8844` |
| `Accent Colors.Green.Accent Hover state Light` | `Color.Accent Colors.Green.Shades.Blue 30` | `#096633` |
| `Accent Colors.Green.Accent Hover state Dark` | `Color.Accent Colors.Green.Tints.Blue 30` | `#3DA069` |
| `Accent Colors.Green.Tap state` | `Color.Accent Colors.Green.Tints.Blue 20` | `#249457` |
| `Accent Colors.Green.Disabled Light` | `Color.Accent Colors.Green.Tints.Blue 50` | `#6DB88F` |
| `Accent Colors.Green.Disabled Dark` | `Color.Accent Colors.Green.Shades.Blue 50` | `#074F28` |
| `Accent Colors.Green.Other Hover` | `Color.Accent Colors.Green 20` | `#0C884433` |

---

## Yellow Accent

> Used for warning states, caution badges, and pending indicators.

| Token | Resolves To | Hex |
|-------|-------------|-----|
| `Accent Colors.Yellow.Accent Color` | `Color.Accent Colors.Yellow` | `#EBB625` |
| `Accent Colors.Yellow.Accent Hover state Light` | `Color.Accent Colors.Yellow.Shades.Blue 30` | `#B98D11` |
| `Accent Colors.Yellow.Accent Hover state Dark` | `Color.Accent Colors.Yellow.Tints.Blue 30` | `#EFC551` |
| `Accent Colors.Yellow.Tap state` | `Color.Accent Colors.Yellow.Tints.Blue 20` | `#EDBD3B` |
| `Accent Colors.Yellow.Disabled Light` | `Color.Accent Colors.Yellow.Tints.Blue 50` | `#F3D37C` |
| `Accent Colors.Yellow.Disabled Dark` | `Color.Accent Colors.Yellow.Shades.Blue 50` | `#906D0D` |
| `Accent Colors.Yellow.Other Hover` | `Color.Accent Colors.Yellow 20` | `#EBB62533` |

---

## State Color Matrix

| State | Blue | Red | Green | Yellow |
|-------|------|-----|-------|--------|
| **Default** | `#2C66DD` | `#CC3929` | `#0C8844` | `#EBB625` |
| **Hover Light** | `#1B49A6` | `#95291D` | `#096633` | `#B98D11` |
| **Hover Dark** | `#5685E4` | `#D66154` | `#3DA069` | `#EFC551` |
| **Tap** | `#4276E0` | `#D14D3F` | `#249457` | `#EDBD3B` |
| **Disabled Light** | `#80A3EB` | `#E0887F` | `#6DB88F` | `#F3D37C` |
| **Disabled Dark** | `#184091` | `#6F1F16` | `#074F28` | `#906D0D` |
| **Hover Overlay** | `#2C66DD33` | `#CC392933` | `#0C884433` | `#EBB62533` |

---

## Usage Guide

```
Button resting   → Accent Color
Button hover     → Accent Hover state Light (or Dark)
Button pressed   → Tap state
Button disabled  → Disabled Light (or Dark)
Row hover bg     → Other Hover (semi-transparent overlay)
```
