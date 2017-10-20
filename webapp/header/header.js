import './style.less'
import * as R from 'ramda'

import React from 'react'
import { connect } from 'react-redux'
import { logout, switchLanguage } from '../user/actions'
import { getRelativeDate } from '../utils/relativeDate'
import { PopoverControl } from './../reusableUiComponents/popoverControl'

const UserInfo = props => {
  const userInfoItems = [{
    label: props.i18n.t('header.logout'),
    onClick: () => props.logout()
  }, {
    divider: true
  }, {
    label: props.i18n.t('header.profilePicture'),
    onClick: () => window.open('https://gravatar.com', '_blank')
  }]

  return <PopoverControl items={userInfoItems}>
    <div className="header__menu-item">
      {props.userName}
      <svg className="icon icon-middle">
        <use xlinkHref="img/icons.svg#small-down"/>
      </svg>
    </div>
  </PopoverControl>
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

  return <PopoverControl items={languageSelectionItems}>
    <div className="header__menu-item">
      {i18n.t(`language.${i18n.language}`)}
      <svg className="icon icon-middle">
        <use xlinkHref="img/icons.svg#small-down"/>
      </svg>
    </div>
  </PopoverControl>
}

const autosaveStatusText = (i18n, status, lastSaveTimeStamp) => {
  const statusTextTranslation = i18n.t(`header.autoSave.${status}`)
  return status === 'lastSaveTimestampReceived'
    ? statusTextTranslation + getRelativeDate(lastSaveTimeStamp, i18n).toLowerCase()
    : statusTextTranslation
}

const Header = ({status, userInfo, lastSaveTimeStamp, width, i18n, ...props}) => {
  const style = {width: `calc(100vw - ${width}px)`}
  return <div className="header__container" style={style}>
    {/* Placeholder for space-between flexbox alignment */}
    <div/>
    {R.isNil(status)
      ? null
      : <div className={`header__autosave status-${status}`}>
          {autosaveStatusText(i18n, status, lastSaveTimeStamp)}
        </div>
    }
    <div className="header__menu">
      <LanguageSelection i18n={i18n} {...props}/>
      <UserInfo userName={userInfo.name} i18n={i18n} {...props}/>
    </div>
  </div>
}

const mapStateToProps = state =>
  R.pipe(
    R.merge(state.autoSave),
    R.merge(state.user))(state.router)

export default connect(mapStateToProps, {logout, switchLanguage})(Header)
