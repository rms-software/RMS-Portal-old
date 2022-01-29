import ApiService from "./ApiService";

export default {
    getAllPages: async () => await ApiService.get("pages/all"),
}