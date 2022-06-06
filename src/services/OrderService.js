import ApiService from "./ApiService";

export default {
    async getAllOrders() {
        return await ApiService.get("orders");
    }
}