import { reactive } from "vue";
import { ColorSet, createColorSet } from "./color-creator";
import { useCssEngine } from "./css-engine";
import { createAll } from "./style-creator";

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
    colors: [
      { name: "primary", hex: "#007bff" },
      { name: "secondary", hex: "#5a6169" },
      { name: "success", hex: "#17c671" },
      { name: "warning", hex: "#ffb400" },
      { name: "info", hex: "#00b8d8" },
      { name: "error", hex: "#c4183c" },
    ],
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

  ultimaApp.appOptions.dark = options.dark ? options.dark : false;
  if (options.colors) {
    ultimaApp.appOptions.colors = [
      ...ultimaApp.appOptions.colors,
      ...options.colors,
    ];
  }
  // Set the dark mode to false
  setDark(ultimaApp.appOptions.dark);
  // Loop through the color sets and apply the styles
  for (let index = 0; index < ultimaApp.appOptions.colors.length; index++) {
    const colorSet = ultimaApp.appOptions.colors[index];
    createColorSet(colorSet.name, colorSet.hex);
  }
  createAll();
  const sheet = useCssEngine();
  console.log(sheet.element.sheet?.rules);

  // App done initialization
  ultimaApp.init = true;
}
