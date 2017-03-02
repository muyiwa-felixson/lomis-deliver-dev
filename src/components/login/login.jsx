import React, { Component } from 'react';
import Api from 'helpers/api';

require('./login.scss');

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    token: '',
  };
  handleLogin = (e) => {
    e.preventDefault();

    const apiClient = new Api();
    const { username, password } = e.target;
    const userDetails = {
      username: username.value,
      password: password.value,
    };
    apiClient.post('http://localhost:8080/v1/auth', 'application/x-www-form-urlencoded', {
      data: userDetails,
    })
    .then((res) => {
      this.setState({
        token: res.token,
      });
    }).catch(err => err);
    this.setState({
      username: username.value,
      password: password.value,
    });
  }
  render() {
    return (
      <div className="container-fluid login-bg">
        <div className="row vertical-offset-100">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel">
              <div className="">
                <img src="images/logo.png" role="presentation" className="img-responsive img-center" />
              </div>
              <div className="panel-body">
                <form acceptCharset="UTF-8" role="form" onSubmit={this.handleLogin}>
                  <fieldset>
                    <div className="form-group">
                      <input className="form-control radius-primary login-txtbx" placeholder="USERNAME" name="username" id="username" type="text" />
                    </div>
                    <div className="form-group">
                      <input className="form-control radius-primary login-txtbx" placeholder="PASSWORD" name="password" id="password" type="password" />
                    </div>

                    <button className="btn btn-lg btn-primary btn-block radius-primary bk_color_trans" type="submit"> LOGIN </button>
                  </fieldset>
                </form>
                <div className="row">
                  <div className="powered-div col-md-6 col-md-offset-6">
                        Powered By:
                    <img src="images/ehealth-logo.png" role="presentation" className="img-responsive" />
                  </div>
                </div>
                <div className="copyright text-center">
                    COPYRIGHT LOMIS DASHBOARD 2.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
