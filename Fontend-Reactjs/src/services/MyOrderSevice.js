import axios from "axios";

const API_URL = "http://localhost:8080/app/";

class Myorder {

  GetAllOrder(){
    return axios.get(`${API_URL}MyOrder`);
  }

  GetMyOrder(idUser){
    return axios.get(`${API_URL}MyOrder/${idUser}`);
  }

  UpdateMyOrder(id,stateorder){
    return axios.put(`${API_URL}MyOrder/${id}/${stateorder}`);
  }

}

export default new Myorder();