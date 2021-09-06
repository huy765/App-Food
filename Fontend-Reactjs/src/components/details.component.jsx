import React, { Component } from "react";
import ProducesService from "../services/produce.service";
import "bootstrap/dist/css/bootstrap.min.css";

import "antd/dist/antd.css";
import "../style/details.css";

import { } from "@ant-design/icons";


import { Button } from "antd";
import { Image } from "antd";

import { Layout, Menu } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import authService from "../services/auth.service";
import { Switch, Route, Link } from "react-router-dom";

import Home from "../components/home.component";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;



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
      Message: "",
      total: 0,
      current: 1,
      value: 0,
      cart: [],
      MonChon:[],
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
                <Menu.Item key="6"><Link  to={"/profile"}>Thông tin tài khoản</Link></Menu.Item>
                <Menu.Item key="7">Tình trạng đơn hàng</Menu.Item>
                <Menu.Item key="8">Đăng xuất</Menu.Item>
              </SubMenu>

              <Link to = "/home">
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Menu">
                  <Menu.Item onClick={() => this.getAllProduced()}>Hiển thị toàn bộ món ăn</Menu.Item>
                  {this.state.category.map((cate) => (
                    <Menu.Item key={cate.id} onClick={() => this.getFoodByCategory(cate.id)}>{cate.namecategory}</Menu.Item>
                  ))}
                </SubMenu>
              </Link>

              <SubMenu key="sub3" icon={<TeamOutlined />} title="Admin">
                <Menu.Item key="9">Thêm món ăn</Menu.Item>
                <Menu.Item key="10">Thống kê đơn hàng</Menu.Item>
                <Menu.Item key="11">Thống kê doanh thu</Menu.Item>
                <Menu.Item key="12">Đăng xuất</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content>
            <div className="small-details-container single-details-product">
                <div className="row-details">
                    <div className="col-2-details">
                      <Image src="https://camnanghaiphong.vn/upload/camnanghaiphong/images/1212.jpg" ></Image>
                        {/* <img src="https://camnanghaiphong.vn/upload/camnanghaiphong/images/1212.jpg" /> */}
                    </div>
                    <div className="col-2-details KichCo">
                        <h1>{this.props.foodname}</h1>
                        <h4>$29</h4>
                        <Button className="btnThemVaoGio">Thêm Vào Giỏ</Button>
                        <Button className="btnThemVaoGio">Yêu thích</Button>
                        <h3>Mô tả :</h3>
                    </div>
                </div>
            </div>
            {/* {this.state.MonChon.length > 0
            ? this.state.MonChon.map((food) => (
              <h1>{food.foodname}</h1>
            ))
            } */}
          </Content>
          <Switch>           
            <Route exact path={"/home"} component={Home} />     
          </Switch>
        </Layout>
      </div>
    );
  }
}
