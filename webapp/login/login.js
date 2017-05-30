import React from 'react'
import { Link } from './../link'
import './style.less'

const Login = () =>
  <div className="login__root">
    <div className="login__wrapper">
      <img src="img/fao_logo.svg" className="fao-logo"/>
      <div className="login__box">
        <img src="img/tucan.svg" className="tucan"/>
        <div className="input">
        <h2 className="login__header headline">Login to FRA Platform</h2>
          <label htmlFor="un">Email</label>
          <input id="un" type="text"/>
        </div>
        <div className="input">
          <label htmlFor="un">Password</label>
          <input id="un" type="password"/>
        </div>
        <div className="checkbox">
          <input id="un" type="checkbox" disabled="disabled"/>
          <label htmlFor="un" type="text">Remember me on this browser</label>
        </div>
        <Link to="/country/ITA" className="btn btn-primary login__btn">Sign in</Link>
      </div>
    </div>
  </div>

export default Login
