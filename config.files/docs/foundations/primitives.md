# Primitives — Zoho Analytics Design System

> **File:** `foundations/primitives.json`
> **Role:** Base-level color and spacing values. All semantic tokens in `token-colors.json` and `accent-colors.json` reference values defined here.

---

## Structure Overview

```
Primititives
└── Mode 1
    ├── Color
    │   ├── Accent Colors    → Blue, Red, Green, Yellow (+ Shades, Tints, Hover, Tap)
    │   ├── Base             → White, Black, Shades (Greys), Tints
    │   ├── Other Zoho Color → Brand palette (Burgundy, Sapphire, Teal, Jade …)
    │   └── Neutral          → Neutral base + Shades + Tints
    └── Spacing              → 1 · 2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40
```

---

## Accent Colors

### Blue
| Token | Hex | Usage |
|-------|-----|-------|
| `Color.Accent Colors.Blue` | `#2C66DD` | Primary brand color — buttons, links, focus rings |
| **Shades** | | |
| `…Blue.Shades.Blue 10` | `#225CCF` | |
| `…Blue.Shades.Blue 20` | `#1E52BB` | |
| `…Blue.Shades.Blue 30` | `#1B49A6` | Hover state (light mode) |
| `…Blue.Shades.Blue 40` | `#184091` | Disabled dark mode |
| `…Blue.Shades.Blue 50` | `#14377C` | |
| `…Blue.Shades.Blue 60` | `#112E68` | |
| `…Blue.Shades.Blue 70` | `#0E2553` | |
| `…Blue.Shades.Blue 80` | `#0A1B3E` | |
| `…Blue.Shades.Blue 90` | `#071229` | |
| `…Blue.Shades.Blue 100` | `#030915` | |
| **Tints** | | |
| `…Blue.Tints.Blue 10` | `#376EDF` | |
| `…Blue.Tints.Blue 20` | `#4276E0` | |
| `…Blue.Tints.Blue 30` | `#5685E4` | Hover state (dark mode) |
| `…Blue.Tints.Blue 40` | `#6B94E7` | |
| `…Blue.Tints.Blue 50` | `#80A3EB` | Disabled light mode |
| `…Blue.Tints.Blue 60` | `#96B3EE` | |
| `…Blue.Tints.Blue 70` | `#ABC2F1` | |
| `…Blue.Tints.Blue 80` | `#C0D1F5` | |
| `…Blue.Tints.Blue 90` | `#D5E0F8` | |
| `…Blue.Tints.Blue 100` | `#EAF0FC` | |
| **Interactive** | | |
| `…Hover.Blue H` | `#1E51B8` | Button hover (light) |
| `…Tap.Blue T` | `#6A92E5` | Button tap/press |
| `Color.Accent Colors.Blue 20` | `#2C66DD33` | Hover overlay (use only on hover) |

### Red
| Token | Hex | Usage |
|-------|-----|-------|
| `Color.Accent Colors.Red` | `#CC3929` | Error, destructive actions |
| `…Hover.Red H` | `#A12D20` | Red button hover |
| `…Tap.Red T` | `#DA7367` | Red button tap |
| `Color.Accent Colors.Red 20` | `#CC392933` | Red hover overlay |

### Green
| Token | Hex | Usage |
|-------|-----|-------|
| `Color.Accent Colors.Green` | `#0C8844` | Success, positive states |
| `…Hover.Green H` | `#08592D` | Green button hover |
| `…Tap.Green T` | `#53AA7A` | Green button tap |
| `Color.Accent Colors.Green 20` | `#0C884433` | Green hover overlay |

### Yellow
| Token | Hex | Usage |
|-------|-----|-------|
| `Color.Accent Colors.Yellow` | `#EBB625` | Warning, caution |
| `…Hover.Yellow H` | `#C99812` | Yellow button hover |
| `…Tap.Yellow T` | `#EFCA65` | Yellow button tap |
| `Color.Accent Colors.Yellow 20` | `#EBB62533` | Yellow hover overlay |

---

## Base Colors

### White & Black
| Token | Hex |
|-------|-----|
| `Color.Base.White` | `#FFFFFF` |
| `Color.Base.Black` | `#000000` |
| `Color.Base.White 20` | `#FFFFFF33` |

### Grey Shades (Light → Dark)
| Token | Hex |
|-------|-----|
| `Color.Base.Shades.Grey 00` | `#F5F5F5` |
| `Color.Base.Shades.Grey 05` | `#E9E9E9` |
| `Color.Base.Shades.Grey 10` | `#DCDCDC` |
| `Color.Base.Shades.Grey 20` | `#C4C4C4` |
| `Color.Base.Shades.Grey 30` | `#ABABAB` |
| `Color.Base.Shades.Grey 40` | `#939393` |
| `Color.Base.Shades.Grey 50` | `#7A7A7A` |
| `Color.Base.Shades.Grey 60` | `#626262` |
| `Color.Base.Shades.Grey 70` | `#494949` |
| `Color.Base.Shades.Grey 80` | `#313131` |
| `Color.Base.Shades.Grey 90` | `#181818` |
| `Color.Base.Shades.Grey 100` | `#0C0C0C` |

### Grey Tints (Dark → Light)
| Token | Hex |
|-------|-----|
| `Color.Base.Tint.Grey 00` | `#07080A` |
| `Color.Base.Tint.Grey 10` | `#202123` |
| `Color.Base.Tint.Grey 20` | `#39393B` |
| `Color.Base.Tint.Grey 30` | `#525354` |
| `Color.Base.Tint.Grey 40` | `#6A6B6C` |
| `Color.Base.Tint.Grey 50` | `#838485` |
| `Color.Base.Tint.Grey 60` | `#9C9C9D` |
| `Color.Base.Tint.Grey 70` | `#B5B5B6` |
| `Color.Base.Tint.Grey 80` | `#CDCECE` |
| `Color.Base.Tint.Grey 90` | `#E7E7E7` |
| `Color.Base.Tint.Grey 100` | `#F2F2F3` |

---

## Neutral Colors

### Base + Shades
| Token | Hex |
|-------|-----|
| `Color.Neutral.Neutral color` | `#7A8CA5` |
| `Color.Neutral.Shades.Neutral 10` | `#74859D` |
| `Color.Neutral.Shades.Neutral 20` | `#6E7E94` |
| `Color.Neutral.Shades.Neutral 30` | `#627084` |
| `Color.Neutral.Shades.Neutral 40` | `#556274` |
| `Color.Neutral.Shades.Neutral 50` | `#495463` |
| `Color.Neutral.Shades.Neutral 60` | `#3D4653` |
| `Color.Neutral.Shades.Neutral 70` | `#313842` |
| `Color.Neutral.Shades.Neutral 80` | `#252A32` |
| `Color.Neutral.Shades.Neutral 90` | `#181C21` |
| `Color.Neutral.Shades.Neutral 95` | `#0C0E11` |

### Tints (Light → Lighter)
| Token | Hex |
|-------|-----|
| `Color.Neutral.Tint.Neutral 10` | `#8092A9` |
| `Color.Neutral.Tint.Neutral 20` | `#8797AE` |
| `Color.Neutral.Tint.Neutral 30` | `#93A2B6` |
| `Color.Neutral.Tint.Neutral 40` | `#A0ADBF` |
| `Color.Neutral.Tint.Neutral 50` | `#ACB8C8` |
| `Color.Neutral.Tint.Neutral 60` | `#B9C3D1` |
| `Color.Neutral.Tint.Neutral 70` | `#C6CED9` |
| `Color.Neutral.Tint.Neutral 80` | `#D2D9E2` |
| `Color.Neutral.Tint.Neutral 90` | `#DFE4EB` |
| `Color.Neutral.Tint.Neutral 95` | `#EBEFF3` |
| `Color.Neutral.Tint.Neutral 100` | `#F5F7F9` |

---

## Other Zoho Brand Colors

| Name | Hex | | Name | Hex |
|------|-----|-|------|-----|
| Burgundy | `#821F1F` | | Teal | `#06AED0` |
| Maroon | `#A41D1E` | | Spurge | `#00D096` |
| Crimson | `#E42527` | | Jade | `#02B55C` |
| Persimmon | `#E65000` | | Shamrock | `#049949` |
| Flamingo | `#DA3949` | | Laurel | `#2F7D31` |
| Ceris | `#DA2C6F` | | Parsely | `#13601F` |
| Plum | `#993399` | | Olive | `#999900` |
| Charoite | `#663399` | | Sunshine | `#F9B21D` |
| Sugilite | `#6200EA` | | Clay | `#9A6633` |
| Indigo | `#3119D4` | | Lapis | `#003ADD` |
| Sapphire | `#085CF3` | | Cornflower | `#2D78FF` |
| Brunnera | `#0B97FF` | | Cerulean | `#008EE0` |

---

## Spacing Scale

| Token | Value | Common Use |
|-------|-------|------------|
| `Spacing.#1` | `1` | Border widths, hairlines |
| `Spacing.2` | `2` | Micro gaps, XS radius |
| `Spacing.#4` | `4` | XXS padding, S radius |
| `Spacing.#8` | `8` | XS padding, M radius |
| `Spacing.#12` | `12` | S padding, L radius |
| `Spacing.#16` | `16` | M padding, XL radius |
| `Spacing.#20` | `20` | — |
| `Spacing.#24` | `24` | L padding, 2XL radius |
| `Spacing.#32` | `32` | XL padding, 3XL radius |
| `Spacing.#40` | `40` | 2XL padding, 4XL radius |
