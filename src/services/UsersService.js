import ApiService from "./ApiService";

export default {
    getAllUsers: async () => await ApiService.get("users/all")
}