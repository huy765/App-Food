import axios from "axios";

const API_URL = "http://localhost:8080/app/";

class checkout {
  createOrder(cart){
    console.log(cart);
    return axios.post(`${API_URL}order`, cart);
  }
  getOrder() {
    return axios.get(API_URL + "orders");
  }
  getOrderByNgaytao(ngaytao){
    return axios.get(`${API_URL}orderByNgaytao?ngaytao=${ngaytao}`);
  }
}

export default new checkout();