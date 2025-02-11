import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import "./style/StyleLogin.css";

import { Switch, Route, Link } from "react-router-dom";

import { Layout, Button } from "antd";

import {
  SearchOutlined,
  ShoppingCartOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./style/index.css";

import AuthService from "./services/auth.service";
import produce from "./services/produce.service";

import EventBus from "./common/EventBus";
import Home from "./components/home.component";

import Login from "./components/login.component.jsx";
import Register from "./components/register.component";
import cartService from "./services/cart.server";
import Profile from "./components/profile.component";
import checkout from "./components/checkout.component";

import Addproduced from "./components/addproduced.component";
import Details from "./components/details.component";
import Revenue from "./components/revenue-statistics.component";
import MyOrder from "./components/MyOrder.component";
import Quanlydonhang from "./components/quanlydonhang.component";
import SearchFood from "./components/searchFood.component";
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      produceds: [],
      collapsed: false,
      cart: [],
      qty: 1,
      inputValue: "",
      listFood: [],
    };

    this.updateQty = this.updateQty.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });

      cartService.GetListFoodOrderByIdUser(user.id).then((res) => {
        this.setState({ cart: res.data });
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  onClickCart() {
    const user = AuthService.getCurrentUser();
    if (user) {
      cartService.GetListFoodOrderByIdUser(user.id).then((res) => {
        this.setState({ cart: res.data });
      });
    }
  }

  getListFoodByName = (inputValue) => {
    produce.getListFoodByNameLike(inputValue).then((res) => {
      this.setState({ listFood: res.data });
    });
  };

  onChangeInput = (e) => {
    this.setState({ inputValue: e.target.value });
    produce.getListFoodByNameLike(e.target.value).then((res) => {
      this.setState({ listFood: res.data });
    });
  };

  updateQty = (
    id,
    foodid,
    foodname,
    linkimage,
    price,
    qty,
    userid,
    stateMsg
  ) => {
    console.log(stateMsg);
    let itemCart = { id, foodid, foodname, linkimage, price, qty, userid };
    console.log(itemCart)
    if (qty > 0) {
      this.setState({ qty: qty });
      cartService.updateQtyItemCart(itemCart).then((res) => {
        this.setState({ cart: res.data });
      });
    }
  };

  render() {
    const { currentUser } = this.state;
    const { Header, Content } = Layout;
    const { cart } = this.state;
    return (
      <div>
        <Header className="Header-app">
          <Link to={"/home"}>
            <div className="Header-item">
              <img
                alt="Logo"
                className="Logo"
                src={"https://i.imgur.com/H2CbALV.png"}
              />
            </div>
          </Link>

          <div>
            <div className="Input-Search">
              <input
                className="Input-Search-text"
                placeholder="Nhập vào nội dung muốn tìm kiếm"
                onChange={this.onChangeInput}
              ></input>
              <Link
                className="btn-Search"
                onClick={() => this.getListFoodByName(this.state.inputValue)}
                to={{ pathname: "/search", state: this.state.listFood }}
              >
                <SearchOutlined className="btn-search-icon" />
              </Link>
            </div>
          </div>
          <div className="Cart">
            <span className="item-hover">
              {/* <ShoppingCartOutlined className="Item-icon" onClick={this.onClickCart()} /> */}
              <ShoppingCartOutlined className="Item-icon" />
              <div className="Cart-item">
                <header>
                  <h3 className="Title-cart">Danh sách món đã chọn</h3>
                  <Button className="btn-Checkout" type="primary" block>
                    <Link
                      to={{ pathname: "/checkout", state: this.state.cart }}
                    >
                      Giỏ đồ ăn
                    </Link>
                  </Button>
                </header>
                {cart.map((item) => (
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
                          <LeftOutlined
                            onClick={() =>
                              this.updateQty(
                                item.id,
                                item.foodid,
                                item.foodname,
                                item.linkimage,
                                item.price,
                                item.qty - 1,
                                item.userid,
                                "Giảm"
                              )
                            }
                          />
                          <span>{item.qty}</span>
                          <RightOutlined
                            onClick={() =>
                              this.updateQty(
                                item.id,
                                item.foodid,
                                item.foodname,
                                item.linkimage,
                                item.price,
                                item.qty + 1,
                                item.userid,
                                "Tăng"
                              )
                            }
                          />
                        </p>
                        <p className="Price Detail-item">{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </span>
          </div>

          {currentUser ? (
            <div className="Header-item">
              <li>
                <Link className="item-btn" to="/profile">
                  {currentUser !== undefined
                    ? currentUser.username
                    : "Đăng nhập"}
                </Link>
              </li>

              <li>
                <Link className="item-btn" to="/login" onClick={this.logOut}>
                  Đăng xuất
                </Link>
              </li>
            </div>
          ) : (
            <div className="Header-item">
              <li>
                <Link className="item-btn" to="/login">
                  Đăng nhập
                </Link>
              </li>

              <li>
                <Link className="item-btn" to={"/register"}>
                  Đăng ký
                </Link>
              </li>
            </div>
          )}
        </Header>
        <Content className="Content-app">
          <Switch>
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/register"} component={Register} />
            <Route exact path={[["/home", "/"]]} component={Home} />
            <Route exact path={"/profile"} component={Profile} />
            <Route exact path={"/checkout"} component={checkout} />
            <Route exact path={"/myorder"} component={MyOrder} />
            <Route exact path={"/profile"} component={Profile} />
            <Route exact path={"/addproduced"} component={Addproduced} />
            <Route exact path={"/details"} component={Details} />
            <Route exact path={"/revenue"} component={Revenue} />
            <Route exact path={"/quanlydonhang"} component={Quanlydonhang} />
            <Route exact path={"/search"} component={SearchFood} />
          </Switch>
        </Content>
      </div>
    );
  }
}

export default App;
