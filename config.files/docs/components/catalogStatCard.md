# Catalog Stat Card — Zoho Analytics

> **File:** `components/catalog-stat-card-config.json`
> **Figma Source:** [Catalog file — Search page](https://www.figma.com/design/bHcUW9bq4nglzklB5ohK0v/Catalog?node-id=2787-5662)
> **Original Figma node:** `2787:5662` (Catalog file — reference only)
> **Local Component Set ID:** `12:686` · **Type:** `COMPONENT_SET`
> **Variants:** `Content=Default` · `Content=No Icon` · `Content=No Text`
> Instantiate with `figma_instantiate_component` using the variant's `componentKey` + `nodeId`

---

## ⛔ Search the library BEFORE creating this component

```js
figma_get_library_components({ libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0", query: "Catalog" })
figma_get_library_components({ libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0", query: "Stat" })
// Local fallback:
const existing = await page.findOne(n => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') && (n.name.toLowerCase().includes('catalog') || n.name.toLowerCase().includes('stat')));
if (existing) { const inst = existing.type === 'COMPONENT_SET' ? existing.children[0].createInstance() : existing.createInstance(); }
```

---

## Component Screenshot

![Catalog Stat Card](https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c60ab0bc-337e-4e04-9c62-15b2bd730693)

*Purple-themed card: count "42" + label "Columns" on the left, white circle with table icon on the right.*

---

## Component Selection & Pick — Hard Rules

### 1. Source and availability

| Variant | `Content=` value | nodeId | componentKey |
|---------|------------------|--------|--------------|
| Default (text + icon) | `Default` | `12:656` | `de380317a1205c2dba8a1a40127d1cab927245f1` |
| No Icon (text only) | `No Icon` | `12:666` | `80781bcfcfc562a4b4a02ef79a1c256852c550cc` |
| No Text (icon only) | `No Text` | `12:676` | `8d5a40b8e202375a86877b80e18414ad62fee853` |

> This is a **local COMPONENT_SET** (ID: `12:686`) — built directly in your working file. It is NOT in the shared Design System library.

**Instantiate Default variant:**
```
figma_instantiate_component({ componentKey: "de380317a1205c2dba8a1a40127d1cab927245f1", nodeId: "12:656" })
```

### 2. How to read the exported JSON
| JSON Field | What it means | How to use it |
|------------|---------------|---------------|
| `dimensions.width` | Natural width `338.25` — fill container | Use `FILL` sizing horizontally |
| `dimensions.height` | Fixed height `88` | Always `88px` — never change |
| `cornerRadius` | `6` | Set on the outer frame |
| `fills[].color.hex` | `#F1EAF8` — lavender background | Set as solid fill on outer frame |
| `strokes[].color.hex` | `#B399CC` — purple border | Set as inside stroke, weight `1` |
| `effects[].color.hex` | `#B399CC` at `40%` — drop shadow | `DROP_SHADOW`, offset `(0, 4)`, radius `0` |
| `children.countLabel.children.count` | Large number text | Dynamic — use actual data value |
| `children.countLabel.children.label` | Category label text | Dynamic — "Columns", "Tables", etc. |
| `children.iconCircle` | White `48×48` circle with `20×20` icon | Always white circle, icon centered |

### 3. Component pick rules — MUST follow
| Rule | ✅ Do | ❌ Never |
|------|-------|---------|
| **Build method** | `figma.createFrame()` with exact token values | Use `figma_instantiate_component` (no key exists) |
| **Height** | Always `88px` fixed | Resize height |
| **Width** | Fill parent container (`FILL` layout sizing) | Hardcode a pixel width |
| **Background** | `#F1EAF8` — lavender only for this category | Use a different background color without a new variant |
| **Count text** | Zoho Puvi Semibold 22px, black `#000000` | Change font or weight |
| **Label text** | Zoho Puvi Regular 14px, black `#000000` | Change font size |
| **Icon circle** | Always white `#FFFFFF`, 48×48, ellipse | Change circle color or size |
| **Icon size** | Always `20×20` inside the `48×48` circle | Scale the icon differently |
| **Shadow** | Purple shadow at 40% opacity — always visible | Remove the shadow |
| **Corner radius** | Always `6` | Set any other radius value |

---

## Component Anatomy

```
┌───────────────────────────────────────────────────────────────┐  h:88  radius:6
│  fill: #F1EAF8   stroke: #B399CC (inside, w:1)               │
│  shadow: #B399CC 40% opacity, offset (0,4)                   │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  Inner Row  [layout: horizontal, space-between, ⊥ center, gap: 12]  │
│  │  padding: 9 left, 13 right, 20 top, 20 bottom         │   │
│  │                                                       │   │
│  │  ┌──────────────────┐            ┌─────────────────┐  │   │
│  │  │  Count Stack     │            │  Icon Circle    │  │   │
│  │  │  [layout: vertical, gap:12]  │  [48×48 circle] │  │   │
│  │  │                  │            │  fill: #FFFFFF  │  │   │
│  │  │  "42"            │            │                 │  │   │
│  │  │  Semibold 22px   │            │  ┌──────────┐   │  │   │
│  │  │  #000000         │            │  │ TableIcon│   │  │   │
│  │  │                  │            │  │  20×20   │   │  │   │
│  │  │  "Columns"       │            │  └──────────┘   │  │   │
│  │  │  Regular 14px    │            │                 │  │   │
│  │  │  #000000         │            └─────────────────┘  │   │
│  │  └──────────────────┘                                  │   │
│  └────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────┘
```

---

## Visual Properties

### Container (outer frame)

| Property | Value | Token reference |
|----------|-------|----------------|
| Width | `338.25` (FILL) | — |
| Height | `88` (FIXED) | — |
| Corner radius | `6` | — |
| Fill | `#F1EAF8` | `Color.Catalog.Purple.Background` |
| Stroke | `#B399CC`, weight `1`, inside | `Color.Catalog.Purple.Stroke` |
| Shadow | `#B399CC` at `40%` opacity, offset `(0,4)`, blur `0` | `Color.Catalog.Purple.Shadow` |
| Clips content | `true` | — |

### Inner row frame

| Property | Value |
|----------|-------|
| Layout | Horizontal, SPACE_BETWEEN, center-aligned |
| Item spacing | `12` |
| Padding top | `20` |
| Padding bottom | `20` |
| Padding left | `9` |
| Padding right | `13` |
| Width | `316` (FIXED) |
| Height | HUG |

### Count text

| Property | Value | Token reference |
|----------|-------|----------------|
| Font | `Zoho Puvi` | — |
| Style | `Semibold` | — |
| Weight | `600` | — |
| Size | `22px` | — |
| Line height | `24px` | — |
| Leading trim | `CAP_HEIGHT` | — |
| Color | `#000000` | `Color.Base.Black` |
| Content | Dynamic — actual count number | — |

### Label text

| Property | Value | Token reference |
|----------|-------|----------------|
| Font | `Zoho Puvi` | — |
| Style | `Regular` | — |
| Weight | `400` | — |
| Size | `14px` | — |
| Line height | `24px` | — |
| Leading trim | `CAP_HEIGHT` | — |
| Color | `#000000` | `Color.Base.Black` |
| Content | Dynamic — category name | — |

### Icon circle

| Property | Value | Token reference |
|----------|-------|----------------|
| Shape | Ellipse | — |
| Width × Height | `48 × 48` | — |
| Fill | `#FFFFFF` | `Color.Base.White` |
| Stroke | None | — |
| Icon frame size | `20 × 20` | — |
| Icon position | Centered inside ellipse | — |

### Table icon (inside circle)

| Part | Property | Value |
|------|----------|-------|
| Header row | Rectangle fill | `#FFD494` (warm yellow) |
| Header row | Size | `17.5 × 6.25` |
| Grid lines | Stroke color | `#000000` |
| Grid lines | Stroke weight | `1.25` |
| Grid lines | Corner radius | `1.25` |
| Outer border | Stroke color | `#000000` |
| Outer border | Stroke weight | `1.25` |
| Outer border | Corner radius | `1.25` |
| Outer border | Size | `18.75 × 18.75` |

---

## Variants

This component currently has **1 documented variant** (Columns / Table icon with purple theme). Additional variants may exist in the Catalog file for different data types.

| Variant | Label | Icon | Background | Stroke |
|---------|-------|------|------------|--------|
| **Columns** (documented) | "Columns" | Table grid | `#F1EAF8` (lavender) | `#B399CC` (purple) |
| Tables | "Tables" | Table/database | TBD — follow purple palette | TBD |
| Rows | "Rows" | List / rows | TBD | TBD |
| Custom | Any | Any 20×20 icon | TBD | TBD |

> For additional variants, open the Catalog Figma file and inspect sibling frames near node `2787:5662`.

---

## Instantiation (Figma Console MCP)

The component is already built in your working file. Use it like any other component:

```js
// Instantiate from your local working file
const instance = await figma_instantiate_component({
  componentKey: "9af8f00eb13fff5e71e70d8601a3609c8557fb08",
  nodeId: "12:561"
});
instance.x = 32;
instance.y = 200;
// Set the dynamic text values
instance.setProperties({
  "Count": "18",
  "Label": "Tables"
});
```

---

## Build from Scratch (if rebuilding the component)

If the component needs to be recreated:

```js
async function createCatalogStatCard(parentId, options = {}) {
  const {
    count  = "42",
    label  = "Columns",
    x      = 0,
    y      = 0
  } = options;

  // Load fonts
  await figma.loadFontAsync({ family: "Zoho Puvi", style: "Semibold" });
  await figma.loadFontAsync({ family: "Zoho Puvi", style: "Regular" });

  const parent = await figma.getNodeByIdAsync(parentId);

  // ── Outer card frame ──────────────────────────────────────────
  const card = figma.createFrame();
  card.name = "Catalog Stat Card";
  card.resize(338, 88);
  card.cornerRadius = 6;
  card.fills = [{ type: "SOLID", color: { r: 0.945, g: 0.918, b: 0.973 } }];
  card.strokes = [{ type: "SOLID", color: { r: 0.702, g: 0.600, b: 0.800 } }];
  card.strokeWeight = 1;
  card.strokeAlign = "INSIDE";
  card.effects = [{
    type: "DROP_SHADOW",
    visible: true,
    color: { r: 0.702, g: 0.600, b: 0.800, a: 0.4 },
    offset: { x: 0, y: 4 },
    radius: 0,
    blendMode: "NORMAL",
    showShadowBehindNode: false
  }];
  card.clipsContent = true;
  card.layoutMode = "HORIZONTAL";  // enables auto-layout
  card.paddingTop    = 20;
  card.paddingBottom = 20;
  card.paddingLeft   = 9;
  card.paddingRight  = 13;
  card.primaryAxisAlignItems  = "SPACE_BETWEEN";
  card.counterAxisAlignItems  = "CENTER";
  card.itemSpacing = 12;
  card.x = x;
  card.y = y;
  parent.appendChild(card);

  // ── Left: Count + Label stack ─────────────────────────────────
  const leftStack = figma.createFrame();
  leftStack.name = "Count + Label";
  leftStack.layoutMode = "VERTICAL";
  leftStack.itemSpacing = 4;
  leftStack.fills = [];
  leftStack.layoutSizingHorizontal = "HUG";
  leftStack.layoutSizingVertical   = "HUG";
  card.appendChild(leftStack);

  const countText = figma.createText();
  countText.fontName  = { family: "Zoho Puvi", style: "Semibold" };
  countText.fontSize  = 22;
  countText.lineHeight = { value: 24, unit: "PIXELS" };
  countText.characters = count;
  countText.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
  countText.textAutoResize = "WIDTH_AND_HEIGHT";
  leftStack.appendChild(countText);

  const labelText = figma.createText();
  labelText.fontName  = { family: "Zoho Puvi", style: "Regular" };
  labelText.fontSize  = 14;
  labelText.lineHeight = { value: 24, unit: "PIXELS" };
  labelText.characters = label;
  labelText.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
  labelText.textAutoResize = "WIDTH_AND_HEIGHT";
  leftStack.appendChild(labelText);

  // ── Right: White circle (icon placeholder) ────────────────────
  const circle = figma.createEllipse();
  circle.name   = "Icon Circle";
  circle.resize(48, 48);
  circle.fills  = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  circle.strokes = [];
  // Note: Add your 20×20 icon SVG/frame centered inside this circle
  card.appendChild(circle);

  figma.viewport.scrollAndZoomIntoView([card]);
  return card;
}

// Usage
return await createCatalogStatCard("1:3", {
  count: "42",
  label: "Columns",
  x: 32,
  y: 100
});
```

---

## Color Token Mapping

| Used in | Hex value | Closest system token | Token file |
|---------|-----------|---------------------|-----------|
| Card background | `#F1EAF8` | Custom — Catalog purple tint | Not in primitives.json |
| Card stroke | `#B399CC` | Custom — Catalog purple mid | Not in primitives.json |
| Card shadow | `#B399CC` at 40% | Same as stroke | Not in primitives.json |
| Count text | `#000000` | `Color.Base.Black` | `primitives.json` |
| Label text | `#000000` | `Color.Base.Black` | `primitives.json` |
| Icon circle fill | `#FFFFFF` | `Color.Base.White` | `primitives.json` |
| Icon header row | `#FFD494` | Close to `Color.Accent.Yellow.Tint` | `primitives.json` |
| Icon grid/border | `#000000` | `Color.Base.Black` | `primitives.json` |

> The purple palette (`#F1EAF8`, `#B399CC`) is **unique to the Catalog feature** and is not present in the core Design System token files. If you extend this component, add these colors to a `catalog-tokens.json` file.

---

## ⚠️ HARD RULE — Token Usage (No Exceptions)

> **Every color applied in Figma MUST be bound to a Figma library variable via `figma.variables.setBoundVariableForPaint()`.  
> Hardcoded hex values (e.g. `#000000`), raw `{r,g,b}` objects, or magic numbers are NEVER acceptable in component plugin code.**

Correct pattern:
```js
const varObj = await figma.variables.getVariableByIdAsync('VariableID:189:171');
const paint = figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
  'color', varObj
);
node.fills = [paint];
```

### Figma Variable Bindings (system colors used in this component)

| Role | Hex | Variable Name | Variable ID |
|------|-----|---------------|-------------|
| Count text | `#000000` | `Color/Base/Black` | `VariableID:189:171` |
| Label text | `#000000` | `Color/Base/Black` | `VariableID:189:171` |
| Icon circle fill | `#FFFFFF` | `Color/Base/White` | `VariableID:189:170` |

> **Catalog-specific colors** (`#F1EAF8`, `#B399CC`) have no matching Figma library variable. Until a `catalog-tokens` collection is created, apply them as literal paints and document them in `catalog-tokens.json`.

---

## Usage Scenarios

| When to use | When NOT to use |
|-------------|----------------|
| Displaying count statistics for data catalog items (tables, columns, rows, reports) | Showing non-numeric information |
| Inside a grid of stat cards on a catalog search result page | As a standalone prominent hero card |
| When you need a quick visual summary of a data asset's metadata | For notifications or status messages — use the Notification component |
| Grouped with other Catalog Stat Cards in a horizontal/grid layout | As a button or interactive element |

---

## Layout in Context

The card is designed to be placed in a **grid or horizontal row** with sibling stat cards:

```
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│  42              🟡  │  │  16              🟡  │  │  8               🟡  │
│  Columns            │  │  Tables              │  │  Reports             │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
     ← fill →                  ← fill →                  ← fill →
     gap: 12                   gap: 12
```

- Layout: horizontal, gap `12`
- Each card: `FILL` width, `88px` height
- Grid container: `padding: 24`, `gap: 12`

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| [Notification](notification.md) | Different card type — for messages, not metrics |
| [Button](buttonComponent.md) | May appear alongside stat cards as an action |
| [Input](inputComponent.md) | Used in the search bar above the stat card grid |
