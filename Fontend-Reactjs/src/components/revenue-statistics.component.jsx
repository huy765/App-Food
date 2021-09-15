import React, { Component } from "react";
import ProducesService from "../services/produce.service";
import CategoryService from "../services/Category.service";
import "bootstrap/dist/css/bootstrap.min.css";

import "antd/dist/antd.css";
import "../style/revenueStatistics.css";

import { } from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { DatePicker } from "antd";
import { Button } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import authService from "../services/auth.service";
import cartService from "../services/cart.server";
import Profile from "./profile.component";
import { Switch, Route, Link } from "react-router-dom";
import Addproduced from "./addproduced.component";
import Details from "./details.component";
import Home from "../components/home.component";
// import { Area } from '@antv/g2plot';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;



export default class Revenue extends Component {
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
                <Menu.Item key="7">Tình trạng đơn hàng</Menu.Item>
                <Menu.Item key="8">Đăng xuất</Menu.Item>
              </SubMenu>

              <Link to="/home">
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Menu">
                </SubMenu>
              </Link>

              {showAdminBoard ?
                <SubMenu key="sub3" icon={<TeamOutlined />} title="Admin">
                  <Menu.Item key="9"><Link to={"/addproduced"}>Thêm món ăn</Link></Menu.Item>
                  <Menu.Item key="10">Thống kê đơn hàng</Menu.Item>
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
           <div className="page-content-wrapper">
            <div className="grid container">
              <div className="main-DT">
                <div className="seller-meta">
                  <div className="section-title">
                    Tổng Quan
                    </div>
                    <div className="meta-section">
                      <div className="meta-overview">
                        <div className="meta-released">
                          <div className="meta-item-title">
                            Doanh Thu
                          </div>
                          <div className="meta-time-box">
                            <div className="meta-time-item mr16">
                              <div className="label">
                                Tuần Này
                              </div>
                              <div className="meta-numeric-content" >
                                <span className="currency-symbol">đ</span>
                                 1000000000
                              </div>
                            </div>
                            
                            <div className="meta-time-item mr16">
                              <div className="label">
                                Tháng Này
                              </div>
                              <div className="meta-numeric-content" >
                                <span className="currency-symbol">đ</span>
                                1000000000
                              </div>
                            </div>

                            <div className="meta-time-item mr16">
                              <div className="label">
                                Năm Này
                              </div>
                              <div className="meta-numeric-content" style={{width: "123"}}>
                                <span className="currency-symbol">đ</span>
                                1000000000
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="right-main-table">
                  <div className="main-content">
                    <div className="section-title section-title-CT">
                      <span>Chi Tiết</span>
                    </div>

                    <div className="transactions-table-wrap">
                      {
                        
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="right-DT">
                <div className="income-statements">
                  <div className="meta-section sidebar-section-header">
                    <div className="statement-title max-height-ND">Báo Cáo Thu Nhập</div>
                    <div className="Tu-Ngay max-height-ND">
                      Từ Ngày
                    </div>
                    <DatePicker className="dtp-Tu-Ngay max-height-ND"/>

                    <div className="Den-Ngay max-height-ND">
                      Đến Ngày
                    </div>
                    <DatePicker className="dtp-Tu-Ngay max-height-ND"/>
                  </div>
                  <Button className="can-giua">Truy Xuất</Button>
                  <div className="meta-section-content">
                    {/* <ul className="list">
                      <li className="date">27</li>
                      <li className="date">28</li>
                      <li className="date">29</li>
                      <li className="date">30</li>
                      <li className="date">31</li>
                    </ul> */}
                  </div>

                </div>
              </div>
            </div>
           </div>
          </Content>
          <Switch>
            <Route exact path={"/profile"} component={Profile} />
            <Route exact path={"/addproduced"} component={Addproduced} />
            <Route exact path={"/details"} component={Details} />
            <Route exact path={"/home"} component={Home} />
          </Switch>
        </Layout>
      </div>
    );
  }
}
