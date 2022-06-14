<template>
  <div class="text-field">
    <label :for="inputId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ label }}</label>
    <input
      :id="inputId"
      v-bind="$attrs"
      v-model="inputValue"
      type="text"
      placeholder=" "
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      required
    >
  </div>
</template>

<script>
import { v4 as uuidV4 } from 'uuid';
export default {
  name: 'TextField',
  props: {
    label: {
      type: String,
      default: 'Input label'
    },
    modelValue: {
      type: String,
      default: null
    }
  },
  data: () => ({
    inputId: 'input-id'
  }),
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  created() {
    this.inputId = uuidV4();
  }
};
</script>

<style scoped>

</style>