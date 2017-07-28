import './style.less'
import * as R from 'ramda'

import React from 'react'
import { connect } from 'react-redux'
import { logout, switchLanguage } from '../user/actions'

class FooterSelectionControl extends React.Component {
  componentWillMount () {
    this.setState({opened: false})
  }

  render () {
    const iconRefSuffix = this.state.opened ? 'down' : 'up'
    const children = this.props.children
    return <span
      className="footer__user-control"
      onClick={ evt => this.setState({opened: !this.state.opened}) }>
      {this.props.label + ' '}
      <svg className="icon footer__user-control-caret">
        <use xlinkHref={`img/icon.svg#icon-small-${iconRefSuffix}`}/>
      </svg>
      {
       this.state.opened ? children : null
      }
    </span>
  }
}

const UserInfo = props =>
  <FooterSelectionControl label={props.userName} {...props}>
    <div onClick={() => props.logout()} className="footer__user-control-opened">
      Logout
    </div>
  </FooterSelectionControl>

const LanguageSelection = props =>
  <FooterSelectionControl label={props.currentLanguage} {...props}>
    <div className="footer__language-control-opened">
      {
        R.map(
          lang => <div key={lang} className="footer__selection-control-item" onClick={() => props.switchLanguage(lang)}>
                  {props.i18n.t(`language.${lang}`)}
                </div>,
          supportedLangs)
      }
    </div>
  </FooterSelectionControl>

const supportedLangs = [
  'en',
  'fr'
]

const Footer = ({status, userInfo, path, width, i18n, ...props}) => {
  const style = {width: `calc(100vw - ${width}px)`}
  return <div className="footer__container" style={style}>
    {/* Placeholder for space-between flexbox alignment */}
    <div/>
    <div className="footer__item footer__autosave-status">{status}</div>
    <div>
      <div className="footer__item">
        <LanguageSelection currentLanguage={i18n.t(`language.${i18n.language}`)} i18n={i18n} {...props}/>
      </div>
      <div className="footer__item">
        <UserInfo userName={userInfo.name} {...props}/>
      </div>
    </div>
  </div>
}

const mapStateToProps = state =>
  R.pipe(
    R.merge(state.autoSave),
    R.merge(state.user))(state.router)

export default connect(mapStateToProps, {logout, switchLanguage})(Footer)
