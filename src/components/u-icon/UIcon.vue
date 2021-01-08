<template>
  <span class="iconify" :data-icon="name"></span>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
export default defineComponent({
  name: "UIcon",
  props: {
    name: { type: String, required: true },
  },
  components: {},
  setup() {
    return {};
  },
});
</script>
<style lang="scss"></style>
