<template>
  <div v-if="visible" class="outer-modal">
    <div class="inner-modal">
      <div class="modal-body">
        {{ title }}
      </div>

      <div class="modal-actions">
        <button class="button delete" @click="visible = false">
          <unicon name="x" fill="white" />
        </button>

        <button class="button add" @click="confirm()">
          <unicon name="check" fill="white" />
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: "",
    func: null
  }),

  mounted() {
    const _this = this;

    window.confirm = (msg, func) => {
      _this.visible = true;
      _this.title = msg;
      _this.func = func;
    };
  },

  data: () => ({
    visible: false
  }),

  methods: {
    async confirm() {
      if (this.func.constructor.name === 'AsyncFunction')
        await this.func();
      else
        this.func();

      this.visible = false;
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
  background: #000d;
  z-index: 100;

  .inner-modal {
    position: relative;
    width: 90vw;
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
      overflow-y: auto;
    }

    .modal-actions {
      position: relative;
      bottom: 10px;
      left: 12px;

      .button {
        margin-right: 10px;
      }
    }
  }
}
</style>