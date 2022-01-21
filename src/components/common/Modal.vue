<template>
  <div class="outer-modal">
    <div class="inner-modal">
      <div class="modal-header">
        <div class="modal-title">
          Modal title
        </div>

        <div class="modal-actions">
          <button class="button delete">
            <unicon name="x" fill="white" />
          </button>

          <button class="button add">
            <unicon name="check" fill="white" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    left: 5vh;
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

      button {
        justify-self: center;
      }
    }
  }
}
</style>