import React from 'react'
import { connect } from 'react-redux'
import { requestLogin } from './actions'
import './style.less'

const LoginView = ({requestLogin, loginFailed}) =>
<div className="login__root">
  <div className="login__wrapper">
    <img src="img/fao_logo.svg" className="fao-logo"/>
    <div className="login__box">
      <img src="img/tucan.svg" className="tucan"/>
      <h2 className="login__header headline">Login to FRA Platform</h2>
      {loginFailed ? <div className="login__fail-info">Kirjautuminen epäonnistui</div> : ''}
      <div className="input-group">
        <label htmlFor="un">Email</label>
        <input id="un" type="text"/>
      </div>
      <div className="input-group">
        <label htmlFor="un">Password</label>
        <input id="un" type="password"/>
      </div>
      <div className="checkbox-group">
        <input id="un" type="checkbox" disabled="disabled"/>
        <label htmlFor="un" type="text">Remember me on this browser</label>
      </div>
      {/*<Link to="/country/ITA" className="btn btn-primary login__btn">Sign in</Link>*/}
      <button className="btn btn-primary login__btn" onClick={() => requestLogin('xx@asd.com')}>
        Sign in
      </button>
    </div>
    <p className="legal">&copy; FAO, 2017</p>
  </div>
</div>

const mapStateToProps = state => state.user

export default connect(mapStateToProps, {requestLogin})(LoginView)
