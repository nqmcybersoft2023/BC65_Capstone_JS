 
import {
    getDataPhoneForm,
    renderPhoneList,
    showInfoPhone,
    pushForm
  } from "../controllers/controller.js";
  import phoneService from "../controllers/service.js";
  import { onSuccess, onFail, resetForm } from "../controllers/controller.js";
  
  // Biến quản lý trạng thái cập nhật
  let isUpdating = false;
  let updatingPhoneId = null;
  
  // Hàm lấy danh sách điện thoại
  const fetchPhoneList = () => {
    phoneService
      .getPhoneListApi()
      .then((res) => {
        renderPhoneList(res.data);
      })
      .catch((err) => {
        console.error("Error fetching phone list:", err);
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
        onSuccess("Xoá thành công");
        resetForm();
      })
      .catch((err) => {
        console.error("Error deleting phone:", err);
        resetForm();
      });
  };
  window.deletePhone = deletePhone;
  
  // Hàm tạo mới điện thoại
  const createPhone = () => {
    if (isUpdating) {
      onFail("Đang ở chế độ cập nhật. Không thể thêm mới.");
      getDetailPhone(updatingPhoneId); // Mở lại modal cập nhật với id đã lưu
      return;
    }
  
    getDataPhoneForm();
    const dataPhone = JSON.parse(localStorage.getItem("phoneData"));
  
    if (!isValidPhoneData(dataPhone)) {
      onFail("Hãy nhập đủ thông tin và đảm bảo các giá trị Front Camera, Back Camera và Screen là số.");
    return  pushForm(dataPhone);
    } else {
      phoneService
        .createPhoneApi(dataPhone)
        .then((res) => {
          fetchPhoneList();
          resetForm();
          $("#exampleModal").modal("hide");
          onSuccess("Thêm thành công");
        })
        .catch((err) => {
          console.error("Không thể tạo thông tin mới:", err);
          onFail("Có lỗi xảy ra khi tạo mới thông tin.");
        });
    }
  
    console.log(dataPhone);
  };
  window.createPhone = createPhone;
  
  // Hàm lấy chi tiết điện thoại theo id
  const getDetailPhone = (id) => {
    phoneService
      .getDetailPhoneApi(id)
      .then((res) => {
        showInfoPhone(res.data);
        isUpdating = true;
        updatingPhoneId = id; // Lưu id của điện thoại đang cập nhật
        $("#exampleModal").modal("show");
      })
      .catch((err) => {
        console.error("Error fetching phone details:", err);
      });
  };
  window.getDetailPhone = getDetailPhone;
  
  // Hàm cập nhật điện thoại
  const updatePhone = () => {
    if (!isUpdating) {
      onFail("Không có sản phẩm nào để cập nhật.");
      return;
    }
  
    const dataPhone = getDataPhoneForm();
  
    if (!isValidPhoneData(dataPhone)) {
      onFail(
        "Hãy nhập đủ thông tin và đảm bảo các giá trị id, price, Front Camera, Back Camera và Screen là số."
      );
      return;
    }
  
    phoneService
      .updatePhoneApi(dataPhone)
      .then((res) => {
        fetchPhoneList();
        onSuccess("Cập nhật thành công");
        $("#exampleModal").modal("hide");
        resetForm();
        isUpdating = false;
      })
      .catch((err) => {
        console.error("Error updating phone:", err);
        onFail("Có lỗi xảy ra khi cập nhật thông tin.");
      });
  };
  window.updatePhone = updatePhone;
  
  // Hàm tìm kiếm điện thoại
  const searchPhone = () => {
    const searchNameInput = document.getElementById("searchInput");
    const searchName = searchNameInput.value.trim();
  
    if (searchName === "") {
      onFail("Hãy nhập thông tin cần tìm kiếm.");
      return;
    }
  
    phoneService
      .searchPhoneApi(searchName)
      .then((res) => {
        if (res.data.length === 0) {
          onFail("Không tìm thấy sản phẩm nào.");
        } else {
          renderPhoneList(res.data);
          showInfoPhone(res.data[0]);
        }
      })
      .catch((err) => {
        console.error("Error searching phone:", err);
        onFail("Có lỗi xảy ra khi tìm kiếm sản phẩm.");
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
    rows.forEach((row) => tbody.appendChild(row));
    sortAscending = !sortAscending;
  
    const sortIcon = document.getElementById("sortPriceIcon");
    sortIcon.className = sortAscending ? "fa fa-sort-asc" : "fa fa-sort-desc";
  };
  window.sortTable = sortTable;
  
  // Hàm kiểm tra tính hợp lệ của dữ liệu điện thoại
  const isValidPhoneData = (dataPhone) => {
    return (
      dataPhone &&
      dataPhone.name &&
      dataPhone.price &&
      dataPhone.frontCamera &&
      dataPhone.backCamera &&
      dataPhone.screen &&
      dataPhone.desc &&
      dataPhone.img &&
      !isNaN(dataPhone.id) &
      !isNaN(dataPhone.price) &&
      !isNaN(dataPhone.frontCamera) &&
      !isNaN(dataPhone.backCamera) &&
      !isNaN(dataPhone.screen)
    );
  };
  
  
  document.getElementById("addPhoneForm").addEventListener("click", () => {
    resetForm();
    isUpdating = false;
    document.getElementById("saveButton").style.display = "block";
    document.getElementById("updateButton").style.display = "none";
    document.getElementById("id").readOnly = false;
    $("#exampleModal").modal("show");
  });
  
  document.getElementById("btnClose").addEventListener("click", () => {
    $("#exampleModal").modal("hide");
    resetForm();
  });
  