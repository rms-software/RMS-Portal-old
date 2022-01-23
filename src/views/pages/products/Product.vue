<template>
  <div id="product">
    <Box title="General information" collapsable>
      <div id="general-product-info">
        Product name <br />
        <input type="text" v-model="form.name" />

        <br /><br />

        Product description <br />
        <textarea v-model="form.description"></textarea>

        <br /><br />

        Product image <br />
        <ImageUploader id="image-uploader" v-model="form.image" />
      </div>
    </Box>

    <Box title="Pricing" collapsable>
      <div id="product-pricing-info">

      </div>
    </Box>

    <button class="btn add text" @click="submitForm">
      <unicon name="plus" fill="white"></unicon> Add product
    </button>
  </div>
</template>

<script>
import Box from "@/components/common/Box";
import ImageUploader from "@/components/common/ImageUploader";
import ProductService from "@/services/ProductService";

export default {
  components: {
    Box,
    ImageUploader
  },

  data: () => ({
    form: {
      id: null,
      name: "",
      description: "",
      image: ""
    }
  }),

  methods: {
    async submitForm() {
      await ProductService.updateProduct(this.form);
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../scss/views/pages/products/product.scss";
</style>