import { createClass } from "@/hooks/css-engine";
import { ultimaApp } from "@/hooks/ultima";
export function createUButton() {
  for (let index = 0; index < ultimaApp.appOptions.colors.length; index++) {
    const colorSet = ultimaApp.appOptions.colors[index];
    createClass(`.u-button-${colorSet.name}:hover`, [
      {
        key: "box-shadow",
        value: `0 4px 15px 2px var(--${colorSet.name}-color-transparent)`,
      },
      {
        key: "background-color",
        value: `var(--${colorSet.name}-color-dark)`,
      },
    ]);
    createClass(`.u-button-${colorSet.name}:active`, [
      {
        key: "box-shadow",
        value: `0 0 5px 0px var(--${colorSet.name}-color-transparent)`,
      },
      {
        key: "background-color",
        value: `var(--${colorSet.name}-color-darkest)`,
      },
    ]);
  }
}
