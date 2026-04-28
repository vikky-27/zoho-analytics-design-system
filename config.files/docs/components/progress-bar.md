# Progress Bar Component — Zoho Analytics Design System

> **Config:** `tokens/components/progress-bar-config.json`  
> **Figma Source:** [Design System – Zoho Analytics](https://www.figma.com/design/m2iOWX3I9aDI5kgyw4wCo0/Design-System--Zoho-Analytics)  
> **Component Set ID:** `5057:1581`  
> **Page:** `🟠 - Components`  
> **Total Variants:** `6`

---

## Variant Matrix

| Size \ State | Default | Success | Error |
|---|---|---|---|
| **Small** | `5057:1569` | `5057:1571` | `5057:1573` |
| **Medium** | `5057:1575` | `5057:1577` | `5057:1579` |

---

## Component Selection — Hard Rules

### 0. ⛔ Search the library BEFORE creating this component

```js
// Local search on components page
const page = figma.root.children.find(p => p.name === '    🟠 - Components');
await figma.setCurrentPageAsync(page);
const existing = page.findOne(
  n => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') &&
       n.name.toLowerCase().includes('progress bar')
);
// → Found? Use existing component set (id: 5057:1581)
```

---

### 1. Component pick rules — MUST follow

| Rule | ✅ Do | ❌ Never |
|------|-------|---------|
| **Source** | Instantiate from existing component set | Build with `figma.createFrame()` |
| **Colors** | Use token-bound fills (accent colors + background.raised) | Hardcode hex values |
| **Fill width** | Resize the `fill` child rectangle to represent percentage | Set fill with opacity |
| **State** | Set via `setProperties({ "State": "Success" })` | Directly recolor child fill |

---

### 2. Anatomy

```
Progress Bar (component)
├── fill         ← Rectangle: fill color per state, clipped by parent radius
```

The **track** is the component frame itself (background fill `#EBEFF3`). The **fill** is a child rectangle representing progress. The component uses `clipsContent: true` to clip the fill at the track edges.

---

### 3. Variant Axes

| Axis | Values | Notes |
|------|--------|-------|
| `Size` | `Small`, `Medium` | Small = 4px height · Medium = 8px height |
| `State` | `Default`, `Success`, `Error` | Controls fill color |

---

### 4. Sizes

| Size | Height | Track Radius | Fill Radius | Typical Width |
|------|--------|--------------|-------------|---------------|
| Small | `4px` | `2px` | `2px` | Container fill |
| Medium | `8px` | `4px` | `4px` | Container fill |

---

### 5. Token Map

| Property | Token Path | Hex Value |
|----------|-----------|-----------|
| Track background | `semantic.light.background.raised` | `#EBEFF3` |
| Fill — Default | `color.accent.blue` | `#2C66DD` |
| Fill — Success | `color.accent.green` | `#0C8844` |
| Fill — Error | `color.accent.red` | `#CC3929` |
| Track radius (Small) | `spacing.radius.XS` → 2px | `2px` |
| Track radius (Medium) | `spacing.radius.S` → 4px | `4px` |

---

### 6. Correct instantiation pattern

```js
// Switch to components page
const page = figma.root.children.find(p => p.id === '1500:1217');
await figma.setCurrentPageAsync(page);

// Find the Progress Bar component set
const componentSet = page.findOne(n => n.id === '5057:1581');

// Get a specific variant (Size=Medium, State=Default)
const variantComp = componentSet.children.find(c =>
  c.name === 'Size=Medium, State=Default'
);
const instance = variantComp.createInstance();
instance.resize(320, 8); // width = container, height stays 8px (Medium)

// To show 75% progress: resize the fill child
const fillChild = instance.children.find(c => c.name === 'fill');
// NOTE: detach is needed to resize an instance child directly
// Better: expose a progress % via component property if building new
```

---

### 7. Usage Guidelines

- **Width:** Always set the Progress Bar width to fill its container (`layoutSizingHorizontal = 'FILL'` when inside auto-layout). The progress percentage is represented by resizing the `fill` child.
- **Small (4px):** Use for dense UIs, table cells, inline indicators.
- **Medium (8px):** Use for standalone progress indicators, upload/download status.
- **Default → Success transition:** Animate fill width from current percentage to 100%, then swap state to `Success`.
- **Error state:** Use when the process has failed — fill color turns red to indicate failure.
- **Never use on dark backgrounds** without checking contrast. The track (`#EBEFF3`) is a light grey and may be invisible on light backgrounds — add a subtle stroke if needed.

---

### 8. Accessibility

- Always pair the progress bar with a visible label or `aria-label` indicating the action being measured.
- Provide a percentage text alongside the bar for screen reader support.
- Do not rely on color alone to communicate state — add an icon or text label for Success/Error.
