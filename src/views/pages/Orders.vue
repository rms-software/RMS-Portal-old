<template>
  <div>
    <Table>
      <template #head>
        <tr>
          <th width="10">ID</th>
          <th width="30">Customer</th>
          <th width="30">Status</th>
          <th width="30">Order date</th>
          <th width="30">Price Total</th>
          <th width="10"></th>
        </tr>
      </template>

      <template #body>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customerData["name"] }}</td>
          <td>{{ orderStatuses[order.status] }}</td>
          <td>{{ formatDate(order.placedDate) }}</td>
          <td>€ 15.00</td>
          <td>
            <button
              class="btn txt-icon main spacing"
              @click="openOrderPopup(order)"
            >
              <unicon name="eye" fill="white" />
              View
            </button>
          </td>
        </tr>
      </template>
    </Table>

    <Modal title="Order" ref="orderPopup">
      <h1>
        Order for {{ activeOrder.customerData["name"] }} ({{
          activeOrder.customerData["email"]
        }})
      </h1>

      <h4 style="margin-bottom: 5px">Data:</h4>

      <Table>
        <template #head>
          <tr>
            <th style="text-align: left">Key</th>
            <th style="text-align: left">Value</th>
          </tr>
        </template>

        <template #body>
          <tr v-for="(value, key) in activeOrder.customerData" :key="key">
            <td style="padding-right: 20px; text-align: left">{{ key }}</td>
            <td style="text-align: left">{{ value }}</td>
          </tr>
        </template>
      </Table>

      <h4 style="margin-bottom: 5px">Order:</h4>

      <Table>
        <template #head>
          <tr>
            <th style="text-align: left">Product</th>
            <th style="text-align: left">Count</th>
            <th style="text-align: left">Price (individual)</th>
            <th style="text-align: left">Price (total)</th>
          </tr>
        </template>

        <template #body>
          <tr v-for="item in activeOrder.orderItems" :key="item.id">
            <td style="padding-right: 20px; text-align: left">
              {{ getProductName(item) }}
            </td>
            <td style="padding-right: 20px; text-align: left">
              {{ item.count }}
            </td>
            <td style="padding-right: 20px; text-align: left">
              € {{ getProductPrice(item).toFixed(2) }}
            </td>
            <td style="text-align: left">
              € {{ (getProductPrice(item) * item.count).toFixed(2) }}
            </td>
          </tr>
        </template>
      </Table>

      <h4 style="margin-bottom: 5px">
        Total price: € {{ totalPrice(activeOrder.orderItems) }}
      </h4>
    </Modal>
  </div>
</template>

<script>
// Import components
import Table from "@/components/common/Table";
import Modal from "@/components/common/Modal";

// Import services
import OrderService from "@/services/OrderService.js";
import ProductService from "@/services/ProductService.js";

export default {
  components: {
    Table,
    Modal,
  },

  data: () => ({
    orders: [],
    products: [],
    orderStatuses: {
      10: "Confirmed",
      30: "Delivered",
      40: "Cancled",
    },
    activeOrder: {
      customerData: {},
      orderItems: [],
    },
  }),

  async mounted() {
    this.products = await ProductService.getAllProducts();
    this.orders = await OrderService.getAllOrders();
  },

  methods: {
    formatDate(date) {
      date = new Date(date);

      // Return date formated as dd/mm/yyyy hh:mm:ss
      return `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
    },

    totalPrice(products) {
      let totalPrice = 0;

      products.forEach(item => {
        const price = this.getProductPrice(item);
        const count = item.count;

        totalPrice += price * count;
      });

      return totalPrice.toFixed(2);
    },

    getProduct(order) {
      const product = this.products.filter((x) => x.id === order.productId);

      if (product.length === 0) return {};

      return product[0];
    },

    getProductName(order) {
      return this.getProduct(order)["name"];
    },

    getProductPrice(order) {
      return this.getProduct(order)["basePrice"];
    },

    openOrderPopup(order) {
      this.activeOrder = order;
      this.$refs.orderPopup.show();
    },
  },
};
</script>

<style scoped lang="scss">
</style>