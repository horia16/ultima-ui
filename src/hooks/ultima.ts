import { reactive } from "vue";
import { ColorSet, createColorSet } from "./color-creator";

export interface UltimaOptions {
  colors?: Array<ColorSet>;
  dark?: boolean;
}
interface UltimaOptionsDefault {
  colors: Array<ColorSet>;
  dark: boolean;
}

interface UltimaApp {
  appOptions: UltimaOptionsDefault;
  init: boolean;
}

export const ultimaApp: UltimaApp = reactive({
  init: false,
  appOptions: {
    colors: [{ name: "primary", hex: "#007BA7" }],
    dark: false,
  },
});
/**
 * Sets the app mode to dark or reverts back to light
 * @param value
 */
export function setDark(value: boolean) {
  ultimaApp.appOptions.dark = value;
  if (!value) {
    document.documentElement.style.setProperty("background-color", "#ffffff");
  } else {
    document.documentElement.style.setProperty("background-color", "#222222");
  }
}
/**
 * Create and init the Ultima UI app
 * @param options The app options
 */
export function create(options: UltimaOptions = {}) {
  // Default Options, merge with the user choices
  ultimaApp.appOptions = {
    ...ultimaApp.appOptions,
    ...options,
  };
  // Set the dark mode to false
  setDark(false);
  // Loop through the color sets and apply the styles
  for (let index = 0; index < ultimaApp.appOptions.colors.length; index++) {
    const colorSet = ultimaApp.appOptions.colors[index];
    createColorSet(colorSet.name, colorSet.hex);
  }
  // App done initialization
  ultimaApp.init = true;
}
