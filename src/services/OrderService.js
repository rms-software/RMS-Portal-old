import ApiService from "./ApiService";

export default {
    async getAllOrders() {
        return await ApiService.get("orders");
    },

    async cancelOrder(orderId) {
        prompt("Cancelation message: ", async (message) => {
            await ApiService.post(`orders/cancel/${orderId}`, {
                message
            });
        })
    },

    async finishOrder(orderId) {
        await ApiService.post(`orders/finish/${orderId}`);
    }
}