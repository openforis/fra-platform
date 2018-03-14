import React from 'react'
import { getUrlParameter } from '../../utils/urlUtils'

class ResetPasswordForm extends React.Component {

  render () {
    const k = getUrlParameter('k')

    return <div className="login__form">

      <input type="text" name="email" value="fads@gfads.com" disabled={true}/>
      <input type="password" name="password" ref="password" value="" placeholder="Password"/>
      <input type="password" name="password2" ref="password2" value="" placeholder="Repeat password"/>

      <div className="login__buttons">
        <button className="btn" type="button"
                onClick={() => {}}>
          Change password
        </button>
      </div>
    </div>
  }
}

export default ResetPasswordForm
