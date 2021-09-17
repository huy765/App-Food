import React, { Component } from "react";
import ProducesService from "../services/produce.service";
import CategoryService from "../services/Category.service";
import "bootstrap/dist/css/bootstrap.min.css";

import "antd/dist/antd.css";
import "../style/home.css";

import { } from "@ant-design/icons";

import { Row, Col } from "antd";

import { Card } from "antd";
import { Button } from "antd";
import { Pagination } from 'antd';

import { Layout, Menu } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import authService from "../services/auth.service";
import cartService from "../services/cart.server";
import Profile from "./profile.component";
import { Switch, Route, Link } from "react-router-dom";
import Addproduced from "./addproduced.component";
import Details from "./details.component";
import Quanlydonhang from "./quanlydonhang.component";
// import MyOrder from "./MyOrder.component";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const { Meta } = Card;



export default class Home extends Component {
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
      Message: "",
      total: 0,
      current: 1,
      value: 0,
      cart: [],
      itemfood: [],
    };
    this.getFoodByCategory = this.getFoodByCategory.bind(this);
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
      this.setState({
        produceds: res.data,
        showProduceds: res.data.slice(0, 10),
        total: res.data.length,
        current: 1,
      })
    });

    CategoryService.getCurrentProduces().then((res) => {
      this.setState({ category: res.data });
    });


  }

  getFoodByCategory(id) {
    console.log(id);
    ProducesService.getFoodByCategoryServer(id).then((res) => {
      this.setState({
        produceds: res.data,
        showProduceds: res.data.slice(0, 10),
        total: res.data.length,
        current: 1,
      });
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
    this.state.itemfood.push(food);
    console.log(this.state.itemfood);
  }

  getAllProduced() {
    ProducesService.getCurrentProduces().then((res) => {
      this.setState({
        produceds: res.data,
        showProduceds: res.data.slice(0, 10),
        total: res.data.length,
        current: 1,
      })
    });
  }

  changePage = (page, pageSize) => {
    var start = (page - 1) * pageSize;
    var end = (page) * pageSize;
    this.setState({ showProduceds: this.state.produceds.slice(start, end) })
    this.setState({ current: page })
  }

  onChange(value) {
    console.log('changed', value);
  }

  render() {

    const { collapsed } = this.state;
    const { showAdminBoard } = this.state;
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

              <SubMenu key="sub2" icon={<TeamOutlined />} title="Menu">
                <Menu.Item onClick={() => this.getAllProduced()}>Hiển thị toàn bộ món ăn</Menu.Item>
                {this.state.category.map((cate) => (
                  <Menu.Item key={cate.id} onClick={() => this.getFoodByCategory(cate.id)}>{cate.namecategory}</Menu.Item>
                ))}
              </SubMenu>

              {showAdminBoard ?
                <SubMenu key="sub3" icon={<TeamOutlined />} title="Admin">
                  <Menu.Item key="9"><Link to={"/addproduced"}>Thêm món ăn</Link></Menu.Item>
                  <Menu.Item key="10"><Link to={"/quanlydonhang"}>Thống kê dơn hàng</Link></Menu.Item>
                  <Menu.Item key="11"><Link to={"/revenue"}>Thống kê doanh thu</Link></Menu.Item>
                  <Menu.Item key="12">Đăng xuất</Menu.Item>
                </SubMenu>
              : 
                <div>

                </div>
              }

            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Row className="rowItem">
              {this.state.ChildCategoryFood.length > 0
                ? this.state.ChildCategoryFood.map((food) => (
                  <Col className="colums" span={4}>
                    <Card
                      className="Card-item"
                      key={food.id}
                      hoverable
                      cover={<img alt="example" src={food.linkimage} />}
                    >
                      <Link className="child-item-food"
                        onClick={() => this.onClickChiTiet(food.id, food.namefood, food.price, food.detail, food.linkimage)}
                        to={{ pathname: "/details", state: this.state.itemfood }}
                      ></Link>
                      <Meta title={food.namefood} description={food.price} />

                      <div >
                        <Button className="btn-order" type="primary" block >
                          Đặt món
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))
                : this.state.showProduceds.map((food) => (
                  <Col className="colums" span={4}>
                    <Card
                      className="Card-item"
                      hoverable
                      cover={<img alt="example" src={food.linkimage} />}

                    >
                      <Link className="child-item-food"
                        onClick={() => this.onClickChiTiet(food.id, food.namefood, food.price, food.detail, food.linkimage)}
                        to={{ pathname: "/details", state: this.state.itemfood }}
                      ></Link>
                      <Meta title={food.namefood} description={food.price} />

                      <Button type="primary" block onClick={() => this.onClickDatMon(this.state.user.id, food.id, food.namefood, food.price, "1", food.linkimage)}>
                        Đặt món
                      </Button>
                    </Card>
                  </Col>
                ))}
            </Row>
            <div>
              <Pagination padding="24px"
                defaultPageSize={10}
                total={this.state.total}
                defaultCurrent={1}
                current={this.state.current}
                showSizeChanger={false}
                onChange={this.changePage}
              />
            </div>

          </Content>
          <Switch>
            <Route exact path={"/profile"} component={Profile} />
            <Route exact path={"/addproduced"} component={Addproduced} />
            <Route exact path={"/details"} component={Details} />
            <Route exact path={"/quanlydonhang"} component={Quanlydonhang} />
          </Switch>
        </Layout>
      </div>
    );
  }
}
