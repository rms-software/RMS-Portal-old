<template>
  <div>
    <button
      class="btn txt-icon main spacing"
      @click="printOrders()"
    >
      <unicon name="print" fill="white" />
      Print
    </button>

    <br /><br />

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
          <td>€ {{ totalPrice(order.orderItems) }}</td>
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

    <Modal :title="'Order - ' + orderStatuses[activeOrder.status]" ref="orderPopup">
      <h1>
        Order for {{ activeOrder.customerData["name"] }} ({{
          activeOrder.customerData["email"]
        }})
      </h1>

      <div v-if="orderStatuses[activeOrder.status] === 'Waiting'">
        <button class="btn delete big" @click="cancelOrder()">Cancel</button> &nbsp;
        <button class="btn main big" @click="finishOrder()">Finish</button>
      </div>

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
import OrderPrintingService from "@/services/OrderPrintingService.js"

export default {
  components: {
    Table,
    Modal,
  },

  data: () => ({
    orders: [],
    products: [],
    orderStatuses: {
      10: "Waiting",
      30: "Delivered",
      40: "Cancled",
    },
    activeOrder: {
      customerData: {},
      orderItems: [],
    },
  }),

  async mounted() {
    await this.loadItems();
  },

  methods: {
    printOrders() {
      OrderPrintingService.printOrders(this.orders, this.products);
    },

    async loadItems() {
      this.orders = [];
      this.products = [];
      this.products = await ProductService.getAllProducts();
      this.orders = await OrderService.getAllOrders();
    },

    async cancelOrder() {
      const _this = this;
      confirm("Are you sure you want to cancle this order?", async () => {
        await OrderService.cancelOrder(_this.activeOrder.id);
        _this.$refs.orderPopup.show();
        await this.loadItems();
      });
    },

    async finishOrder() {
      const _this = this;
      confirm("Are you sure you want to finish this order?", async () => {
        await OrderService.finishOrder(_this.activeOrder.id);
        _this.$refs.orderPopup.show();
        await this.loadItems();
      });
    },

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