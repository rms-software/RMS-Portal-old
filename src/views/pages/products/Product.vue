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
        <div>
          Base price: &nbsp;&nbsp;&nbsp; <input type="number" v-model="form.basePrice" placeholder="€ 0.00" />
        </div>
      </div>
    </Box>

    <button class="btn add text" @click="submitForm">
      <unicon :name="form.id ? 'save' : 'plus'" fill="white"></unicon> {{ form.id ? 'Edit' : 'Add' }} product
    </button>
  </div>
</template>

<script>

// Import components
import Box from "@/components/common/Box";
import Table from "@/components/common/Table";
import ImageUploader from "@/components/common/ImageUploader";

// Import services
import ProductService from "@/services/ProductService";

export default {
  components: {
    Box,
    Table,
    ImageUploader
  },

  data: () => ({
    form: {
      id: null,
      name: "",
      description: "",
      image: null,
      basePrice: 0
    },
  }),

  async mounted() {
    // Get the product id from the URL
    const productId = this.$route.params.productId;

    // If the product id is set,
    // then retrieve the info of the product
    if (productId !== "new") {
      try {
        this.form = await ProductService.getProduct(productId);
      } catch (e) {
        notifications.add("error", "Something went wrong retrieving this product");
      }
    }
  },

  methods: {
    async submitForm() {
      await ProductService.updateProduct(this.form);

      await this.$router.push('/rms/products');
      this.$router.go(1);
      notifications.add("info", "New product created");
    },
  }
}
</script>

<style scoped lang="scss">
@import "../../../scss/views/pages/products/product.scss";
</style>