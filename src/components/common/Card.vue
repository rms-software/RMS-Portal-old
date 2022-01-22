<template>
  <div id="card">
    <div id="card-title">
      {{ title }}
    </div>

    <div id="card-image">
      <img :src="image">
    </div>

    <div id="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },

    image: {
      type: String,
      default: ""
    }
  }
}
</script>

<style scoped lang="scss">
#card {
  background: #eee;
  width: 200px;
  height: 300px;
  display: inline-block;
  margin: 10px 10px;
  border-radius: 10px;

  #card-title {
    text-align: center;
    margin-top: 10px;
    font-weight: bold;
  }

  #card-image {
    text-align: center;
    margin-top: 10px;

    img {
      width: 150px;
      height: 150px;
      object-fit: cover;
    }
  }
}
</style>