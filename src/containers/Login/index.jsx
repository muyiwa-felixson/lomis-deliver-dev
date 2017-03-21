import React, { Component } from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';
import Api from 'helpers/api';
import config from 'config';

require('./login.scss');
const elogo = require('./images/ehealth-logo.png');
const logo = require('./images/logo.png');

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
    console.log(config.AUTH_URL, 'auth_urlll');
    apiClient.post(config.AUTH_URL, 'application/x-www-form-urlencoded', {
      data: userDetails,
    })
    .then((res) => {
      cookie.save('accessToken', res.token, { path: '/' });
      browserHistory.push('/');
      toastr.success('You are logged in successfully!');
    }).catch((err) => {
      const errorMessage = err.message ? err.message : 'Fill in your login details.';
      toastr.error(`${errorMessage} Please try again.`);
    });
    this.setState({
      username: username.value,
      password: password.value,
    });
  }
  render() {
    return (
      <div className="container-fluid login-bg">
        <div className="row vertical-offset-100">
          <div className="col-md-4" />
          <div className="col-md-4" >
            <div className="panel col-centered">
              <div className="">
                <img src={logo} role="presentation" className="img-responsive img-center" />
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
                  <div className="col-md-6" />
                  <div className="powered-div col-md-6">
                        Powered By:
                    <img src={elogo} role="presentation" className="img-responsive" />
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
