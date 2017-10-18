import './style.less'
import * as R from 'ramda'

import React from 'react'
import { connect } from 'react-redux'
import { logout, switchLanguage } from '../user/actions'
import { getRelativeDate } from '../utils/relativeDate'
import { PopoverControl } from './../reusableUiComponents/popoverControl'

const UserInfo = props => {
  const userInfoItems = [{
    label: props.i18n.t('footer.logout'),
    onClick: () => props.logout()
  }, {
    divider: true
  }, {
    label: props.i18n.t('footer.profilePicture'),
    onClick: () => window.open('https://gravatar.com', '_blank')
  }]

  return <div className="footer__item">
    <PopoverControl items={userInfoItems}>
      <span className="footer__user-control">
        {props.userName}
        <svg className="icon icon-sub">
          <use xlinkHref="img/icons.svg#small-up"/>
        </svg>
      </span>
    </PopoverControl>
  </div>
}

const LanguageSelection = ({i18n, switchLanguage, ...props}) => {
  const supportedLangs = ['en', 'fr', 'es', 'ru']
  const selectableLangs = R.reject(l => l === i18n.language, supportedLangs)
  const languageSelectionItems = R.map(lang =>
    ({
      label: i18n.t(`language.${lang}`),
      onClick: () => switchLanguage(lang)
    }), selectableLangs
  )

  return <div className="footer__item">
    <PopoverControl items={languageSelectionItems}>
      <span className="footer__user-control">
        {i18n.t(`language.${i18n.language}`)}
        <svg className="icon icon-sub">
          <use xlinkHref="img/icons.svg#small-up"/>
        </svg>
      </span>
    </PopoverControl>
  </div>
}

const autosaveStatusText = (i18n, status, lastSaveTimeStamp) => {
  const statusTextTranslation = i18n.t(`footer.autoSave.${status}`)
  return status === 'lastSaveTimestampReceived'
    ? statusTextTranslation + getRelativeDate(lastSaveTimeStamp, i18n).toLowerCase()
    : statusTextTranslation
}

const Footer = ({status, userInfo, lastSaveTimeStamp, width, i18n, ...props}) => {
  const style = {width: `calc(100vw - ${width}px)`}
  return <div className="footer__container" style={style}>
    {/* Placeholder for space-between flexbox alignment */}
    <div/>
    <div className="footer__item">
      {R.isNil(status)
        ? null
        : <span className={`footer__autosave-status ${status}`}>
            {autosaveStatusText(i18n, status, lastSaveTimeStamp)}
          </span>
      }
    </div>
    <div>
      <LanguageSelection i18n={i18n} {...props}/>
      <UserInfo userName={userInfo.name} i18n={i18n} {...props}/>
    </div>
  </div>
}

const mapStateToProps = state =>
  R.pipe(
    R.merge(state.autoSave),
    R.merge(state.user))(state.router)

export default connect(mapStateToProps, {logout, switchLanguage})(Footer)
