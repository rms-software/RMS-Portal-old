import ApiService from "./ApiService";

export default {
    updateProduct: async product => await ApiService.post("products/update", product),
    getAllProducts: async () => await ApiService.get("products"),
    getProduct: async productId => await ApiService.get(`products/${productId}`),
    deleteProduct: async productId => await ApiService.delete(`products/${productId}`)
}