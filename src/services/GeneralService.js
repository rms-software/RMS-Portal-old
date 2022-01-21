import ApiService from "./ApiService";

export default {
    async getGeneralInfo() {
        return await ApiService.get("general/get-info");
    }
}