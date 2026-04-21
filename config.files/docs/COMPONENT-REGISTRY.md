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
| Navigation | 1 | 1 | 4 |
| Data Display | 1 | 2 | 3 |
| Overlay | 0 | 1 | 3 |
| Layout | 1 | 1 | 3 |
| **Total** | **12** | **7** | **20** |

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
| Aliases to try | Dropdown, Select, Combobox, Menu |

**Variant axes:** `State` (Default / Open / Selected / Disabled / Error)  
**Boolean:** Show Search · Show Clear · Show Multi-select  
**Text:** Placeholder · Selected Value · Label  
**Notes:** Includes trigger (closed state) + overlay (open state). Build as two linked components.

---

### 1.8 Search Input ⏳ Pending
| Field | Value |
|---|---|
| Priority | High |
| Aliases to try | Search, Search Input, Search Bar, Search Field |

**Variant axes:** `State` (Default / Active / Filled / Disabled)  
**Boolean:** Show Clear Button · Show Filter Icon  
**Text:** Placeholder · Value  

---

### 1.9 Textarea ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Textarea, Text Area, Multiline Input |

**Variant axes:** `State` (Default / Focus / Error / Disabled / Filled)  
**Boolean:** Show Label · Show Helper Text · Show Character Count  
**Text:** Label · Placeholder · Helper Text · Error Message  

---

## 2. Feedback & Status

### 2.1 Notification / Alert ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/notification-config.json` |
| Doc | `docs/components/notification.md` |
| Priority | High |

**Variant axes:** `Type` (Info / Success / Warning / Error) · `State` (Default / Dismissed)  
**Boolean:** Show Icon · Show Close · Show Action  
**Text:** Title · Description · Action Label  

---

### 2.2 Empty State 🔄 Partial (config only)
| Field | Value |
|---|---|
| Config | `tokens/components/empty-state-config.json` ✅ |
| Doc | `docs/components/empty-state.md` ⏳ Missing |
| Priority | Medium |

**Variant axes:** `Type` (No Data / No Results / Error / No Access)  
**Boolean:** Show Illustration · Show Action Button · Show Secondary Action  
**Text:** Title · Description · Action Label  

---

### 2.3 Badge / Tag / Chip ⏳ Pending
| Field | Value |
|---|---|
| Priority | High |
| Aliases to try | Badge, Tag, Chip, Label, Status Badge |

**Variant axes:** `Type` (Default / Success / Warning / Error / Info / Neutral) · `Size` (sm / md)  
**Boolean:** Show Icon · Show Close / Remove  
**Text:** Label  
**Notes:** Two sub-variants — removable (chip) and static (badge).

---

### 2.4 Loader / Spinner ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Loader, Spinner, Loading, Progress Spinner |

**Variant axes:** `Size` (sm / md / lg) · `Type` (Spinner / Dots / Bar)  
**Boolean:** Show Label  
**Text:** Label  

---

### 2.5 Progress Bar ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Progress, Progress Bar, Loading Bar |

**Variant axes:** `State` (Default / Success / Error) · `Size` (sm / md)  
**Boolean:** Show Label · Show Percentage  
**Text:** Label  

---

### 2.6 Skeleton / Loading Placeholder ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Skeleton, Shimmer, Placeholder, Loading Skeleton |

**Variant axes:** `Type` (Text / Avatar / Card / Table Row / Chart)  
**Boolean:** Show Animation  
**Notes:** No text properties — skeleton is purely structural.

---

### 2.7 Tooltip 🔄 Partial (doc referenced, not built)
| Field | Value |
|---|---|
| Config | ⏳ Missing |
| Doc | ⏳ Missing |
| Priority | High |
| Aliases to try | Tooltip, Info Tooltip, Hint |

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
| Priority | High |

**Variant axes:** `State` (Collapsed / Expanded)  
**Boolean:** Show Icons · Show Sub-items  

---

### 3.2 Sidepane Menu Item 🔄 Partial
| Field | Value |
|---|---|
| Config | `tokens/components/sidepane-menu-item-config.json` ✅ |
| Doc | `docs/components/sidepane-menu-item.md` ✅ |
| Priority | High |

**Variant axes:** `State` (Default / Hover / Active / Disabled) · `Level` (Parent / Child)  
**Boolean:** Show Icon · Show Badge · Show Expand Arrow  
**Text:** Label · Badge Count  

---

### 3.3 Tabs ⏳ Pending
| Field | Value |
|---|---|
| Priority | High |
| Aliases to try | Tabs, Tab Bar, Tab Group, Navigation Tabs |

**Variant axes:** `State` (Default / Active / Hover / Disabled) · `Style` (Line / Filled / Pill)  
**Boolean:** Show Icon · Show Count Badge  
**Text:** Label · Count  
**Notes:** Build Tab Bar (container) + Tab Item (individual) as separate but linked components.

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

### 3.5 Pagination ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Pagination, Page Control, Page Navigation |

**Variant axes:** `State` (Default / Active / Disabled) for page button  
**Boolean:** Show First/Last · Show Page Size Selector  
**Text:** Page Number · Total Label  

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

**Variant axes:** `Type` (Image / Initials / Icon) · `Size` (xs / sm / md / lg)  
**Boolean:** Show Status Dot · Show Badge  
**Text:** Initials  

---

### 4.5 Data Grid Row ⏳ Pending
| Field | Value |
|---|---|
| Priority | High |
| Aliases to try | Table Row, Data Row, Grid Row |

**Variant axes:** `State` (Default / Hover / Selected / Expanded)  
**Boolean:** Show Checkbox · Show Actions · Show Expand  
**Text:** Cell Value  
**Notes:** Build Row + Header Row + Cell as separate components.

---

### 4.6 Chart Placeholder / Chart Frame ⏳ Pending
| Field | Value |
|---|---|
| Priority | Low |
| Aliases to try | Chart, Chart Container, Chart Frame |

**Variant axes:** `Type` (Bar / Line / Pie / Donut / Area) · `State` (Loading / Empty / Filled)  
**Boolean:** Show Legend · Show Title · Show Toolbar  
**Text:** Title · Subtitle · No-data Message  
**Notes:** Placeholder frame only — actual chart rendering is code-side.

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

### 5.3 Drawer / Side Panel ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Drawer, Side Panel, Slide Panel, Sheet |

**Variant axes:** `Position` (Left / Right) · `Size` (sm / md / lg)  
**Boolean:** Show Header · Show Footer · Show Overlay  
**Text:** Title  

---

## 6. Layout

### 6.1 Expand / Collapse Panel ✅ Done
| Field | Value |
|---|---|
| Config | `tokens/components/expand-collapse-panel-config.json` |
| Doc | `docs/components/expand-collapse-panel.md` |
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
| Aliases to try | Divider, Separator, Rule, HR |

**Variant axes:** `Direction` (Horizontal / Vertical) · `Style` (Solid / Dashed · `Weight` (sm / md)  
**Boolean:** Show Label  
**Text:** Label  

---

### 6.3 Section Header ⏳ Pending
| Field | Value |
|---|---|
| Priority | Medium |
| Aliases to try | Section Header, Group Header, Page Section, Panel Header |

**Variant axes:** `Level` (Page / Section / Sub-section) · `Style` (Default / Bordered)  
**Boolean:** Show Action · Show Count · Show Divider Below  
**Text:** Title · Action Label · Count  

---

### 6.4 Accordion ⏳ Pending
| Field | Value |
|---|---|
| Priority | Low |
| Aliases to try | Accordion, Collapsible, Expandable Section |

**Variant axes:** `State` (Collapsed / Expanded / Disabled) · `Style` (Default / Bordered)  
**Boolean:** Show Icon  
**Text:** Title · Content Summary  
**Notes:** Expand/Collapse Panel is similar — check if reusable before building separately.

---

## Build Priority Order

Components in this order give maximum coverage across the UI fastest.

```
Round 1 — High priority, blockers for most screens
  1. Select / Dropdown       (form control needed everywhere)
  2. Tabs                    (navigation used on every analytics page)
  3. Data Grid Row           (core analytics data display)
  4. Modal / Dialog          (complete config + build)
  5. Badge / Tag             (used inside lists, tables, notifications)
  6. Tooltip                 (needed for all data labels)

Round 2 — Medium priority, completes core system
  7. Stat Card               (complete config + build)
  8. Avatar                  (used in nav and lists)
  9. Search Input            (prominent in analytics pages)
 10. Popover                 (data point detail panels)
 11. Section Header          (page structure)
 12. Breadcrumb              (navigation context)

Round 3 — Fills gaps
 13. Textarea
 14. Pagination
 15. Loader / Spinner
 16. Progress Bar
 17. Skeleton
 18. Drawer / Side Panel
 19. Divider
 20. Accordion
 21. Chart Placeholder
 22. Top Navigation / Header
```

---

## Quick Reference — Component Aliases

Use these when searching the Figma library (`figma_get_library_components`). Try ALL aliases before declaring not found.

| Component | Aliases |
|---|---|
| Button | Button, Btn, CTA, Action Button, Primary Button |
| Input | Input, Text Field, TextField, Text Input, Form Input |
| Toggle | Toggle, Switch, Toggle Button |
| Checkbox | Checkbox, Check box, Check Box |
| Radio Button | Radio, Radio Button, Radio Group |
| Link Text | Link, Link Text, Text Link, Hyperlink |
| Notification | Notification, Alert, Banner, Toast, Message |
| Empty State | Empty State, No Data, Zero State |
| Badge | Badge, Tag, Chip, Label, Status Tag |
| Dropdown | Dropdown, Select, Combobox, Menu |
| List View | List, List View, ListView, Table, Data Table |
| Tabs | Tabs, Tab Bar, Tab Group, Navigation Tabs |
| Modal | Modal, Dialog, Overlay, Popup |
| Tooltip | Tooltip, Info Tooltip, Hint |
| Card | Card, Panel, Surface, Container |
| Stat Card | StatCard, Stat Card, KPI Card, Metric Card |
| Avatar | Avatar, User Avatar, Profile Picture |
| Pagination | Pagination, Page Control, Page Navigation |
| Skeleton | Skeleton, Shimmer, Placeholder |
| Loader | Loader, Spinner, Loading, Progress Spinner |
| Drawer | Drawer, Side Panel, Slide Panel, Sheet |
| Accordion | Accordion, Collapsible, Expandable |
| Divider | Divider, Separator, Rule |
| Section Header | Section Header, Group Header, Panel Header |
| Breadcrumb | Breadcrumb, Breadcrumbs, Navigation Path |
| Search Input | Search, Search Input, Search Bar |
