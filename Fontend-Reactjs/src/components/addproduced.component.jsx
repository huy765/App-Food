import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import "../style/StyleAddproduced.css";
import produceService from "../services/produce.service";
import CheckButton from "react-validation/build/button";
import { Card } from "antd";
import { Button, Cascader } from "antd";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Bắt buộc nhập thông tin này.
      </div>
    );
  }
};
const vnamefood = value => {
  if (value.length < 1 || value.length > 50) {
    return (
      <div className="alert alert-danger" role="alert">
        Độ dài phải có ít nhất 1 ký tự và tối đa 50 ký tự.
      </div>
    );
  }
};


const options = [
  {
    value: 1,
    label: 'Món chính',
  },
  {
    value: 2,
    label: 'Món phụ',
  },
  {
    value: 3,
    label: 'Món tráng miệng',
  },
  {
    value: 4,
    label: 'Nước giải khát',
  },
  {
    value: 5,
    label: 'Món ăn kiêng',
  },
];

export default class Addproduced extends Component {
  constructor(props) {
    super(props);
    this.onChangeNamefood = this.onChangeNamefood.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDetail = this.onChangeDetail.bind(this);
    this.onChangeIdCategory = this.onChangeIdCategory.bind(this);
    this.onChangeLinkimage = this.onChangeLinkimage.bind(this);
    this.handleAddproduced = this.handleAddproduced.bind(this);

    this.state = {
      produceds: [],
      namefood: "",
      price: "",
      detail: "",
      idCategory: "",
      linkimage: "",
      successful: false,
      message: "",
      menu: [],
    };
  }

  onChangeNamefood(e) {
    this.setState({
      namefood: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  onChangeDetail(e) {
    this.setState({
      detail: e.target.value
    });
  }

  onChangeIdCategory(value) {
    console.log(value);
    this.setState({idCategory:value.toString()})
  }


  onChangeLinkimage(e) {
    this.setState({
      linkimage: e.target.value
    });
  }

  onClickAdd = (namefood, price, detail, idCategory, linkimage) => {
    let food = { namefood, price, detail, idCategory, linkimage }
    this.setState({ produceds: food });
  }

  displayRender(label) {
    return label[label.length - 1];
  }

  handleAddproduced(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      produceService.addProduced(
        this.state.produceds
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div class="Add-app">
        <div class="Add-app-Group">
          <div class="area" >
            <ul class="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div class="page">
              <div class="content-wrapper">
                <div class="content">
                  <div class="add-wrapper shadow-box">
                    <div class="company-details">

                      <div class="shadow"></div>
                      <div class="wrapper-1">
                        <div class="logo">
                          <div class="icon-food">

                          </div>
                        </div>
                        <h1 class="title">Thẻ demo</h1>
                        <div class="slogan">
                          <Card
                            className="Card-add"
                            hoverable
                            cover={<img class="imgadd" alt="example" src={this.state.linkimage} />}
                          >
                            <div class="titleadd_add">{this.state.namefood}</div>
                            <div class="descriptionadd_add">{this.state.price} </div>
                            <Button type="primary" block className="ant-btn-add-food">
                              Đặt món
                            </Button>
                          </Card>
                        </div>
                      </div>

                    </div>
                    <div class="add-form ">
                      <div class="wrapper-2">
                        <div class="form-title">Thêm món ăn</div>
                        <form2>
                          <Form
                            onSubmit={this.handleAddproduced}
                            ref={c => {
                              this.form = c;
                            }}
                          >
                            {!this.state.successful && (
                              <div>
                                <div className="form-group">
                                  <p className="form-label" htmlFor="namefood">
                                    Tên món:
                                  </p>
                                  <Input
                                    type="text"
                                    placeholder="Nhập tên món ăn"
                                    className="form-control"
                                    name="namefood"
                                    onChange={this.onChangeNamefood}
                                    validations={[required, vnamefood]}
                                  />
                                </div>

                                <div className="form-group">
                                  <p className="form-label" htmlFor="price">
                                    Giá
                                  </p>
                                  <Input
                                    type="number"
                                    placeholder="0000.000 đ"
                                    className="form-control"
                                    name="price"
                                    onChange={this.onChangePrice}
                                    validations={[required, vnamefood]}
                                  />
                                </div>

                                <div className="form-group">
                                  <p className="form-label" htmlFor="detail">
                                    Mô tả:
                                  </p>
                                  <Input
                                    type="text"
                                    placeholder="Mô tả món ăn"
                                    className="form-control"
                                    name="detail"
                                    onChange={this.onChangeDetail}
                                    validations={[required, vnamefood]}
                                  />
                                </div>

                                <div className="form-group">
                                  <p className="form-label" htmlFor="idCategory">
                                    Danh mục:
                                  </p>
                                  <Cascader
                                    options={options}
                                    expandTrigger="hover"
                                    displayRender={this.displayRender}
                                    onChange={this.onChangeIdCategory}
                                  />,
                                </div>
                                <div className="form-group">
                                  <p className="form-label" htmlFor="linkimage">
                                    Hình ảnh:
                                  </p>
                                  <Input
                                    type="text"
                                    placeholder="Link hình ảnh"
                                    className="form-control"
                                    name="linkimage"
                                    onChange={this.onChangeLinkimage}
                                  />
                                </div>
                                <button className="add" onClick={() => this.onClickAdd(this.state.namefood, this.state.price, this.state.detail, this.state.idCategory, this.state.linkimage)}>Thêm món ăn</button>
                              </div>
                            )}

                            {this.state.successful === true ? (
                              <div className="form-group">
                                <h1>
                                  Thêm món thành công
                                </h1>
                              </div>
                            ) :
                              <div className="form-group">
                              </div>
                            }
                            <CheckButton
                              style={{ display: "none" }}
                              ref={c => {
                                this.checkBtn = c;
                              }}
                            />
                          </Form>
                        </form2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
