import axios from "axios";

const API_URL = "http://localhost:8080/app/";

class produce {
  getCurrentProduces() {
    return axios.get(API_URL + "produced");
  }

  getFoodByCategoryServer(id){
    return axios.get(`${API_URL}producedById?id=${id}`);
  }

  addProduced(food){
    return axios.post(API_URL + "addproduced",food)
  }

  getListFoodByNameLike(foodname){
    return axios.get(`${API_URL}produced/${foodname}`)
  }
}

export default new produce();
