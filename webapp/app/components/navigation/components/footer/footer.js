import './footer.less'

import React from 'react'

import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

const UserGuide = props => {
  const { i18n, userInfo } = props
  return (
    <div>
      <a
        className="nav-footer__link"
        target="_top"
        href={`/api/fileRepository/userGuide/${userInfo.lang}`}>
        {i18n.t('navigation.support.userGuide')}
      </a>
    </div>
  )
}

const SendFeedback = props => {
  const { i18n, userInfo } = props

  const newLine = `%0D%0A`
  const subject = i18n.t('navigation.support.feedbackEmailSubject')
  const body = `
${newLine}${newLine}
*** ${i18n.t('navigation.support.dontDelete')} ***
${newLine}${newLine}
${i18n.t('navigation.support.user')}: ${userInfo.name} (${userInfo.id})
${newLine}
${i18n.t('navigation.support.platformVersion')}: ${__APPLICATION_VERSION__}
${newLine}
${i18n.t('navigation.support.userAgent')}: ${navigator.userAgent}
`

  return (
    <div>
      <a
        className="nav-footer__link"
        target="_top"
        href={`mailto:fra@fao.org?subject=${subject}&body=${body}`}>
        {i18n.t('navigation.support.sendFeedback')}
      </a>
    </div>
  )
}

const Footer = () => {

  const i18n = useI18n()
  const userInfo = useUserInfo()

  const currentYear = new Date().getFullYear()

  return (
    <div className="nav-footer">
      {
        userInfo &&
        <>
          <UserGuide i18n={i18n} userInfo={userInfo}/>
          <SendFeedback i18n={i18n} userInfo={userInfo}/>
        </>
      }

      <span className="nav-footer__copyright">&copy; {currentYear} FAO</span>
    </div>
  )
}

export default Footer
