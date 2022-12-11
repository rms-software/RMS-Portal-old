import ApiService from "./ApiService";

export default {
    async attemptLogin(username, password) {
        // Create and store the authorization header value
        const authHeaderValue = btoa(`${username}:${password}`);
        localStorage.setItem("authHeader", authHeaderValue);

        // Do the request
        try {
            await ApiService.get("api/general-info");
            return true
        } catch(e) {
            return false
        }

    }
}