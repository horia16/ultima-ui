import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ultimaUi from "./ultima-ui";

createApp(App)
  .use(router)
  .use(ultimaUi, { dark: false })
  .mount("#app");
