import './style.less'

import React from 'react'
import { connect, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as R from 'ramda'

import { PopoverControl } from '@webapp/components/popoverControl'
import Icon from '@webapp/components/icon'

import { isAdministrator } from '@common/countryRole'
import { getRelativeDate } from '@webapp/utils/relativeDate'

import * as AppState from '@webapp/app/appState'

import { logout, switchLanguage } from '@webapp/user/actions'
import { toggleNavigationVisible } from '@webapp/loggedin/navigation/actions'

import * as ReviewState from '@webapp/loggedin/review/reviewState'

const UserInfo = ({ userInfo, i18n, logout }) => {
  const countryIso = useSelector(AppState.getCountryIso)
  const userInfoItems = [{
    content: i18n.t('header.logout'),
    onClick: () => logout()
  }, {
    divider: true
  }, {
    content: i18n.t('header.editProfile'),
    link: `/country/${countryIso}/user/${userInfo.id}`,
  }]

  return <PopoverControl items={userInfoItems}>
    <div className="fra-header__menu-item">
      {userInfo.name}
      <Icon className="icon-middle" name="small-down"/>
    </div>
  </PopoverControl>
}

const LanguageSelection = ({ i18n, switchLanguage }) => {
  const supportedLangs = ['en', 'fr', 'es', 'ru']
  const selectableLangs = R.reject(l => l === i18n.language, supportedLangs)
  const languageSelectionItems = R.map(lang =>
    ({
      content: i18n.t(`language.${lang}`),
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

const Header = props => {
  const {
    status, userInfo, i18n, commentsOpen, lastSaveTimeStamp,
    navigationVisible, toggleNavigationVisible,
    ...rest
  } = props
  const countryIso = useSelector(AppState.getCountryIso)

  // TODO use navigation state
  const navigationShow = navigationVisible && countryIso

  const commentColumnCurrentWidth = commentsOpen ? 288 : 0
  const navigationCurrentWidth = navigationShow ? 256 : 0
  const subtractFromHeaderWidth = commentColumnCurrentWidth + navigationCurrentWidth

  const style = {
    left: `${navigationCurrentWidth}px`,
    width: `calc(100vw - ${subtractFromHeaderWidth}px)`
  }
  return (
    <div className="fra-header__container no-print" style={style}>
      <div className="fra-header">
        {
          countryIso
            ? (
              <ToggleNavigationControl
                toggleNavigationVisible={toggleNavigationVisible}
                navigationVisible={navigationShow}
                i18n={i18n}/>
            )
            : (
              <div></div> //TODO add country selection
            )
        }

        {
          !R.isNil(status) &&
          <div className={`fra-header__autosave status-${status}`}>
            {autosaveStatusText(i18n, status, lastSaveTimeStamp)}
          </div>
        }

        <div className="fra-header__menu">
          <LanguageSelection i18n={i18n} {...rest}/>
          {
            userInfo &&
            <UserInfo userInfo={userInfo} i18n={i18n} {...rest}/>
          }

          {
            userInfo && isAdministrator(userInfo) &&
            <>
              <div key="v-separator" className="fra-header__menu-item-separator" style={{ margin: '0 20px' }}/>
              <Link key="admin-link"
                    to={`/country/${countryIso}/admin/`}
                    className="fra-header__menu-item">
                {i18n.t('admin.admin')}
              </Link>
            </>
          }

          {
            !userInfo &&
            <Link key="admin-link"
                  to={`/login/`}
                  className="fra-header__menu-item">
              {i18n.t('common.login')}
            </Link>
          }
        </div>
      </div>
    </div>
  )
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
  commentsOpen: ReviewState.getOpenThread(state),
  navigationVisible: state.navigation.navigationVisible
})

export default connect(mapStateToProps, { logout, switchLanguage, toggleNavigationVisible })(Header)
