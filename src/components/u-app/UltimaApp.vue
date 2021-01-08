<template>
  <span class="ultima-app">
    <slot></slot>
  </span>
</template>
<script lang="ts">
import { defineComponent, PropType, Ref, ref } from "vue";
import { create, ultimaApp, UltimaOptions } from "@/hooks/ultima";
export default defineComponent({
  name: "UltimaApp",
  props: {
    options: { type: Object as PropType<UltimaOptions>, default: {} },
  },
  components: {},
  setup(props) {
    if (!ultimaApp.init) create(props.options);
    return {
      ultimaApp,
    };
  },
});
</script>
<style lang="scss">
.ultima-app {
}
</style>
