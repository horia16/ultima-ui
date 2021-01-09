import { App } from "vue";
import Iconify from "@iconify/iconify";
import UIcon from "@/components/UIcon/UIcon.vue";
import UButton from "@/components/UButton/UButton.vue";
import UltimaApp from "@/components/UltimaApp/UltimaApp.vue";
import { create, UltimaOptions } from "./hooks/ultima";
export default {
  install: (app: App<Element>, options: UltimaOptions | null = null) => {
    Iconify.ready(() => {
      return;
    });
    if (options) create(options);
    app.component("ultima-app", UltimaApp);
    app.component("u-icon", UIcon);
    app.component("u-button", UButton);
  },
};
