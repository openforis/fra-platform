import './style.less'
import * as R from 'ramda'

import React from 'react'
import { connect } from 'react-redux'
import { logout, switchLanguage } from '../user/actions'

class FooterSelectionControl extends React.Component {

  constructor (props) {
    super(props)
    this.outsideClick = this.outsideClick.bind(this)
    window.addEventListener('click', this.outsideClick)
  }

  outsideClick (evt) {
    if (!this.refs.userControl.contains(evt.target))
      this.setState({opened: false})
  }

  componentWillMount () {
    this.setState({opened: false})
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.outsideClick)
  }

  render () {
    const children = this.props.children
    return <span
      className="footer__user-control"
      onClick={evt => this.setState({opened: !this.state.opened})}
      ref="userControl">
      {this.props.label}
      <svg className="icon icon-sub">
        <use href="img/icons.svg#small-up"/>
      </svg>
      {
        this.state.opened ? children : null
      }
    </span>
  }
}

const UserInfo = props =>
  <FooterSelectionControl label={props.userName} {...props}>
    <div className="footer__selection-control-opened">
      <div onClick={() => props.logout()} className="footer__selection-control-item">
        {props.i18n.t('footer.logout')}
      </div>
    </div>
  </FooterSelectionControl>

const LanguageSelection = ({i18n, switchLanguage, ...props}) =>
  <FooterSelectionControl label={i18n.t(`language.${i18n.language}`)} {...props}>
    <div className="footer__selection-control-opened">
      {
        R.map(
          lang => <div key={lang} className="footer__selection-control-item" onClick={() => switchLanguage(lang)}>
            {i18n.t(`language.${lang}`)}
          </div>,
          R.reject(l => l === i18n.language, supportedLangs))
      }
    </div>
  </FooterSelectionControl>

const supportedLangs = ['en', 'fr', 'es']

const Footer = ({status, userInfo, path, width, i18n, ...props}) => {
  const style = {width: `calc(100vw - ${width}px)`}
  return <div className="footer__container" style={style}>
    {/* Placeholder for space-between flexbox alignment */}
    <div/>
    <div className="footer__item">
      {status
        ? <span className="footer__autosave-status">{i18n.t(`footer.autoSave.${status}`)}</span>
        : null
      }
    </div>
    <div>
      <div className="footer__item">
        <LanguageSelection i18n={i18n} {...props}/>
      </div>
      <div className="footer__item">
        <UserInfo userName={userInfo.name} i18n={i18n} {...props}/>
      </div>
    </div>
  </div>
}

const mapStateToProps = state =>
  R.pipe(
    R.merge(state.autoSave),
    R.merge(state.user))(state.router)

export default connect(mapStateToProps, {logout, switchLanguage})(Footer)
