import './style.less'

import React from 'react'

import { getUrlParameter } from '../../utils/urlUtils'

import Icon from '../../reusableUiComponents/icon'

import LocalLoginForm from './localLoginForm'

const LoginFailed = () =>
  <div className="alert-container">
    <div className="alert-error">
      <div className="alert-icon">
        <Icon name="alert"/>
      </div>
      <div className="alert-message">User not authorized</div>
    </div>
  </div>

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

class LoginView extends React.Component {

  constructor () {
    super()
    this.state = {localLogin: false}
  }

  render () {

    const invitationUUID = getUrlParameter('i')
    const loginFailed = getUrlParameter('loginFailed')

    return <div>

      {
        loginFailed
          ? <LoginFailed/>
          : null
      }

      <div className="login__wrapper">
        <img src="/img/fao_logo.svg" className="login__logo" height="60"/>
        <img src="/img/tucan.svg" className="login__tucan"/>

        <div className="login__box">
          <div className="login__top">
            <h2>Login to FRA Platform</h2>
            {
              this.state.localLogin
                ? <LocalLoginForm onCancel={() => this.setState({localLogin: false})}/>
                : <div>
                  <a className="btn"
                     href={`/auth/google${invitationUUID ? `?i=${invitationUUID}` : ''}`}>
                    Sign in with Google
                  </a>
                  {/*<button className="btn" type="button"*/}
                          {/*onClick={() => this.setState({localLogin: true})}>*/}
                    {/*Sign in with FRA*/}
                  {/*</button>*/}
                </div>
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

}

export default LoginView
