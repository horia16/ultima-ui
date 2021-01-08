import { App } from "vue";
import Iconify from "@iconify/iconify";
import UButton from "@/components/u-button/UButton.vue";
import UltimaApp from "@/components/u-app/UltimaApp.vue";
import { create, UltimaOptions } from "./hooks/ultima";
export default {
  install: (app: App<Element>, options: UltimaOptions | null = null) => {
    Iconify.ready(() => {
      return;
    });
    if (options) create(options);
    app.component("ultima-app", UltimaApp);
    app.component("u-button", UButton);
  },
};
