# ListView — Component

**Version:** 4.0 · **Updated:** 2026-04-17  
**Figma Section:** `04 – ListView Component`  
**COMPONENT_SET node:** `4592:2597`  
**Section node:** `4592:2598`

---

## ⛔ Search the library BEFORE creating ListView

ListView uses sub-components (Checkbox, Toggle) from the Design System. Always find and import them rather than rebuilding.

```js
// Find checkbox in library before adding to rows
figma_get_library_components({ libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0", query: "Check box" })
figma_get_library_components({ libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0", query: "Toggle" })

// Local fallback for each sub-component
async function findComp(name) {
  for (const page of figma.root.children) {
    await figma.setCurrentPageAsync(page);
    const f = page.findOne(n => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') && n.name.toLowerCase().includes(name.toLowerCase()));
    if (f) return f;
  }
  return null;
}
const checkboxSet = await findComp('Check box');
const toggleSet   = await findComp('Toggle');
```

---

## ⚠️ HARD RULE — Token Usage (No Exceptions)

> **Every color applied in Figma MUST be bound to a Figma library variable via `figma.variables.setBoundVariableForPaint()`.  
> Hardcoded hex values (e.g. `#FFFFFF`), raw `{r,g,b}` objects, or magic numbers are NEVER acceptable in component plugin code.**

Correct pattern — bind fills/strokes to library variables:
```js
// 1. Retrieve the library variable by its known ID
const varObj = await figma.variables.getVariableByIdAsync('VariableID:575:273');

// 2. Create a bound paint (the variable provides the actual color value)
const paint = figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r:0, g:0, b:0 } }, // base paint (color is overridden by variable)
  'color',
  varObj
);

// 3. Apply to any node
node.fills = [paint];
```

All variable IDs are documented in `list-view-config.json → figmaVariables`.

---

## Overview

A single `ListView` COMPONENT_SET with **9 variants** (3 row counts × 3 column counts) and **4 boolean properties** to toggle optional columns on/off per instance.

---

## Properties

### Variant properties
| Property  | Values          | Controls                                   |
|-----------|-----------------|--------------------------------------------|
| `Rows`    | `3` · `5` · `8` | Number of data rows shown                  |
| `Columns` | `4` · `7` · `10`| Column count; `10` enables horizontal scroll |

`Columns=4` → base columns only (680px)  
`Columns=7` → base + Status, Active, Actions (980px)  
`Columns=10` → all columns, viewport clips at 980px with horizontal scrollbar (1422px content)

### Component properties (BOOLEAN — bound to column visibility)
| Property        | Applies to     | Column shown/hidden             |
|-----------------|----------------|---------------------------------|
| `Show Checkbox` | Columns=10     | 52px checkbox column (left)     |
| `Show Tag`      | Columns=7, 10  | Status badge column             |
| `Show Toggle`   | Columns=7, 10  | Active toggle column            |
| `Show Actions`  | Columns=7, 10  | Actions column (↺ ✕)           |

When a boolean is turned **off** on an instance, the column collapses completely (header + all data rows) without breaking auto-layout.

---

## Column structure

### Columns=4 (680px)
`Name (220)` · `Type (140)` · `Date (180)` · `Value (140)`

### Columns=7 (980px)
`Name (220)` · `Type (140)` · `Date (180)` · `Value (140)` · `Status (130)` · `Active (80)` · `Actions (90)`

### Columns=10 (1422px content, 980px viewport — horizontal scroll)
`Checkbox (52)` · `Name (220)` · `Type (140)` · `Date (180)` · `Value (140)` · `Category (130)` · `Priority (110)` · `Modified (150)` · `Status (130)` · `Active (80)` · `Actions (90)`

---

## Row states

| Row index | State    | Token                              | Value                  |
|-----------|----------|------------------------------------|------------------------|
| Row 0     | Hover    | `semantic.light.feedback.hover`    | `#2C66DD` at 15% opacity |
| Row 2     | Selected | `semantic.light.sideNavHover`      | `#E0E6F4`              |
| All others| Default  | `semantic.light.background.default`| `#FFFFFF`              |

No alternating row colors. All rows use `background.default` except the hover and selected examples.

---

## Reused components

| Component     | Set node    | Variant used              |
|---------------|-------------|---------------------------|
| `Check box`   | `2608:6618` | `Check=No` and `Check=Yes` |
| `Toggle button` | `2608:5686` | `On` and `Off` variants  |

No custom-drawn controls — always use `createInstance()` from existing components.

---

## Design tokens used

All fills and strokes in the component are **bound to Figma library variables**. The variable IDs below are the authoritative references.

| Property         | Figma Variable Name                        | Variable ID              | Value      |
|------------------|--------------------------------------------|--------------------------|------------|
| Row default bg   | `ZA/Background/BG-Primary-Default`         | `VariableID:575:273`     | `#FFFFFF`  |
| Row hover bg     | `Hover`                                    | `VariableID:2168:2208`   | blue tint  |
| Row selected bg  | `Side nave bar bg`                         | `VariableID:3933:2566`   | `#E0E6F4`  |
| Header bg        | `ZA/Background/BG-Primary-Subtle`          | `VariableID:575:275`     | `#F5F7F9`  |
| Row divider      | `ZA/stroke/Stroke 1`                       | `VariableID:579:41`      | `#DFE4EB`  |
| Text primary     | `ZA/Text/Text Primary`                     | `VariableID:575:276`     | `#0C0E11`  |
| Text secondary   | `ZA/Text/Text Description`                 | `VariableID:575:277`     | `#3D4653`  |
| Scroll track     | `ZA/Background/BG-Primary-Raised`          | `VariableID:592:38`      | `#EBEFF3`  |
| Scroll thumb     | `Color/Neutral/Tint/Neutral 40`            | `VariableID:572:3687`    | `#A0ADBF`  |
| Badge fill       | `Color/Base/White`                         | `VariableID:189:170`     | `#FFFFFF`  |
| Badge — Running  | `Color/Accent Colors/Blue`                 | `VariableID:187:160`     | `#2C66DD`  |
| Badge — Passed   | `Color/Accent Colors/Green`                | `VariableID:189:168`     | `#0C8844`  |
| Badge — Failed   | `Color/Accent Colors/Red`                  | `VariableID:189:167`     | `#CC3929`  |
| Badge — Pending  | `Color/Accent Colors/Yellow`               | `VariableID:189:169`     | `#EBB625`  |
| Font primary     | —                                          | —                        | `Zoho Puvi` (fallback: `Lato`) |
| Body text size   | —                                          | —                        | `13px`     |
| Cell padding H   | —                                          | —                        | `16px`     |
| Badge radius     | —                                          | —                        | `9999px`   |

---

## How to use

1. Go to section **"04 – ListView Component"** on the `⭕️ - UI` page.
2. Drag an **instance** of `ListView` onto your screen frame.
3. In the right panel:
   - `Rows` → choose `3`, `5`, or `8` data rows.
   - `Columns` → choose `4` (base), `7` (with optional cols), or `10` (all + horizontal scroll).
   - Toggle `Show Checkbox` / `Show Tag` / `Show Toggle` / `Show Actions` to show or hide those columns. Hiding collapses the column width automatically.
