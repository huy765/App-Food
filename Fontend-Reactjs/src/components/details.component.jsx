
import React, { Component } from "react";
import ProducesService from "../services/produce.service";
import "bootstrap/dist/css/bootstrap.min.css";

import "antd/dist/antd.css";
import "../style/details.css";

import { } from "@ant-design/icons";

import { Row, Col } from "antd";
import { Card } from "antd";

import { Button } from "antd";
import { Image } from "antd";

import { Layout, Menu } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import authService from "../services/auth.service";
import { Switch, Route, Link } from "react-router-dom";
import cartService from "../services/cart.server";

import Home from "../components/home.component";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const { Meta } = Card;

export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produceds: [],
      showProduceds: [],
      category: [],
      ChildCategoryFood: [],
      showChildCategoryFoodProduceds: [],
      user: [],
      currentUser: undefined,
      current: 1,
      value: 0,
      MonChon: this.props.location.state,
      cart:[],
      MonChonChiTiet:[],
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  handleChange = value => {
    this.setState({ value });
  };

  componentDidMount() {
    const user = authService.getCurrentUser();
    this.setState({ user: user })

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    ProducesService.getCurrentProduces().then((res) => {
      const NgauNhien = Math.floor((Math.random() * 10));
      this.setState({
        produceds: res.data,
        showProduceds: res.data.slice(NgauNhien - 1,NgauNhien + 4),
        total: res.data.length,
        current: 1,
      })
    });

  }

  onClickDatMon = (userid, foodid, foodname, price, qty, linkimage) => {
    let itemCart = { userid: userid, foodid, foodname, price, qty, linkimage }
    cartService.addFoodByCart(itemCart).then((res) => {
      this.setState({ cart: res.data });
    });
  }

  onClickChiTiet = (foodid, foodname, price, detail, linkimage) => {
    let food = { foodid, foodname, price, detail, linkimage }
    if(this.state.MonChonChiTiet.length > 0) {
      this.state.MonChonChiTiet.pop()
      this.state.MonChon.pop()
    }  
    this.state.MonChonChiTiet.push(food)
    this.state.MonChon.push(food)
    
    const NgauNhien = Math.floor((Math.random() * 10));
    this.setState({
        produceds: this.state.produceds,
        showProduceds: this.state.produceds.slice(NgauNhien - 1,NgauNhien + 4),
        total: this.state.produceds.length,
        current: 1,
      })
  }

  render() {
    const { collapsed } = this.state;

    return (
      <div className="site-layout-background">
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0" }}
        >
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <SubMenu key="sub1" icon={<UserOutlined />} title="Người dùng">
                <Menu.Item key="6"><Link to={"/profile"}>Thông tin tài khoản</Link></Menu.Item>
                <Menu.Item key="7"><Link to={"/myorder"}>Tình trạng đơn hàng</Link></Menu.Item>
                <Menu.Item key="8">Đăng xuất</Menu.Item>
              </SubMenu>

              <Link to="/home">
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Menu">
                </SubMenu>
              </Link>

              <SubMenu key="sub3" icon={<TeamOutlined />} title="Admin">
                <Menu.Item key="9"><Link to={"/addproduced"}>Thêm món ăn</Link></Menu.Item>
                <Menu.Item key="10"><Link to={"/quanlydonhang"}>Thống kê dơn hàng</Link></Menu.Item>
                <Menu.Item key="11"><Link to={"/revenue"}>Thống kê doanh thu</Link></Menu.Item>
                <Menu.Item key="12">Đăng xuất</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content>
            <div>
            <div className="small-details-container single-details-product">  
              { this.state.MonChonChiTiet.length > 0
                ? this.state.MonChonChiTiet.map((item) => (
                    <div className="row-details">
                      <div className="col-2-details">
                        <Image src={item.linkimage} ></Image>
                      </div>
                      <div className="col-2-details KichCo">
                        <h1>{item.foodname}</h1>
                        <h5>Giá : {item.price} đ </h5>
                        <h5>Địa Chỉ : {item.detail}</h5>
                        <Button className="btnThemVaoGio" onClick={() => this.onClickDatMon(this.state.user.id, item.id, item.foodname, item.price, "1", item.linkimage)}>
                          Thêm Vào Giỏ
                        </Button>
                        <h3>Mô tả :</h3>
                      </div>
                    </div>
                  ))
                   : this.state.MonChon.map((item) => (
                    <div className="row-details">
                      <div className="col-2-details">
                        <Image src={item.linkimage} ></Image>
                      </div>
                      <div className="col-2-details KichCo">
                        <h1>{item.foodname}</h1>
                        <h5>Giá : {item.price} đ </h5>
                        <h5>Địa Chỉ : {item.detail}</h5>
                        <Button className="btnThemVaoGio" onClick={() => this.onClickDatMon(this.state.user.id, item.id, item.foodname, item.price, "1", item.linkimage)}>
                          Thêm Vào Giỏ
                        </Button>
                        <h3>Mô tả :</h3>
                      </div>
                    </div>
                  ))
              }
            </div>
            <div></div>
            <div className="small-details-container single-details-product">
              <div className="row-details-1">
                <div className="De-Xuat">
                  <h4 className="Can-Trai">Có thể bạn thích</h4>
                </div>
                <div className="NoiDung-DeXuat">
                  <Row className="rowItem">
                  { this.state.showProduceds.map((food) => (
                      <Col className="colums" span={4}>
                        <Card
                          className="Card-item"
                          hoverable
                          cover={<img alt="example" src={food.linkimage} />}
                          onClick={() => this.onClickChiTiet(food.id, food.namefood, food.price, food.detail, food.linkimage)}
                          >
                          <Meta title={food.namefood} description={food.price} />
                        </Card>
                      </Col>
                    ))}
                    <Link className="Can-Giua" to={"/home"}>
                    <h6 >Xem Tất Cả</h6>
                    </Link>
                </Row>
                </div>
              </div>
            </div>
            </div>
          </Content>
          <Switch>
            <Route exact path={"/home"} component={Home} />
          </Switch>
        </Layout>
      </div>
    );
  }
}