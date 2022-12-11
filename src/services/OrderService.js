import ApiService from "./ApiService";

export default {
    async getAllOrders() {
        const orders = await ApiService.get("api/order?includeArchived");

        orders.map(order => {
            order.placedDate = order.orderDate;
            order.customerData = JSON.parse(order.userData.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t"));

            order.orderItems = JSON.parse(order.orderData);

            // Loop over the order items
            order.orderItems = order.orderItems.map(order => {
                if (!order.productId)
                    order.productId = order.ProductId;
                
                if (!order.count)
                    order.count = order.Count;
                
                if (!order.settings)
                    order.settings = order.Settings;
                
                return order;
            });

            return order;
        })

        return orders;
    },

    async archiveOrder(order) {
        await ApiService.post(`api/order/archive?id=${order.id}`);
    },

    async unarchiveOrder(order) {
        await ApiService.post(`api/order/unarchive?id=${order.id}`);
    },

    async cancelOrder(orderId) {
        prompt("Cancelation message: ", async (message) => {
            await ApiService.post(`api/order/cancel?id=${orderId}&message=${message}`);
        });
    },

    async finishOrder(orderId) {
        await ApiService.post(`api/order/finish?id=${orderId}`);
    }
}