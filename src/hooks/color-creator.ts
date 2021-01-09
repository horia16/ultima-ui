import { addPropertiesToClass, createClass, useCssEngine } from "./css-engine";

export interface ColorSet {
  name: string;
  hex: string;
}
/**
 * Set a color with a specific luminance and return it
 * @param property The property name
 * @param element The HTML element that the property will be applied
 * @param hex The hex code
 * @param lum The luminance factor between -1 and 1
 */
export function setColorWithLuminance(
  property: string,
  hex: string,
  lum: number
) {
  // Validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;
  // Convert to decimal and change luminosity
  let rgb = "#",
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }
  return { key: property, value: rgb };
}
/**
 * Returns either a light or a dark color based on a given hex string.
 * @param bgColor The color that we evaluate
 */
function pickTextColorBasedOnBgColorAdvanced(bgColor: string) {
  const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  const uiColors = [r / 255, g / 255, b / 255];
  const c = uiColors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.249 ? "#111111" : "#ffffff";
}
// The root element
createClass(":root", []);

export function createVariants(
  baseSelector: string,
  properties: Array<{ key: string; value: string }>
) {
  createClass(`${baseSelector}`, properties);
  createClass(`${baseSelector}:hover`, properties);
  createClass(`${baseSelector}:active`, properties);
}
/**
 * Create a set of colors with light and dark variants and apply it to the :root class
 * @param name The name of the color set
 * @param hex The base color Ex: #FFFFFF
 * @param elem The HTML element that the set will be applied to. Default root
 */
export function createColorSet(name: string, hex: string) {
  addPropertiesToClass(":root", [
    { key: `--${name}-color`, value: hex },
    {
      key: `--${name}-color-text`,
      value: pickTextColorBasedOnBgColorAdvanced(hex),
    },
    {
      key: `--${name}-color-transparent`,
      value: `${hex}80`,
    },

    setColorWithLuminance(`--${name}-color-light`, hex, 0.1),
    setColorWithLuminance(`--${name}-color-lighter`, hex, 0.2),
    setColorWithLuminance(`--${name}-color-lightest`, hex, 0.3),
    setColorWithLuminance(`--${name}-color-dark`, hex, -0.1),
    setColorWithLuminance(`--${name}-color-darker`, hex, -0.2),
    setColorWithLuminance(`--${name}-color-darkest`, hex, -0.3),
  ]);
  createClass(`.bg-${name}-color`, [
    { key: "background-color", value: `var(--${name}-color)` },
  ]);
  createClass(`.bg-${name}-color-light`, [
    { key: "background-color", value: `var(--${name}-color-light)` },
  ]);
  createClass(`.bg-${name}-color-lighter`, [
    { key: "background-color", value: `var(--${name}-color-lighter)` },
  ]);
  createClass(`.bg-${name}-color-lightest`, [
    { key: "background-color", value: `var(--${name}-color-lightest)` },
  ]);
  createClass(`.bg-${name}-color-dark`, [
    { key: "background-color", value: `var(--${name}-color-dark)` },
  ]);
  createClass(`.bg-${name}-color-darker`, [
    { key: "background-color", value: `var(--${name}-color-darker)` },
  ]);
  createClass(`.bg-${name}-color-darkest`, [
    { key: "background-color", value: `var(--${name}-color-darkest)` },
  ]);
  createClass(`.bg-${name}-color-transparent`, [
    { key: "background-color", value: `var(--${name}-color-transparent)` },
  ]);
  createClass(`.text-${name}`, [
    { key: "color", value: `var(--${name}-color)` },
  ]);
  createClass(`.text-${name}-adaptive`, [
    { key: "color", value: `var(--${name}-color-text)` },
  ]);
}
