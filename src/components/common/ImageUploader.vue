<template>
  <div>
    <input type="file" id="actual-btn" ref="image-uploader" hidden />

    <!--our custom file upload button-->
    <div @click="pickImage" class='image-picker-overlay box' :style="`background: url(${value}) no-repeat;`">
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
  data: () => ({
  }),

  props: ['value'],

  mounted() {
    const that = this;

    compress.attach('#actual-btn', {
      size: 0.051,
      quality: .75
    }).then(data => {
      const file = data[0]
      that.$emit('input', file.prefix + file.data);
      console.log(file.data.length)
    })
  },

  methods: {
    pickImage() {
      this.$refs['image-uploader'].click();
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