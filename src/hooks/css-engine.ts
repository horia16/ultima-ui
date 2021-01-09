export interface Selector {
  name: string;
  properties: Array<{ key: string; value: string }>;
}

export interface SheetClass {
  name: string;
  properties: Array<{ key: string; value: string }>;
  selectors: Array<Selector>;
}

export interface Sheet {
  element: HTMLStyleElement;
  init: boolean;
  classes: Array<SheetClass>;
}
export const sheet: Sheet = {
  element: document.createElement("style"),
  init: false,
  classes: [],
};

export function createClass(
  name: string,
  properties?: Array<{ key: string; value: string }>,
  selectors?: Array<Selector>
) {
  const sheetClass: SheetClass = {
    name: name,
    properties: properties ? properties : [],
    selectors: selectors ? selectors : [],
  };
  sheet.classes.push(sheetClass);
}
export function addPropertiesToClass(
  className: string,
  properties: Array<{ key: string; value: string }>
) {
  const sheetClass = sheet.classes.find((x) => (x.name = className));
  if (sheetClass) {
    sheetClass.properties = [...sheetClass.properties, ...properties];
  }
}
function generateHTMLFromSheetClass(sheetClass: SheetClass) {
  let html = "";
  for (let index = 0; index < sheetClass.properties.length; index++) {
    const property = sheetClass.properties[index];
    html += `${property.key}:${property.value}; `;
  }
  return html;
}

export function generateHTML() {
  for (let index = 0; index < sheet.classes.length; index++) {
    const sheetClass = sheet.classes[index];
    if (sheet.element.sheet)
      sheet.element.sheet.addRule(
        sheetClass.name,
        generateHTMLFromSheetClass(sheetClass),
        index
      );
    //   sheet.element.sheet?.rules[0].
  }
}
export function useCssEngine() {
  if (!sheet.init) {
    document.head.appendChild(sheet.element);
    generateHTML();
  }
  return sheet;
}
