# Zoho Analytics — Design System Components

> **Figma File:** [Design System – Zoho Analytics](https://www.figma.com/design/m2iOWX3I9aDI5kgyw4wCo0/Design-System--Zoho-Analytics)  
> **Stack:** Claude + Figma MCP (Desktop Bridge Plugin)  
> **Token source:** `config.files/tokens/resolved-tokens.json`  
> **Registry:** `config.files/docs/COMPONENT-REGISTRY.md`

---

## Progress Overview

| Status | Count | % |
|--------|------:|--:|
| ✅ Done | 16 | 41% |
| 🔄 Partial | 7 | 18% |
| ⏳ Pending | 16 | 41% |
| **Total** | **39** | — |

```
██████████░░░░░░░░░░░░░░░░░  41% complete
```

---

## 1. Form Controls

| # | Component | Status | Priority | Variants | Doc |
|---|-----------|--------|----------|----------|-----|
| 1.1 | Button | ✅ Done | 🔴 High | `Primary` × `State` (4) | [buttonComponent.md](config.files/docs/components/buttonComponent.md) |
| 1.2 | Input / Text Field | ✅ Done | 🔴 High | `State` (5) | [inputComponent.md](config.files/docs/components/inputComponent.md) |
| 1.3 | Toggle | ✅ Done | 🔴 High | `State` (3) | [toggleButton.md](config.files/docs/components/toggleButton.md) |
| 1.4 | Checkbox | ✅ Done | 🔴 High | `State` (4) | [checkbox.md](config.files/docs/components/checkbox.md) |
| 1.5 | Radio Button | ✅ Done | 🔴 High | `State` (3) | [radioButton.md](config.files/docs/components/radioButton.md) |
| 1.6 | Link Text | ✅ Done | 🟡 Medium | `State` (4) × `Size` (3) | [linkText.md](config.files/docs/components/linkText.md) |
| 1.7 | Select / Dropdown | ⏳ Pending | 🔴 High | `State` (5) | — |
| 1.8 | Search Input | ⏳ Pending | 🔴 High | `State` (4) | — |
| 1.9 | Textarea | ⏳ Pending | 🟡 Medium | `State` (5) | — |

---

## 2. Feedback & Status

| # | Component | Status | Priority | Variants | Doc |
|---|-----------|--------|----------|----------|-----|
| 2.1 | Notification / Alert | ✅ Done | 🔴 High | `Type` (4) × `State` (2) | [notification.md](config.files/docs/components/notification.md) |
| 2.2 | Empty State | 🔄 Partial | 🟡 Medium | `Type` (4) | — *(doc missing)* |
| 2.3 | Badge / Tag / Chip | ⏳ Pending | 🔴 High | `Type` (6) × `Size` (2) | — |
| 2.4 | Loader / Spinner | ⏳ Pending | 🟡 Medium | `Size` (3) × `Type` (3) | — |
| 2.5 | Progress Bar | ✅ Done | 🟡 Medium | `State` (3) × `Size` (2) | [progress-bar.md](config.files/docs/components/progress-bar.md) |
| 2.6 | Skeleton | ⏳ Pending | 🟡 Medium | `Type` (5) | — |
| 2.7 | Tooltip | 🔄 Partial | 🔴 High | `Position` (4) × `Type` (2) | — *(not built)* |

---

## 3. Navigation

| # | Component | Status | Priority | Variants | Doc |
|---|-----------|--------|----------|----------|-----|
| 3.1 | Sidepane Menu | ✅ Done | 🔴 High | `State` (2) | [sidepane-menu.md](config.files/docs/components/sidepane-menu.md) |
| 3.2 | Sidepane Menu Item | 🔄 Partial | 🔴 High | `State` (4) × `Level` (2) | [sidepane-menu-item.md](config.files/docs/components/sidepane-menu-item.md) |
| 3.3 | **Tabs** | ✅ Done | 🔴 High | `Style`×`State` (10 variants) + Segmented `Position`×`State` (9) + Bar `Style`×`Overflow` (4) | [tabs.md](config.files/docs/components/tabs.md) |
| 3.4 | Breadcrumb | ⏳ Pending | 🟡 Medium | `State` (2) | — |
| 3.5 | Pagination | ✅ Done | 🟡 Medium | `State` (3) · `IsNext` (2) | [pagination.md](config.files/docs/components/pagination.md) |
| 3.6 | Top Navigation / Header | ⏳ Pending | 🟡 Medium | `Style` (2) | — |

---

## 4. Data Display

| # | Component | Status | Priority | Variants | Doc |
|---|-----------|--------|----------|----------|-----|
| 4.1 | List View | ✅ Done | 🔴 High | `State` (4) | [listView.md](config.files/docs/components/listView.md) |
| 4.2 | Stat Card | 🔄 Partial | 🔴 High | `Trend` (3) × `Size` (3) | [catalogStatCard.md](config.files/docs/components/catalogStatCard.md) |
| 4.3 | Card Selection | 🔄 Partial | 🟡 Medium | `State` (4) | — *(doc missing)* |
| 4.4 | Avatar | ⏳ Pending | 🟡 Medium | `Type` (3) × `Size` (4) | — |
| 4.5 | Data Grid Row | ⏳ Pending | 🔴 High | `State` (4) | — |
| 4.6 | Chart Placeholder | ⏳ Pending | 🟢 Low | `Type` (5) × `State` (3) | — |

---

## 5. Overlay

| # | Component | Status | Priority | Variants | Doc |
|---|-----------|--------|----------|----------|-----|
| 5.1 | Modal / Dialog | 🔄 Partial | 🔴 High | `Size` (4) × `Type` (3) | [modalsDialogs.md](config.files/docs/components/modalsDialogs.md) |
| 5.2 | Popover | ⏳ Pending | 🟡 Medium | `Position` (4) × `Type` (3) | — |
| 5.3 | **Sidepane / Panel** | ✅ Done | 🔴 High | `Layer` (2) × `ShowFooter` (2) | [sidepane-panel.md](config.files/docs/components/sidepane-panel.md) |

---

## 6. Layout

| # | Component | Status | Priority | Variants | Doc |
|---|-----------|--------|----------|----------|-----|
| 6.1 | Expand / Collapse Panel | ✅ Done | 🟡 Medium | `State` (2) | [expand-collapse-panel.md](config.files/docs/components/expand-collapse-panel.md) |
| 6.2 | Divider | 🔄 Partial | 🟢 Low | `Direction` (2) × `Style` (2) | — *(not built)* |
| 6.3 | Section Header | ⏳ Pending | 🟡 Medium | `Level` (3) × `Style` (2) | — |
| 6.4 | Accordion | ✅ Done | 🟢 Low | `State` (3) × `Style` (2) | [accordion.md](config.files/docs/components/accordion.md) |

---

## Built Component — Figma Quick Reference

Components with a Figma node ID can be instantiated directly.

| Component | Figma Node ID | Page | Config |
|-----------|--------------|------|--------|
| Button | *(see doc)* | Components | [buttonComponent.json](config.files/tokens/components/buttonComponent.json) |
| Input / Text Field | *(see doc)* | `01 - Input` | [inputComponents.json](config.files/tokens/components/inputComponents.json) |
| Toggle | *(see doc)* | Components | [toggle-button-config.json](config.files/tokens/components/toggle-button-config.json) |
| Checkbox | *(see doc)* | Components | [checkbox-config.json](config.files/tokens/components/checkbox-config.json) |
| Radio Button | *(see doc)* | Components | [radio-button-config.json](config.files/tokens/components/radio-button-config.json) |
| Link Text | *(see doc)* | Components | [link-text-config.json](config.files/tokens/components/link-text-config.json) |
| Notification / Alert | *(see doc)* | Components | [notification-config.json](config.files/tokens/components/notification-config.json) |
| Sidepane Menu | *(see doc)* | Components | [sidepane-menu-config.json](config.files/tokens/components/sidepane-menu-config.json) |
| Pagination / Item | `4993:1452` | `🟠 - Components` | [pagination-config.json](config.files/tokens/components/pagination-config.json) |
| Pagination / Nav | `4993:1465` | `🟠 - Components` | [pagination-config.json](config.files/tokens/components/pagination-config.json) |
| Pagination / Bar | `4998:1446` | `🟠 - Components` | [pagination-config.json](config.files/tokens/components/pagination-config.json) |
| List View | *(see doc)* | Components | [list-view-config.json](config.files/tokens/components/list-view-config.json) |
| Expand / Collapse Panel | `4763:12843` | `🟠 - Components` | [expand-collapse-panel-config.json](config.files/tokens/components/expand-collapse-panel-config.json) |
| Accordion | `4986:1488` | `🟠 - Components` | [accordion-config.json](config.files/tokens/components/accordion-config.json) |
| Progress Bar | `5057:1581` | `🟠 - Components` | [progress-bar-config.json](config.files/tokens/components/progress-bar-config.json) |
| Sidepane / Panel | `5015:11997` | `🟠 - Components` | [sidepane-panel-config.json](config.files/tokens/components/sidepane-panel-config.json) |
| Tab / Item | `5023:12761` | `🟠 - Components` | [tabs-config.json](config.files/tokens/components/tabs-config.json) |
| Tab / Item — Segmented | `5038:1528` | `🟠 - Components` | [tabs-config.json](config.files/tokens/components/tabs-config.json) |
| Tab / Bar | `5023:12809` | `🟠 - Components` | [tabs-config.json](config.files/tokens/components/tabs-config.json) |
| Sidepane / Item | `5013:10972` | `🟠 - Components` | — |
| Sidepane / Menu | `5013:11021` | `🟠 - Components` | — |

---

## Build Priority Queue

Components ranked by impact — highest coverage first.

### 🔴 Round 1 — High priority (blockers)

| Rank | Component | Reason |
|------|-----------|--------|
| 1 | **Select / Dropdown** | Used in every form, filters, and settings screen |
| 2 | **Tabs** | Primary navigation on every analytics page |
| 3 | **Data Grid Row** | Core of the analytics data display |
| 4 | **Modal / Dialog** | Complete config + build (doc exists) |
| 5 | **Badge / Tag / Chip** | Used in lists, tables, notifications |
| 6 | **Tooltip** | Required for all chart data labels |

### 🟡 Round 2 — Medium priority (complete core system)

| Rank | Component | Reason |
|------|-----------|--------|
| 7 | **Stat Card** | Complete config + build (doc exists) |
| 8 | **Avatar** | Used in nav, lists, and comments |
| 9 | **Search Input** | Prominent in all analytics pages |
| 10 | **Popover** | Data point detail panels |
| 11 | **Section Header** | Page structure scaffolding |
| 12 | **Breadcrumb** | Navigation context for nested views |

### 🟢 Round 3 — Gap fills

| Rank | Component |
|------|-----------|
| 13 | Textarea |
| 14 | Loader / Spinner |
| 15 | ~~Progress Bar~~ ✅ |
| 16 | Skeleton |
| 17 | Drawer / Side Panel |
| 18 | Divider |
| 19 | Section Header |
| 20 | Chart Placeholder |
| 21 | Top Navigation / Header |

---

## Design Token Baseline

All components are token-bound — zero hardcoded values. Every fill, stroke, radius, and spacing references a path from `config.files/tokens/resolved-tokens.json`.

| Token category | File |
|----------------|------|
| Primitive colors | `config.files/tokens/foundations/primitives.json` |
| Semantic colors | `config.files/tokens/foundations/semantic-colors.json` |
| Spacing / sizing | `config.files/tokens/foundations/spacing.json` |
| Typography | `config.files/tokens/foundations/typography.json` |
| Border radius | `config.files/tokens/foundations/border-radius.json` |
| Flat lookup | `config.files/tokens/resolved-tokens.json` |

---

## How to Build a New Component

1. Check this file — if status is `⏳ Pending`, it needs to be built.
2. Read `config.files/pipeline/README.md` for the full AI agent pipeline.
3. Run **Code Agent** (`00-code-agent.md`) against `codebase/` to extract exact props.
4. Run **Spec Agent** → **Token Resolver** → **Orchestrator**.
5. After build: update `figmaNodeId` in the config JSON, set status to `✅ Done` here and in the registry.

> Full guide: [COMPONENT-CREATION-GUIDE.md](config.files/docs/COMPONENT-CREATION-GUIDE.md)
