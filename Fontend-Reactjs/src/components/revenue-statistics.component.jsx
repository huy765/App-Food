import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "antd/dist/antd.css";
import "../style/revenueStatistics.css";

import { } from "@ant-design/icons";

import { Layout, Menu } from "antd";
import { DatePicker } from "antd";
import { Button } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import authService from "../services/auth.service";
import Profile from "./profile.component";
import { Switch, Route, Link } from "react-router-dom";
import Addproduced from "./addproduced.component";
import Details from "./details.component";
import Home from "../components/home.component";
// import { Area } from '@antv/g2plot';
import { Chart, Axis, Geom, Tooltip, Coord, Legend } from 'bizgoblin';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const pixelRatio = window.devicePixelRatio * 2;

const data_Thang = [
  {
    year: 'năm 1951 ',
    sales: 38,
  }, {
    year: 'năm 1952 ',
    sales: 52,
  }, {
    year: 'năm 1956 ',
    sales: 61,
  }, {
    year: 'năm 1957 ',
    sales: 145,
  }, {
    year: 'năm 1958 ',
    sales: 48,
  }, {
    year: 'năm 1959 ',
    sales: 38,
  }, {
    year: 'năm 1960 ',
    sales: 38,
  }, {
    year: 'năm 1962 ',
    sales: 38,
  },
  
];

const defs_Thang = [{
  dataKey: 'year',
}, {
  dataKey: 'sales',
  tickCount: 5,
}];

function onShowTooltip(ev) {
  const items = ev.items;
  items[0].name = null;
  items[0].name = items[0].title;
  items[0].value = `¥ ${items[0].value}`;
}
//biểu đồ theo năm
const map_Nam = {
  kẹo: '40%',
  cỏ: '20%',
  ke: '18%',
  ma_toe: '15%',
  bom: '5%',
  AWM: '2%',
};

const data_Nam = [
  {
    name: 'kẹo',
    percent: 0.4,
    a: '1',
  }, {
    name: 'cỏ',
    percent: 0.2,
    a: '1',
  }, {
    name: 'ke',
    percent: 0.18,
    a: '1',
  }, {
    name: 'ma_toe',
    percent: 0.15,
    a: '1',
  }, {
    name: 'bom',
    percent: 0.05,
    a: '1',
  }, {
    name: 'AWM',
    percent: 0.02,
    a: '1',
  },
];

const defs_Nam = [{
  dataKey: 'percent',
  formatter: val => `${val * 100}%`,
}];
//biểu đồ theo các năm
const map_Cac_Nam = {
  kem: '40%',
  bánh: '20%',
  keó: '18%',
  khăn: '15%',
  bom: '5%',
  AWM: '2%',
};

const data_Cac_Nam = [
  {
    name: 'kem',
    percent: 0.4,
    a: '1',
  }, {
    name: 'bánh',
    percent: 0.2,
    a: '1',
  }, {
    name: 'kéo',
    percent: 0.18,
    a: '1',
  }, {
    name: 'khăn',
    percent: 0.15,
    a: '1',
  }, {
    name: 'bom',
    percent: 0.05,
    a: '1',
  }, {
    name: 'AWM',
    percent: 0.02,
    a: '1',
  },
];

const defs_Cac_Nam = [{
  dataKey: 'percent',
  formatter: val => `${val * 100}%`,
}];

export default class Revenue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      currentUser: undefined,
    };
  }

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
                      <span>Chi Tiết Trong Tháng</span>
                    </div>

                    <div className="transactions-table-wrap">
                      <Chart width="100%" data={data_Thang} defs_Thang={defs_Thang} animate={{ type: 'scaley' }} pixelRatio={pixelRatio} >
                        <Axis dataKey="year" label={{ fontSize: 8 }} />
                        <Axis dataKey="sales" />
                        <Tooltip showItemMarker={false} onShow={onShowTooltip} />
                        <Geom geom="interval" position="year*sales" />
                      </Chart>  
                    </div>
                    <div className="can-giua Ghi-Chu-BD">
                      <span>biểu đồ doanh thu trong tháng</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="right-DT">
                <div className="Bieu-Do-Nam">
                  <div className="income-statements">
                    <div className="meta-section sidebar-section-header">
                      <div className="section-title section-title-CT">
                        <span>Chi Tiết Trong Năm</span>
                      </div>
                        <Chart width="100%" data={data_Nam} defs={defs_Nam} pixelRatio={pixelRatio} >
                          <Coord type="polar" transposed radius={0.85} />
                          <Geom
                            geom="interval"
                            position="a*percent"
                            color={['name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0']]}
                            adjust="stack"
                            style={{
                              lineWidth: 1,
                              stroke: '#fff',
                              lineJoin: 'round',
                              lineCap: 'round',
                            }}
                          />
                          <Legend position="right" itemFormatter={value => `${value} ${map_Nam[value]}`} />
                        </Chart>
                      <div className="can-giua Ghi-Chu-BD">
                        <span>biểu đồ doanh thu trong năm</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="Select_thoi-Gian">
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
                  </div>
                </div>

                <div className="Bieu-Do-Cac-Nam">
                  <div className="income-statements">
                    <div className="meta-section sidebar-section-header">
                      <div className="section-title section-title-CT">
                        <span>Chi Tiết Các Năm</span>
                      </div>
                        <Chart width="100%" data={data_Cac_Nam} defs={defs_Cac_Nam} pixelRatio={pixelRatio} >
                            <Coord type="polar" transposed radius={0.85} />
                            <Geom
                              geom="interval"
                              position="a*percent"
                              color={['name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0']]}
                              adjust="stack"
                              style={{
                                lineWidth: 1,
                                stroke: '#fff',
                                lineJoin: 'round',
                                lineCap: 'round',
                              }}
                            />
                            <Legend position="right" itemFormatter={value => `${value} ${map_Cac_Nam[value]}`} />
                          </Chart>
                      <div className="can-giua Ghi-Chu-BD">
                        <span>biểu đồ doanh thu các năm</span>
                      </div>
                    </div>
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
