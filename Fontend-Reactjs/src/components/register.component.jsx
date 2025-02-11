import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import "../style/StyleRegister.css";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import Login from "./login.component";
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Bắt buộc nhập thông tin này.
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Email không hợp lệ.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Độ dài của tên đăng nhập phải có ít nhất 2 ký tự và tối đa 20 ký tự.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Mật khẩu phải có độ dài tối thiểu 6 kí tự và tối đa 20 ký tự
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeNameDisplay = this.onChangeNameDisplay.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.state = {
      username: "",
      email: "",
      password: "",
      address: "",
      namedisplay:"",
      phone:"",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  onChangeNameDisplay(e) {
    this.setState({
      namedisplay: e.target.value
    })
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    })
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.address,
        this.state.namedisplay,
        this.state.phone,
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
      <div class="Register-app">
        <div class="Register-app-Group">
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
                        <h1 class="title">FAST FOOD</h1>
                        <div class="slogan">--Đăng ký--</div>
                      </div>

                    </div>
                    <div class="signup-form ">
                      <div class="wrapper-2">
                        <div class="form-title">Đăng ký ngay</div>
                        <form2>
                          <Form

                            onSubmit={this.handleRegister}
                            ref={c => {
                              this.form = c;
                            }}
                          >
                            {!this.state.successful && (
                              <div className="app-input">

                                <div className="form-group">
                                  <p className="form-label" htmlFor="namedisplay">
                                    Họ và tên:
                                  </p>
                                  <Input
                                    type="text"
                                    placeholder="Nhập vào họ và tên" //required
                                    className="form-control"
                                    name="namedisplay"
                                    value={this.state.namedisplay}
                                    onChange={this.onChangeNameDisplay}
                                  />
                                </div>

                                <div className="form-group">
                                  <p className="form-label" htmlFor="username">
                                    USERNAME
                                  </p>
                                  <Input
                                    type="text"
                                    placeholder="Tên đăng nhập"  //required
                                    className="form-control"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    validations={[required, vusername]}
                                  />
                                </div>

                                <div className="form-group">
                                  <p className="form-label" htmlFor="password">
                                    PASSWORD
                                  </p>
                                  <Input
                                    type="password"
                                    placeholder="Nhập vào mật khẩu" //required
                                    className="form-control"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    validations={[required, vpassword]}
                                  />
                                </div>

                                <div className="form-group">
                                  <p className="form-label" htmlFor="email">
                                    EMAIL
                                  </p>
                                  <Input
                                    type="text"
                                    placeholder="Nhập vào email" //required
                                    className="form-control"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    validations={[required, email]}
                                  />
                                </div>

                                <div className="form-group">
                                  <p className="form-label" htmlFor="phone">
                                    Phone
                                  </p>
                                  <Input
                                    type="text"
                                    placeholder="Nhập vào số điện thoại" //required
                                    className="form-control"
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={this.onChangePhone}
                                  />
                                </div>

                                <div className="form-group">
                                  <p className="form-label" htmlFor="email">
                                    Address
                                  </p>
                                  <Input
                                    type="text"
                                    placeholder="Nhập địa chỉ" //required
                                    className="form-control"
                                    name="address"
                                    value={this.state.address}
                                    onChange={this.onChangeAddress}
                                  />
                                </div>




                                <button className="signup">i want meals</button><button className="login2"><Link to={"/login"}>Đăng Nhập</Link></button>

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
                            <Switch>
                              <Route exact path={"/login"} component={Login} />
                            </Switch>
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
