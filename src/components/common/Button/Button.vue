<template>
  <button
    type="button"
    class="border text-white rounded-md px-4 py-1 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
    :class="typeClasses"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script>
const buttonsColorsMapping = {
  primary: 'indigo',
  success: 'green',
  error: 'red',
  warning: 'yellow',
  info: 'teal',
}

export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
  },
  emits: ['click'],
  computed: {
    typeClasses() {
      const buttonColor = buttonsColorsMapping[this.type];
      return [
        `border-${buttonColor}-500`,
        `bg-${buttonColor}-500`,
        `hover:bg-${buttonColor}-600`,
      ];
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
}
</script>

