<template>
  <div>
    <button class="btn txt-icon main spacing" @click="printOrders()">
      <unicon name="print" fill="white" />
      Print
    </button>

    <br /><br />

    <h3><b>Filters: </b></h3>

    <Table>
      <template #head>
        <tr>
          <td class="left"><b>Status</b></td>
          <td class="left"><b>Before</b></td>
          <td class="left"><b>After</b></td>
        </tr>
      </template>
      <template #body>
        <tr>
          <td class="left">
            <select v-model="filters.status">
              <option value="all">Show All</option>
              <option value="only-waiting">Show only waiting</option>
              <option value="only-finished">Show only finished</option>
              <option value="only-cancled">Show only cancled</option>
            </select>
          </td>
          <td>
            <Datepicker
              name="Before"
              :monday-first="true"
              v-model="filters.beforeDate"
            />
          </td>
          <td>
            <Datepicker
              name="After"
              :monday-first="true"
              v-model="filters.afterDate"
            />
          </td>
        </tr>
      </template>
    </Table>

    <br />

    <h3><b>Showing {{filteredOrders.length}} out of {{orders.length}} </b></h3>

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
        <tr v-for="order in filteredOrders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customerData["name"] }}</td>
          <td :class="orderStatuses[order.status] === 'Delivered' ? `status-green` : orderStatuses[order.status] === 'Waiting' ? 'status-orange' : 'status-red'">{{ orderStatuses[order.status] }}</td>
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

    <Modal
      :title="'Order - ' + orderStatuses[activeOrder.status]"
      ref="orderPopup"
    >
      <h1>
        Order for {{ activeOrder.customerData["name"] }} ({{
          activeOrder.customerData["email"]
        }})
      </h1>

      <div v-if="orderStatuses[activeOrder.status] === 'Waiting'">
        <button class="btn delete big" @click="cancelOrder()">Cancel</button>
        &nbsp;
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

// Import libraries
import Datepicker from "vuejs-datepicker";

// Import services
import OrderService from "@/services/OrderService.js";
import ProductService from "@/services/ProductService.js";
import OrderPrintingService from "@/services/OrderPrintingService.js";

export default {
  components: {
    Table,
    Modal,
    Datepicker,
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
    filters: {
      status: "all",
      afterDate: new Date(0),
      beforeDate: new Date(),
    },
  }),

  async mounted() {
    await this.loadItems();
  },

  computed: {
    filteredOrders() {
      let ret = JSON.parse(JSON.stringify(this.orders));

      // Filter by status
      if (this.filters.status === "only-waiting")
        ret = ret.filter((order) => order.status === 10);

      if (this.filters.status === "only-finished")
        ret = ret.filter((order) => order.status === 30);

      if (this.filters.status === "only-cancled")
        ret = ret.filter((order) => order.status === 40);

      // Filter by before date
      ret = ret.filter(
        (order) => new Date(order.placedDate) < this.filters.beforeDate
      );

      // Filter by after date
      ret = ret.filter(
        (order) => new Date(order.placedDate) > this.filters.afterDate
      );


      return ret;
    },
  },

  methods: {
    printOrders() {
      OrderPrintingService.printOrders(this.filteredOrders, this.products);
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

      products.forEach((item) => {
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
.status-red {
  background: rgb(255, 180, 180);
}

.status-orange {
  background: rgb(255, 213, 135);
}

.status-green {
  background: rgb(119, 159, 119);
}
</style>