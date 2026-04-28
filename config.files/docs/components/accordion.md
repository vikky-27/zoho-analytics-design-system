# Accordion Component — Zoho Analytics Design System

> **Config:** `tokens/components/accordion-config.json`  
> **Figma Source:** [Design System – Zoho Analytics](https://www.figma.com/design/m2iOWX3I9aDI5kgyw4wCo0/Design-System--Zoho-Analytics)  
> **Component Set ID:** `4986:1488`  
> **Page:** `🟠 - Components`  
> **Total Variants:** `6`

---

## Component Selection — Hard Rules

### 0. ⛔ Search the library BEFORE creating this component

```js
// Published library search
figma_get_library_components({
  libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0",
  query: "Accordion"
})
// → Found? Use importComponentByKeyAsync("<variantKey>").createInstance()

// Local fallback
const page = figma.root.children.find(p => p.name === '    🟠 - Components');
await figma.setCurrentPageAsync(page);
const existing = page.findOne(
  n => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') &&
       n.name.toLowerCase().includes('accordion')
);
```

---

### 1. Component pick rules — MUST follow

| Rule | ✅ Do | ❌ Never |
|------|-------|---------|
| **Source** | Instantiate from the Design System library | Build with `figma.createFrame()` |
| **Colors** | Let component carry its own variable-bound fills | Overwrite fills after instantiation |
| **Properties** | Set via `setProperties({ "State": "Expanded" })` | Edit child text nodes directly |
| **ShowIcon** | Toggle via `setProperties({ "ShowIcon": true/false })` | Use `layer.visible = false` directly |

---

### 2. Correct instantiation pattern

```js
// Import the default variant (Collapsed, Default style)
const comp = await figma.importComponentByKeyAsync("<variantKey>");
const instance = comp.createInstance();

// Set variant properties
instance.setProperties({
  'State': 'Expanded',
  'Style': 'Default',
  'ShowIcon': true
});

// Set FILL width AFTER appending to an auto-layout parent
parent.appendChild(instance);
instance.layoutSizingHorizontal = 'FILL';
```

---

## Component Anatomy

```
┌──────────────────────────────────────────────────────────┐  h: 48   radius: 8
│  [> chevron 16×16]   [  Section Title (14px SemiBold)  ] │  padL: 16  padR: 16
└──────────────────────────────────────────────────────────┘  itemSpacing: 8

  ── When State=Expanded: ──
┌──────────────────────────────────────────────────────────┐  h: 48
│  [v chevron 16×16]   [  Section Title (14px SemiBold)  ] │
├──────────────────────────────────────────────────────────┤  h: 1px (divider)
│  Accordion content goes here.                            │  pad: 16 all sides
│                                                          │  gap: 12
└──────────────────────────────────────────────────────────┘
```

### Layer Structure

```
ComponentNode  "State=Collapsed, Style=Default"
├── Frame       "accordion--header"         HORIZONTAL · SPACE_BETWEEN · h=48 · padH=16
│   └── Frame   "accordion--header-left"    HORIZONTAL · gap=8 · FILL width · CENTER align
│       ├── Frame "accordion--chevron"      16×16 SVG chevron (linked to ShowIcon)
│       └── Text  "label--accordion-title"  FILL width · 14px Inter Semi Bold
│
[Expanded only:]
├── Frame       "accordion--divider"        FILL width · h=1
└── Frame       "accordion--content"        VERTICAL · pad=16 · gap=12 · FILL width · HUG height
    └── Text    "label--accordion-content"  FILL width · 14px Inter Regular
```

---

## Variant Axes

| Axis | Values |
|------|--------|
| `State` | `Collapsed` · `Expanded` · `Disabled` |
| `Style` | `Default` · `Bordered` |

### Variant Matrix

| State | Style | Height | Content Visible | Border |
|-------|-------|--------|-----------------|--------|
| Collapsed | Default  | 48px | ❌ | None |
| Expanded  | Default  | AUTO | ✅ | None |
| Disabled  | Default  | 48px | ❌ | None |
| Collapsed | Bordered | 48px | ❌ | 1px stroke2 |
| Expanded  | Bordered | AUTO | ✅ | 1px stroke2 |
| Disabled  | Bordered | 48px | ❌ | 1px stroke2 |

---

## Boolean Property

| Property | Type | Default | Controls |
|----------|------|---------|----------|
| `ShowIcon` | BOOLEAN | `true` | Chevron icon visibility in header |

```js
// Hide chevron
instance.setProperties({ 'ShowIcon': false });

// Show chevron (default)
instance.setProperties({ 'ShowIcon': true });
```

---

## Component Properties

| Property key | Type | Options |
|--------------|------|---------|
| `State` | `VARIANT` | `Collapsed` · `Expanded` · `Disabled` |
| `Style` | `VARIANT` | `Default` · `Bordered` |
| `ShowIcon#4986:6` | `BOOLEAN` | `true` = show chevron · `false` = hide |

---

## Style Hard Rules

| Rule | Detail |
|------|--------|
| **Height** | Never hardcode — header is always 48px, container hugs content |
| **Corner radius** | Always 8px → token `borderRadius.md` |
| **Padding** | Header: 16px horizontal → `spacing.padding.M` |
| **Content padding** | 16px all sides → `spacing.padding.M` |
| **Content gap** | 12px → `spacing.gap.M` |
| **Font** | `Inter Semi Bold` 14px for title; `Inter Regular` 14px for content |
| **Colors** | All fills/strokes are variable-bound — never override with raw hex |

---

## Color Token Reference

| Role | Variable Name | Variable ID | Hex |
|------|---------------|-------------|-----|
| Header bg (Default) | `ZA/Background/BG-Primary-Subtle` | `VariableID:575:275` | `#F5F7F9` |
| Header bg (Bordered) + Content bg | `ZA/Background/BG-Primary-Default` | `VariableID:575:273` | `#FFFFFF` |
| Title color (Default) | `ZA/Text/Text Primary` | `VariableID:575:276` | `#0C0E11` |
| Title color (Disabled) | `ZA/Text/Text Disabled` | `VariableID:575:278` | `#93A2B6` |
| Chevron + content text | `ZA/Text/Text Description` | `VariableID:575:277` | `#3D4653` |
| Border (Bordered style) | `ZA/stroke/Stroke 2` | `VariableID:579:42` | `#C6CED9` |
| Divider (Expanded) | `ZA/stroke/Stroke 1` | `VariableID:579:41` | `#DFE4EB` |

---

## Figma Variable Binding Pattern

```js
// Correct — bind via variable ID (never hardcode)
const varObj = await figma.variables.getVariableByIdAsync('VariableID:575:275');
const paint = figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
  'color',
  varObj
);
node.fills = [paint];
```

---

## Node IDs — Variant Reference

| State | Style | Component ID |
|-------|-------|-------------|
| `Collapsed` | `Default` | `4986:1446` |
| `Expanded`  | `Default` | `4986:1452` |
| `Disabled`  | `Default` | `4986:1461` |
| `Collapsed` | `Bordered` | `4986:1467` |
| `Expanded`  | `Bordered` | `4986:1473` |
| `Disabled`  | `Bordered` | `4986:1482` |

---

## Usage Notes

- **Default style:** Transparent container with subtle gray header. Use when stacking multiple accordions in a list — add a 1px `Stroke 1` bottom border to the outer container to separate items.
- **Bordered style:** White background with a 1px `Stroke 2` border on all sides. Use for standalone panels that need visual containment.
- **Expand/Collapse Panel** (`4763:12843`) is an existing similar component — prefer Accordion for general-purpose collapsible sections; use Expand/Collapse Panel for panel-style containers with icon counts.
- **Width:** Designed at 480px but intended to `layoutSizingHorizontal = 'FILL'` after appending to a parent auto-layout frame.
- **Height:** Never set a fixed height — always let content drive height via `primaryAxisSizingMode = 'AUTO'`.

---

## ⚠️ HARD RULE — No Hardcoded Values

> Every color applied in Figma MUST be bound to a Figma library variable via `figma.variables.setBoundVariableForPaint()`.  
> Hardcoded hex values, raw `{r,g,b}` objects, or magic numbers are NEVER acceptable.
