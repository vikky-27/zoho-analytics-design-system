# Sidepane / Panel

> **Figma Node ID:** `5015:11997`  
> **Figma Page:** `🟠 - Components`  
> **Config:** `tokens/components/sidepane-panel-config.json`  
> **Codebase:** `zohoanalyticsclient/src/js/component/sidepane/ZASidePane.js`  
> **CSS:** `ZABaseThemeDef.scss` → `.sidepane-container`, `.za-sidepanel-dialog`

---

## What is it?

A slide-in overlay panel that animates in from the **right edge of the viewport**. Used throughout Zoho Analytics for settings, configuration, drill-downs, sharing, and detail views. Distinct from a Modal/Dialog — it overlaps the content without blocking full viewport.

The panel supports **two independent layers**:
- **Layer 1** — the primary content pane
- **Layer 2** — a secondary sub-view that slides *over* Layer 1 (drill-down, nested detail). Has a back-navigation bar to return to Layer 1.

---

## Anatomy

```
┌──────────────────────────────────────────────────┐  ← sidepane-container
│                                                  │    borderRadius: 8px
│                                                  │    marginInlineEnd: 8px
│  ┌─ header (55px) ───────────────────────────┐   │
│  │ [←]  Panel Title            [help] [×]    │   │  ← back-btn only visible in Layer2
│  └───────────────────────────────────────────┘   │
│  ─────── header-divider (1px) ───────────────    │
│                                                  │
│  ┌─ body (FILL) ─────────────────────────────┐   │
│  │  padding: 20px all sides                  │   │
│  │  scrollable content area                  │   │
│  └───────────────────────────────────────────┘   │
│                                                  │
│  ─────── footer-divider (1px) ───────────────    │
│  ┌─ footer (64px) ───────────────────────────┐   │
│  │            [Cancel]  [Save]               │   │
│  └───────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

---

## Variant Axes

| Axis | Values | Notes |
|------|--------|-------|
| `Layer` | `Layer1` · `Layer2` | Layer2 adds the back-navigation bar. Layer sliding is animated in code via `slideOut()` / `slideIn()`. |
| `ShowFooter` | `Yes` · `No` | Hides the footer action area. Use `No` for read-only panels or those with inline auto-save. |

---

## Component Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ShowFooter` | `VARIANT` | `Yes` | Show/hide the footer action row |
| `Layer` | `VARIANT` | `Layer1` | Which panel layer is displayed |
| `ShowHelpIcon` | `BOOLEAN` | `true` | Help (?) icon visibility in header |
| `Title` | `TEXT` | `Panel Title` | Header title text |

> **Footer buttons** are existing **Button** component instances: `Cancel` (Primary=No) and `Save` (Primary=Yes). To change their labels, select the button on a panel instance and override the button's built-in `x` TEXT property.


---

## Token Reference

| Element | Token | Variable ID |
|---------|-------|-------------|
| Panel background | `ZA/Background/BG-Primary-Default` | `VariableID:575:273` |
| Footer background | `ZA/Background/BG-Primary-Subtle` | `VariableID:575:275` |
| Back-bar background | `ZA/Background/BG-Primary-Subtle` | `VariableID:575:275` |
| Header/footer dividers | `ZA/stroke/Stroke 1` | `VariableID:579:41` |
| Title + icon color | `ZA/Text/Text Primary` | `VariableID:575:276` |
| Description + back-label | `ZA/Text/Text Description` | `VariableID:575:277` |
| Save button fill | `ZA/Button/Button Fill/Button Primary` | `VariableID:577:38` |
| Save button text | `Color/Base/White` | `VariableID:189:170` |

---

## Sizing Rules

| Property | Value | Source |
|----------|-------|--------|
| Default width | `480px` | Codebase default |
| Narrow width | `320px` | `params.width = '320px'` |
| Wide width | `600px` | `params.width = '600px'` |
| Header height | `55px` | `--za-sidepane-header-height` |
| Footer height | `64px` | `--za-sidepane-footer-height` |
| Border radius | `8px` | `.za-sidepanel-dialog .sidepane-container` |
| Right margin | `8px` | `margin-inline-end: 8px` |
| Shadow | `0px 0px 25px rgba(0,0,0,0.20)` | `box-shadow` |

---

## Layer 2 Behaviour

When Layer 2 is triggered (`pane.slideOut()`):
1. Layer 1 slides off-screen to the left (using `insetInlineEnd` animation)
2. Layer 2 slides in from the right within the same container
3. A **back-navigation bar** (40px) appears at the top showing the Layer 1 title
4. Clicking the back bar calls `pane.slideIn()` to return to Layer 1

In Figma, Layer2 is represented as a separate variant — `Layer=Layer2`. Use it to design the sub-view state of the panel.

---

## Layer Hierarchy in DOM

```html
<div class="newUiDialog sidepane za-sidepanel-dialog">
  <!-- Layer 1 -->
  <div class="sidepane-container" data-layer-1>
    <div class="panel sidepane-layer-1">
      <header>
        <span data-header-1>Panel Title</span>
        <div class="sidepane-icons">
          <span class="sidepane-helpicon">…</span>
          <span class="sidepane-closeicon">…</span>
        </div>
      </header>
      <section data-body-1><!-- body content --></section>
      <footer data-footer-1><!-- footer buttons --></footer>
    </div>
  </div>

  <!-- Layer 2 (hidden initially, slides in on slideOut()) -->
  <div class="sidepane-container" data-layer-2 style="display:none">
    <header data-header-2>Sub-panel Title</header>
    <div class="panel sidepane-layer-2">
      <section data-body-2><!-- layer2 body --></section>
      <footer data-footer-2><!-- layer2 footer --></footer>
    </div>
  </div>
</div>
```

---

## Code Instantiation

### Basic panel (Layer 1 only)

```js
import ZASidePane from '../../component/sidepane/ZASidePane';

const pane = new ZASidePane();
pane.show({
  header1: 'Panel Title',
  body1: contentElement,
  footer1: pane.constructFooterEl({
    buttonList: [
      { name: 'Save', isPrimary: true, onClick: () => { /* save */ } },
      { name: 'Cancel' }
    ]
  })
});
```

### With description + help doc

```js
pane.show({
  header1: 'Share Report',
  desc1: 'Manage who can access this report',
  body1: shareBody,
  helpdoc: 'https://help.zoho.com/portal/en/kb/...',
  footer1: pane.constructFooterEl({ buttonList: [...] })
});
```

### Panel with Layer 2

```js
// Open primary panel
pane.show({ header1: 'Reports', body1: reportList });

// Trigger Layer 2 from within Layer 1 body
reportItem.addEventListener('click', () => {
  pane.slideOut();
  // At this point body2 and header2 must already be set in the show() params:
  // header2: 'Report Detail',
  // body2: detailElement,
  // footer2: footerElement
});
```

---

## Figma Instantiation

```js
// Get the component set
const cs = await figma.getNodeByIdAsync('5015:11997');

// Pick a specific variant
const layer1WithFooter = cs.children.find(c => c.name === 'Layer=Layer1, ShowFooter=Yes');
const inst = layer1WithFooter.createInstance();

// Configure properties
const propDefs = cs.componentPropertyDefinitions;
const titleKey  = Object.keys(propDefs).find(k => k.startsWith('Title'));
const saveKey   = Object.keys(propDefs).find(k => k.startsWith('SaveLabel'));
inst.setProperties({
  [titleKey]:  'Add Data Source',
  [saveKey]:   'Connect',
});

page.appendChild(inst);
```

---

## Design Rules

1. **Never use raw `figma.createFrame()`** to build a sidepane from scratch — always instantiate from `Sidepane / Panel` (node `5015:11997`).
2. **Width 480px** is the default. Use `320px` for narrow informational panels, `600px` for data-heavy panels.
3. **Footer is required** when the panel makes a change that needs confirmation. For read-only panels, use `ShowFooter=No`.
4. **Layer 2** is for sub-views (e.g. clicking a row in Layer 1 to see details). Never open a new sidepane for this.
5. **Help icon** should link to the relevant Zoho Analytics help article. Hide it (`ShowHelpIcon=false`) only for internal-only panels.
6. The `description` line in the header is optional. Use it only when the title alone is not self-explanatory.
