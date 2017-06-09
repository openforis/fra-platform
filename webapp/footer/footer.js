import './style.less'
import * as R from 'ramda'

import React from 'react'
import { connect } from 'react-redux'

const Footer = ({status, userInfo}) => <div className="footer__container">
  <div/>
  <div className="footer__item footer__autosave-status">{status}</div>
  <div className="footer__item">{userInfo ? userInfo.name : ''}</div>
</div>

const mapStateToProps = state => R.merge(state.autoSave, state.user)

export default connect(mapStateToProps)(Footer)
