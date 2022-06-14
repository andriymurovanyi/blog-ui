<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" v-if="isOpened">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <div class="header">
          <slot name="header" />
        </div>
        <div
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            This is the default body!
          </slot>
        </div>

        <slot name="footer" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  emits: ['input'],
  computed: {
    isOpened: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
      this.isOpened = false;
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  padding: 20px;
  background: #FFFFFF;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 5px;
}
.header {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 20px;
}
.modal-body {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.close-wrapper {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .3s ease;
}
</style>