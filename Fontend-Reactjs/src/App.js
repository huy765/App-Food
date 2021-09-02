import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import "./style/StyleLogin.css";

import { Switch, Route, Link } from "react-router-dom";

import { Layout, Button } from "antd";

import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./style/index.css";

import AuthService from "./services/auth.service";

import EventBus from "./common/EventBus";
import Home from "./components/home.component";

import Login from "./components/login.component.jsx";
import Register from "./components/register.component";
import cartService from "./services/cart.server";
import Profile from "./components/profile.component";
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
    };
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

  render() {
    const { currentUser } = this.state;
    console.log(currentUser);
    const { Header, Content } = Layout;
    return (
      <div>
        <Header className="Header-app">
          <div className="Header-item">Icon</div>

          <div>
            <div className="Input-Search">
              <input
                className="Input-Search-text"
                placeholder="Nhập vào nội dung muốn tìm kiếm"
              ></input>
              <Button className="btn-Search">
                <SearchOutlined className="btn-search-icon" />
              </Button>
            </div>
          </div>
          <div className="Cart">
            <span className="item-hover">
              <ShoppingCartOutlined className="Item-icon" />

              <div className="Cart-item">
                <header>
                  <h3 className="Title-cart">Danh sách món đã chọn</h3>
                </header>
                {this.state.cart.map((item) => (
                <div className="list-Item">
                  <div className="item-Food">
                    <div className="img">
                      <img
                        className="img-item"
                        src="https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn"
                        alt="img"
                      />
                    </div>
                      <div className="Detail">
                        <p className="TitleFood Detail-item">{item.foodname}</p>
                        <p className="qrt Detail-item">{item.qtr}</p>
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
          </Switch>
        </Content>
      </div>
    );
  }
}

export default App;
