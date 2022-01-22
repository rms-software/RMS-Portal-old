import ApiService from "./ApiService";

export default {
    getAllUsers: async () => await ApiService.get("users/all"),
    updateUser: async user => await ApiService.post("users/update", user),
    deleteUser: async userId => await ApiService.post(`users/delete/${userId}`),
}