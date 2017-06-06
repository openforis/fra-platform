import React from 'react'
import { connect } from 'react-redux'
import { requestLogin } from './actions'
import './style.less'

const LoginView = ({requestLogin, loginFailed}) =>
  <div className="login__root">
    <div className="login__wrapper">
      <img src="img/fao_logo.svg" className="login__fao-logo"/>
      <div className="login__box">
        <img src="img/tucan.svg" className="login__tucan"/>
        <h2 className="login__header headline">Login to FRA Platform</h2>
        {loginFailed ? <div className="login__fail-info">Login failed</div> : ''}
        <div className="login__input-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value="jan.egeland@mailinator.com"/>
        </div>
        <div className="login__input-group">
          <label htmlFor="un">Password</label>
          <input id="un" type="password"/>
        </div>
        <div className="login__checkbox-group">
          <input id="un" type="checkbox" disabled="disabled"/>
          <label htmlFor="un" type="text">Remember me on this browser</label>
        </div>
        <button className="btn btn-primary login__btn"
                onClick={() => requestLogin(document.getElementById("email").value)}>
          Sign in
        </button>
      </div>
      <p className="login__legal">&copy; FAO, 2017</p>
    </div>
  </div>

const mapStateToProps = state => state.user

export default connect(mapStateToProps, {requestLogin})(LoginView)
