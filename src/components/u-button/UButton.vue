<template>
  <span class="u-button">
    <button
      :type="type"
      :style="{ flexDirection: iconRight ? 'row-reverse' : 'row' }"
      class="bg-primary-color:hover"
      :class="[
        `bg-${color}-color`,
        `text-${color}-adaptive`,
        `u-button-${color}`,
      ]"
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
    color: { type: String, default: "primary" },
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
    font-weight: 300;
    border: 1px solid transparent;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
    line-height: 1.125;
    border-radius: 0.375rem;
    transition: all 0.25s cubic-bezier(0.27, 0.01, 0.38, 1.06);
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
    &:active {
      transition: none;
    }
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
