const API_URL = 'https://6597f70f668d248edf23ce4d.mockapi.io/api/v1/products';
const PATH = {
    index: '../index.html',
    cart: '/customer/view/cart.html',
    admin: '/admin.html'
}
let fetchProducts = (type = '') => {
    return axios({
        url: API_URL,
        method: 'GET',
        params: {
            type: type
        }
    })

}

let API_METHODS = {
    fetchProducts
}

export default API_METHODS;
