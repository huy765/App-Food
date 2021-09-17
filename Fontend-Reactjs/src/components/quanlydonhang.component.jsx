import React, { Component } from 'react';
import checkoutService from '../services/checkout.service';
import "../style/quanlydonhang.css";
import { Cascader } from "antd";

const options = [
  {
    value: 1,
    label: 'Tháng 1',
  },
  {
    value: 2,
    label: 'Tháng 2',
  },
  {
    value: 3,
    label: 'Tháng 3',
  },
  {
    value: 4,
    label: 'Tháng 4',
  },
  {
    value: 5,
    label: 'Tháng 5',
  },
  {
    value: 6,
    label: 'Tháng 6',
  },
  {
    value: 7,
    label: 'Tháng 7',
  },
  {
    value: 8,
    label: 'Tháng 8',
  },
  {
    value: 9,
    label: 'Tháng 9',
  },
  {
    value: 10,
    label: 'Tháng 10',
  },
  {
    value: 11,
    label: 'Tháng 11',
  },
  {
    value: 12,
    label: 'Tháng 12',
  },
];

const options2 = [
  {
    value: 2021,
    label: 'Năm 2021',
  },
  {
    value: 2020,
    label: 'Năm 2020',
  },
  {
    value: 2019,
    label: 'Năm 2019',
  },
  {
    value: 2018,
    label: 'Năm 2018',
  },
  {
    value: 2017,
    label: 'Năm 2017',
  },
];
export default class Quanlydonhang extends Component {
    constructor(props) {
        super(props);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.state = {
          orders: [],
          month: "",
          year: "",
        };
      }
    
      componentDidMount() {
        checkoutService.getOrder().then((res) => {
          console.log(res.data);
          this.setState({orders: res.data});

        });
        
      }

      onChangeMonth(value) {
        console.log(value);
        this.setState({month:value.toString()})
        checkoutService.getOrderByMonth(this.state.month).then((res) => {
          console.log(res.data);
          this.setState({orders: res.data});

        });
      }

      onChangeYear(value) {
        console.log(value);
        this.setState({year:value.toString()})
        checkoutService.getOrderByYear(this.state.year).then((res) => {
          console.log(res.data);
          this.setState({orders: res.data});

        });
      }

    render() {
        return (
              <div>
           
                <div class="pageql">
                <h1>Bảng thống kê đơn hàng</h1>
                <div className="Select_thoi-Gian">
                  <div className="income-statements">
                    <p>.</p> 
                    <Cascader
                    options={options}

                    displayRender={this.displayRender}
                    onChange={this.onChangeMonth}
                    />
                    
   
                    <Cascader
                    options={options2}

                    displayRender={this.displayRender}
                    onChange={this.onChangeYear}
                    />
                  </div>
                </div>
                <div className="Select_thoi-Gian">
                  <div className="income-statements">

                  </div>
                </div>
    
               <table class="layout display responsive-table">
                   <thead>
                       <tr>
                           <th>id</th>
                           <th>họ tên người nhận</th>
                           <th>Địa chỉ nhận</th>
                           <th>SĐT</th>
                           <th>foodname</th>              
                           <th>Giá</th>
                           <th>Số lượng</th>
                           <th>Tổng giá trị</th>
                           <th>Ngày tạo</th>
                       </tr>
                   </thead>
                   <tbody>
                   {
              this.state.orders.map(
                item =>
                       <tr>
                         
                           <td>{item.userid}</td>
                           <td>{item.hotennguoihan}</td>
                           <td>{item.diachinhan}</td>
                           <td>{item.sdtnhanhang}</td>
                           <td>{item.foodname}</td>
                           <td>{item.price}</td>
                           <td>{item.qty}</td>
                           <td>{item.tonggiatri}</td>
                           <td>{item.ngaytao}</td>
                       </tr>
                       )
                    }
                   </tbody>
               </table>
               </div>
      
              </div>
        );
      
    }
}