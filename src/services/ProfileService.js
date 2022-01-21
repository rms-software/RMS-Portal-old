import ApiService from "./ApiService";

export default {
    updateProfileInfo: async profileInfo => await ApiService.post("profile/info", profileInfo),
    updateProfileCredentials: async profileCredentials => await ApiService.post("profile/credentials", profileCredentials),
}