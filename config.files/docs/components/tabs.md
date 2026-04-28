# Tabs

> **Figma Node IDs:** `Tab / Item` → `5023:12761` · `Tab / Item — Segmented` → `5038:1528` · `Tab / Bar` → `5023:12809`  
> **Figma Page:** `🟠 - Components`  
> **Config:** `tokens/components/tabs-config.json`  
> **Codebase:** `ZATab.js` · `ZATabComponent.js` · `TabGroup.js`  
> **CSS:** `Components.scss` → `ul.tab-switches` · `ZATabComponent.scss` → `.za-tab`

---

## What is it?

A horizontal navigation control that switches between multiple content panels. Three Figma components cover all codebase tab patterns:

- **Tab / Item** — single clickable tab (Line/Filled styles, ZATabComponent.js pattern)
- **Tab / Item — Segmented** — bordered segmented-control tab (ZATab.js `ul.tab-switches` pattern)
- **Tab / Bar** — container grouping Tab / Items, with optional overflow arrows (TabGroup.js)

---

## Anatomy

```
Tab / Item (VERTICAL):
├── content-row (HORIZONTAL, padding 8px top/bottom 12px sides)
│   ├── icon-wrap (16×16)         ← hidden by default (ShowIcon)
│   ├── label (TEXT 13px)
│   └── count-badge (pill)        ← hidden by default (ShowCount)
└── underline (2px RECT, FILL)    ← colored + visible only in Line + Active

Tab / Item — Segmented (single frame with border):
└── label (TEXT 13px, center-aligned)
    Corner radii: Start = left-rounded · Middle = none · End = right-rounded

Tab / Bar (standard):
├── tabs-row (HORIZONTAL)
│   ├── [Tab / Item]  [Tab / Item ← Active]  [Tab / Item]
└── bottom-border (1px, Stroke 1) ← Line style only

Tab / Bar (Overflow=Yes):
├── left-arrow  (24px, chevron-left)
├── tabs-row    (same as above)
└── right-arrow (24px, chevron-right)
```

---

## Tab / Item

### Variant Axes

| Axis | Values | Notes |
|------|--------|-------|
| `Style` | `Line` · `Filled` | Controls active indicator type |
| `State` | `Default` · `Hover` · `Active` · `Focused` · `Disabled` | Interactive + keyboard state |

### Component Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `Label` | `TEXT` | `Tab name` | Tab label text |
| `ShowIcon` | `BOOLEAN` | `false` | Shows icon-wrap before the label |
| `ShowCount` | `BOOLEAN` | `false` | Shows count badge after the label |
| `Count` | `TEXT` | `3` | Number shown in the count badge |

### State → Token Map

| State | Text Token | Background Token | Outline / Underline |
|-------|-----------|-----------------|---------------------|
| Default | `ZA/Text/Text Description` | — | — |
| Hover | `ZA/Text/Text Primary` | `ZA/Background/BG-Primary-Subtle` | — |
| Active (Line) | `ZA/Button/Button Fill/Button Primary` | — | underline: `ZA/Button/Button Fill/Button Primary` |
| Active (Filled) | `ZA/Text/Text On AccentColor` | `ZA/Button/Button Fill/Button Primary` | — |
| **Focused** | `ZA/Text/Text Description` | — | 2px outline: `ZA/Button/Button Fill/Button Primary` |
| Disabled | `ZA/Text/Text Disabled` | — | — |

> **Focused** maps to CSS `:focus-visible` in `ZATabComponent.scss`. Triggered by keyboard navigation (ArrowLeft/Right/Home/End in `ZATabComponent.tabKeyDownHandler`).

---

## Tab / Item — Segmented

Maps to `ZATab.js` — `ul.tab-switches > li` (bordered segmented-control style, used in sidepane settings dialogs).

### Variant Axes

| Axis | Values | Notes |
|------|--------|-------|
| `Position` | `Start` · `Middle` · `End` | Controls which corners are rounded and border sharing |
| `State` | `Default` · `Hover` · `Active` | No Disabled or Focused (not implemented in ZATab.js) |

### Component Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `Label` | `TEXT` | `Tab name` | Tab label text |

### State → Token Map

| State | Text Token | Background Token | Border Token | Font |
|-------|-----------|-----------------|--------------|------|
| Default | `ZA/Text/Text Description` | `ZA/Background/BG-Primary-Default` | `ZA/stroke/Stroke 1` | Regular |
| Hover | `ZA/Text/Text Primary` | `ZA/Background/BG-Primary-Subtle` | `ZA/stroke/Stroke 1` | Regular |
| Active | `ZA/Text/Text Primary` | `ZA/Background/BG-Primary-Subtle` | `ZA/stroke/Stroke 1` | **Bold** |

### Position → Corner Radii

| Position | Top-Left | Top-Right | Bottom-Right | Bottom-Left |
|----------|----------|-----------|--------------|-------------|
| `Start` | 5px | 0 | 0 | 5px |
| `Middle` | 0 | 0 | 0 | 0 |
| `End` | 0 | 5px | 5px | 0 |

> In a container, use `itemSpacing = -1` to achieve the shared-border (merged) effect between adjacent items.

---

## Tab / Bar

### Variant Axes

| Axis | Values | Notes |
|------|--------|-------|
| `Style` | `Line` · `Filled` | Matches Tab / Item style. `Line` adds a `bottom-border` separator. |
| `Overflow` | `No` · `Yes` | `Yes` adds left/right chevron arrows (from `TabGroup.js` MTS-Arrow pattern) |

### Anatomy Notes

- **`tabs-row`**: Horizontal frame containing 3 Tab / Item instances
- **`bottom-border`**: 1px rectangle, token `ZA/stroke/Stroke 1`. Only in `Style=Line`
- **`left-arrow` / `right-arrow`**: 24px frames with chevron SVG. Present only in `Overflow=Yes`
- **Overflow source**: `TabGroup.js` `handleTabsBarArrows()` — `scrollTo({behavior:'smooth'})` on the tab bar; arrows shown on mouseenter via `showArrows()`

---

## Sizing

| Element | Value |
|---------|-------|
| Tab / Item height | ~38px |
| Tab / Item horizontal padding | 12px each side |
| Tab / Item — Segmented height | 36px |
| Tab / Item — Segmented min-width | 100px |
| Icon size | 16×16 |
| Count badge corner radius | 10px |
| Label font size | 13px |
| Underline height | 2px |
| Bottom border height (Bar) | 1px |
| Focused outline width | 2px, offset 2px |
| Overflow arrow width | 24px |

---

## Codebase Mapping

| Code Concept | Figma Equivalent |
|-------------|-----------------|
| `ul.tab-switches > li` | `Tab / Item — Segmented` |
| `li.active` (ZATab) | `Position=*/State=Active` |
| `li:first-child` (5px left-radius) | `Position=Start` |
| `li:last-child` (5px right-radius) | `Position=End` |
| `.za-tab` (ZATabComponent) | `Tab / Item` |
| `.za-tab--active` | `State=Active` |
| `.za-tab:focus-visible` | `State=Focused` |
| `.MTS-Arrow.left / .right` (TabGroup) | `Tab / Bar` → `Overflow=Yes` → `left-arrow / right-arrow` |
| `tab-selected-red::after` | Red dot badge (not yet in Figma — future addition) |
| `aria-selected="true"` | `State=Active` |
| Arrow keys (keyboard nav) | `State=Focused` |

---

## Usage

### Figma — Instantiating a Tab Bar with Overflow

```javascript
const tabBarCs = await figma.getNodeByIdAsync('5023:12809');
const overflowVariant = tabBarCs.children.find(c => c.name === 'Style=Line, Overflow=Yes');
const instance = overflowVariant.createInstance();
figma.currentPage.appendChild(instance);
```

### Figma — Instantiating a Segmented Tab Group

```javascript
const segCs = await figma.getNodeByIdAsync('5038:1528');
const startDef = segCs.children.find(c => c.name === 'Position=Start, State=Default');
const midActive = segCs.children.find(c => c.name === 'Position=Middle, State=Active');
const endDef = segCs.children.find(c => c.name === 'Position=End, State=Default');
// Place them in a container with itemSpacing = -1 for shared borders
```

### Code (ZATab.js — Segmented style)

```javascript
const zaTab = new ZATab();
const tabEl = zaTab.construct({
  switches: ['Overview', 'Analytics', 'Settings'],
  contents: [overviewEl, analyticsEl, settingsEl],
  callback: (index) => console.log('Active tab:', index)
});
document.getElementById('tab-container').appendChild(tabEl.element);
```

### Code (ZATabComponent.js — Underline style with keyboard nav)

```javascript
import ZATabComponent from 'jsTemplates/controller/ZATabComponent';

const tabs = new ZATabComponent([
  { tabName: 'Overview', callback: onOverview },
  { tabName: 'Analytics', callback: onAnalytics, tabIcon: svgPath },
  { tabName: 'Settings', callback: onSettings, description: 'Manage preferences' }
], parentEl);
tabs.create(1); // start on tab 1
```

---

## Related Components

| Component | Relationship |
|-----------|-------------|
| `Tab / Bar` | Composes `Tab / Item` instances |
| `Tab / Item — Segmented` | Used inside sidepane settings dialogs |
| `Sidepane / Panel` | Often contains a `Tab / Bar` for content sections |
| `Accordion` | Alternative to tabs for collapsible sections |
