import ApiService from "./ApiService";

export default {
    // Products
    updateProduct: async product => {
        const formData = new FormData();

        if (product.id !== null)
            formData.append('id', product.id);

        if (product.image !== null)
            formData.append('image', product.image);
            
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('basePrice', product.basePrice);


        return await ApiService.postFD("products/update", formData)
    },
    getAllProducts: async () => await ApiService.get("products"),
    getProduct: async productId => await ApiService.get(`products/${productId}`),
    deleteProduct: async productId => await ApiService.delete(`products/${productId}`),
}