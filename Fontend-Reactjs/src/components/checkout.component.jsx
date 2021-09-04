import React, { Component } from 'react';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
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


    render() {

        return (
            <div className="checkout-app">
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
                                <p className="Price Detail-item">{item.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}


export default checkout;