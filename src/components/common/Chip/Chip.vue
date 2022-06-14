<template>
  <button
    class="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Chip',
}
</script>