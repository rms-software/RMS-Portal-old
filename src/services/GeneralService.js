import ApiService from "./ApiService";

export default {
    async getGeneralInfo() {
        return await ApiService.get("api/general-info");
    }
}