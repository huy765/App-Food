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
export default class Quanlydonhang extends Component {
    constructor(props) {
        super(props);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.state = {
          orders: [],
          month: "",
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
                    expandTrigger="hover"
                    displayRender={this.displayRender}
                    onChange={this.onChangeMonth}
                    />
                
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