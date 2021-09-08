import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import "../style/StyleAddproduced.css";
import produceService from "../services/produce.service";
import CheckButton from "react-validation/build/button";
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
      namefood : "",
      price : "",
      detail : "",
      idCategory : "",
      linkimage : "",
      successful: false,
      message: ""
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

  onChangeIdCategory(e) {
    this.setState({
      idCategory: e.target.value
    });
  }

  onChangeLinkimage(e) {
    this.setState({
      linkimage: e.target.value
    });
  }

  onClickAdd = (namefood, price, detail, idCategory, linkimage) => {
    let food = {namefood, price, detail, idCategory, linkimage}
      this.setState({produceds:food});
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
                          <h1 class="title">FAST FOOD</h1>
                          <div class="slogan">Thêm món ăn</div>
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
                    // value={this.state.namefood}
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
                  <Input
                    type="number"
                    placeholder="Danh mục món"
                    className="form-control"
                    name="idCategory"
                    onChange={this.onChangeIdCategory}
                    validations={[required, vnamefood]}
                  />
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
                    validations={[required, vnamefood]}
                  />
                </div>
                <button className="add" onClick={() => this.onClickAdd(this.state.namefood, this.state.price, this.state.detail, this.state.idCategory, this.state.linkimage)}>Thêm món ăn</button>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
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
