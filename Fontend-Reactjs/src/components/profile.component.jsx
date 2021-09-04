import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../style/StyleProfile.css";
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div class="bodypr">
             
        {(this.state.userReady) ?
        
        <div>
          <div className="containerpr">  
          <h2>Thông Tin Người Dùng</h2>
          <ul class="ulpr">
        <li class="lipr">
             <span class="spanpr">1</span>
             <strong>Tên tài khoản:</strong>{" "}{currentUser.username} 
        </li>
        <li class="lipr">
             <span class="spanpr">2</span>
             <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </li>
        <li class="lipr">
             <span class="spanpr">3</span>
             <strong>Id:</strong>{" "}
                   {currentUser.id}
         
        </li>
        <li class="lipr">
             <span class="spanpr">5</span>
             <strong>Email:</strong>{" "}
          {currentUser.email}
        </li>
        <li class="lipr">
             <span class="spanpr">5</span>
             <strong>Địa chỉ:</strong>{" "}
          {currentUser.address}
        </li>
        <li class="lipr">
             <span class="spanpr">6</span>
             <strong>Quyền hạn: {currentUser.roles && currentUser.roles.map((role, index) => <span id="text" key={index}>{role}</span>)}</strong>{" "}
        </li>
        </ul>
        </div>
      </div>: null}
      </div>
 
    );
  }
}
