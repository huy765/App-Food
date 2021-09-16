import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "antd/dist/antd.css";

import "../style/MyOrder.css";
import MyOrderSevice from "../services/MyOrderSevice";
import AuthService from "../services/auth.service";

import { } from "@ant-design/icons";
import { Steps, Button, message, Image } from 'antd';

const { Step } = Steps;

export default class MyOrder extends Component {

  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      MyOrderCur: [],
      stateOrder: "",
      currentUser: [],
      showAdminBoard: false,
    }
  }

  findSuccessShiper = (id) => {
    this.setState({ current: 2 });
    MyOrderSevice.UpdateMyOrder(id, "order")
    message.success('Đã xác nhận có người giao hàng');
    window.location.reload();
  };

  successOrder = (id) => {
    this.setState({ current: 3 });
    MyOrderSevice.UpdateMyOrder(id, "complete")
    message.success('Xác nhận đã nhận được đơn hàng');
    window.location.reload();
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser.roles);
    if (currentUser) {
      this.setState({
        currentUser: currentUser.roles.includes("ROLE_USER"),
        showAdminBoard: currentUser.roles.includes("ROLE_ADMIN"),
      });
    }
    if (currentUser.roles[0] === "ROLE_USER") {
      MyOrderSevice.GetMyOrder(currentUser.id).then((res) => {
        this.setState({ MyOrderCur: res.data });
      })
    } else if (currentUser.roles[0] === "ROLE_ADMIN") {
      MyOrderSevice.GetAllOrder().then((res) => {
        this.setState({ MyOrderCur: res.data });
      })
    }

  }

  render() {
    const { currentUser, showAdminBoard } = this.state;
    return (
      <div className="app-MyOrder">
        <div className="Title-name">
          Danh sách đơn hàng
        </div>
        {
          this.state.MyOrderCur.map((order) => (

            <div className="block-image-Order">
              <div className="info-MyOrder">
                <div className="image-MyOrder">
                  <Image
                    className="image-show"
                    width={110}
                    src={order.linkimage}
                  />
                </div>
                <div className="info-food">
                  <h3 className="item-info-food"><strong className="bold-html bold-html-namefood">Tên món:</strong>{order.foodname}</h3>
                  <h3 className="item-info-food"><strong className="bold-html bold-html-sty">Số lượng đặt:</strong>{order.qty}</h3>
                  <h3 className="item-info-food"><strong className="bold-html bold-html-price">Giá/món:</strong>{order.price}</h3>
                </div>
                <div className="info-food">
                  <h3 className="item-info-food"><strong className="bold-html">Tên người nhận:</strong>{order.hotennguoihan}</h3>
                  <h3 className="item-info-food"><strong className="bold-html">Phone:</strong>{order.sdtnhanhang}</h3>
                  <h3 className="item-info-food"><strong className="bold-html">Tổng tiền:</strong>{order.price * order.qty}</h3>
                </div>
                <div className="info-food">
                  <h3 className="item-info-food"><strong className="bold-html bold-html-address">Địa chỉ nhận:</strong>{order.diachinhan}</h3>
                  
                </div>
              </div>

              <Steps current={
                order.stateorder === 'init' ? 0 :
                  order.stateorder === "order" ? 1 :
                    order.stateorder === "complete" ? 2 : 0}
              >
                <Step key="1" title="Chưa có người giao hàng" />
                <Step key="2" title="Đang giao hàng" />
                <Step key="3" title="Đã nhận hàng" />

              </Steps>

              <div className="steps-action">

                {showAdminBoard ?

                  <Button type="primary" onClick={() => this.findSuccessShiper(order.id)}>
                    Đã có người giao hàng
                  </Button>
                  :
                  <div>

                  </div>
                }

                {currentUser ?
                  <Button type="primary" onClick={() => this.successOrder(order.id)}>
                    Xác nhận hoàn thành đơn hàng
                  </Button>

                  :
                  <div>

                  </div>
                }

              </div>
            </div>
          ))
        }


      </div>
    );
  }
}