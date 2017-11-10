import './style.less'
import * as R from 'ramda'

import React from 'react'
import { connect } from 'react-redux'
import { logout, switchLanguage } from '../user/actions'
import { toggleNavigationVisible } from '../navigation/actions'
import { getRelativeDate } from '../utils/relativeDate'
import { PopoverControl } from '../reusableUiComponents/popoverControl'
import Icon from '../reusableUiComponents/icon'

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
    <div className="fra-header__menu-item">
      {props.userName}
      <Icon className="icon-middle" name="small-down"/>
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
    <div className="fra-header__menu-item">
      {i18n.t(`language.${i18n.language}`)}
      <Icon className="icon-middle" name="small-down"/>
    </div>
  </PopoverControl>
}

const autosaveStatusText = (i18n, status, lastSaveTimeStamp) => {
  const statusTextTranslation = i18n.t(`header.autoSave.${status}`)
  return status === 'lastSaveTimestampReceived'
    ? statusTextTranslation + getRelativeDate(lastSaveTimeStamp, i18n).toLowerCase()
    : statusTextTranslation
}

const Header = ({status,
                  userInfo,
                  lastSaveTimeStamp,
                  i18n,
                  toggleNavigationVisible,
                  navigationVisible,
                  commentsOpen,
                  ...props}) => {
  const commentColumnCurrentWidth = commentsOpen ? 288 : 0
  const navigationCurrentWidth = navigationVisible ? 256 : 0
  const subtractFromHeaderWidth = commentColumnCurrentWidth + navigationCurrentWidth

  const style = {
    left: `${navigationCurrentWidth}px`,
    width: `calc(100vw - ${subtractFromHeaderWidth}px)`
  }
  return <div className="fra-header__container" style={style}>
    <div className="fra-header">
      <ToggleNavigationControl
        toggleNavigationVisible={toggleNavigationVisible}
        navigationVisible={navigationVisible}
        i18n={i18n} />
      {R.isNil(status)
        ? null
        : <div className={`fra-header__autosave status-${status}`}>
            {autosaveStatusText(i18n, status, lastSaveTimeStamp)}
          </div>
      }
      <div className="fra-header__menu">
        <LanguageSelection i18n={i18n} {...props}/>
        <UserInfo userName={userInfo.name} i18n={i18n} {...props}/>
      </div>
    </div>
  </div>
}

const ToggleNavigationControl = (props) => {
  const localisationKey = props.navigationVisible ? 'hideSidebar' : 'showSidebar'
  return <div className="fra-header__toggle-navigation-visible" onClick={props.toggleNavigationVisible}>
    <Icon className="icon-sub" name="menu-left"/>
    {props.i18n.t('header.' + localisationKey)}
  </div>
}

const mapStateToProps = state => ({
  ...state.autoSave,
  ...state.user,
  ...state.router,
  commentsOpen: state.review.openThread,
  navigationVisible: state.navigation.navigationVisible
})

export default connect(mapStateToProps, {logout, switchLanguage, toggleNavigationVisible})(Header)
