<template>
  <span class="u-button">
    <button
      :type="type"
      :style="{ flexDirection: iconRight ? 'row-reverse' : 'row' }"
    >
      <u-icon class="u-button-icon" v-if="icon" :name="icon" />
      <div class="u-button-content">
        <slot></slot>
      </div>
    </button>
  </span>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import UIcon from "../u-icon/UIcon.vue";
export default defineComponent({
  name: "UButton",
  props: {
    icon: { type: String, default: null },
    iconRight: { type: Boolean, default: false },
    type: { type: String, default: "button" },
  },
  components: { UIcon },
  setup() {
    return {};
  },
});
</script>
<style lang="scss">
.u-button {
  display: block;
  user-select: none;

  button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.625rem;
    font-size: 1rem;
  }
  .u-button-icon {
    margin-left: 2px;
    margin-right: 2px;
  }
  .u-button-content {
    margin-left: 2px;
    margin-right: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
