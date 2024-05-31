import * as lS from '../services/localStorage.js';

let phoneArr = lS.getFromLocalStorage();
let addInputEvent = () => {
    document.querySelectorAll('.item-quantity input').forEach((element, index) => {
        element.addEventListener('input', () => {
            if (element.value == 0) {
                Swal.fire({
                    text: "Số lượng tối thiểu là 1",
                    icon: "error"
                });
                element.value = 1;
            }
            console.log(index)
            phoneArr[index].quantity = element.value * 1;
            updateInputPrice(index, phoneArr[index].id);
            updateToTal();
            lS.saveToLocalStorage(phoneArr);
        })
    });
}
let renderList = () => {
    phoneArr.forEach((element, index) => {
        let item = document.createElement('div');
        item.classList.add('item', `item${index}`);
        item.innerHTML = `
    <div class="item-image">
              <img src="${element.img}" alt="" />
            </div>
            <div class="item-desc">
              <h3 class="item-name">${element.name}</h3>
              <p class="item-desc-p">${element.desc}
              </p>
              <p class="item-price">${element.price * element.quantity}$</p>
              <div class="item-quantity">
                <button onclick="subItem('${index}','${element.id}')" class="btn-back">-</button>
                <input type="number" name="" id="" placeholder="${element.quantity}" />
                <button onclick="addItem('${index}','${element.id}')" class="btn-pre">+</button>
              <button onclick="removeItem('${element.id}')" class="btn-remove">Xóa</button>
                </div>
            </div>
            `;
        document.querySelector('.items_list').appendChild(item);
    });
    addInputEvent();
}

renderList();
let subItem = (index, id) => {
    phoneArr.find(item => {
        if (item.id === id) {
            if (item.quantity > 1) {
                item.quantity -= 1;
                updateInputPrice(index, id);
            }
            else {
                removeItem(id);
            }
            updateToTal();
            lS.saveToLocalStorage(phoneArr);
        }
    })
    console.log(phoneArr);
};
let addItem = (index, id) => {
    phoneArr.find(item => {
        if (item.id === id) {
            item.quantity += 1;
            updateInputPrice(index, id);
            updateToTal();
            lS.saveToLocalStorage(phoneArr);
        }
    })
    console.log(phoneArr);
};

let removeItem = (id) => {
    phoneArr = phoneArr.filter(item => item.id !== id);
    updateToTal();
    clearList();
    renderList();
    lS.saveToLocalStorage(phoneArr);
    addInputEvent();
};

let updateToTal = () => {
    console.log(phoneArr)
    let total = phoneArr.reduce((total, current) => {
        return total + current.quantity * Number(current.price);
    }, 0);
    console.log(total)
    document.querySelector('.total_content h3').innerHTML = `Thanh toán : ${total}$`
};
updateToTal();
let clearList = () => {
    document.querySelector('.items_list').innerHTML = '';
}
let updateInputPrice = (index, id) => {
    document.querySelector(`.item${index} .item-price`).innerHTML = `${phoneArr.find(item => item.id === id).price * phoneArr.find(item => item.id === id).quantity}$`;
    document.querySelector(`.item${index} .item-quantity input`).value = `${phoneArr.find(item => item.id === id).quantity}`;
};

document.querySelector('.total_content button').addEventListener('click', () => {
    phoneArr = [];
    clearList();
    updateToTal();
    lS.saveToLocalStorage(phoneArr);
});

window.subItem = subItem;
window.addItem = addItem;
window.removeItem = removeItem;

