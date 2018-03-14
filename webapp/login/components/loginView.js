import './style.less'

import React from 'react'
import * as R from 'ramda'

import LoginForm from './loginForm'
import ResetPasswordForm from './resetPasswordForm'

const LoginLegal = () =>
  <div className="login__legal">
    <p>All rights reserved. FAO encourages the reproduction and dissemination of material published on this Web
      site. Non-commercial uses will be authorized free of charge, upon request. Reproduction for resale or other
      commercial purposes, including educational purposes, may incur fees. Applications for permission to
      reproduce or disseminate FAO copyright material, and all queries concerning rights and licences, should be
      addressed by e-mail to <a href="mailto:copyright@fao.org">copyright@fao.org</a>. If you need help, send an
      e-mail to the <a href="mailto:fra@fao.org">fra@fao.org</a>.</p>
    <div className="login__contributor-logos">
      <img src="/img/ec_logo.png" height="60"/>
      <img src="/img/mfafi_logo.png" height="100"/>
      <img src="/img/mmmfi_logo.png" height="60"/>
    </div>
    <p>
      This website was produced with partial funding by the
      <a target="_blank" href="http://ec.europa.eu/europeaid/">European Commission</a>, the
      <a target="_blank" href="http://mediabank.finland.fi/l/DmBwDKDCT_Bn">
        Ministry for foreign affairs of Finland
      </a> and the
      <a target="_blank" href="http://mmm.fi/ministerio/yhteisotunnus">
        Ministry of Agriculture and Forestry of Finland
      </a>.
    </p>
  </div>

const loginComponents = [
  {path: '/login', component: LoginForm},
  {path: '/resetPassword', component: ResetPasswordForm}
]

const LoginView = () => {
  const {component} = R.find(R.propEq('path', location.pathname), loginComponents)

  return <div>
    <div className="login__wrapper">
      <img src="/img/fao_logo.svg" className="login__logo" height="60"/>
      <img src="/img/tucan.svg" className="login__tucan"/>

      <div className="login__box">
        <div className="login__top">
          {
            React.createElement(component)
          }
        </div>

        <div className="login__bottom">
          <h3>CFRQ</h3>
          <p>Collaborative Forest Resources Questionnaire</p>
          <img src="/img/cfrq_logos.png"/>
        </div>
      </div>

      <LoginLegal/>

    </div>

  </div>
}

export default LoginView
