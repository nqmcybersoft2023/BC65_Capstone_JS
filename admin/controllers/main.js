

import { getDataPhoneForm, renderPhoneList, showInfoPhone, } from "../controllers/controller.js";
import phoneService from "../controllers/service.js";
import { onSuccess, onFail, resetForm } from "../controllers/controller.js";


let isUpdating = false;

const fetchPhoneList  = () => {
    phoneService
        .getPhoneListApi()
        .then((res) => {
            renderPhoneList(res.data);
        })
        .catch((err) => {
            console.error('Error fetching phone list:', err);
        });
};

fetchPhoneList();
//-------------DELETE--------------

let deletePhone = (id) => {
    phoneService
        .deletePhoneApi(id)
        .then((res) => {
            fetchPhoneList ();
            onSuccess('Xoá thành công')
        })
        .catch((err) => {
            console.error('Error deleting phone:', err);

        });
};


window.deletePhone = deletePhone;

// -------TẠO MỚI---------

 
let createPhone = () => {
    if (isUpdating) {
        onFail('Đang ở chế độ cập nhật. Không thể thêm mới.');
        return;
    }

    let dataPhone = getDataPhoneForm();

    if (!isValidPhoneData(dataPhone)) {
        onFail('Hãy nhập đủ thông tin và đảm bảo các giá trị Front Camera, Back Camera và Screen là số.');
        return;
    }

    if (isNaN(dataPhone.price)) {
        let errorElement = document.getElementById('tbprice');
        if (errorElement) {
            errorElement.innerHTML = 'Giá phải là một số.';
        }
        onFail('Giá phải là một số.');
        return;
    } else {
        let errorElement = document.getElementById('tbprice');
        if (errorElement) {
            errorElement.innerHTML = '';
        }
    }

    phoneService
        .createPhoneApi(dataPhone)
        .then((res) => {
            fetchPhoneList();
            $('#exampleModal').modal('hide');
            onSuccess('Thêm thành công');
            resetForm();
        })
        .catch((err) => {
            console.error('Không thể tạo thông tin mới:', err);
            onFail('Có lỗi xảy ra khi tạo mới thông tin.');
        });
};

 

window.createPhone = createPhone;



//-------------GET (id) SỬA TỪNG ID-------------
let getDetailPhone = (id) => {
    phoneService
        .getDetailPhoneApi(id)
        .then((res) => {

            showInfoPhone(res.data);
            //   Ấn sửa thì hiện modal
            $('#exampleModal').modal('show');
        })
        .catch((err) => {
            console.log('err: ', err);
        });
};
window.getDetailPhone = getDetailPhone;

//--------update-cập nhật--------------
let updatePhone = () => {
    // lấy thông tin từ form
    let dataPhone = getDataPhoneForm();
    console.log(dataPhone.id);

    // Kiểm tra tính hợp lệ của dữ liệu
    if (!isValidPhoneData(dataPhone)) {
        // Hiển thị thông báo lỗi bằng hàm onFail
        onFail('Hãy nhập đủ thông tin.');
        return; // Dừng thực thi hàm nếu có lỗi
    }

    // Kiểm tra tính hợp lệ của giá (phải là số)
    if (isNaN(dataPhone.price)) {
        // Hiển thị thông báo lỗi cho giá ở sp-thongbao
        let errorElement = document.getElementById('tbprice');
        if (errorElement) {
            errorElement.innerHTML = 'Giá phải là một số.';
        }
        // Hiển thị thông báo lỗi bằng hàm onFail
        onFail('Giá phải là một số.');
        return;
    } else {
        // Nếu giá hợp lệ, xóa thông báo lỗi ở sp-thongbao
        let errorElement = document.getElementById('tbprice');
        if (errorElement) {
            errorElement.innerHTML = '';
        }
    }

    phoneService
        .updatePhoneApi(dataPhone)
        .then((res) => {
            fetchPhoneList ()
            $('#exampleModal').modal('hide');
            resetForm()

        })
        .catch((err) => {
            console.log(err);
        }
        )
}
window.updatePhone = updatePhone;
//---------TÌM KIẾM ----------

// Thêm hàm tìm kiếm
// Thêm hàm searchPhone
let searchPhone = () => {
    // Lấy giá trị từ ô nhập liệu
    let searchNameInput = document.getElementById('searchInput');
    let searchName = searchNameInput.value.trim();

    // Kiểm tra xem ô nhập liệu có rỗng không
    if (searchName === '') {
        onFail('Hãy nhập thông tin cần tìm kiếm.');
        return;
    }

    // Gọi API tìm kiếm
    phoneService
        .searchPhoneApi(searchName)
        .then((res) => {
            // Check if there are any results
            if (res.data.length === 0) {
                onFail('Không tìm thấy sản phẩm nào.');
            } else {
                // Display search results on the screen
                renderPhoneList(res.data);
                // Optionally, you may want to show details of the first result
                showInfoPhone(res.data[0]);
            }
        })
        .catch((err) => {
            console.error('Error searching phone:', err);
            onFail('Có lỗi xảy ra khi tìm kiếm sản phẩm.');
        });
};

window.searchPhone = searchPhone;


// Sort table by price
let sortAscending = true;

let sortTable = () => {
    let table = document.getElementById("myTable");
    let rows = Array.from(table.rows).slice(1);
    rows.sort((a, b) => {
        let priceA = parseFloat(a.cells[2].innerText);
        let priceB = parseFloat(b.cells[2].innerText);
        return sortAscending ? priceA - priceB : priceB - priceA;
    });

    let tbody = table.tBodies[0];
    rows.forEach(row => tbody.appendChild(row));
    sortAscending = !sortAscending;

    let sortIcon = document.getElementById("sortPriceIcon");
    sortIcon.className = sortAscending ? "fa fa-sort-asc" : "fa fa-sort-desc";
};

window.sortTable = sortTable;

// Validation function
let isValidPhoneData = (dataPhone) => {
    return dataPhone &&
        dataPhone.id &&
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

// Event listeners
document.getElementById('addPhoneButton').addEventListener('click', () => {
    resetForm();
    isUpdating = false;
    document.getElementById('saveButton').style.display = 'block';
    document.getElementById('updateButton').style.display = 'none';
    $('#exampleModal').modal('show');
});
