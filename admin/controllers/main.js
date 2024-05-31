

import { getDataPhoneForm, renderPhoneList, showInfoPhone, } from "../controllers/controller.js";
import phoneService from "../controllers/service.js";
import { onSuccess, onFail, resetForm } from "../controllers/controller.js";

const fectPhoneList = () => {
    phoneService
        .getPhoneListApi()
        .then((res) => {
            renderPhoneList(res.data);
        })
        .catch((err) => {
            console.error('Error fetching phone list:', err);
        });
};

fectPhoneList();
//-------------DELETE--------------

let deletePhone = (id) => {
    phoneService
        .deletePhoneApi(id)
        .then((res) => {
            fectPhoneList();
            onSuccess('Xoá thành công')
        })
        .catch((err) => {
            console.error('Error deleting phone:', err);

        });
};


window.deletePhone = deletePhone;

// -------TẠO MỚI---------

let createPhone = () => {
    // Lấy dữ liệu từ form
    let dataPhone = getDataPhoneForm();
   
    if (!isValidPhoneData(dataPhone)) {
        // Hiển thị thông báo lỗi bằng hàm onFail

        onFail('Hãy nhập đủ thông tin.');
        return; // Dừng thực thi hàm nếu có lỗi
    } 
  
    // }
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
    // Nếu dữ liệu hợp lệ, gọi API để tạo mới điện thoại
    phoneService
        .createPhoneApi(dataPhone)
        .then((res) => {
            // Xử lý khi tạo mới thành công
            fectPhoneList();
            $('#exampleModal').modal('hide');
            onSuccess('Thêm thành công');
            resetForm()
        })
        .catch((err) => {
            // Xử lý khi gặp lỗi trong quá trình tạo mới
            console.error('Không thể tạo thông tin mới:', err);
            onFail('Có lỗi xảy ra khi tạo mới thông tin.');
        });
};

// Hàm kiểm tra tính hợp lệ của dữ liệu điện thoại
let isValidPhoneData = (dataPhone) => {
    // Thực hiện các kiểm tra tính hợp lệ ở đây
    // Kiểm tra xem tên điện thoại có được nhập không
    return dataPhone && dataPhone.backCamera && dataPhone.frontCamera && dataPhone.screen && dataPhone.desc && dataPhone.img && dataPhone.id && dataPhone.price && dataPhone.name && dataPhone.name.trim() !== '';
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
            fectPhoneList()
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
