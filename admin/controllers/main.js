

// import { getDataPhoneForm, renderPhoneList, showInfoPhone, } from "../controllers/controller.js";
// import phoneService from "../controllers/service.js";
// import { onSuccess, onFail, resetForm } from "../controllers/controller.js";




// const fetchPhoneList  = () => {
//     phoneService
//         .getPhoneListApi()
//         .then((res) => {
//             renderPhoneList(res.data);
//         })
//         .catch((err) => {
//             console.error('Error fetching phone list:', err);
//         });
// };

// fetchPhoneList();
// //-------------DELETE--------------

// let deletePhone = (id) => {
//     phoneService
//         .deletePhoneApi(id)
//         .then((res) => {
//             fetchPhoneList ();
//             onSuccess('Xoá thành công')
//             resetForm(); 
//         })
//         .catch((err) => {
//             console.error('Error deleting phone:', err);
//             resetForm(); 
//         });
// };


// window.deletePhone = deletePhone;

// // -------TẠO MỚI---------
// let createPhone = () => {   
//     let isUpdating = false;
//     if (!isUpdating) {
//         onFail('Đang ở chế độ cập nhật. Không thể thêm mới.');
//         return;
//     }
    
//     let dataPhone = getDataPhoneForm();

//     if (!isValidPhoneData(dataPhone)) {
//         onFail('Hãy nhập đủ thông tin và đảm bảo các giá trị Front Camera, Back Camera và Screen là số.');
//         return;
//     }

//     phoneService
//         .createPhoneApi(dataPhone)
//         .then((res) => {
//             fetchPhoneList();
//             resetForm();
//             $('#exampleModal').modal('hide');
//             onSuccess('Thêm thành công');
//         })
//         .catch((err) => {
//             console.error('Không thể tạo thông tin mới:', err);
//             onFail('Có lỗi xảy ra khi tạo mới thông tin.');
//         });
// };

// window.createPhone = createPhone;


// // Event listener for opening the modal form
// document.getElementById('btnAddPhone').addEventListener('click', () => {
//     resetForm(); // Reset the form when the modal is opened for creating a new phone
//     isUpdating = false;
//     document.getElementById('saveButton').style.display = 'block';
//     document.getElementById('updateButton').style.display = 'none';
//     $('#exampleModal').modal('show');
// });


// //-------------GET (id) SỬA TỪNG ID-------------
// let getDetailPhone = (id) => {
//     phoneService
//         .getDetailPhoneApi(id)
//         .then((res) => {

//             showInfoPhone(res.data);
//             //   Ấn sửa thì hiện modal
//             $('#exampleModal').modal('show');
//         })
//         .catch((err) => {
//             console.log('err: ', err);
//         });
// };
// window.getDetailPhone = getDetailPhone;

// //--------update-cập nhật--------------
// let updatePhone = () => {
//     let dataPhone = getDataPhoneForm();

//     if (!isValidPhoneData(dataPhone)) {
//         onFail('Hãy nhập đủ thông tin và đảm bảo các giá trị Front Camera, Back Camera và Screen là số.');
//         return;
//     }

//     phoneService
//         .updatePhoneApi(dataPhone)
//         .then((res) => {
//             fetchPhoneList();
//             onSuccess('Cập nhật thành công')
//             $('#exampleModal').modal('hide');
//             resetForm();
//         })
//         .catch((err) => {
//             console.error(err);
//             onFail(err)
//             resetForm();
//         });
// };
// window.updatePhone = updatePhone;
// //---------TÌM KIẾM ----------

// // Thêm hàm tìm kiếm
// // Thêm hàm searchPhone
// let searchPhone = () => {
//     // Lấy giá trị từ ô nhập liệu
//     let searchNameInput = document.getElementById('searchInput');
//     let searchName = searchNameInput.value.trim();

//     // Kiểm tra xem ô nhập liệu có rỗng không
//     if (searchName === '') {
//         onFail('Hãy nhập thông tin cần tìm kiếm.');
//         return;
//     }

//     // Gọi API tìm kiếm
//     phoneService
//         .searchPhoneApi(searchName)
//         .then((res) => {
//             // Check if there are any results
//             if (res.data.length === 0) {
//                 onFail('Không tìm thấy sản phẩm nào.');
//             } else {
//                 // Display search results on the screen
//                 renderPhoneList(res.data);
//                 // Optionally, you may want to show details of the first result
//                 showInfoPhone(res.data[0]);
//             }
//         })
//         .catch((err) => {
//             console.error('Error searching phone:', err);
//             onFail('Có lỗi xảy ra khi tìm kiếm sản phẩm.');
//         });
// };

// window.searchPhone = searchPhone;


// // Sort table by price
// let sortAscending = true;

// let sortTable = () => {
//     let table = document.getElementById("myTable");
//     let rows = Array.from(table.rows).slice(1);
//     rows.sort((a, b) => {
//         let priceA = parseFloat(a.cells[2].innerText);
//         let priceB = parseFloat(b.cells[2].innerText);
//         return sortAscending ? priceA - priceB : priceB - priceA;
//     });

//     let tbody = table.tBodies[0];
//     rows.forEach(row => tbody.appendChild(row));
//     sortAscending = !sortAscending;

//     let sortIcon = document.getElementById("sortPriceIcon");
//     sortIcon.className = sortAscending ? "fa fa-sort-asc" : "fa fa-sort-desc";
// };

// window.sortTable = sortTable;

// // Validation function
// let isValidPhoneData = (dataPhone) => {
//     return dataPhone &&
//         dataPhone.id &&
//         dataPhone.name &&
//         dataPhone.price &&
//         dataPhone.frontCamera &&
//         dataPhone.backCamera &&
//         dataPhone.screen &&
//         dataPhone.desc &&
//         dataPhone.img &&
//         !isNaN(dataPhone.price) &&
//         !isNaN(dataPhone.frontCamera) &&
//         !isNaN(dataPhone.backCamera) &&
//         !isNaN(dataPhone.screen);
// };

// // Event listeners
// document.getElementById('btnAddPhone').addEventListener('click', () => {
//     resetForm();
//     isUpdating = false;
//     // document.getElementById('saveButton').style.display = 'block';
//     // document.getElementById('updateButton').style.display = 'none';
//     $('#exampleModal').modal('show');
// });

import { getDataPhoneForm, renderPhoneList, showInfoPhone } from "../controllers/controller.js";
import phoneService from "../controllers/service.js";
import { onSuccess, onFail, resetForm } from "../controllers/controller.js";

// Biến quản lý trạng thái cập nhật
let isUpdating = false;

// Hàm lấy danh sách điện thoại
const fetchPhoneList = () => {
    phoneService
        .getPhoneListApi()
        .then((res) => {
            renderPhoneList(res.data);
        })
        .catch((err) => {
            console.error('Error fetching phone list:', err);
        });
};

// Gọi hàm fetchPhoneList ngay khi trang tải
fetchPhoneList();

// Hàm xóa điện thoại
const deletePhone = (id) => {
    phoneService
        .deletePhoneApi(id)
        .then((res) => {
            fetchPhoneList();
            onSuccess('Xoá thành công');
            resetForm(); 
        })
        .catch((err) => {
            console.error('Error deleting phone:', err);
            resetForm();
        });
};
window.deletePhone = deletePhone;

// Hàm tạo mới điện thoại
const createPhone = () => {
    if (isUpdating) {
        onFail('Đang ở chế độ cập nhật. Không thể thêm mới.');
        return dataPhone();    
    }

    const dataPhone = getDataPhoneForm();

    if (!isValidPhoneData(dataPhone)) {
        onFail('Hãy nhập đủ thông tin và đảm bảo các giá trị Front Camera, Back Camera và Screen là số.');
        return;
    }

    phoneService
        .createPhoneApi(dataPhone)
        .then((res) => {
            fetchPhoneList();
            resetForm();
            $('#exampleModal').modal('hide');
            onSuccess('Thêm thành công');
        })
        .catch((err) => {
            console.error('Không thể tạo thông tin mới:', err);
            onFail('Có lỗi xảy ra khi tạo mới thông tin.');
        });
};
window.createPhone = createPhone;

// Hàm lấy chi tiết điện thoại theo id
const getDetailPhone = (id) => {
    phoneService
        .getDetailPhoneApi(id)
        .then((res) => {
            showInfoPhone(res.data);
            isUpdating = true;
            $('#exampleModal').modal('show');
        })
        .catch((err) => {
            console.error('Error fetching phone details:', err);
        });
};
window.getDetailPhone = getDetailPhone;

// Hàm cập nhật điện thoại
const updatePhone = () => {
    if (!isUpdating) {
        onFail('Không có sản phẩm nào để cập nhật.');
        return;
    }

    const dataPhone = getDataPhoneForm();

    if (!isValidPhoneData(dataPhone)) {
        onFail('Hãy nhập đủ thông tin và đảm bảo các giá trị Front Camera, Back Camera và Screen là số.');
        return;
    }

    phoneService
        .updatePhoneApi(dataPhone)
        .then((res) => {
            fetchPhoneList();
            onSuccess('Cập nhật thành công');
            $('#exampleModal').modal('hide');
            resetForm();
            isUpdating = false;
        })
        .catch((err) => {
            console.error('Error updating phone:', err);
            onFail('Có lỗi xảy ra khi cập nhật thông tin.');
            
        });
};
window.updatePhone = updatePhone;

// Hàm tìm kiếm điện thoại
const searchPhone = () => {
    const searchNameInput = document.getElementById('searchInput');
    const searchName = searchNameInput.value.trim();

    if (searchName === '') {
        onFail('Hãy nhập thông tin cần tìm kiếm.');
        return;
    }

    phoneService
        .searchPhoneApi(searchName)
        .then((res) => {
            if (res.data.length === 0) {
                onFail('Không tìm thấy sản phẩm nào.');
            } else {
                renderPhoneList(res.data);
                showInfoPhone(res.data[0]);
            }
        })
        .catch((err) => {
            console.error('Error searching phone:', err);
            onFail('Có lỗi xảy ra khi tìm kiếm sản phẩm.');
        });
};
window.searchPhone = searchPhone;

// Hàm sắp xếp bảng theo giá
let sortAscending = true;
const sortTable = () => {
    const table = document.getElementById("myTable");
    const rows = Array.from(table.rows).slice(1);
    rows.sort((a, b) => {
        const priceA = parseFloat(a.cells[2].innerText);
        const priceB = parseFloat(b.cells[2].innerText);
        return sortAscending ? priceA - priceB : priceB - priceA;
    });

    const tbody = table.tBodies[0];
    rows.forEach(row => tbody.appendChild(row));
    sortAscending = !sortAscending;

    const sortIcon = document.getElementById("sortPriceIcon");
    sortIcon.className = sortAscending ? "fa fa-sort-asc" : "fa fa-sort-desc";
};
window.sortTable = sortTable;

// Hàm kiểm tra tính hợp lệ của dữ liệu điện thoại
const isValidPhoneData = (dataPhone) => {
    return dataPhone &&
        dataPhone.name &&
        dataPhone.price &&
        dataPhone.frontCamera &&
        dataPhone.backCamera &&
        dataPhone.screen &&
        dataPhone.desc &&
        dataPhone.img &&
        !isNaN(dataPhone.price) &&
        !isNaN(dataPhone.frontCamera) &&
        !isNaN(dataPhone.backCamera) &&
        !isNaN(dataPhone.screen);
};

// Lắng nghe sự kiện mở modal thêm mới điện thoại
document.getElementById('btnAddPhone').addEventListener('click', () => {
    resetForm();
    isUpdating = false;
    document.getElementById('saveButton').style.display = 'block';
    document.getElementById('updateButton').style.display = 'none';
    $('#exampleModal').modal('show');
});
