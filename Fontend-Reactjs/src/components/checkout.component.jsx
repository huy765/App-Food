import React, { Component } from 'react';
import { DeleteOutlined } from "@ant-design/icons";
import "../style/checkout.css"
import cartService from "../services/cart.server";
import AuthService from "../services/auth.service";

class checkout extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cart: this.props.location.state,
            currentUser: undefined,
            userReady: false,
            totalPayment: 0
        }
    }

    updateQty = (id, foodid, foodname, linkimage, price, qty, userid, stateMsg) => {
        console.log(stateMsg);
        let itemCart = { id, foodid, foodname, linkimage, price, qty, userid }
        if (qty > 0) {
            this.setState({ qty: qty });
            cartService.updateQtyItemCart(itemCart).then((res) => {
                this.setState({ cart: res.data });
            });
        }
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        
        if(currentUser){
            this.setState({currentUser: currentUser,userReady: true});
        }

        let sumresult = 0
        this.state.cart.map((item) => (
            sumresult = Number(sumresult) + Number(item.qty * item.price)
        ))
        this.setState({ totalPayment: sumresult })
    }

    sumresult() {
        let sumresult = 0
        this.state.cart.map((item) => (
            sumresult = Number(sumresult) + Number(item.qty * item.price)
        ))
        this.setState({ totalPayment: sumresult })

    }


    render() {
        return (
            <div className="checkout-app">

                <div className="info-user">
                    {(this.state.userReady) ?

                        <div>
                            <div className="containerpr">
                                <h2>Thông Tin Người Nhận</h2>
                                <ul class="ulpr">
                                    <li class="lipr">
                                        <span class="spanpr">1</span>
                                        <strong>Tên tài khoản:</strong>{" "}{this.state.currentUser.username}
                                    </li>
                                    <li class="lipr">
                                        <span class="spanpr">2</span>
                                        <strong>Id:</strong>{" "}
                                        {this.state.currentUser.id}
                                    </li>
                                    <li class="lipr">
                                        <span class="spanpr">3</span>
                                        <strong>Email:</strong>{" "}
                                        {this.state.currentUser.email}
                                    </li>
                                    <li class="lipr">
                                        <span class="spanpr">4</span>
                                        <strong>Địa chỉ:</strong>{" "}
                                        {this.state.currentUser.address}
                                    </li>
                                    <li class="lipr">
                                        <span class="spanpr">5</span>
                                        <strong>Quyền hạn: {this.state.currentUser.roles && this.state.currentUser.roles.map((role, index) => <span id="text" key={index}>{role}</span>)}</strong>{" "}
                                    </li>
                                </ul>
                            </div>
                        </div> : null}

                </div>

                <div className="info-cart">

                    {this.state.cart.map((item) => (
                        <div className="list-Item-checkout">
                            <div className="item-Food">
                                <div className="img-checkout">
                                    <img
                                        className="img-item-checkout"
                                        src={item.linkimage}
                                        alt="img"
                                    />
                                </div>
                                <div className="Detail">
                                    <p className="TitleFood Detail-item">{item.foodname}</p>
                                    <p className="qrt Detail-item">
                                        <span>Số lượng:
                                            {
                                                item.qty
                                            }
                                        </span>
                                    </p>
                                    <p className="Price Detail-item">{item.price} {
                                        <strong className="result">Tổng:{item.qty * item.price}</strong>
                                    }</p>
                                </div>
                                <DeleteOutlined className="delete" />
                            </div>
                        </div>
                    ))}
                    <div className="total-Payment">
                        Tổng thanh toán:
                        {this.state.totalPayment}
                        đ
                    </div>
                </div>
            </div>
        );
    }
}


export default checkout;