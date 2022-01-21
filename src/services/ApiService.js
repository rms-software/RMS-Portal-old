import axios from "axios";

const baseApiUrl = 'https://localhost:5001/api/'

const ApiService = {
    async get(url) {
        // Get the auth header value
        const authHeaderValue = localStorage.getItem("authHeader");

        // Do the request
        return (await axios.get(baseApiUrl+url, {
            headers: {
                'Authorization': `Basic ${authHeaderValue}`
            }
        })).data;
    },

    async post(url, body) {
        // Get the auth header value
        const authHeaderValue = localStorage.getItem("authHeader");

        // Do the request
        const response = (await axios.post(baseApiUrl+url, body, {
            headers: {
                'Authorization': `Basic ${authHeaderValue}`
            },

            validateStatus: () => true
        }));

        if (response.status !== 200)
            notifications.add("error", response.data.message);
        else
            return response.data
    }
}

export default ApiService;