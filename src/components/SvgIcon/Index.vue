<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return {
      iconName: computed(() => `#icon-${props.iconClass}`)
    }
  }
})

</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  margin-right: 4px;
  fill: currentColor;
  overflow: hidden;
}
</style>
