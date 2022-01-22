<template>
  <div id="products">

    <div id="products-search">
      <input type="text" placeholder="Search..." v-model="searchQuery" />
      <button class="btn add text">
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
    products: [
      {
        image: "https://www.ikea.com/nl/en/images/products/kalas-spoon-mixed-colours__1047763_pe843511_s5.jpg",
        name: "Spoon"
      },
      {
        image: "https://www.ikea.com/nl/en/images/products/fargrik-mug-turquoise__0711066_pe727941_s5.jpg",
        name: "Cup"
      },
      {
        image: "https://www.ikea.com/nl/en/images/products/dinera-plate-grey-blue__0712317_pe728765_s5.jpg",
        name: "Plate"
      },
      {
        image: "https://www.ikea.com/nl/en/images/products/fornuft-fork-stainless-steel__0714592_pe730133_s5.jpg",
        name: "Forks"
      },
      {
        image: "https://cdn.shopify.com/s/files/1/2304/7781/products/KnifeTrio-AlmostBlack_e3745c41-9cc1-4111-8292-a8a9a0373550.png",
        name: "Shef knives"
      }
    ]
  })
}
</script>

<style scoped lang="scss">
@import "../../scss/views/pages/products.scss";
</style>