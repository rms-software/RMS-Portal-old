<template>
  <div>
    <input type="file" id="actual-btn" ref="image-uploader" hidden @change="setImage" />

    <!--our custom file upload button-->
    <div @click="pickImage" class='image-picker-overlay box' :style="`background: url(${value}) no-repeat;`">
      <unicon name="camera" class='content' />
    </div>
  </div>
</template>

<script>
// https://dev.to/faddalibrahim/how-to-create-a-custom-file-upload-button-using-html-css-and-javascript-1c03

export default {
  data: () => ({
  }),

  props: ['value'],

  methods: {
    pickImage() {
      this.$refs['image-uploader'].click();
    },

    setImage() {
      const fileReader  = new FileReader();
      const file = this.$refs['image-uploader'].files[0];
      const that = this;

      fileReader.onload = event => {
        that.$emit('input', event.target.result);
      };

      fileReader.readAsDataURL(file);
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  position: relative;
  width:    100%;
  opacity: 0.5;
  background: white;
  background-size: cover !important;
}

.box:before {
  content:     "";
  display:     block;
  padding-top: 100%;
}

.content {
  position: absolute;
  top:      50%;
  left:     50%;
  scale:    6;
}
</style>