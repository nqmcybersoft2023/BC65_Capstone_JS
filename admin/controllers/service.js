const BASE_URL = 'https://6597f70f668d248edf23ce4d.mockapi.io/api/v1/products'
let getPhoneListApi = () => {
  return axios({
    url: BASE_URL,
    method: 'GET',
  });

};

let deletePhoneApi = (id) => {
  return axios({
    url: `${BASE_URL}/${id}`,
    method: 'DELETE',
  });
};
let createPhoneApi = (dataPhone) => {
  return axios({
    url: BASE_URL,
    method: 'POST',
    data: dataPhone,
  });
};
let getDetailPhoneApi = (id) => {
  return axios({
    url: `${BASE_URL}/${id}`,
    method: 'GET',
  });
};
let updatePhoneApi = (data) => {
  return axios({
    url: `${BASE_URL}/${data.id}`,
    method: 'PUT',
    data: data,
  })
}
 
let searchPhoneApi = (searchName) => {
  return axios({
      url: `${BASE_URL}?search=${searchName}`,
      method: 'GET',
  });
};

 
let phoneService = {
  getPhoneListApi,
  deletePhoneApi,
  createPhoneApi,
  getDetailPhoneApi,
  updatePhoneApi,
  searchPhoneApi,  
};

export default phoneService;
