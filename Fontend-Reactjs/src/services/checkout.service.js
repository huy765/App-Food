import axios from "axios";

const API_URL = "http://localhost:8080/app/";

class checkout {
  createOrder(cart){
    console.log(cart);
    return axios.post(`${API_URL}order`, cart);
  }
}

export default new checkout();