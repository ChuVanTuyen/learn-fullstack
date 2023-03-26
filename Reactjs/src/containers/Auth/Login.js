// đăng nhập, liên quan mật khẩu thì viết vào thư mục này
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { FormattedMessage } from 'react-intl';
import { BsFillEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa';

import * as actions from "../../store/actions";
import './Login.scss';
import handleLoginApi from '../../services/userServices';

class Login extends Component {
  constructor(props) {// khu vực khai báo các state
    super(props);
    this.state = {
      username: '',
      password: '',
      isShowPassword: false,
    }
  }
  handleChangeUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  handleShowHidePassword = (value) => {
    this.setState({
      isShowPassword: value
    })
  }

  handleLogin = async () => {
    await handleLoginApi(this.state.email, this.state.password);
  }

  render() {

    return (
      <div className='login-background'>
        <div className='login-container'>
          <div className='login-content row'>
            <div className='col-12 text-login'>Login</div>

            <div className='col-12 from-group login-input'>
              <label>Username:</label>
              <input type='text' className='form-control'
                placeholder='Enter your username'
                value={this.state.username}
                onChange={(event) => this.handleChangeUsername(event)}
              />
            </div>

            <div className='col-12 from-group login-input'>
              <label>Password:</label>
              <div className='custom-input-password'>
                <input type={this.state.isShowPassword ? 'text' : 'password'}
                  className='form-control'
                  placeholder='Enter your password'
                  value={this.state.password}
                  onChange={(event) => this.handleChangePassword(event)}
                />
                <span onClick={() => {
                  this.handleShowHidePassword(!this.state.isShowPassword)
                }}>
                  {this.state.isShowPassword ? <BsEyeSlashFill className='eye' /> : <BsFillEyeFill className='eye' />}
                </span>
              </div>
            </div>

            <div className='col-12'>
              <button className='btn-login'
                onClick={() => this.handleLogin()}
              >Login</button>
            </div>

            <div className='col-12'>
              <span className='forgot-password'>Forgot your password?</span>
            </div>

            <div className='col-12 text-center'>
              <span className='text-other-login'>Or login with: </span>
            </div>

            <div className='col-12 social-login'>
              <FaGooglePlusG className='google' />
              <FaFacebookF className='facebook' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {//của redux
  return {
    lang: state.app.language
  };
};

const mapDispatchToProps = dispatch => {// của redux 
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
