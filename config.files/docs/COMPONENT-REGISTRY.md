# Zoho Analytics Design System — Component Registry

> **Purpose:** Single source of truth for every component that exists or needs to be built.  
> **Pipeline agents read this** to know what's available and what's pending.  
> **Status key:** ✅ Done · 🔄 Partial (config or doc missing) · ⏳ Pending

---

## How to use this file

- **Before building** a new component: check status here. If `✅ Done`, instantiate from library.
- **After building** a new component: update status + fill in `figmaNodeId` + `variantKeys`.
- **Pipeline agents (Strategy 3):** check this file when `figma_get_library_components` returns no results.

---

## Status Summary

| Category | Done | Partial | Pending |
|---|---|---|---|
| Form Controls | 6 | 0 | 3 |
| Feedback & Status | 3 | 2 | 4 |
| Navigation | 2 | 1 | 3 |
| Data Display | 1 | 2 | 3 |
| Overlay | 1 | 1 | 2 |
| Layout | 2 | 1 | 2 |
| **Total** | **15** | **7** | **17** |

---

## 1. Form Controls

### 1.1 Button ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/buttonComponent.json` |
| Doc | `docs/components/buttonComponent.md` |
| Figma page | Components |
| Priority | High |

**Variant axes:** `Primary` (Yes / No) · `State` (Default / Hover / Disabled / Loading)  
**Boolean:** Show Icon  
**Text:** Label  

---

### 1.2 Input / Text Field ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/inputComponents.json` |
| Doc | `docs/components/inputComponent.md` |
| Priority | High |

**Variant axes:** `State` (Default / Focus / Error / Disabled / Filled)  
**Boolean:** Show Label · Show Helper Text · Show Icon Left · Show Icon Right · Show Clear Button  
**Text:** Label · Placeholder · Helper Text · Error Message  

---

### 1.3 Toggle ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/toggle-button-config.json` |
| Doc | `docs/components/toggleButton.md` |
| Priority | High |

**Variant axes:** `State` (Off / On / Disabled)  
**Boolean:** Show Label  
**Text:** Label  

---

### 1.4 Checkbox ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/checkbox-config.json` |
| Doc | `docs/components/checkbox.md` |
| Priority | High |

**Variant axes:** `State` (Unchecked / Checked / Indeterminate / Disabled)  
**Boolean:** Show Label  
**Text:** Label  

---

### 1.5 Radio Button ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/radio-button-config.json` |
| Doc | `docs/components/radioButton.md` |
| Priority | High |

**Variant axes:** `State` (Unselected / Selected / Disabled)  
**Boolean:** Show Label  
**Text:** Label  

---

### 1.6 Link Text ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/link-text-config.json` |
| Doc | `docs/components/linkText.md` |
| Priority | Medium |

**Variant axes:** `State` (Default / Hover / Visited / Disabled) · `Size` (sm / md / lg)  
**Boolean:** Show Icon  
**Text:** Label  

---

### 1.7 Select / Dropdown ⏳ Pending
| Field | Value |
|---|---|
| Priority | High |
| Aliases to try | Select, Dropdown, Combobox, Select Input |

**Variant axes:** `State` (Default / Open / Focused / Error / Disabled)  
**Boolean:** Show Label · Show Helper Text · Show Clear Button  
**Text:** Label · Placeholder · Selected Value · Helper Text  

---

### 1.8 Search Input ⏳ Pending
| Field | Value |
|---|---|
| Priority | High |
| Aliases to try | Search, Search Input, Search Field, Search Bar |

**Variant axes:** `State` (Default / Focus / Active / Disabled)  
**Boolean:** Show Clear Button  
**Text:** Placeholder · Value  

---

### 1.9 Textarea ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Textarea, Text Area, Multi-line Input |

**Variant axes:** `State` (Default / Focus / Error / Disabled / Filled)  
**Boolean:** Show Label · Show Helper Text · Show Character Count  
**Text:** Label · Placeholder · Helper Text  

---

## 2. Feedback & Status

### 2.1 Notification / Alert ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/notification-config.json` |
| Doc | `docs/components/notification.md` |
| Priority | High |

**Variant axes:** `Type` (Info / Success / Warning / Error) · `State` (Default / Dismissible)  
**Boolean:** Show Icon · Show Title · Show Close  
**Text:** Title · Message  

---

### 2.2 Empty State 🔄 Partial (config only)
| Field | Value |
|---|---|
| Config | `tokens/components/empty-state-config.json` ✅ |
| Doc | ⏳ Missing |
| Priority | Medium |

**Variant axes:** `Type` (No Data / No Results / Error / Access Denied / Not Found)  
**Boolean:** Show Illustration · Show Action Button  
**Text:** Title · Message · Action Label  

---

### 2.3 Badge / Tag / Chip ⏳ Pending
| Field | Value |
|---|---|
| Priority | High |
| Aliases to try | Badge, Tag, Chip, Label, Status Badge |

**Variant axes:** `Type` (Default / Success / Warning / Error / Info / Neutral) · `Size` (sm / md)  
**Boolean:** Show Icon · Show Close  
**Text:** Label  

---

### 2.4 Loader / Spinner ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Loader, Spinner, Loading, Progress Indicator |

**Variant axes:** `Size` (sm / md / lg) · `Type` (Spinner / Dots / Bar)  
**Boolean:** Show Label  
**Text:** Label  

---

### 2.5 Progress Bar ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Progress Bar, Progress Indicator, Loading Bar |

**Variant axes:** `State` (Default / Success / Error) · `Size` (sm / md)  
**Boolean:** Show Label · Show Percentage  
**Text:** Label  

---

### 2.6 Skeleton ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Skeleton, Skeleton Loader, Placeholder |

**Variant axes:** `Type` (Text / Avatar / Card / Table Row / List Item)  
**Boolean:** Animated  

---

### 2.7 Tooltip 🔄 Partial (referenced, not built)
| Field | Value |
|---|---|
| Config | ⏳ Missing |
| Doc | ⏳ Missing |
| Priority | High |
| Aliases to try | Tooltip, Info Tooltip, Help Tooltip |

**Variant axes:** `Position` (Top / Bottom / Left / Right) · `Type` (Default / Rich)  
**Boolean:** Show Arrow  
**Text:** Content  

---

## 3. Navigation

### 3.1 Sidepane Menu ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/sidepane-menu-config.json` |
| Doc | `docs/components/sidepane-menu.md` |
| Figma page | `Side Nav bar` |
| figmaNodeId | `4670:466` |
| Priority | High |

**Variant axes:** `State` (Default / Hover / Selected)  
**Notes:** Icon-rail navigation (64px wide). Contains specific NavItem instances per module.  

---

### 3.2 Sidepane Menu Item 🔄 Partial
| Field | Value |
|---|---|
| Config | `tokens/components/sidepane-menu-item-config.json` ✅ |
| Doc | `docs/components/sidepane-menu-item.md` ✅ |
| Figma page | `🟠 - Components` |
| figmaNodeId (Item) | `5013:10972` |
| figmaNodeId (Menu) | `5013:11021` |
| Priority | High |

**Variant axes:** `State` (Default / Hover / Active / Disabled) · `Level` (Parent / Child)  
**Boolean:** ShowIcon · ShowBadge · ShowExpandArrow  
**Text:** Label (`Label#...`) · BadgeCount (`BadgeCount#...`)  

---

### 3.3 Tabs ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/tabs-config.json` |
| Doc | `docs/components/tabs.md` |
| Figma page | `🟠 - Components` |
| figmaNodeId (Tab / Item) | `5023:12761` |
| figmaNodeId (Tab / Item — Segmented) | `5038:1528` |
| figmaNodeId (Tab / Bar) | `5023:12809` |
| Priority | High |

**Variant axes (Tab / Item):** `Style` (Line / Filled) · `State` (Default / Hover / Active / **Focused** / Disabled)  
**Variant axes (Tab / Item — Segmented):** `Position` (Start / Middle / End) · `State` (Default / Hover / Active)  
**Variant axes (Tab / Bar):** `Style` (Line / Filled) · `Overflow` (No / **Yes**)  
**Boolean (Tab / Item):** ShowIcon · ShowCount  
**Text:** Label · Count (Tab / Item) · Label (Segmented)  
**Codebase:** `ZATab.js` → Segmented style · `ZATabComponent.js` → Line/Filled + Focused state · `TabGroup.js` → Overflow arrows  
**CSS tokens:** `--tab-switch-border` · `--tab-switch-hover` · `--tab-switch-active` · `--za-accent-color` (focus outline) · `.MTS-Arrow` (overflow)  

---

### 3.4 Breadcrumb ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Breadcrumb, Breadcrumbs, Navigation Path |

**Variant axes:** `State` (Default / Truncated)  
**Boolean:** Show Home Icon  
**Text:** Item Label  
**Notes:** Build Breadcrumb Item + Breadcrumb Container.  

---

### 3.5 Pagination ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/pagination-config.json` |
| Doc | `docs/components/pagination.md` |
| Figma page | `🟠 - Components` |
| figmaNodeId (Item) | `4993:1452` |
| figmaNodeId (Nav)  | `4993:1465` |
| figmaNodeId (Bar)  | `4998:1446` |
| Priority | Medium |

**Component sets:** `Pagination / Item` · `Pagination / Nav` · `Pagination / Bar`  
**Variant axes:** `State` (Default / Active / Disabled) · `IsNext` (false / true) on Nav  
**Boolean:** ShowFirstLast · ShowPageSize (on Bar)  
**Text:** PageNumber (`PageNumber#4993:3`) · Showing label (`label--pagination-showing`)  

---

### 3.6 Top Navigation / Header ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Header, Top Bar, App Bar, Navbar |

**Variant axes:** `Style` (Light / Dark)  
**Boolean:** Show Logo · Show Search · Show User Avatar · Show Notifications  
**Text:** Title  

---

## 4. Data Display

### 4.1 List View ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/list-view-config.json` |
| Doc | `docs/components/listView.md` |
| Priority | High |

**Variant axes:** `State` (Default / Hover / Selected / Disabled)  
**Boolean:** Show Checkbox · Show Actions · Show Avatar  
**Text:** Title · Subtitle  

---

### 4.2 Stat Card 🔄 Partial (doc only)
| Field | Value |
|---|---|
| Config | ⏳ Missing |
| Doc | `docs/components/catalogStatCard.md` ✅ |
| Priority | High |
| Aliases to try | StatCard, Stat Card, KPI Card, Metric Card |

**Variant axes:** `Trend` (Up / Down / Neutral) · `Size` (sm / md / lg)  
**Boolean:** Show Trend Icon · Show Sparkline · Show Compare  
**Text:** Metric Name · Value · Change Label · Period Label  

---

### 4.3 Card Selection 🔄 Partial (config only)
| Field | Value |
|---|---|
| Config | `tokens/components/card-selection-config.json` ✅ |
| Doc | ⏳ Missing |
| Priority | Medium |

**Variant axes:** `State` (Default / Hover / Selected / Disabled)  
**Boolean:** Show Icon · Show Check Indicator · Show Description  
**Text:** Title · Description  

---

### 4.4 Avatar ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Avatar, User Avatar, Profile Picture, Profile Icon |

**Variant axes:** `Type` (Initials / Image / Icon) · `Size` (xs / sm / md / lg)  
**Boolean:** Show Status Indicator  
**Text:** Initials  

---

### 4.5 Data Grid Row ⏳ Pending
| Field | Value |
|---|---|
| Priority | High |
| Aliases to try | Table Row, Data Row, Grid Row, Table Cell |

**Variant axes:** `State` (Default / Hover / Selected / Disabled)  
**Boolean:** Show Checkbox · Show Actions · Show Expand  
**Text:** Cell Value  

---

### 4.6 Chart Placeholder ⏳ Pending
| Field | Value |
|---|---|
| Priority | Low |
| Aliases to try | Chart Placeholder, Empty Chart, Chart Container |

**Variant axes:** `Type` (Bar / Line / Pie / Donut / Table / KPI) · `State` (Loading / Empty / Error)  

---

## 5. Overlay

### 5.1 Modal / Dialog 🔄 Partial (doc only)
| Field | Value |
|---|---|
| Config | ⏳ Missing |
| Doc | `docs/components/modalsDialogs.md` ✅ |
| Priority | High |
| Aliases to try | Modal, Dialog, Overlay, Popup |

**Variant axes:** `Size` (sm / md / lg / full) · `Type` (Default / Confirmation / Alert)  
**Boolean:** Show Header · Show Footer · Show Close · Show Divider  
**Text:** Title · Description · Confirm Label · Cancel Label  

---

### 5.2 Popover ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Popover, Context Menu, Info Panel |

**Variant axes:** `Position` (Top / Bottom / Left / Right) · `Type` (Default / Rich / Menu)  
**Boolean:** Show Arrow · Show Close  
**Text:** Title · Content  

---

### 5.3 Sidepane / Panel ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/sidepane-panel-config.json` |
| Doc | `docs/components/sidepane-panel.md` |
| Figma page | `🟠 - Components` |
| figmaNodeId | `5015:11997` |
| Priority | High |

**Variant axes:** `Layer` (Layer1 / Layer2) · `ShowFooter` (Yes / No)  
**Boolean:** ShowHelpIcon  
**Text:** Title · CancelLabel · SaveLabel  
**Codebase:** `ZASidePane.js` — right-edge slide-in overlay with primary + secondary layer support  
**CSS class:** `newUiDialog sidepane za-sidepanel-dialog`  

---

## 6. Layout

### 6.1 Expand / Collapse Panel ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/expand-collapse-panel-config.json` |
| Doc | `docs/components/expand-collapse-panel.md` |
| Figma page | `🟠 - Components` |
| figmaNodeId | `4763:12843` |
| Priority | Medium |

**Variant axes:** `State` (Collapsed / Expanded)  
**Boolean:** Show Icon · Show Count  
**Text:** Title · Count  

---

### 6.2 Divider 🔄 Partial (referenced, not built)
| Field | Value |
|---|---|
| Config | ⏳ Missing |
| Doc | ⏳ Missing |
| Priority | Low |
| Aliases to try | Divider, Separator, Rule, Horizontal Rule |

**Variant axes:** `Direction` (Horizontal / Vertical) · `Style` (Solid / Dashed)  

---

### 6.3 Section Header ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Section Header, Page Header, Content Header |

**Variant axes:** `Level` (H1 / H2 / H3) · `Style` (Default / With Divider)  
**Boolean:** Show Actions · Show Back Button  
**Text:** Title · Subtitle  

---

### 6.4 Accordion ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/accordion-config.json` |
| Doc | `docs/components/accordion.md` |
| Figma page | `🟠 - Components` |
| figmaNodeId | `4986:1488` |
| Priority | Low |

**Variant axes:** `State` (Collapsed / Expanded / Disabled) · `Style` (Default / Bordered)  
**Boolean:** ShowIcon (chevron visibility)  
**Text:** Title (`label--accordion-title`) · Content (`label--accordion-content`)  
**Notes:** Distinct from Expand/Collapse Panel — general-purpose free-form content slot; not limited to label-field rows.  

---

## Quick Reference — Built Components (Figma Node IDs)

| Component | figmaNodeId | Figma Page |
|---|---|---|
| Button | *(see doc)* | Components |
| Input / Text Field | *(see doc)* | `01 - Input` |
| Toggle | *(see doc)* | Components |
| Checkbox | *(see doc)* | Components |
| Radio Button | *(see doc)* | Components |
| Link Text | *(see doc)* | Components |
| Notification / Alert | *(see doc)* | Components |
| Sidepane Menu | `4670:466` | `Side Nav bar` |
| Sidepane / Item | `5013:10972` | `🟠 - Components` |
| Sidepane / Menu | `5013:11021` | `🟠 - Components` |
| Sidepane / Panel | `5015:11997` | `🟠 - Components` |
| Pagination / Item | `4993:1452` | `🟠 - Components` |
| Pagination / Nav | `4993:1465` | `🟠 - Components` |
| Pagination / Bar | `4998:1446` | `🟠 - Components` |
| List View | *(see doc)* | Components |
| Expand / Collapse Panel | `4763:12843` | `🟠 - Components` |
| Accordion | `4986:1488` | `🟠 - Components` |
