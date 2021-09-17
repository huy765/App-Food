import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "antd/dist/antd.css";
import "../style/revenueStatistics.css";

import { } from "@ant-design/icons";

import { Layout, Menu } from "antd";
// import { DatePicker } from "antd";
// import { Button } from "antd";
import checkoutService from '../services/checkout.service';
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

var data_Thang = [
  {
    date: '1',
    price: 0,
  }, {
    date: '2',
    price: 0,
  }, {
    date: '3',
    price: 0,
  }, {
    date: '4',
    price: 0,
  }, {
    date: '5',
    price: 0,
  }, {
    date: '6',
    price: 0,
  }, {
    date: '7',
    price: 0,
  }, {
    date: '8',
    price: 0,
  },  {
    date: '9',
    price: 0,
  }, {
    date: '10',
    price: 0,
  }, {
    date: '11',
    price: 0,
  }, {
    date: '12',
    price: 0,
  }, {
    date: '13',
    price: 0,
  }, {
    date: '14',
    price: 0,
  }, {
    date: '15',
    price: 0,
  }, {
    date: '16',
    price: 0,
  },  {
    date: '17',
    price: 0,
  }, {
    date: '18',
    price: 0,
  }, {
    date: '19',
    price: 0,
  }, {
    date: '20',
    price: 0,
  }, {
    date: '21',
    price: 0,
  }, {
    date: '22',
    price: 0,
  }, {
    date: '23',
    price: 0,
  }, {
    date: '24',
    price: 0,
  },  {
    date: '25',
    price: 0,
  }, {
    date: '26',
    price: 0,
  }, {
    date: '27',
    price: 0,
  }, {
    date: '28',
    price: 0,
  }, {
    date: '29',
    price: 0,
  }, {
    date: '30',
    price: 0,
  },
  
];

const defs_Thang = [{
  dataKey: 'date',
}, {
  dataKey: 'price',
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
  "T 1": '0%',
  "T 2": '0%',
  "T 3": '0%',
  "T 4": '0%',
  "T 5": '0%',
  "T 6": '0%',
  "T 7": '0%',
  "T 8": '0%',
  "T 9": '100%',
  "T 10": '0%',
  "T 11": '0%',
  "T 12": '0%',
};

const data_Nam = [
  {
    name: 'T 1',
    percent: 0,
  }, {
    name: 'T 2',
    percent: 0,
  }, {
    name: 'T 3',
    percent: 0,
  }, {
    name: 'T 4',
    percent: 0,
  }, {
    name: 'T 5',
    percent: 0,
  }, {
    name: 'T 6',
    percent: 0,
  }, {
    name: 'T 7',
    percent: 0,
  }, {
    name: 'T 8',
    percent: 0,
  }, {
    name: 'T 9',
    percent: 1,
  }, {
    name: 'T 10',
    percent: 0,
  }, {
    name: 'T 11',
    percent: 0,
  }, {
    name: 'T 12',
    percent: 0,
  },
];

const defs_Nam = [{
  dataKey: 'percent',
  formatter: val => `${val * 100}%`,
}];
//biểu đồ theo các năm
const map_Cac_Nam = {
  "năm 2021": '100%',
};

const data_Cac_Nam = [
  {
    name: 'năm 2021',
    percent: 0.4,
  },
];

const defs_Cac_Nam = [{
  dataKey: 'percent',
  formatter: val => `${val * 100}%`,
}];
var sum =0;

export default class Revenue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      orders:[],
      currentUser: undefined,
      sum : 0,
      data_Thang:[],
    };
    data_Thang = [
      {
        date: '1',
        price: 0,
      }, {
        date: '2',
        price: 0,
      }, {
        date: '3',
        price: 0,
      }, {
        date: '4',
        price: 0,
      }, {
        date: '5',
        price: 0,
      }, {
        date: '6',
        price: 0,
      }, {
        date: '7',
        price: 0,
      }, {
        date: '8',
        price: 0,
      },  {
        date: '9',
        price: 0,
      }, {
        date: '10',
        price: 0,
      }, {
        date: '11',
        price: 0,
      }, {
        date: '12',
        price: 0,
      }, {
        date: '13',
        price: 0,
      }, {
        date: '14',
        price: 0,
      }, {
        date: '15',
        price: 0,
      }, {
        date: '16',
        price: 141000,
      },  {
        date: '17',
        price: 0,
      }, {
        date: '18',
        price: 0,
      }, {
        date: '19',
        price: 0,
      }, {
        date: '20',
        price: 0,
      }, {
        date: '21',
        price: 0,
      }, {
        date: '22',
        price: 0,
      }, {
        date: '23',
        price: 0,
      }, {
        date: '24',
        price: 0,
      },  {
        date: '25',
        price: 0,
      }, {
        date: '26',
        price: 0,
      }, {
        date: '27',
        price: 0,
      }, {
        date: '28',
        price: 0,
      }, {
        date: '29',
        price: 0,
      }, {
        date: '30',
        price: 0,
      },
      
    ];
    data_Thang[16].price=1756000
    console.log(data_Thang)
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
    checkoutService.getOrder().then((res) => {
      console.log(res.data);
      for(var i=0;i<res.data.length;i++)  {
        sum += res.data[i].price*res.data[i].qty
      }
      console.log(sum)
      this.setState({sum: sum})
      this.setState({orders: res.data});
    });
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

              <Link to="/home">
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Menu">
                </SubMenu>
              </Link>

              {showAdminBoard ?
                <SubMenu key="sub3" icon={<TeamOutlined />} title="Admin">
                  <Menu.Item key="9"><Link to={"/addproduced"}>Thêm món ăn</Link></Menu.Item>
                  <Menu.Item key="10"><Link to={"/quanlydonhang"}>Thống kê dơn hàng</Link></Menu.Item>
                  <Menu.Item key="11">Thống kê doanh thu</Menu.Item>
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
            <div className="grid containerbd">
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
                                 {
                                 this.state.sum
                                 }
                              </div>
                            </div>
                            
                            <div className="meta-time-item mr16">
                              <div className="label">
                                Tháng Này
                              </div>
                              <div className="meta-numeric-content" >
                                <span className="currency-symbol">đ</span>
                                {
                                 this.state.sum
                                 }
                              </div>
                            </div>

                            <div className="meta-time-item mr16">
                              <div className="label">
                                Năm Này
                              </div>
                              <div className="meta-numeric-content" style={{width: "123"}}>
                                <span className="currency-symbol">đ</span>
                                {
                                 this.state.sum
                                 }
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
                        <Axis dataKey="date" label={{ fontSize: 8 }} />
                        <Axis dataKey="price" />
                        <Tooltip showItemMarker={false} onShow={onShowTooltip} />
                        <Geom geom="interval" position="date*price" />
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

                {/* <div className="Select_thoi-Gian">
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
                </div> */}

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
