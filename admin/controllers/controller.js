


// export let renderPhoneList = (phoneArr) => {
//     let contentHTML = '';
    
    
    
//     phoneArr.forEach((item) => {
//         let trString = `
//             <tr>
//             <td>${item.id}</td>
//             <td>${item.name}</td>
//             <td>${item.price}</td>
//             <td><img src="${item.img}" alt="Product Image" style="max-width: 100px; max-height: 100px;"></td>
            
//             <td>${item.desc}<br>
//             <strong>Màn hình:</strong> ${item.screen}  MP<br>
//             <strong>Camera trước:</strong> ${item.frontCamera} MP<br>
//             <strong>Camera sau:</strong> ${item.backCamera} MP<br>
//             </td>
//             <td>
//                 <button onclick="deletePhone(${item.id})" class="btn btn-danger">Delete</button>
//                 <button  class="btn btn-primary" onclick="getDetailPhone(${item.id})">Sửa</button>
//             </td>
//         </tr>
//         `;
//         contentHTML += trString;
//     });
    
//     document.getElementById('tablePhone').innerHTML = contentHTML;
// };

// export let onSuccess = (message) => {
//     Swal.fire({
//         title: message,
//         text: 'You clicked the button!',
//         icon: 'success',
//     });
// };
// export let onFail = (errorMessage) => {

//     Swal.fire({

//         title: 'Error!',

//         text: errorMessage,

//         icon: 'error',
//     });
// };

// export let getDataPhoneForm = () => {
//     let id = document.getElementById('id').value;
//     let name = document.getElementById('name').value;
//     let price = document.getElementById('price').value;
//     let desc = document.getElementById('desc').value;
//     let img = document.getElementById('img').value;
//     let frontCamera = document.getElementById('frontCamera').value;
//     let backCamera = document.getElementById('backCamera').value;
//     let screen = document.getElementById('screen').value;
//     let type = document.getElementById('phoneType').value;
//     let phone = {
//         name,
//         price,
//         desc,
//         img,
//         frontCamera,
//         backCamera,
//         screen,
//         id,
//         type
//     };
//     return phone;
// };
// export let showInfoPhone = (dataPhone) => {
//     document.getElementById('id').value = dataPhone.id;
//     document.getElementById('name').value = dataPhone.name;
//     document.getElementById('price').value = dataPhone.price;
//     document.getElementById('img').value = dataPhone.img;
//     document.getElementById('desc').value = dataPhone.desc;
//     document.getElementById('frontCamera').value = dataPhone.frontCamera;
//     document.getElementById('backCamera').value = dataPhone.backCamera;
//     document.getElementById('screen').value = dataPhone.screen;
//     document.getElementById('phoneType').value = dataPhone.type;

// };
// // Function to reset the input fields in the form
// export let resetForm = () => {
//     document.getElementById('name').value = '';
//     document.getElementById('price').value = '';
//     document.getElementById('desc').value = '';
//     document.getElementById('frontCamera').value = '';
//     document.getElementById('backCamera').value = '';
//     document.getElementById('screen').value = '';
//     document.getElementById('img').value = '';

//     // Reset any error messages if needed
//     let errorElements = document.querySelectorAll('.sp-thongbao');
//     errorElements.forEach((element) => {
//         element.innerHTML = '';
//     });
// };
export let renderPhoneList = (phoneArr) => {
    let contentHTML = "";
  
    phoneArr.forEach((item) => {
      let trString = `
              <tr>
              <td>${item.id}</td>
              <td>${item.name}</td>
              <td>${item.price}</td>
              <td><img src="${item.img}" alt="Product Image" style="max-width: 100px; max-height: 100px;"></td>
              
              <td>${item.desc}<br>
              <strong>Màn hình:</strong> ${item.screen}  MP<br>
              <strong>Camera trước:</strong> ${item.frontCamera} MP<br>
              <strong>Camera sau:</strong> ${item.backCamera} MP<br>
              </td>
              <td>
                  <button onclick="deletePhone(${item.id})" class="btn btn-danger">Delete</button>
                  <button  class="btn btn-primary" onclick="getDetailPhone(${item.id})">Sửa</button>
              </td>
          </tr>
          `;
      contentHTML += trString;
    });
  
    document.getElementById("tablePhone").innerHTML = contentHTML;
  };
  
  export let onSuccess = (message) => {
    Swal.fire({
      title: message,
      text: "You clicked the button!",
      icon: "success",
    });
  };
  export let onFail = (errorMessage) => {
    Swal.fire({
      title: "Error!",
  
      text: errorMessage,
  
      icon: "error",
    });
  };
  
  export let getDataPhoneForm = () => {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let desc = document.getElementById("desc").value;
    let img = document.getElementById("img").value;
    let frontCamera = document.getElementById("frontCamera").value;
    let backCamera = document.getElementById("backCamera").value;
    let screen = document.getElementById("screen").value;
    let type = document.getElementById("phoneType").value;
    let phone = {
      name,
      price,
      desc,
      img,
      frontCamera,
      backCamera,
      screen,
      id,
      type,
    };
    localStorage.setItem("phoneData", JSON.stringify(phone))
    return phone;
  };
  export let showInfoPhone = (dataPhone) => {
    document.getElementById("id").value = dataPhone.id;
    // disable input if id id
    document.getElementById("id").readOnly = true;
    // show data in the form
    document.getElementById("name").value = dataPhone.name;
    document.getElementById("price").value = dataPhone.price;
    document.getElementById("img").value = dataPhone.img;
    document.getElementById("desc").value = dataPhone.desc;
    document.getElementById("frontCamera").value = dataPhone.frontCamera;
    document.getElementById("backCamera").value = dataPhone.backCamera;
    document.getElementById("screen").value = dataPhone.screen;
    document.getElementById("phoneType").value = dataPhone.type;
  };
  // Function to reset the input fields in the form
  export let resetForm = () => {
    document.getElementById("id").readOnly = false;
    localStorage.removeItem("phoneData")

    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("frontCamera").value = "";
    document.getElementById("backCamera").value = "";
    document.getElementById("screen").value = "";
    document.getElementById("img").value = "";
  
    // Reset any error messages if needed
    let errorElements = document.querySelectorAll(".sp-thongbao");
    errorElements.forEach((element) => {
      element.innerHTML = "";
    });
  };


  export let pushForm = (data) => {
    console.log(data)
    document.getElementById("id").readOnly = false;

    document.getElementById("id").value = data.id;
    document.getElementById("name").value = data.name;
    document.getElementById("price").value = data.price;
    document.getElementById("desc").value = data.desc;
    document.getElementById("frontCamera").value = data.frontCamera;
    document.getElementById("backCamera").value = data.backCamera;
    document.getElementById("screen").value = data.screen;
    document.getElementById("img").value = data.img;
  
  };
  