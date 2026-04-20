# Modals & Dialogs — Zoho Analytics Design System

> **Figma File:** `testing` · File Key `ylW4VI4Qj92oTMZBh3wyRt`
> **Page:** `Modals & Dialogs`
> **Components:** B-23 · B-24 · B-25 · B-26 · B-27

---

## ⛔ Search the library BEFORE creating any part of a modal

Sub-components inside modals (buttons, inputs, checkboxes, toggles) MUST be found in the library first, never rebuilt.

```js
// Search for each sub-component type you need
figma_get_library_components({ libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0", query: "Button" })
figma_get_library_components({ libraryFileKey: "m2iOWX3I9aDI5kgyw4wCo0", query: "Input" })
// Local fallback:
const existing = await page.findOne(n => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') && n.name.toLowerCase().includes('modal'));
```

---

## Design System Library Components Used

All modals use **library component instances** — never hand-built frames — for form controls and action buttons. The only custom frames are structural shells (Header, Divider, Body, Footer wrapper, Content placeholder) and the Textarea (no library equivalent exists).

| Element | Library Component | Variant Key | Docs |
|---------|-------------------|-------------|------|
| **Primary button** (Confirm / Save / Upload / Validate) | Button — `State=Default, Primary=Yes` | `6d5926d43be8374d4fbeedc38146979ca6c6d14b` | [buttonComponent.md](buttonComponent.md) |
| **Secondary button** (Cancel) | Button — `State=Default, Primary=No` | `1f752f95a6cace3a8601886da672412f32d3f2b3` | [buttonComponent.md](buttonComponent.md) |
| **Text input** (single-line, no right option) | Input — `States=Default, Show Right Option=NO` | `8fd07348a67bc5a1124009fed9fe74358033ea67` | [inputComponent.md](inputComponent.md) |
| **Select / dropdown** (arrow right option) | Input — `States=Default, Show Right Option=Yes, Right Options=Arrow` | `3af34512c3315cfd732511cb79b909fb3eee2033` | [inputComponent.md](inputComponent.md) |
| **Radio button (selected)** | Radio Button options — `On=ON, Enable=On` | `1de98209ee51df75f39ca825201019a9a10edc10` | [radioButton.md](radioButton.md) |
| **Radio button (unselected)** | Radio Button options — `On=OFF, Enable=On` | via `setProperties({ "On": "OFF" })` on same import | [radioButton.md](radioButton.md) |
| **Textarea** | ⚠️ Custom frame (no library equivalent) | — | see [Textarea Spec](#textarea-custom-frame-spec) below |

---

## Instantiation Pattern (Figma Console MCP)

```js
// Always import each unique key ONCE, then createInstance() for each use
const btnComp   = await figma.importComponentByKeyAsync('6d5926d43be8374d4fbeedc38146979ca6c6d14b');
const radioComp = await figma.importComponentByKeyAsync('1de98209ee51df75f39ca825201019a9a10edc10');
const inpComp   = await figma.importComponentByKeyAsync('8fd07348a67bc5a1124009fed9fe74358033ea67');
const selComp   = await figma.importComponentByKeyAsync('3af34512c3315cfd732511cb79b909fb3eee2033');

// Primary button
const primaryBtn = btnComp.createInstance();
primaryBtn.setProperties({ 'Text#846:0': 'Save group', 'Icon#832:22': false, 'Primary': 'Yes', 'State': 'Default' });

// Secondary / Cancel button
const cancelBtn = btnComp.createInstance();
cancelBtn.setProperties({ 'Text#846:0': 'Cancel', 'Icon#832:22': false, 'Primary': 'No', 'State': 'Default' });

// Text input (placeholder only)
const nameInp = inpComp.createInstance();
nameInp.setProperties({ 'Input Text#807:10': 'e.g., Sales Analytics Assistant', 'Text#807:5': false, 'States': 'Default' });

// Text input (pre-filled value)
const filledInp = inpComp.createInstance();
filledInp.setProperties({ 'Input Text#807:10': 'Sales Analytics Assistant', 'Text#807:5': true, 'States': 'Default' });

// Select / Arrow dropdown
const selectInp = selComp.createInstance();
selectInp.setProperties({ 'Input Text#807:10': 'Filter Spaces', 'Text#807:5': false, 'States': 'Default' });

// Radio — selected
const radioOn = radioComp.createInstance();
radioOn.setProperties({ 'Text#2399:0': 'Zoho Service', 'On': 'ON', 'Enable': 'On' });

// Radio — unselected (same import key, switch via property)
const radioOff = radioComp.createInstance();
radioOff.setProperties({ 'Text#2399:0': 'Custom Service', 'On': 'OFF', 'Enable': 'On' });

// IMPORTANT: set FILL on instance AFTER appending to auto-layout parent
parent.appendChild(nameInp);
nameInp.layoutSizingHorizontal = 'FILL';
```

---

## Component Overview

### B-23 · Dialog (Base Shell)

**Component Set:** `Dialog` · Variants: `Size=Small` · `Size=Medium` · `Size=Large`

| Variant | Width | Height | Use case |
|---------|-------|--------|----------|
| Size=Small  | 480px | ~243px | Confirmations, simple prompts |
| Size=Medium | 560px | ~243px | Short forms, alerts |
| Size=Large  | 728px | ~243px | Wide content dialogs |

**Structure:**
```
┌─ Header (FILL×HUG) ──────────────────────────────────────────┐
│  [Title 14px Semibold]   [Supporting text 12px]   [× close]  │
├─ Divider ─────────────────────────────────────────────────────┤
│  Content Area (FILL×120px FIXED — replace with real content)  │
├─ Divider ─────────────────────────────────────────────────────┤
│  Footer (FILL×HUG)                [Cancel ▢]  [Confirm ■]    │
└───────────────────────────────────────────────────────────────┘
```

**Library components used:** Button (Cancel · Primary=No), Button (Confirm · Primary=Yes)

---

### B-24 · File Upload Modal

**Component Set:** `File Upload Modal` · Variants: `State=Empty` · `State=Has File`

| Variant | Width | Height | Description |
|---------|-------|--------|-------------|
| State=Empty    | 480px | ~287px | Drop zone only, no uploaded file |
| State=Has File | 480px | ~346px | Drop zone + uploaded file row shown |

**Structure:**
```
┌─ Header ────────────────────────────────────┐
│  Upload Files                      [× close] │
├─ Divider ────────────────────────────────────┤
│  Body (FILL×HUG, padding 24px)              │
│  ┌─ Drop Zone (dashed border, 128px tall) ─┐ │
│  │  ↑  Click to upload or drag & drop      │ │
│  │     Supported: .CSV, .TSV...            │ │
│  └─────────────────────────────────────────┘ │
│  [File row — only in Has File variant]       │  ← file name + size + × delete
├─ Divider ────────────────────────────────────┤
│  Footer                  [Cancel ▢] [Upload/Insert ■] │
└──────────────────────────────────────────────┘
```

**Library components used:** Button (Cancel · Primary=No), Button (Upload/Insert · Primary=Yes)

> The drag-and-drop zone is a custom frame (`dashPattern=[6,4]` on a SOLID-stroked frame). No library equivalent exists.

---

### B-25 · Create Tool Group Dialog

**Component Set:** `Create Tool Group Dialog` · Variants: `State=Empty` · `State=Filled`

| Variant | Width | Height | Description |
|---------|-------|--------|-------------|
| State=Empty  | 540px | ~343px | Empty form, placeholder text in fields |
| State=Filled | 540px | ~343px | Pre-filled values in both fields |

**Structure:**
```
┌─ Header ──────────────────────────────────────┐
│  Create New Tool Group               [× close] │
├─ Divider ─────────────────────────────────────┤
│  Body (FILL×HUG, padding 24px, gap 16px)      │
│  ┌─ Tool Group Name Field ──────────────────┐  │
│  │  Tool Group Name *                       │  │  ← label (12px Medium)
│  │  [Input — library component (FILL)]      │  │  ← Input Default key
│  └──────────────────────────────────────────┘  │
│  ┌─ Description Field ───────────────────────┐  │
│  │  Description                              │  │  ← label (12px Medium)
│  │  [Textarea — custom frame, 96px tall]     │  │  ← ⚠️ custom, no library key
│  └───────────────────────────────────────────┘  │
├─ Divider ──────────────────────────────────────┤
│  Footer               [Cancel ▢] [Save group ■] │
└────────────────────────────────────────────────┘
```

**Library components used:**
- Input (Tool Group Name) — key `8fd07348a67bc5a1124009fed9fe74358033ea67`
- Textarea (Description) — **custom frame** (see spec below)
- Button (Cancel · Primary=No), Button (Save group · Primary=Yes)

---

### B-26 · Add New Tool Dialog

**Component Set:** `Add New Tool Dialog` · Variants: `Service Type=Zoho Service` · `Service Type=Custom Service`

| Variant | Width | Height | Description |
|---------|-------|--------|-------------|
| Service Type=Zoho Service    | 560px | ~368px | Zoho radio selected, no YAML file |
| Service Type=Custom Service  | 560px | ~390px | Custom radio selected + uploaded YAML shown |

**Structure:**
```
┌─ Header ────────────────────────────────────────────┐
│  Add New Tool in Cliq Group              [× close]  │
├─ Divider ───────────────────────────────────────────┤
│  Body (FILL×HUG, padding 24px, gap 20px)            │
│  Service Type:                                      │
│  ◉ Zoho Service    ○ Custom Service                 │  ← Radio library components
│                                                     │
│  Choose Service name:                               │
│  [Select/Arrow Input — library component]           │  ← Input Arrow key
│                                                     │
│  YAML File:                                         │
│  [↑ Upload]                                         │  ← custom upload button
│  [📄 openapi.yaml]   ← only in Custom Service       │
│  Max size is 1MB                                    │
├─ Divider ───────────────────────────────────────────┤
│  Footer        [Cancel ▢]  [Validate & Add ■]       │
└─────────────────────────────────────────────────────┘
```

**Library components used:**
- Radio Button Row (Zoho Service, selected) — key `1de98209ee51df75f39ca825201019a9a10edc10`, `setProperties({ "On": "ON" })`
- Radio Button Row (Custom Service, unselected) — same key, `setProperties({ "On": "OFF" })`
- Input Arrow (Choose Service name) — key `3af34512c3315cfd732511cb79b909fb3eee2033`
- Button (Cancel · Primary=No), Button (Validate & Add · Primary=Yes)

---

### B-27 · YAML Preview Viewer

**Component Set:** `YAML Preview Viewer` · Variants: `State=Preview`

| Variant | Width | Height | Description |
|---------|-------|--------|-------------|
| State=Preview | 728px | ~419px | Code viewer showing 20 YAML lines |

**Structure:**
```
┌─ Header ──────────────────────────────────────────────────────┐
│  Preview YAML File                              [× close]     │
├─ Divider ─────────────────────────────────────────────────────┤
│  Code Viewer (FILL×300px FIXED, bg: #F5F7F9)                 │
│  1   openapi: 3.0.1                                          │
│  2   info:                                                    │
│  3     title: Update Mail Account Sequence                    │
│  ...  (20 lines total, 11px Regular #2D3748)                 │
├─ Divider ─────────────────────────────────────────────────────┤
│  Footer                           [Cancel ▢]  [Next ■]       │
└───────────────────────────────────────────────────────────────┘
```

**Library components used:** Button (Cancel · Primary=No), Button (Next · Primary=Yes)

---

## Textarea Custom Frame Spec

> Used in B-25 Description field. No library textarea component exists in the design system.

| Property | Value |
|----------|-------|
| `layoutMode` | `VERTICAL` |
| `paddingLeft / Right` | `12px` |
| `paddingTop / Bottom` | `10px` |
| `cornerRadius` | `4px` |
| `fill` | `#FFFFFF` |
| `stroke` | `#C6CED9` · weight `1` |
| `height` | `96px` (FIXED) |
| `layoutSizingHorizontal` | `FILL` (set after appending to parent) |
| `font` | `Zoho Puvi Regular 12px` |
| `placeholder color` | `#A0ADBF` |
| `value color` | `#0C0E11` |

---

## Shared Structural Pattern

All modals follow the same shell structure. Create the outer component first, then append in this order:

```
1. Header  (FILL×HUG) — title + optional subtitle + × close button
2. Divider (FILL×1px)
3. Body    (FILL×HUG) — form fields / content
4. Divider (FILL×1px)
5. Footer  (FILL×HUG) — right-aligned: [secondary btn] [primary btn]
```

**Critical rules:**
- `layoutSizingHorizontal = 'FILL'` must be set **after** `parent.appendChild(child)`
- Call `figma.importComponentByKeyAsync(key)` **once per key**, then `createInstance()` for each use
- Call `FIX(comp)` after all children are appended: `comp.resize(comp.width, sumOfChildHeights)`

---

## Component Properties Reference

### Button (from library)
| Property | Type | Values |
|----------|------|--------|
| `Text#846:0` | TEXT | Label string — `"Cancel"`, `"Save group"`, `"Confirm"`, etc. |
| `Icon#832:22` | BOOLEAN | `false` for label-only buttons |
| `Primary` | VARIANT | `"Yes"` (filled blue) · `"No"` (ghost) |
| `State` | VARIANT | `"Default"` · `"Hover"` · `"Disabled"` · `"Tap"` |

### Input (from library)
| Property | Type | Values |
|----------|------|--------|
| `Input Text#807:10` | TEXT | Placeholder or value string |
| `Text#807:5` | BOOLEAN | `false` = show placeholder color · `true` = show value color |
| `States` | VARIANT | `"Default"` · `"Hover"` · `"Error"` · `"Disabled"` |
| `Show Right Option` | VARIANT | `"NO"` (plain input) · `"Yes"` (Arrow/icon) |
| `Right Options` | VARIANT | `"Arrow"` · `"Icon search"` · `"Copy"` · `"Up Down Arrow"` |

### Radio Button (from library)
| Property | Type | Values |
|----------|------|--------|
| `Text#2399:0` | TEXT | Option label string |
| `On` | VARIANT | `"ON"` (selected) · `"OFF"` (unselected) |
| `Enable` | VARIANT | `"On"` (enabled) · `"Off"` (disabled) |

---

## Token Reference

| Token | Hex | Used In |
|-------|-----|---------|
| `Color.Base.White` | `#FFFFFF` | Modal background |
| `Neutral.Tint.Neutral 70` | `#C6CED9` | Border stroke, dividers |
| `Neutral.Shades.Neutral 95` | `#0C0E11` | Title text |
| `Neutral.Shades.Neutral 50` | `#556274` | Subtitle, close icon, placeholder |
| `Neutral.Tint.Neutral 30` | `#A0ADBF` | Placeholder text in inputs |
| `Neutral.Tint.Neutral 30` | `#93A2B6` | Dashed border (drop zone), line numbers |
| `Color.Accent Colors.Blue` | `#2C66DD` | Upload icon, selected radio |
| `Color.Accent Colors.Red` | `#CC3929` | Required field asterisk, file icon |
| `Neutral.Tint.Neutral 100` | `#F5F7F9` | Drop zone fill, code viewer bg |

---

## ⚠️ HARD RULE — Token Usage (No Exceptions)

> **Every color applied in Figma MUST be bound to a Figma library variable via `figma.variables.setBoundVariableForPaint()`.  
> Hardcoded hex values (e.g. `#FFFFFF`), raw `{r,g,b}` objects, or magic numbers are NEVER acceptable in component plugin code.**

Correct pattern:
```js
const varObj = await figma.variables.getVariableByIdAsync('VariableID:189:170');
const paint = figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
  'color', varObj
);
node.fills = [paint];
```

### Figma Variable Bindings

| Role | Hex | Variable Name | Variable ID |
|------|-----|---------------|-------------|
| Modal background | `#FFFFFF` | `Color/Base/White` | `VariableID:189:170` |
| Border stroke / dividers | `#C6CED9` | `Color/Neutral/Tint/Neutral 70` | `VariableID:572:3690` |
| Title text | `#0C0E11` | `ZA/Text/Text Primary` | `VariableID:575:276` |
| Subtitle / placeholder | `#556274` | `Color/Neutral/Shades/Neutral 40` | `VariableID:572:3675` |
| Placeholder in inputs | `#A0ADBF` | `Color/Neutral/Tint/Neutral 40` | `VariableID:572:3687` |
| Drop zone / code viewer bg | `#F5F7F9` | `ZA/Background/BG-Primary-Subtle` | `VariableID:575:275` |
| Primary action (upload icon) | `#2C66DD` | `ZA/Button/Button Fill/Button Primary` | `VariableID:577:38` |
| Danger / error accent | `#CC3929` | `Color/Accent Colors/Red` | `VariableID:189:167` |
| Description text | `#3D4653` | `ZA/Text/Text Description` | `VariableID:575:277` |
