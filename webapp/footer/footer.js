import './style.less'
import * as R from 'ramda'

import React from 'react'
import { connect } from 'react-redux'

const hideFooter = path => !path || R.equals("/", path) || R.equals("#/", path)

const Footer = ({status, userInfo, path}) => {
  if (hideFooter(path)) return <noscript/>
  return <div className="footer__container">
    {/* Placeholder for space-between flexbox alignment */}
    <div/>
    <div className="footer__item footer__autosave-status">{status}</div>
    <div className="footer__item">{userInfo ? userInfo.name : ''}</div>
  </div>
}
const mapStateToProps = state => R.pipe(R.merge(state.autoSave), R.merge(state.user))(state.router)

export default connect(mapStateToProps)(Footer)
