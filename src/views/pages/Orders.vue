<template>
    <Table>
      <template #head>
        <tr>
          <th width="10">ID</th>
          <th width="30">Status</th>
          <th width="30">Order date</th>
          <th width="30">Price Total</th>
          <th width="10"></th>
        </tr>
      </template>

      <template #body>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ orderStatuses[order.status] }}</td>
          <td>{{ formatDate(order.placedDate) }}</td>
          <td>1500 Euro</td>
          <td>
            <button class="btn delete spacing">
              <unicon name="x" fill="white" />
            </button>

            <button class="btn main spacing">
              <unicon name="eye" fill="white" />
            </button>

            <button class="btn edit">
              <unicon name="pen" fill="white" />
            </button>
          </td>
        </tr>
      </template>
    </Table>
</template>

<script>
// Import components
import Table from "@/components/common/Table";

// Import services
import OrderService from "@/services/OrderService.js";

export default {
    components: {
        Table
    },

    data: () => ({
        orders: [],
        orderStatuses: {
            10: "Confirmed",
            30: "Delivered",
            40: "Cancled"
        }
    }),

    async mounted() {
        this.orders = await OrderService.getAllOrders();
    },

    methods: {
        formatDate(date) {
            date = new Date(date);

            // Return date formated as dd/mm/yyyy hh:mm:ss
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
        }
    }
}
</script>

<style scoped lang="scss">

</style>