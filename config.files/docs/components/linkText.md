# Link Text Component — Zoho Analytics Design System

> **File:** `components/link-text-config.json`
> **Figma Source:** [Design System – Zoho Analytics](https://www.figma.com/design/m2iOWX3I9aDI5kgyw4wCo0/Design-System--Zoho-Analytics)
> **Total Nodes:** `2`

---

## Component Selection & Pick — Hard Rules

### 0. ⛔ Search the library BEFORE creating this component

```js
figma_get_library_components({ libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0", query: "Link" })
// Local fallback:
const existing = await page.findOne(n => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') && n.name.toLowerCase().includes('link'));
if (existing) { const inst = existing.type === 'COMPONENT_SET' ? existing.children[0].createInstance() : existing.createInstance(); }
```

---

### 1. How to export this component (Token Exporter Plugin)
| Step | Action |
|------|--------|
| 1 | Open **Figma Design System** file → select the Link Text component or instance |
| 2 | Run **Token & Component Exporter** plugin → go to **Selection** tab |
| 3 | Click **↓ Download** — saves as `link-text-config.json` |
| 4 | Place file in `config.files/tokens/components/` |

### 2. How to read the exported JSON
| JSON Field | What it means | How to use it |
|------------|---------------|---------------|
| `nodes[].id` | Node ID inside the *Design System* file | Reference only — do NOT use with `getNodeByIdAsync` in your working file |
| `nodes[].componentPropertyValues` | Current values for `State`, `Text` | Read to know what properties exist |
| `nodes[].fills[].color` | Link text color hex (always `#00A6FF`) | Reference only |
| `nodes[].textDecoration` | `"UNDERLINE"` on hover state | Reference only |
| `statesAndOptions.componentSets[].variantAxes` | `State` axis with `Default`/`Hover` | Use to validate combinations |

### 3. Component pick rules — MUST follow
| Rule | ✅ Do | ❌ Never |
|------|-------|---------|
| **Source** | Always instantiate from the **Design System library** | Never create a plain text node and color it blue |
| **Key type** | Use a **variant key** (40-char hex string) | Never use component set key or node ID to instantiate |
| **Color** | Let the component carry its own fills (`#00A6FF`) | Never overwrite fill color after instantiation |
| **Underline** | Managed by the component on `Hover` state | Never add your own text-decoration style |
| **Label** | Set `"Text#2424:0"` property for the link text | Never edit the text child node directly |
| **Purpose** | Navigation and action links only | Never use as a button substitute |

### 4. Correct instantiation pattern
```js
// Default state
const link = await figma_instantiate_component({
  componentKey: "7b5a26e8dfe30e5a5af7299abf6e7e3a8d4c8cc1"
});
link.setProperties({
  "State":        "Default",
  "Text#2424:0":  "Forgot password?"
});

// Hover state
const linkHover = await figma_instantiate_component({
  componentKey: "c5e90ff0b9a843ccef00e2bd8fb4ecf1d2cf0e8f"
});
linkHover.setProperties({
  "State":        "Hover",
  "Text#2424:0":  "Forgot password?"
});
```

### 5. Property types cheat sheet
| Property key pattern | Type | Valid values |
|----------------------|------|-------------|
| `State` | `VARIANT` | `"Default"` · `"Hover"` |
| `Text#2424:0` | `TEXT` | Any link label string |

---

## Style Hard Rules

| Rule | Detail |
|------|--------|
| **Size** | Never hardcode — always read from JSON (`58 × 20` Default · `57 × 20` Hover) |
| **Text color** | Always `#00A6FF` — never change to another blue |
| **No stroke** | Link text has no border or stroke — do not add one |
| **Font** | `Zoho Puvi Regular`, `14px` |
| **Underline** | Hover affordance only — managed by the component |
| **Use cases** | Navigation/action text links only — not for button actions |

---

## Component Anatomy

```
Link Text Row (58 × 20):
┌─────────────────────────────┐
│  Link Text  (text · #00A6FF)│
└─────────────────────────────┘
  Container fill: #FFFFFF
  No stroke · No shadow
```

---

## Component Properties

| Property | Type | Values |
|----------|------|--------|
| `Property 1` | Variant | `Default` · `Hover` |

---

## State Color Reference

| State | Container Fill | Text Color | Token |
|-------|----------------|------------|-------|
| `Default` | `#FFFFFF` | `#00A6FF` | `Token: Colors > Dark > Text > Text Link` |
| `Hover` | `#FFFFFF` | `#00A6FF` | `Token: Colors > Dark > Text > Text Link` |

> **Note:** Text color is identical in both states. Hover differentiation is achieved via underline decoration, not color change.

---

## Full Variant × State Node ID Matrix

| Property 1 | Node ID | Width | Text Color |
|------------|---------|-------|------------|
| `Default` | `2610:3300` | `58` | `#00A6FF` |
| `Hover` | `2610:3303` | `57` | `#00A6FF` |

---

## Layout Spec (from JSON)

### Container Frame
| Property | Value |
|----------|-------|
| Width | `58` (Default) · `57` (Hover) *(read from JSON)* |
| Height | `20` *(read from JSON — never hardcode)* |
| Fill | `#FFFFFF` |
| Stroke | none |
| Padding | `0` |

### Link Text Node
| Property | Value |
|----------|-------|
| Name | `Link Text` |
| Type | `TEXT` |
| Font | `Zoho Puvi Regular` |
| Size | `14px` |
| Color | `#00A6FF` |
| Decoration | Underline on hover |

---

## When to Use Each State

| Situation | State | Node ID |
|-----------|-------|---------|
| Normal link (page load / idle) | `Default` | `2610:3300` |
| User hovers over the link | `Hover` | `2610:3303` |

---

## Light vs. Dark Mode

| Mode | Text Link Color | Token |
|------|----------------|-------|
| **Light** | `#006AFF` | `Token: Colors > Light > Text > Text Link` |
| **Dark** | `#00A6FF` | `Token: Colors > Dark > Text > Text Link` |

> The JSON captures the **dark mode** color (`#00A6FF`). When building for light mode, use `#006AFF` from `token-colors.json`.

---

## Library Component Keys

> **How to use:** Always instantiate from the design system library using `figma_instantiate_component` with the **variant key**. Never build link text from scratch.

**Component Set:** `Link Text` · Node `2610:3298` · Set Key `551f38a5801c84ea61e50de7793d5a241d608ac1`

| State | Variant Key | Node ID |
|-------|-------------|---------|
| `Default` | `767aa91db276d3066791c79f597b4243342598e3` | `2610:3297` |
| `Hover` | `c1b9d602253ac808ad63c4eb8d389452a1021910` | `2610:3296` |

---

## Figma Console MCP — Usage

### 1. Instantiate from the design system library
```js
// Default state
const instance = await figma_instantiate_component({
  componentKey: "767aa91db276d3066791c79f597b4243342598e3"
});

// Hover state
const instanceHover = await figma_instantiate_component({
  componentKey: "c1b9d602253ac808ad63c4eb8d389452a1021910"
});
```

### 2. Switch variant after instantiation
```js
instance.setProperties({
  "Property 1": "Default"  // or "Hover"
});
```

### 3. Quick variant key lookup
```
Default → 767aa91db276d3066791c79f597b4243342598e3
Hover   → c1b9d602253ac808ad63c4eb8d389452a1021910
```

---

## Token Reference

| Token | Hex | Used For |
|-------|-----|----------|
| `Token: Colors > Dark > Text > Text Link` | `#00A6FF` | Dark mode link text color |
| `Token: Colors > Light > Text > Text Link` | `#006AFF` | Light mode link text color |
| `Color.Base.White` | `#FFFFFF` | Container background fill |

---

## ⚠️ HARD RULE — Token Usage (No Exceptions)

> **Every color applied in Figma MUST be bound to a Figma library variable via `figma.variables.setBoundVariableForPaint()`.  
> Hardcoded hex values (e.g. `#00A6FF`), raw `{r,g,b}` objects, or magic numbers are NEVER acceptable in component plugin code.**

Correct pattern:
```js
const varObj = await figma.variables.getVariableByIdAsync('VariableID:706:113');
const paint = figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
  'color', varObj
);
node.fills = [paint];
```

### Figma Variable Bindings

| Role | Hex | Variable Name | Variable ID |
|------|-----|---------------|-------------|
| Link text color | `#00A6FF` | `Text Link` | `VariableID:706:113` |
| Container background | `#FFFFFF` | `Color/Base/White` | `VariableID:189:170` |
