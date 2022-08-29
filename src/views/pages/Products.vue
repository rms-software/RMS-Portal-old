<template>
  <div id="products">
    <Modal ref="ProductDeletion" title="Deleting product" @submit="deleteProduct">
      Are you sure you want to delete this product?
    </Modal>

    <div id="products-search">
      <input type="text" placeholder="Search..." v-model="searchQuery" />
      <button class="btn add text" @click="createProduct">
        <unicon name="plus" fill="white"></unicon> New product
      </button>
    </div>

    <div id="products-grid">
      <Card v-for="product in filteredProducts" :title="product.name" :image="product.image" :key="product.id">
        <div class="product-buttons">
          <button class="btn edit text" @click="editProduct(product)">
            <unicon name="pen" fill="white" /> Edit
          </button>

          <button class="btn delete text" @click="askDeleteProduct(product)">
            <unicon name="trash" fill="white" /> Delete
          </button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>

// Import components
import Card from "@/components/common/Card";
import Modal from "@/components/common/Modal";

// Import services
import ProductService from "@/services/ProductService";

export default {
  components: {
    Card,
    Modal
  },

  computed: {
    filteredProducts() {
      return this.products.filter(product => this.searchQuery === "" || product.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },

  data: () => ({
    searchQuery: "",
    activeProduct: null,
    products: []
  }),

  async mounted() {
    await this.loadproducts();
  },

  methods: {
    async createProduct() {
      await this.$router.push('/rms/products/new');
      this.$router.go(1);
    },

    async editProduct(product) {
      await this.$router.push('/rms/products/' + product.id);
      this.$router.go(1);
    },

    askDeleteProduct(product) {
      this.activeProduct = product
      this.$refs.ProductDeletion.show();
    },

    async deleteProduct() {
      try {
        await ProductService.deleteProduct(this.activeProduct.id);
        this.products = [];
        this.activeProduct = null;
        this.$refs.ProductDeletion.show();
        await this.loadproducts();
      } catch (e) {
        notifications.add("error", "Something went wrong while trying to delete product");
      }
    },

    async loadproducts() {
      this.products = await ProductService.getAllProducts();
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/views/pages/products.scss";
</style>