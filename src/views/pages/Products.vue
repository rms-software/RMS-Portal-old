<template>
  <div id="products">

    <div id="products-search">
      <input type="text" placeholder="Search..." v-model="searchQuery" />
      <button class="btn add text" @click="createProduct">
        <unicon name="plus" fill="white"></unicon> New product
      </button>
    </div>

    <div>
      <Card v-for="product in filteredProducts" :title="product.name" :image="product.image">
        <div class="product-buttons">
          <button class="btn edit text">
            <unicon name="pen" fill="white" /> Edit
          </button>

          <button class="btn delete text">
            <unicon name="trash" fill="white" /> Delete
          </button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from "@/components/common/Card";

export default {
  components: {
    Card
  },

  computed: {
    filteredProducts() {
      return this.products.filter(product => this.searchQuery === "" || product.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },

  data: () => ({
    searchQuery: "",
    products: []
  }),

  methods: {
    async createProduct() {
      await this.$router.push('/rms/products/new');
      this.$router.go(1);
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/views/pages/products.scss";
</style>