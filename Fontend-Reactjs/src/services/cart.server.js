import axios from "axios";

const API_URL = "http://localhost:8080/app/";

class Cartserver {
  getCurrentProduces() {
    return axios.get(API_URL + "produced");
  }

  GetListFoodOrderByIdUser(id){
    return axios.get(API_URL + `listbyid/${id}`);
  }

  addFoodByCart (itemCart) {
    return axios.post(API_URL + "addCart",itemCart)
  }

  updateQtyItemCart(itemCart){
    return axios.put(API_URL + "update",itemCart)
  }
}

export default new Cartserver();
