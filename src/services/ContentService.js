import ApiService from "./ApiService";

export default {
    getAllPages: async () => await ApiService.get("pages/all"),
    savePages: async pages => await ApiService.post("pages/save", pages)
}