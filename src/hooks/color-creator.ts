export interface ColorSet {
  name: string;
  hex: string;
}
/**
 * Set a color with a specific luminance to an element
 * @param property The property name
 * @param element The HTML element that the property will be applied
 * @param hex The hex code
 * @param lum The luminance factor between -1 and 1
 */
export function setColorWithLuminance(
  property: string,
  element: HTMLElement,
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
  // Set the property on the element
  element.style.setProperty(property, rgb);
}
// The root element
const root = document.documentElement;
/**
 * Create a set of colors with light and dark variants and apply it to an element
 * @param name The name of the color set
 * @param hex The base color Ex: #FFFFFF
 * @param elem The HTML element that the set will be applied to. Default root
 */
export function createColorSet(
  name: string,
  hex: string,
  elem: HTMLElement = root
) {
  elem.style.setProperty(`--${name}-color`, hex);
  elem.style.setProperty(`--${name}-color-transparent`, `${hex}80`);
  setColorWithLuminance(`--${name}-color-light`, elem, hex, 0.1);
  setColorWithLuminance(`--${name}-color-lighter`, elem, hex, 0.2);
  setColorWithLuminance(`--${name}-color-lightest`, elem, hex, 0.3);
  setColorWithLuminance(`--${name}-color-dark`, elem, hex, -0.1);
  setColorWithLuminance(`--${name}-color-darker`, elem, hex, -0.2);
  setColorWithLuminance(`--${name}-color-darkest`, elem, hex, -0.3);
}
