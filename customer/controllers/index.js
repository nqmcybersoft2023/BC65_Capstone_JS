import API_METHODS from '../services/service.js';
import { renderProducts, clearProducts } from './controller.js';
import * as localStorage from '../services/localStorage.js';
import { phoneObject } from '../models/phone.js';
export let phoneArr = localStorage.getFromLocalStorage();

const fetchProducts = () => {
    API_METHODS.fetchProducts()
        .then(res => {
            renderProducts(res.data);
        })
        .catch(err => console.log(err));

}
fetchProducts();
document.querySelector('.phone-select').addEventListener('change', (e) => {
    switch (e.target.value) {
        case '0':
            clearProducts();
            fetchProducts();
            break;
        case '1':
            clearProducts();
            API_METHODS.fetchProducts('samsung')
                .then(res => {
                    renderProducts(res.data);
                })
                .catch(err => console.log(err));
            break;
        case '2':
            clearProducts();
            API_METHODS.fetchProducts('iphone')
                .then(res => {
                    renderProducts(res.data);
                })
                .catch(err => console.log(err));

            break;
    }
});



window.addToCart = (id, name, price, img, desc) => addToCart(id, name, price, img, desc);
let addToCart = (id, name, price, img, desc) => {
    let existingPhone = phoneArr.find(phone => phone.id === id);
    if (existingPhone) {
        existingPhone.quantity += 1;
    } else {
        let phone = new phoneObject(id, name, price, img, desc, 1); // Assuming phoneObject takes a quantity parameter
        phoneArr.push(phone);
    }
    localStorage.saveToLocalStorage();
    updateCartValue();
}




let updateCartValue = () => {
    if (document.querySelector('header #cart .cart-value')) {
        document.querySelector('header #cart .cart-value').remove();
    }
    let totalQuantity = phoneArr.reduce((total, phone) => total + phone.quantity, 0);
    document.querySelector('header #cart').innerHTML += `
                <span class="cart-value">(${totalQuantity})</span>
                `;
}
updateCartValue();