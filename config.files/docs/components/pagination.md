# Pagination Component — Zoho Analytics Design System

> **Config:** `tokens/components/pagination-config.json`  
> **Figma Source:** [Design System – Zoho Analytics](https://www.figma.com/design/m2iOWX3I9aDI5kgyw4wCo0/Design-System--Zoho-Analytics)  
> **Page:** `🟠 - Components`  
> **Codebase refs:** `zohoanalyticsclient/src/js/Pagination/PaginationUtils.js` · `src/scss/component/ZAPagination.scss`

---

## Component Overview

Three linked component sets make up the pagination system:

| Component Set | Figma Node ID | Variants | Purpose |
|---|---|---|---|
| `Pagination / Item` | `4993:1452` | 3 | Individual page number button |
| `Pagination / Nav` | `4993:1465` | 4 | Prev / Next arrow button |
| `Pagination / Bar` | `4998:1446` | 1 | Full assembled control row |

---

## Component 1 — Pagination / Item

### Variant Axes

| Axis | Values |
|------|--------|
| `State` | `Default` · `Active` · `Disabled` |

### Layout

| Property | Value |
|----------|-------|
| Width × Height | `32 × 32` (fixed) |
| Corner radius | `6px` |
| Padding | `4px` all sides |
| Align | Center × Center |
| Font | `Inter Semi Bold` · `12px` |

### State Colors

| State | Fill | Text | Stroke |
|-------|------|------|--------|
| `Default` | `ZA/Background/BG-Primary-Subtle` `#F5F7F9` | `ZA/Text/Text Primary` `#0C0E11` | `ZA/stroke/Stroke 2` `#C6CED9` |
| `Active` | `ZA/Button/Button Fill/Button Primary` `#2C66DD` | `Color/Base/White` `#FFFFFF` | None |
| `Disabled` | `ZA/Background/BG-Primary-Subtle` `#F5F7F9` | `ZA/Text/Text Disabled` `#93A2B6` | `ZA/stroke/Stroke 2` `#C6CED9` |

### Text Property

| Key | Type | Default |
|-----|------|---------|
| `PageNumber#4993:3` | TEXT | `"1"` |

### Node IDs

| State | Component ID |
|-------|-------------|
| `Default` | `4993:1446` |
| `Active` | `4993:1448` |
| `Disabled` | `4993:1450` |

### Instantiation

```js
// Get the active variant (page 3 selected)
const activeVariant = await figma.getNodeByIdAsync('4993:1448');
const instance = activeVariant.createInstance();
instance.setProperties({ 'PageNumber#4993:3': '3' });
```

---

## Component 2 — Pagination / Nav

### Variant Axes

| Axis | Values |
|------|--------|
| `State` | `Default` · `Disabled` |
| `IsNext` | `false` (← Prev) · `true` (→ Next) |

### Layout

| Property | Value |
|----------|-------|
| Width × Height | `32 × 32` (fixed) |
| Corner radius | `6px` |
| Padding | `8px` all sides |
| Icon size | `16 × 16` |

### Colors

| State | Fill | Chevron stroke | Container stroke |
|-------|------|----------------|-----------------|
| `Default` | `ZA/Background/BG-Primary-Subtle` | `ZA/Text/Text Primary` `#0C0E11` | `ZA/stroke/Stroke 2` `#C6CED9` |
| `Disabled` | `ZA/Background/BG-Primary-Subtle` | `ZA/Text/Text Disabled` `#93A2B6` | `ZA/stroke/Stroke 2` `#C6CED9` |

### Node IDs

| State | IsNext | Component ID |
|-------|--------|-------------|
| `Default` | `false` (Prev) | `4993:1453` |
| `Default` | `true` (Next) | `4993:1456` |
| `Disabled` | `false` (Prev) | `4993:1459` |
| `Disabled` | `true` (Next) | `4993:1462` |

### Instantiation

```js
// Prev button (default state)
const prevComp = await figma.getNodeByIdAsync('4993:1453');
const prevInst = prevComp.createInstance();

// Next button (disabled state)
const nextDisComp = await figma.getNodeByIdAsync('4993:1462');
const nextDisInst = nextDisComp.createInstance();
```

---

## Component 3 — Pagination / Bar

### Boolean Properties

| Property | Key | Default | Controls |
|----------|-----|---------|----------|
| `ShowFirstLast` | `ShowFirstLast#4998:1` | `false` | Shows `|\u2190` first-page and `\u2192|` last-page buttons |
| `ShowPageSize` | `ShowPageSize#4998:2` | `true` | Shows "Rows per page: 10 ▼" dropdown section |

### Text Properties

| Layer name | Default text | Description |
|-----------|--------------|-------------|
| `label--pagination-showing` | `Showing 1 - 10 of 50` | Update with live pagination data |

### Layout & Anatomy

```
┌────────────────────────────────────────────────────────────────────────────────┐ h: 48  radius: 8
│  [|←] [←]  [1] [2̲] [3] [4] [5]  [→] [→|]  ─────spacer─────  Showing 1-10 of 50  Rows per page: [10▼] │
└────────────────────────────────────────────────────────────────────────────────┘
      ↑ ShowFirstLast=true shows these              ↑ ShowPageSize=false hides this
```

**Layer structure:**
```
ComponentNode  "Pagination / Bar"  HORIZONTAL · AUTO width · 48px height · gap=4 · padH=16
├── Frame     "pagination--first-btn"   32×32 · visible=ShowFirstLast (hidden by default)
├── Instance  "pagination--nav-prev"    32×32  →  Pagination/Nav  State=Default, IsNext=false
├── Instance  "pagination--item-1"      32×32  →  Pagination/Item State=Default  (text: "1")
├── Instance  "pagination--item-2"      32×32  →  Pagination/Item State=Active   (text: "2")
├── Instance  "pagination--item-3"      32×32  →  Pagination/Item State=Default  (text: "3")
├── Instance  "pagination--item-4"      32×32  →  Pagination/Item State=Default  (text: "4")
├── Instance  "pagination--item-5"      32×32  →  Pagination/Item State=Default  (text: "5")
├── Instance  "pagination--nav-next"    32×32  →  Pagination/Nav  State=Default, IsNext=true
├── Frame     "pagination--last-btn"    32×32 · visible=ShowFirstLast (hidden by default)
├── Frame     "pagination--spacer"      FILL × 32 (pushes info to the right)
├── Text      "label--pagination-showing"  "Showing 1 - 10 of 50"  12px Regular
└── Frame     "pagination--page-size"   AUTO × 32 · visible=ShowPageSize
    ├── Text      "Rows per page:"  12px Regular
    └── Instance  "pagination--dropdown"  100×32
                  → Input component · States=Default, Show Right Option=Yes, Right Options=Arrow
                  → Source: component set 1512:1567, variant 1512:1568
                  → Text property key: "Input Text#807:10" = "10"
```

> **⚠️ Dropdown rule:** The page-size selector MUST use the existing `Input` component (variant `States=Default, Right Options=Arrow`, id `1512:1568`). Never build a custom mock frame for this slot.

### Instantiation

```js
// Instantiate bar
const barComp = await figma.getNodeByIdAsync('4998:1446');
const inst = barComp.createInstance();

// Toggle booleans
inst.setProperties({
  'ShowPageSize':  true,
  'ShowFirstLast': false,
});

// Update "Showing X - Y of Z" text
const showingLabel = inst.findOne(n => n.name === 'label--pagination-showing');
if (showingLabel) {
  await figma.loadFontAsync(showingLabel.fontName);
  showingLabel.characters = 'Showing 21 - 30 of 120';
}

// Update page-size dropdown value (uses real Input component inside)
// The dropdown is nested: inst → pagination--page-size → pagination--dropdown (Input instance)
const ddInst = inst.findOne(n => n.name === 'pagination--dropdown');
if (ddInst) {
  // setProperties with the Input component's text key
  ddInst.setProperties({ 'Input Text#807:10': '25' });
}

// FILL width after appending to auto-layout parent
parent.appendChild(inst);
inst.layoutSizingHorizontal = 'FILL';
```

> The `pagination--dropdown` instance is an `Input` component (id `1512:1568`) — to swap the page size value, update `'Input Text#807:10'` via `setProperties()` on that nested instance.

---

## Color Token Reference

| Role | Variable Name | Variable ID | Hex |
|------|---------------|-------------|-----|
| Subtle bg (Default/Disabled items + Nav) | `ZA/Background/BG-Primary-Subtle` | `VariableID:575:275` | `#F5F7F9` |
| White bg (Bar surface) | `ZA/Background/BG-Primary-Default` | `VariableID:575:273` | `#FFFFFF` |
| Active item fill | `ZA/Button/Button Fill/Button Primary` | `VariableID:577:38` | `#2C66DD` |
| Active text | `Color/Base/White` | `VariableID:189:170` | `#FFFFFF` |
| Default text | `ZA/Text/Text Primary` | `VariableID:575:276` | `#0C0E11` |
| Disabled text + chevron | `ZA/Text/Text Disabled` | `VariableID:575:278` | `#93A2B6` |
| Showing / label text | `ZA/Text/Text Description` | `VariableID:575:277` | `#3D4653` |
| Button border | `ZA/stroke/Stroke 2` | `VariableID:579:42` | `#C6CED9` |

---

## Codebase Context

From `PaginationUtils.js`:

| Concept | Detail |
|---------|--------|
| Page size options | `10, 25, 50, 100` |
| Showing pattern | `"Showing {start} - {end} of {total}"` |
| Pagination threshold | Only shows when total rows `> 10` |
| Prev arrow | SVG rotated `-90°` (chevron-down → left) |
| Next arrow | SVG rotated `+90°` (chevron-down → right) |
| Dropdown width | `75px` |

---

## Style Hard Rules

| Rule | Detail |
|------|--------|
| **Button size** | Always `32 × 32` — never override |
| **Corner radius** | Always `6px` on item/nav buttons |
| **Active fill** | Always `ZA/Button/Button Fill/Button Primary` — never raw `#2C66DD` |
| **Text** | `Inter Semi Bold 12px` on item numbers; `Inter Regular 12px` on info text |
| **Bar height** | Fixed at `48px`; width fills parent via `layoutSizingHorizontal = 'FILL'` |
| **Booleans** | Set `ShowFirstLast` / `ShowPageSize` via `setProperties()` — never `layer.visible` directly |

---

## ⚠️ HARD RULE — No Hardcoded Values

> Every fill/stroke MUST be bound to a Figma library variable via `setBoundVariableForPaint()`.  
> No raw hex values, no `{r,g,b}` literals, no magic pixel values.
