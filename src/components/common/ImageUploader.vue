<template>
  <div>
    <input type="file" id="actual-btn" ref="image-uploader" hidden @change="changedFile()" accept="image/png, image/jpeg" />

    <!--our custom file upload button-->
    <div @click="pickImage" class='image-picker-overlay box' :style="`background: url(${imageData}) no-repeat;`">
      <unicon name="camera" class='content' />
    </div>
  </div>
</template>

<script>
// https://dev.to/faddalibrahim/how-to-create-a-custom-file-upload-button-using-html-css-and-javascript-1c03

// Import libraries
import Compress from "compress.js"

const compress = new Compress();

export default {
  props: ['value'],

  data: () => ({
    imageData: null,
  }),

  mounted() {
    console.log(this.value)
    const _this = this;
  },

  methods: {
    changedFile() {
      const file = (this.$refs['image-uploader'].files[0])
      
      this.imageData = window.URL.createObjectURL(file);
      this.$emit('input', file);
      console.log(this.imageData)
    },

    pickImage() {
      this.$refs['image-uploader'].click();
    }
  },

  watch: {
    'value': function() {
      if (this.value instanceof File) {
        this.imageData = window.URL.createObjectURL(this.value);
      } else {
        this.imageData = this.value;
      }
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