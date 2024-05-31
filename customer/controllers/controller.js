export let renderProducts = (data) => {
    data.forEach(element => {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item', 'col-12', 'col-md-4', 'col-lg-4', 'col-xl-3');
        itemElement.innerHTML = `
        <div class="item-image">
            <img src="${element.img}" alt="">
        </div>
        <div class="item-desc">
            <h3 class="item-name">${element.name}</h2>
            <p class="item-desc">${element.desc}<br>
            Màn hình kích thước ${element.screen}<br> Camera trước ${element.frontCamera}, Camera sau ${element.backCamera} bắt trọn khoảnh khắc</p>
            
        </div >
    <div class="item-footer">
        <p class="item-price">${element.price}$</p>
        <button onclick="addToCart('${element.id}', '${element.name}', '${element.price}', '${element.img}', '${element.desc}')" class="action-btn">Thêm vào giỏ hàng</button>
    </div>

`;
        document.querySelector('.products_list .row').appendChild(itemElement);
    });
}

export let clearProducts = () => {
    document.querySelector('.products_list .row').innerHTML = '';
}