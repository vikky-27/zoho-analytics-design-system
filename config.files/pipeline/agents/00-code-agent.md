# 00 — Code Agent

> **Role:** Automatically read the Zoho Analytics component codebase and extract exact props, variants, states, and measurements for any component. Feeds high-confidence structural data into the pipeline before Vision Agent or Spec Agent runs.
> **Runs:** First — before every other agent, for every component build.
> **Outputs to:** Spec Agent `(01)` · Vision Agent `(03)` · Orchestrator Agent `(04)`
> **READ ONLY** — never writes to the codebase.

---

## Codebase Paths (relative to project root)

```
BASE COMPONENTS:
  codebase/zohoanalytics/source/components/{z-name}/js/{z-name}-main.js
  codebase/zohoanalytics/source/components/{z-name}/templates/{z-name}-main.js

ZA-SPECIFIC COMPONENTS:
  codebase/zohoanalyticsclient/src/js/component/{folder}/index.js
  codebase/zohoanalyticsclient/src/js/{Folder}/{File}.js
  codebase/zohoanalyticsclient/src/vue/components/{Component}.vue
```

---

## Component → File Lookup Table

| Component | Folder | Main File | Where |
|---|---|---|---|
| Button | `zbutton` | `zbutton-main.js` | zohoanalytics |
| ButtonGroup | `zbuttongroup` | `zbuttongroup-main.js` | zohoanalytics |
| SplitButton | `zsplitbutton` | `zsplitbutton-main.js` | zohoanalytics |
| MenuButton | `zmenubutton` | `zmenubutton-main.js` | zohoanalytics |
| Checkbox | `zcheckboxbutton` | `zcheckboxbutton-main.js` | zohoanalytics |
| RadioButton | `zradiobutton` | `zradiobutton-main.js` | zohoanalytics |
| Toggle / Switch | `ztoggleswitch` | `ztoggleswitch-main.js` | zohoanalytics |
| Input / TextField | `zinputfield` | `zinputfield-main.js` | zohoanalytics |
| NumberField | `znumberfield` | `znumberfield-main.js` | zohoanalytics |
| DateField | `zdatefield` | `zdatefield-main.js` | zohoanalytics |
| DateTimeField | `zdatetimefield` | `zdatetimefield-main.js` | zohoanalytics |
| TimeField | `ztimefield` | `ztimefield-main.js` | zohoanalytics |
| SuggestField | `zsuggestfield` | `zsuggestfield-main.js` | zohoanalytics |
| TokenField | `ztokenfield` | `ztokenfield-main.js` | zohoanalytics |
| Select / Dropdown | `zselect` | `zselect-main.js` | zohoanalytics |
| DropdownList | `zdropdownlist` | `zdropdownlist-main.js` | zohoanalytics |
| Combobox | `zcombobox` | `zcombobox-main.js` | zohoanalytics |
| Menu | `zmenu` | `zmenu-main.js` | zohoanalytics |
| Listbox | `zlistbox` | `zlistbox-main.js` | zohoanalytics |
| Accordion | `zaccordion` | `zaccordion-main.js` | zohoanalytics |
| AccordionItem | `zaccitem` | `zaccitem-main.js` | zohoanalytics |
| CollapsiblePanel | `zcollapsiblepanel` | `zcollapsiblepanel-main.js` | zohoanalytics |
| Panel | `zpanel` | `zpanel-main.js` | zohoanalytics |
| TabPanel | `ztabpanel` | `ztabpanel-main.js` | zohoanalytics |
| Popover | `zpopover` | `zpopover-main.js` | zohoanalytics |
| Slider | `zslider` | `zslider-main.js` | zohoanalytics |
| DoubleSlider | `zdoubleslider` | `zdoubleslider-main.js` | zohoanalytics |
| DatePicker | `zdatepicker` | `zdatepicker-main.js` | zohoanalytics |
| DateRangePicker | `zdaterangepicker` | `zdaterangepicker-main.js` | zohoanalytics |
| ColorPicker | `zcolorpicker` | `zcolorpicker-main.js` | zohoanalytics |
| **Tab (ZA)** | `component/viewTab/` | `ZAViewTabs.js` + `ZATabHandler.js` | zohoanalyticsclient |
| **Search (ZA)** | `component/search/` + `component/searchcomp/` | `ZASearchComponent.js` | zohoanalyticsclient |
| **Alert / Dialog (ZA)** | `ZAAlert/` + `dialogcomponents/` | `index.js` | zohoanalyticsclient |
| **Tag (ZA)** | `component/tag/` | `TaggingComponent.js` | zohoanalyticsclient |
| **Tooltip (ZA)** | `component/toolTip/` | `ZAToolTip.js` | zohoanalyticsclient |
| **Pagination (ZA)** | `Pagination/` | `index.js` | zohoanalyticsclient |
| **Banner / Notification (ZA)** | `Banner/` | `index.js` | zohoanalyticsclient |
| **ProgressBar (ZA)** | `ProgressBar/` | `index.js` | zohoanalyticsclient |
| **NumberField (Vue)** | `vue/components/` | `ZAVNumberField.vue` | zohoanalyticsclient |

---

## How to Run (Automatic — every pipeline start)

When the Orchestrator starts for any component:

1. **Match component name** from the brief to the lookup table above (case-insensitive).
2. **Read the main JS file** from `codebase/` — extract `get attrs()` and `get props()` blocks.
3. **Read SCSS variables** if available — extract px values for spacing, sizing, border-radius.
4. **Output Code Agent result** (format below) and pass to Spec Agent as primary input.

> ⛔ **READ ONLY.** Never modify any file under `codebase/`.

---

## Extraction Rules

### From `get attrs()` — what to extract

| Attr pattern | Maps to |
|---|---|
| String with a small set of known values (enum) | `variantAxes` |
| `boolean` (true/false default) | `booleanProperties` |
| Nullable string for labels/placeholder | `textProperties` |
| Numeric (width, height, min, max) | `measurements` |

### CSS class → Figma State mapping

| CSS class | Figma State value |
|---|---|
| `is-disabled` | `Disabled` |
| `is-selected` | `Selected` / `Active` |
| `is-active` | `Active` |
| `is-readonly` | `ReadOnly` |
| `has-focus` | `Focus` |
| `is-open` | `Open` |
| `z{comp}--{value}` | Variant axis value |
| `zswitch__onstate` | `On` |
| `zswitch__offstate` | `Off` |

### SCSS variable → Design token mapping

| SCSS variable | DS token path |
|---|---|
| `$primaryColor` / `#1072EA` | `color.accent.blue` |
| `$primaryButtonHoverBackground` | `color.accent.blueHover` |
| `$primaryButtonDisabledBackground` | `color.accent.blueDisabled` |
| `$buttonTextColor` (dark text) | `semantic.light.text.primary` |
| `$buttonTextDisabledColor: #6e6e6e` | `semantic.light.text.placeholder` |
| `$inputFieldBackground: #fff` | `semantic.light.background.default` |
| `$inputFieldDisabledBackground` | `semantic.light.background.subtle` |
| `$borderRadius: 3px` | `borderRadius.sm` |
| `$fontSizeBase: 13px` | `typography.scale.bodyMd` |
| `$fontSizeLarge: 16px` | `typography.scale.bodyXl` |
| `$fontSizeSmall: 12px` | `typography.scale.bodyXs` |
| `$mediumButtonPadding: 7px 17px` | `spacing.padding.S` |
| `$smallButtonPadding: 4px 10px` | `spacing.padding.XS` |
| `$largeButtonPadding: 8px 22px` | `spacing.padding.M` |
| `$inputFieldPadding: 7px 10px` | `spacing.padding.S` |

> **Color rule:** Always map to the nearest DS token path — never output raw hex. Use `figma-variable-bindings.json` for the Figma variable ID.

---

## Pre-built Component Reference

Use these directly without re-reading files. If a component is NOT in this list, read its file from `codebase/` using the lookup table above.

### Button
```json
{
  "variantAxes": [
    { "axisName": "Appearance", "axisValues": ["normal", "primary", "danger", "success", "warning"], "source": "attrs.appearance" },
    { "axisName": "Size",       "axisValues": ["mini", "small", "medium", "large"],                  "source": "attrs.size" },
    { "axisName": "State",      "axisValues": ["Default", "Hover", "Disabled", "Loading"],           "source": "is-disabled + attrs.actionInProgress" }
  ],
  "booleanProperties": [
    { "propertyName": "Show Icon", "defaultValue": false, "source": "attrs.iconClass" },
    { "propertyName": "Icon Only", "defaultValue": false, "source": "css:zbutton--icononly" }
  ],
  "textProperties": [
    { "propertyName": "Label", "layerName": "label--button-text", "default": "Button", "source": "attrs.text" }
  ],
  "measurements": {
    "medium": { "paddingTop": 7, "paddingRight": 17, "paddingBottom": 7, "paddingLeft": 17, "height": 32, "iconSize": 16 },
    "small":  { "paddingTop": 4, "paddingRight": 10, "paddingBottom": 4, "paddingLeft": 10, "height": 24, "iconSize": 14 },
    "large":  { "paddingTop": 8, "paddingRight": 22, "paddingBottom": 8, "paddingLeft": 22, "height": 40, "iconSize": 18 },
    "mini":   { "paddingTop": 2, "paddingRight": 8,  "paddingBottom": 2, "paddingLeft": 8,  "height": 20, "iconSize": 12 },
    "borderRadius": 3, "strokeWeight": 1, "gap": 8, "fontSize": 13
  }
}
```

### Input / TextField
```json
{
  "variantAxes": [
    { "axisName": "State", "axisValues": ["Default", "Focus", "Disabled", "ReadOnly", "Error"], "source": "has-focus + is-disabled + is-readonly" }
  ],
  "booleanProperties": [
    { "propertyName": "Show Clear Button",  "defaultValue": false, "source": "attrs.clearButton" },
    { "propertyName": "Show Spin Buttons",  "defaultValue": true,  "source": "attrs.spinButtons" }
  ],
  "textProperties": [
    { "propertyName": "Value",       "layerName": "label--input-value",       "default": "",           "source": "attrs.value" },
    { "propertyName": "Placeholder", "layerName": "label--input-placeholder", "default": "Enter text", "source": "attrs.placeholder" }
  ],
  "measurements": { "paddingTop": 7, "paddingRight": 10, "paddingBottom": 7, "paddingLeft": 10, "height": 32, "borderRadius": 3, "strokeWeight": 1, "fontSize": 13 }
}
```

### Toggle Switch
```json
{
  "variantAxes": [
    { "axisName": "State",       "axisValues": ["Off", "On"],                    "source": "attrs.checked" },
    { "axisName": "Interaction", "axisValues": ["Default", "Hover", "Disabled"], "source": "is-disabled" },
    { "axisName": "Size",        "axisValues": ["medium"],                       "source": "attrs.size" }
  ],
  "booleanProperties": [
    { "propertyName": "Show Label", "defaultValue": false, "source": "attrs.contentType !== none" }
  ],
  "textProperties": [
    { "propertyName": "On Label",  "layerName": "label--toggle-on",  "default": "On",  "source": "props.labels.on" },
    { "propertyName": "Off Label", "layerName": "label--toggle-off", "default": "Off", "source": "props.labels.off" }
  ],
  "measurements": { "height": 20, "width": 36, "thumbSize": 16, "borderRadius": 10, "gap": 8 }
}
```

### Select / Dropdown
```json
{
  "variantAxes": [
    { "axisName": "State",    "axisValues": ["Default", "Open", "Focus", "Disabled"], "source": "is-disabled + is-open" },
    { "axisName": "Multiple", "axisValues": ["Single", "Multi"],                      "source": "attrs.multiple" }
  ],
  "booleanProperties": [
    { "propertyName": "Show Clear Button", "defaultValue": false, "source": "attrs.clearButton" },
    { "propertyName": "Show Search",       "defaultValue": false, "source": "attrs.showSearchField" }
  ],
  "textProperties": [
    { "propertyName": "Placeholder", "layerName": "label--select-placeholder", "default": "Select...", "source": "attrs.placeholder" }
  ],
  "measurements": { "height": 32, "paddingTop": 6, "paddingRight": 10, "paddingBottom": 6, "paddingLeft": 10, "borderRadius": 3, "fontSize": 13 }
}
```

### Checkbox
```json
{
  "variantAxes": [
    { "axisName": "State",       "axisValues": ["Unchecked", "Checked", "Indeterminate"], "source": "attrs.checked + is-selected" },
    { "axisName": "Interaction", "axisValues": ["Default", "Hover", "Disabled"],          "source": "is-disabled" }
  ],
  "booleanProperties": [],
  "textProperties": [
    { "propertyName": "Label", "layerName": "label--checkbox-text", "default": "Checkbox label", "source": "inner text" }
  ],
  "measurements": { "size": 16, "borderRadius": 3, "strokeWeight": 1, "gap": 8, "fontSize": 13 }
}
```

### Radio Button
```json
{
  "variantAxes": [
    { "axisName": "State",       "axisValues": ["Unselected", "Selected"],       "source": "attrs.checked" },
    { "axisName": "Interaction", "axisValues": ["Default", "Hover", "Disabled"], "source": "is-disabled" }
  ],
  "booleanProperties": [],
  "textProperties": [
    { "propertyName": "Label", "layerName": "label--radio-text", "default": "Option label", "source": "inner text" }
  ],
  "measurements": { "size": 16, "gap": 8, "fontSize": 13 }
}
```

### Tab Panel (ztabpanel)
```json
{
  "variantAxes": [
    { "axisName": "Alignment",  "axisValues": ["left", "center", "right"],            "source": "attrs.tabAlignment" },
    { "axisName": "Position",   "axisValues": ["top", "bottom", "left", "right"],     "source": "attrs.tabPosition" },
    { "axisName": "LabelType",  "axisValues": ["text", "icon", "icon-text"],          "source": "attrs.tabLabelType" },
    { "axisName": "State",      "axisValues": ["Default", "Active", "Hover", "Disabled"], "source": "is-selected" }
  ],
  "booleanProperties": [],
  "textProperties": [
    { "propertyName": "Tab Label", "layerName": "label--tab-text", "default": "Tab 1", "source": "tab label" }
  ],
  "measurements": { "tabHeight": 36, "padding": "8px 16px", "fontSize": 13, "gap": 4 }
}
```

### ZA View Tab
```json
{
  "variantAxes": [
    { "axisName": "State", "axisValues": ["Default", "Active", "Hover", "Dragging"], "source": "css + drag events" }
  ],
  "booleanProperties": [
    { "propertyName": "Show Close Button", "defaultValue": true,  "source": "tabClose element" },
    { "propertyName": "Show Icon",         "defaultValue": true,  "source": "tabIcon element" }
  ],
  "textProperties": [
    { "propertyName": "Tab Name", "layerName": "label--tab-name", "default": "View Name", "source": "displayName" }
  ],
  "measurements": { "height": 36, "paddingTop": 8, "paddingRight": 12, "paddingBottom": 8, "paddingLeft": 12, "gap": 8, "iconSize": 16, "fontSize": 13 }
}
```

### Search (ZASearchComponent)
```json
{
  "variantAxes": [
    { "axisName": "Transition", "axisValues": ["default", "hidden", "extend"],        "source": "attrs.transition" },
    { "axisName": "State",      "axisValues": ["Default", "Focus", "HasValue"],       "source": "has-focus + value check" },
    { "axisName": "IconSide",   "axisValues": ["left", "right"],                      "source": "attrs.iconPlacement" }
  ],
  "booleanProperties": [
    { "propertyName": "Show Dropdown", "defaultValue": false, "source": "attrs.dropDownCallBack" }
  ],
  "textProperties": [
    { "propertyName": "Placeholder", "layerName": "label--search-placeholder", "default": "Search", "source": "attrs.placeHolder" }
  ],
  "measurements": { "height": 32, "iconSize": 16, "borderRadius": 3, "fontSize": 13, "paddingTop": 6, "paddingRight": 10, "paddingBottom": 6, "paddingLeft": 10 }
}
```

### Accordion
```json
{
  "variantAxes": [
    { "axisName": "State",        "axisValues": ["Collapsed", "Expanded"],   "source": "is-selected" },
    { "axisName": "IconPosition", "axisValues": ["left", "right"],           "source": "attrs.iconPosition" },
    { "axisName": "HeaderType",   "axisValues": ["icon-heading", "heading"], "source": "attrs.headerContentType" }
  ],
  "booleanProperties": [
    { "propertyName": "Sortable", "defaultValue": false, "source": "attrs.sortable" }
  ],
  "textProperties": [
    { "propertyName": "Heading", "layerName": "label--accordion-heading", "default": "Section Heading", "source": "panel heading" }
  ],
  "measurements": { "headerHeight": 40, "paddingTop": 10, "paddingRight": 16, "paddingBottom": 10, "paddingLeft": 16, "fontSize": 13, "iconSize": 16 }
}
```

### Popover
```json
{
  "variantAxes": [
    { "axisName": "Position", "axisValues": ["top", "bottom", "left", "right", "auto"], "source": "attrs.position" },
    { "axisName": "Type",     "axisValues": ["modeless", "modal"],                      "source": "attrs.type" }
  ],
  "booleanProperties": [
    { "propertyName": "Show Close Button", "defaultValue": false, "source": "attrs.closeButton" }
  ],
  "textProperties": [
    { "propertyName": "Title",   "layerName": "label--popover-title",   "default": "Title",        "source": "attrs.title" },
    { "propertyName": "Content", "layerName": "label--popover-content", "default": "Content here", "source": "attrs.content" }
  ],
  "measurements": { "borderRadius": 4, "padding": 16, "fontSize": 13 }
}
```

### Slider
```json
{
  "variantAxes": [
    { "axisName": "Orientation", "axisValues": ["horizontal", "vertical"],            "source": "attrs.orientation" },
    { "axisName": "State",       "axisValues": ["Default", "Hover", "Disabled", "Dragging"], "source": "attrs.disabled" },
    { "axisName": "Tooltip",     "axisValues": ["never", "always", "focus"],          "source": "attrs.showTooltip" }
  ],
  "booleanProperties": [
    { "propertyName": "Show Ticks",   "defaultValue": false, "source": "attrs.showTicks" },
    { "propertyName": "Show Tooltip", "defaultValue": false, "source": "attrs.showTooltip" }
  ],
  "textProperties": [],
  "measurements": { "trackHeight": 4, "thumbSize": 16, "tooltipHeight": 28, "fontSize": 12 }
}
```

### Panel
```json
{
  "variantAxes": [
    { "axisName": "State",        "axisValues": ["Expanded", "Collapsed"], "source": "attrs.isActive + is-selected" },
    { "axisName": "IconPosition", "axisValues": ["left", "right"],        "source": "attrs.iconPosition" }
  ],
  "booleanProperties": [
    { "propertyName": "Show Icon", "defaultValue": true, "source": "attrs.collapseIconClass" }
  ],
  "textProperties": [
    { "propertyName": "Heading", "layerName": "label--panel-heading", "default": "Panel Heading", "source": "attrs.heading" },
    { "propertyName": "Content", "layerName": "label--panel-content", "default": "Panel content", "source": "attrs.content" }
  ],
  "measurements": { "headerHeight": 40, "paddingTop": 10, "paddingRight": 16, "paddingBottom": 10, "paddingLeft": 16, "fontSize": 13 }
}
```

---

## Output Contract

```json
{
  "codeAgent": {
    "status": "COMPLETE | PARTIAL | NOT_FOUND",
    "componentName": "Button",
    "repoFile": "codebase/zohoanalytics/source/components/zbutton/js/zbutton-main.js",
    "confidence": "high",
    "variantAxes": [ ... ],
    "booleanProperties": [ ... ],
    "textProperties": [ ... ],
    "measurements": { ... },
    "cssClassPattern": "zbutton zbutton--{appearance} zbutton--{size}",
    "stateClasses": { "Disabled": "is-disabled", "Focus": "has-focus", "Selected": "is-selected" }
  }
}
```

- `COMPLETE` — found in pre-built reference or read from `codebase/` file successfully
- `PARTIAL` — component found but some props unresolved — list gaps in output
- `NOT_FOUND` — not in codebase; pipeline falls back to Vision Agent / manual brief only

---

## Priority Rules

| Data type | Code Agent | Vision Agent | Winner |
|---|---|---|---|
| Variant axis names + values | ✅ Exact from `attrs` | Inferred visually | **Code Agent** |
| Boolean property names | ✅ Exact from `attrs` | Inferred from screenshots | **Code Agent** |
| Text property names | ✅ Exact from `attrs` | Inferred from screenshots | **Code Agent** |
| px measurements (padding, height, radius) | ✅ Exact from SCSS | Estimated ±4px | **Code Agent** |
| Colors / fills | Token mapping (approximate) | Token mapping (approximate) | Figma URL > either |
| Shadow / elevation | ❌ Not in SCSS | Estimated | Vision Agent |

> **Rule:** When `codeAgent.status = "COMPLETE"`, Spec Agent uses Code Agent output directly for `variantAxes`, `booleanProperties`, `textProperties`, and `measurements`. Vision Agent is still used for colors and shadow — but its structural estimates are discarded in favour of code.
