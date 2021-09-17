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
  getOrderByMonth(month){
    return axios.get(`${API_URL}orderByMonth?month=${month}`);
  }
}

export default new checkout();