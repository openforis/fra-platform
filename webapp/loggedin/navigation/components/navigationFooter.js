import React from 'react'

import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

const NavigationFooterUserGuide = props => {
  const { i18n, userInfo } = props
  return (
    <div>
      <a
        className="nav__footer-link"
        target="_top"
        href={`/api/fileRepository/userGuide/${userInfo.lang}`}>
        {i18n.t('navigation.support.userGuide')}
      </a>
    </div>
  )
}

const NavigationFooterSendFeedback = props => {
  const { i18n, userInfo } = props

  const newLine = `%0D%0A`
  const subject = i18n.t('navigation.support.feedbackEmailSubject')
  const body = `
${newLine}${newLine}
*** ${i18n.t('navigation.support.dontDelete')} ***
${newLine}${newLine}
${i18n.t('navigation.support.user')}: ${userInfo.name} (${userInfo.id})
${newLine}
${i18n.t('navigation.support.platformVersion')}: ${__PLATFORM_VERSION__}
${newLine}
${i18n.t('navigation.support.userAgent')}: ${navigator.userAgent}
`

  return (
    <div>
      <a
        className="nav__footer-link"
        target="_top"
        href={`mailto:fra@fao.org?subject=${subject}&body=${body}`}>
        {i18n.t('navigation.support.sendFeedback')}
      </a>
    </div>
  )
}

const NavigationFooter = () => {

  const i18n = useI18n()
  const userInfo = useUserInfo()

  const currentYear = new Date().getFullYear()

  return (
    <div className="nav__footer">
      {
        userInfo &&
        <>
          <NavigationFooterUserGuide i18n={i18n} userInfo={userInfo}/>
          <NavigationFooterSendFeedback i18n={i18n} userInfo={userInfo}/>
        </>
      }

      <span className="nav__footer-copyright">&copy; {currentYear} FAO <br/>{i18n.t('navigation.support.platformVersion')} {__APPLICATION_VERSION__}
</span>
    </div>
  )
}

export default NavigationFooter
