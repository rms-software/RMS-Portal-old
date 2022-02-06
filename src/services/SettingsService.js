import ApiService from "./ApiService";

export default {
    saveSettings: async settings => await ApiService.post("settings", settings),
}