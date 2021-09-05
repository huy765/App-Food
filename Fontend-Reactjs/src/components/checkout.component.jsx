import React, { Component } from 'react';
import { LeftOutlined, RightOutlined,DeleteOutlined } from "@ant-design/icons";
import "../style/checkout.css"
import cartService from "../services/cart.server";

class checkout extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cart: this.props.location.state
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

    sumresult(){
        let sumresult = 0
        this.state.cart.map((item)=>(
            sumresult = Number(sumresult) + Number(item.qty * item.price)
        ))
        console.log(sumresult);
    }


    render() {
        
        return (
            <div className="checkout-app">

                <div className="info-user">


                </div>

                <div className="info-cart">
                    {this.state.cart.map((item) => (
                        <div className="list-Item">
                            <div className="item-Food">
                                <div className="img">
                                    <img
                                        className="img-item"
                                        src={item.linkimage}
                                        alt="img"
                                    />
                                </div>
                                <div className="Detail">
                                    <p className="TitleFood Detail-item">{item.foodname}</p>
                                    <p className="qrt Detail-item">
                                        <LeftOutlined onClick={() => this.updateQty(item.id, item.foodid, item.foodname, item.linkimage, item.price, item.qty - 1, item.userid, "Giảm")} />
                                        <span>
                                            {
                                                item.qty
                                            }
                                        </span>
                                        <RightOutlined onClick={() => this.updateQty(item.id, item.foodid, item.foodname, item.linkimage, item.price, item.qty + 1, item.userid, "Tăng")} />
                                    </p>
                                    <p className="Price Detail-item">{item.price} {
                                        <strong className="result">Tổng:{item.qty * item.price}</strong>
                                    }</p>
                                </div>
                                <DeleteOutlined className="delete"/>
                            </div>
                        </div>
                    ))}
                    <button onClick={this.sumresult()}>click</button>
                </div>
            </div>
        );
    }
}


export default checkout;