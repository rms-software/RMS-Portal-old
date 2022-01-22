<template>
  <div v-if="visible" class="outer-modal">
    <div class="inner-modal">

      <div class="modal-header">
        <div class="modal-title">
          {{ title }}
        </div>
      </div>

      <div class="modal-body">
        <slot></slot>
      </div>

      <div class="modal-actions">
        <button class="button delete" @click="visible = false">
          <unicon name="x" fill="white" />
        </button>

        <button class="button add" @click="$emit('submit')">
          <unicon name="check" fill="white" />
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  },

  data: () => ({
    visible: false
  }),

  methods: {
    show() {
      this.visible = !this.visible;
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/main.scss";

.outer-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #0005;

  .inner-modal {
    position: relative;
    width: 90vw;
    height: 90vh;
    top: 5vh;
    left: 5vw;
    background: white;

    .modal-header {
      height: 50px;
      width: calc(90vw - 30px);
      background: lighten($color-main, 4);
      display: flex;
      align-items: center;
      padding: 0 15px;

      .modal-title {
        color: white;
        font-weight: bold;
      }
    }

    .modal-body {
      padding: 16px;
      height: calc(90vh - 130px);
      overflow-y: auto;
    }

    .modal-actions {
      position: absolute;
      bottom: 10px;
      right: 0;

      .button {
        margin-right: 10px;
      }
    }
  }
}
</style>