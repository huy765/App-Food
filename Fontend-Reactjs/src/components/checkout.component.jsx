import React, { Component } from 'react';
import { DeleteOutlined } from "@ant-design/icons";
import "../style/checkout.css"
import cartService from "../services/cart.server";
import AuthService from "../services/auth.service";
import checkoutServer from "../services/checkout.service";
import { Button } from "antd";

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

        if (currentUser) {
            this.setState({ currentUser: currentUser, userReady: true });
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

    orderFood = () => {
        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
        for (const food of this.state.cart) {
            let item = {datecheckout: date,diachinhan: this.state.currentUser.address,sdtnhanhang:this.state.currentUser.phone,hotennguoihan:this.state.currentUser.namedisplay, idcart:food.id,foodid:food.foodid,foodname:food.foodname,linkimage:food.linkimage,qty:food.qty,price:food.price,userid:food.userid,tonggiatri:this.state.totalPayment}
            checkoutServer.createOrder(item);
            this.setState({cart:[]});
        }
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
                                        <strong>Họ và tên:</strong>{" "}
                                        {this.state.currentUser.namedisplay}

                                    </li>

                                    <li class="lipr">
                                        <span class="spanpr">2</span>
                                        <strong>Phone:</strong>{" "}
                                        {this.state.currentUser.phone}

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
                        <strong className="total">
                            Tổng thanh toán:{this.state.totalPayment}đ
                        </strong>

                    </div>
                    <Button className="btn-page-Checkout" type="primary" block onClick={() => this.orderFood()}>
                        Thanh toán
                    </Button>
                </div>
            </div>
        );
    }
}


export default checkout;