# Expand/Collapse Panel — Zoho Analytics Design System

> **Figma File:** `m2iOWX3I9aDI5kgyw4wCo0`
> **Page:** `🟠 - Components`
> **Component Set Node:** `4763:12843`
> **Token Config:** `tokens/components/expand-collapse-panel-config.json`

---

## Overview

An accordion-style panel used in settings and configuration screens. The panel has a clickable header row and a content area containing label-field rows. It supports four variation axes:

| Property | Type | Values |
|---|---|---|
| `State` | Variant | `Expanded` · `Collapsed` |
| `Icons` | Variant | `True` · `False` |
| `WithTooltip` | Boolean | `true` · `false` |
| `CheckWithLabel` | Boolean | `true` · `false` |

---

## Component Anatomy

```
Expand/Collapse Panel (COMPONENT_SET)
│
├── [State=Expanded,  Icons=True]   ← Chevron ▼ + title + content
├── [State=Expanded,  Icons=False]  ← Title only + content
├── [State=Collapsed, Icons=True]   ← Chevron ▶ + title
└── [State=Collapsed, Icons=False]  ← Title only

Each variant contains:
┌─────────────────────────────────────┐  ← PanelHeader (40px, grey bg)
│  ▼  Section Title                   │    - ChevronIcon (16×16, visible if Icons=True)
├─────────────────────────────────────┤    - SectionTitle text (Semi Bold 14px)
│  Label          [  FieldSlot  ]     │  ← LabelFieldRow (visible when expanded)
│  □ Show missing values              │  ← CheckLabelRow (visible if CheckWithLabel=true)
└─────────────────────────────────────┘
```

### Boolean Property Nodes

| Property | Node Controlled | Default |
|---|---|---|
| `WithTooltip` | `TooltipIcon` inside `LabelSide` | `false` (hidden) |
| `CheckWithLabel` | `CheckLabelRow` (entire row) | `false` (hidden) |

---

## Visual Spec

### Panel Container
| Property | Value | Token |
|---|---|---|
| Width | `320px` | Fixed |
| Corner radius | `6px` | `spacing.radius.SM` |
| Border | `1px solid #DFE4EB` | `color.neutral.tint90` |
| Shadow | `0 2px 6px rgba(0,0,0,0.06)` | — |
| Background | `#FFFFFF` | `color.base.white` |

### PanelHeader
| Property | Value | Token |
|---|---|---|
| Height | `40px` | Fixed |
| Background | `#EBEFF3` | `color.neutral.tint95` |
| Padding horizontal | `16px` | — |
| Gap (icon→title) | `8px` | — |
| Border bottom | `1px solid #DFE4EB` | `color.neutral.tint90` |
| Layout | HORIZONTAL · CENTER align | — |

### SectionTitle (header text)
| Property | Value | Token |
|---|---|---|
| Font | `Inter Semi Bold` | — |
| Size | `14px` | — |
| Color | `#252A32` | `color.neutral.shade80` |
| Sizing | FILL horizontal | — |

### Chevron Icon
| State | Icon | SVG path |
|---|---|---|
| Expanded | ▼ chevron-down | `M1 1L5 5L9 1` (10×6) |
| Collapsed | ▶ chevron-right | `M1 1L5 5L1 9` (6×10) |
| Color | `#556274` | `color.neutral.shade40` |
| Stroke width | `1.5px` | — |
| Frame size | `16×16` | — |

### PanelContent (expanded only)
| Property | Value | Token |
|---|---|---|
| Padding all | `14px` | — |
| Item spacing | `12px` | — |
| Background | `#FFFFFF` | `color.base.white` |
| Layout | VERTICAL · HUG height | — |

### LabelFieldRow
| Property | Value |
|---|---|
| Height | `32px` |
| Layout | HORIZONTAL · CENTER align |
| Gap (label→field) | `16px` |

### LabelSide
| Property | Value |
|---|---|
| Width | `120px` fixed |
| Layout | HORIZONTAL · CENTER align |
| Gap (text→tooltip) | `4px` |

### LabelText
| Property | Value | Token |
|---|---|---|
| Font | `Inter Regular` | — |
| Size | `13px` | — |
| Color | `#556274` | `color.neutral.shade40` |

### TooltipIcon (hidden by default)
| Property | Value | Token |
|---|---|---|
| Size | `14×14` | — |
| Type | SVG: circle + "?" path | — |
| Color | `#74859D` | `color.neutral.tint10` |
| Linked property | `WithTooltip` | BOOLEAN |

### FieldSlot
| Property | Value | Token |
|---|---|---|
| Height | `32px` | — |
| Corner radius | `4px` | — |
| Background | `#F5F7F9` | `color.neutral.tint100` |
| Border | `1px solid #D2D9E2` | `color.neutral.tint80` |
| Sizing | FILL horizontal | — |

### CheckLabelRow (hidden by default)
| Property | Value |
|---|---|
| Height | `20px` |
| Layout | HORIZONTAL · CENTER align |
| Gap (checkbox→text) | `8px` |
| Linked property | `CheckWithLabel` BOOLEAN |

### Checkbox (inside CheckLabelRow)
| Property | Value | Token |
|---|---|---|
| Size | `12×12` | — |
| Corner radius | `2px` | `spacing.radius.XS` |
| Border | `1px solid #556274` | `color.neutral.shade40` |
| Fill | transparent | — |

---

## Variant × State Matrix

| State | Icons | Node ID | Height | Content visible |
|---|---|---|---|---|
| `Expanded` | `True` | `4763:12777` | `100px` | ✅ Yes |
| `Expanded` | `False` | `4763:12795` | `100px` | ✅ Yes |
| `Collapsed` | `True` | `4763:12810` | `40px` | ❌ No |
| `Collapsed` | `False` | `4763:12828` | `40px` | ❌ No |

---

## Boolean Property Reference

### WithTooltip
When `true`, shows a `(?)` icon after the label text in any `LabelFieldRow`.

```
WithTooltip=false:   Label         [  FieldSlot  ]
WithTooltip=true:    Label  (?)    [  FieldSlot  ]
```

### CheckWithLabel
When `true`, reveals a `CheckLabelRow` below the standard `LabelFieldRow`. This row contains a checkbox + label combination — used for binary on/off settings like "Show missing values".

```
CheckWithLabel=false:   [LabelFieldRow only]

CheckWithLabel=true:    Label          [  FieldSlot  ]
                        □ Show missing values
```

---

## Usage Patterns

### 1. Standard label-field row (default state)
```
State=Expanded, Icons=True, WithTooltip=false, CheckWithLabel=false
```

### 2. Label with tooltip (help hint)
```
State=Expanded, Icons=True, WithTooltip=true, CheckWithLabel=false
```

### 3. Checkbox row (binary toggle)
```
State=Expanded, Icons=True, WithTooltip=false, CheckWithLabel=true
```

### 4. Full combination
```
State=Expanded, Icons=True, WithTooltip=true, CheckWithLabel=true
```

### 5. Collapsed without icon
```
State=Collapsed, Icons=False
```

---

## ⛔ Search the library BEFORE creating

```js
// Search for the component in the local file
const compPage = figma.root.children.find(p => p.name.includes('Components'));
await figma.setCurrentPageAsync(compPage);
const existing = compPage.findOne(n =>
  (n.type === 'COMPONENT_SET') && n.name === 'Expand/Collapse Panel'
);
```

---

## Instantiation Pattern (Figma Console MCP)

```js
// Get the component set from the local file
const compPage = figma.root.children.find(p => p.name.includes('🟠 - Components'));
await figma.setCurrentPageAsync(compPage);
const cs = await figma.getNodeByIdAsync('4763:12843');

// Pick a variant (Expanded + Icons)
const variant = cs.children.find(c => c.name === 'State=Expanded, Icons=True');
const instance = variant.createInstance();

// Set properties
instance.setProperties({
  'State':          'Expanded',
  'Icons':          'True',
  'WithTooltip':    true,
  'CheckWithLabel': false
});

// Place in a parent auto-layout frame
parentFrame.appendChild(instance);
instance.layoutSizingHorizontal = 'FILL';
```

---

## ⚠️ Hard Rules

| Rule | Detail |
|---|---|
| **Token binding** | All colors must be bound to variables via `setBoundVariableForPaint` — no hardcoded hex |
| **Sizing after append** | Set `layoutSizingHorizontal = 'FILL'` only AFTER `parent.appendChild(instance)` |
| **Sizing mode after resize** | Always set `primaryAxisSizingMode = 'AUTO'` AFTER calling `resize()` on the component |
| **Boolean props** | Toggle `WithTooltip` and `CheckWithLabel` via `instance.setProperties()`, not direct `visible` mutation |
| **Never rebuild** | Always instantiate from the component set — never build from scratch with `createFrame()` |
| **Collapsed state** | `PanelContent` is `visible=false` in Collapsed variants — do not force-show it |
