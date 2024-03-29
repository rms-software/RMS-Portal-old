import axios from "axios";

window.baseApiUrl = '';

// window.baseApiUrl = 'https://rmsapi.bakkerijadriaans.nl/';
window.baseApiUrl = 'https://rmsapi.dewitworstenbrood.nl/';

// https://rmsapi.bakkerijadriaans.nl/api/general-info
//         rmsapi.bakkerijadriaans.nl/api/general-info

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

    async delete(url) {
        // Get the auth header value
        const authHeaderValue = localStorage.getItem("authHeader");

        // Do the request
        return (await axios.delete(baseApiUrl+url, {
            headers: {
                'Authorization': `Basic ${authHeaderValue}`
            }
        })).data;
    },
    
    async postFD(url, formData) {
        // Get the auth header value
        const authHeaderValue = localStorage.getItem("authHeader");

        // Do the request
        const response = (await axios.post(baseApiUrl+url, formData, {
            headers: {
                'Authorization': `Basic ${authHeaderValue}`,
                "Content-Type": "multipart/form-data"
            },

            validateStatus: () => true
        }));

        if (response.status !== 200)
            notifications.add("error", response.data.message);
        else
            return response.data
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