export let phoneArr = [];

export let getFromLocalStorage = () => {
    if (localStorage.getItem('phoneArr')) {
        phoneArr = JSON.parse(localStorage.getItem('phoneArr'));
    }
    return phoneArr;
}

export let saveToLocalStorage = (arr = phoneArr) => {
    localStorage.setItem('phoneArr', JSON.stringify(arr));
}

export let removeItemFromLocalStorage = (index) => {
    phoneArr.splice(index, 1);
    saveToLocalStorage();
}