import './style.less'
import * as R from 'ramda'

import React from 'react'
import { connect } from 'react-redux'
import { logout, switchLanguage } from '../user/actions'
import { toggleNavigationVisible } from '../navigation/actions'
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
  return <div className="header__container" style={style}>
    { toggleNavigationControl(toggleNavigationVisible, navigationVisible) }
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

const toggleNavigationControl = (toggleNavigationVisible, navigationVisible) => {
  const iconSuffix = navigationVisible ? '-left' : '-right'
  const text = navigationVisible ? 'Hide sidebar' : 'Show sidebar'
  return <div className="header__toggle-navigation-visible"
              onClick={toggleNavigationVisible}>
        <svg className="icon icon-middle">
          <use xlinkHref={`img/icons.svg#small${iconSuffix}`}/>
        </svg>
        {text}
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
