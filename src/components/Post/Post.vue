<template>
  <div class='flex items-center justify-center m-5'>
    <div class="rounded-xl border p-5 shadow-md w-9/12 bg-white">
      <div class="flex w-full items-center justify-between border-b pb-3">
        <div class="flex items-center space-x-3">
          <div class="h-8 w-8 rounded-full bg-slate-400">
            <img src="/icons/user-icon.png" alt="user-icon">
          </div>
          <div class="text-lg font-bold text-slate-700">User №{{ details.userId }}</div>
        </div>
        <div class="flex items-center space-x-8">
          <v-chip>Category</v-chip>
          <div class="text-xs text-neutral-500">2 hours ago</div>
        </div>
      </div>

      <div class="mt-4 mb-6">
        <div class="mb-3 text-xl font-bold">{{ details.title }}</div>
        <div class="text-sm text-neutral-600">{{ details.body }}</div>
      </div>

      <div>
        <div class="flex items-center justify-between text-slate-500">
          <div class="flex space-x-4 md:space-x-2">
            <v-button @click="onRemoveClick" type="error">Remove</v-button>
            <v-button @click="onEditClick" type="primary">Edit</v-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vButton from '@/components/common/Button/Button.vue';
import vChip from '@/components/common/Chip/Chip.vue';

export default {
  name: 'Post',
  components: {
    vButton,
    vChip,
  },
  props: {
    details: {
      type: Object,
      default: () => {},
    }
  },
  emits: ['edit', 'remove'],
  methods: {
    onEditClick() {
      this.$emit('edit', this.details);
    },
    onRemoveClick() {
      this.$emit('remove', this.details);
    }
  }
}
</script>
