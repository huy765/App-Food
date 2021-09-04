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
      // namefood = "",
      // price = "",
      // detail = "",
      // idCategory = "",
      // linkimage = "",
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
    produceService.addProduced(food).then((res)=>{
      this.setState({produceds:res.data});
    });
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
      this.produceds
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
        <div class="Addproduced-app">
        <div class="Addproduced-app-Group">
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
              <div class="signup-wrapper shadow-box">
                  <div class="company-details "> 
                    
                      <div class="shadow"></div>
                      <div class="wrapper-1">
                          <div class="logo">
         <div class="icon-food">
           
                      </div>
                          </div>
                          <h1 class="title">cupcake co.</h1>
                          <div class="slogan">We deliver cupcakes to you.</div>
                      </div>
  
                  </div>
                  <div class="signup-form ">
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
                Namefood
              </p>
                  <Input
                    type="text"
                    placeholder="Lorem ipsum"  //required
                    className="form-control"
                    name="namefood"
                    // value={this.state.namefood}
                    onChange={this.onChangeNamefood}
                    validations={[required, vnamefood]}
                  />
                </div>

                <div className="form-group">
                <p className="form-label" htmlFor="price">
                Price
               </p>
                  <Input
                    type="number"
                    placeholder="0000.000 đ" //required
                    className="form-control"
                    name="price"
                    // value={this.state.price}
                    onChange={this.onChangePrice}
                    validations={[required, vnamefood]}
                  />
                </div>

                <div className="form-group">
                <p className="form-label" htmlFor="detail">
                Detail
                </p>
                  <Input
                    type="text"
                    placeholder="*****" //required
                    className="form-control"
                    name="detail"
                    // value={this.state.detail}
                    onChange={this.onChangeDetail}
                    validations={[required, vnamefood]}
                  />
                </div>

                <div className="form-group">
                <p className="form-label" htmlFor="idCategory">
                IdCategory
                </p>
                  <Input
                    type="number"
                    placeholder="*****" //required
                    className="form-control"
                    name="idCategory"
                    // value={this.state.idCategory}
                    onChange={this.onChangeIdCategory}
                    validations={[required, vnamefood]}
                  />
                </div>
                <div className="form-group">
                <p className="form-label" htmlFor="linkname">
                linkname
                </p>
                  <Input
                    type="text"
                    placeholder="*****" //required
                    className="form-control"
                    name="linkname"
                    // value={this.state.linkimage}
                    onChange={this.onChangedetail}
                    validations={[required, vnamefood]}
                  />
                </div>
                <button className="signup" onClick={() => this.onClickAdd(this.namefood, this.price, this.detail, this.idCategory, this.linkimage)}>Thêm món ăn</button>
                
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
