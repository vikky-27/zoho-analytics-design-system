/**
 * token-audit.js
 * Run via figma_execute in Figma Desktop (Desktop Bridge plugin).
 *
 * Usage:
 *   1. Select the component frame or component set to audit in Figma.
 *   2. Run: figma_execute({ code: <contents of this file> })
 *   3. Review the returned report. Fix all FAIL issues before proceeding
 *      to screenshot verification.
 *
 * What it checks:
 *   - Hardcoded fill colours (not bound to a Figma variable)
 *   - Hardcoded stroke colours (not bound to a Figma variable)
 *   - Hardcoded corner radius values (not bound to a Figma variable)
 *   - Wrong font family (must be Zoho Puvi or Lato)
 *   - Hardcoded font size (not bound to a Figma variable)
 *
 * Pass criteria: zero issues found.
 * Fail criteria: any issue found → list all offending nodes + fix instructions.
 */

const ALLOWED_FONT_FAMILIES = ["Zoho Puvi", "Lato"];

// These hardcoded colours are intentionally static and exempt from the audit.
const EXEMPT_HEX_VALUES = [
  "#FFFFFF", // Always White token — intentionally static
  "#000000"  // Always Black — intentionally static
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rgbToHex(r, g, b) {
  const toHex = v => Math.round(v * 255).toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function isExempt(hex) {
  return EXEMPT_HEX_VALUES.includes(hex.toUpperCase());
}

let nodeCount = 0;
const issues = [];

// ─── Audit logic ──────────────────────────────────────────────────────────────

function auditNode(node) {
  nodeCount++;

  // 1. Check fills
  if ("fills" in node && node.fills !== figma.mixed && Array.isArray(node.fills)) {
    node.fills.forEach((fill, i) => {
      if (fill.type === "SOLID" && fill.visible !== false) {
        const isBound = node.boundVariables?.fills?.[i]?.color;
        if (!isBound) {
          const hex = rgbToHex(fill.color.r, fill.color.g, fill.color.b);
          if (!isExempt(hex)) {
            issues.push({
              severity: "FAIL",
              type: "hardcoded_fill",
              nodeId: node.id,
              nodeName: node.name,
              nodeType: node.type,
              value: hex,
              fix: `Bind fill to a Figma variable. Look up ${hex} in resolved-tokens.json and apply the matching token via figma.variables.setBoundVariableForPaint().`
            });
          }
        }
      }
    });
  }

  // 2. Check strokes
  if ("strokes" in node && node.strokes !== figma.mixed && Array.isArray(node.strokes) && node.strokes.length > 0) {
    node.strokes.forEach((stroke, i) => {
      if (stroke.type === "SOLID" && stroke.visible !== false) {
        const isBound = node.boundVariables?.strokes?.[i]?.color;
        if (!isBound) {
          const hex = rgbToHex(stroke.color.r, stroke.color.g, stroke.color.b);
          if (!isExempt(hex)) {
            issues.push({
              severity: "FAIL",
              type: "hardcoded_stroke",
              nodeId: node.id,
              nodeName: node.name,
              nodeType: node.type,
              value: hex,
              fix: `Bind stroke to a Figma variable. Look up ${hex} in resolved-tokens.json and apply the matching token.`
            });
          }
        }
      }
    });
  }

  // 3. Check corner radius
  if ("cornerRadius" in node && typeof node.cornerRadius === "number" && node.cornerRadius > 0) {
    const isBound = node.boundVariables?.cornerRadius;
    if (!isBound) {
      issues.push({
        severity: "FAIL",
        type: "hardcoded_radius",
        nodeId: node.id,
        nodeName: node.name,
        nodeType: node.type,
        value: `${node.cornerRadius}px`,
        fix: `Bind cornerRadius to a Figma variable. Use tokens-border-radius.json or spacing.radius token for ${node.cornerRadius}px.`
      });
    }
  }

  // 4. Check font family
  if (node.type === "TEXT") {
    const fontName = node.fontName;
    if (fontName !== figma.mixed) {
      if (!ALLOWED_FONT_FAMILIES.includes(fontName.family)) {
        issues.push({
          severity: "FAIL",
          type: "wrong_font_family",
          nodeId: node.id,
          nodeName: node.name,
          nodeType: node.type,
          value: fontName.family,
          fix: `Change font to "Zoho Puvi" (primary) or "Lato" (secondary). Use typography.fontFamily tokens from resolved-tokens.json.`
        });
      }
    }
  }

  // 5. Check font size (should be bound to a variable if available)
  if (node.type === "TEXT") {
    const fontSize = node.fontSize;
    if (fontSize !== figma.mixed && typeof fontSize === "number") {
      const isBound = node.boundVariables?.fontSize;
      if (!isBound) {
        // Warn only — font size binding is ideal but not always possible depending on plugin setup
        issues.push({
          severity: "WARN",
          type: "unbound_font_size",
          nodeId: node.id,
          nodeName: node.name,
          nodeType: node.type,
          value: `${fontSize}px`,
          fix: `Consider binding fontSize to a Typography variable. Check tokens-typography.json scale for ${fontSize}px match.`
        });
      }
    }
  }

  // Recurse into children
  if ("children" in node) {
    for (const child of node.children) {
      auditNode(child);
    }
  }
}

// ─── Run ──────────────────────────────────────────────────────────────────────

const selection = figma.currentPage.selection;

if (selection.length === 0) {
  return {
    status: "ERROR",
    message: "No selection. Select the component frame or component set before running the token audit."
  };
}

for (const node of selection) {
  auditNode(node);
}

// ─── Build report ─────────────────────────────────────────────────────────────

const failIssues = issues.filter(i => i.severity === "FAIL");
const warnIssues = issues.filter(i => i.severity === "WARN");

const status = failIssues.length === 0 ? (warnIssues.length === 0 ? "PASS" : "WARN") : "FAIL";

const report = {
  status,
  summary: {
    nodesScanned: nodeCount,
    totalIssues: issues.length,
    failCount: failIssues.length,
    warnCount: warnIssues.length
  },
  fails: failIssues,
  warnings: warnIssues,
  verdict: status === "PASS"
    ? "All values are token-bound. Safe to proceed to screenshot verification (G1)."
    : status === "WARN"
    ? `${warnIssues.length} unbound font size(s) found. Review warnings. Safe to proceed but should be fixed before publish.`
    : `${failIssues.length} hardcoded value(s) found. Fix all FAILs before proceeding. Do NOT run screenshot verification until this audit passes.`,
  nextStep: status === "FAIL"
    ? "Fix each issue listed in 'fails'. Re-run token-audit.js after fixing. Repeat until status = PASS."
    : "Run verify-rubric checks via figma_capture_screenshot and vision agent evaluation."
};

return report;
