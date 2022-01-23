import ApiService from "./ApiService";

export default {
    updateProduct: async product => await ApiService.post("products/update", product),
}