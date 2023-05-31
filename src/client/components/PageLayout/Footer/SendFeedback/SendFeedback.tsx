import React from 'react'
import { useTranslation } from 'react-i18next'

import { Users } from 'meta/user'

import { useUser } from 'client/store/user'
/* global  __APPLICATION_VERSION__ */

const SendFeedback: React.FC = () => {
  const { i18n } = useTranslation()
  const user = useUser()

  const newLine = `%0D%0A`
  const subject = i18n.t('navigation.support.feedbackEmailSubject')

  let userInformationLine = ''
  if (user) {
    userInformationLine = `${i18n.t('navigation.support.user')}: ${Users.getFullName(user)} (${user.id})`
  }

  const body = `
${newLine}${newLine}
*** ${i18n.t('navigation.support.dontDelete')} ***
${newLine}${newLine}
${userInformationLine}
${newLine}
${i18n.t('navigation.support.platformVersion')}: ${
    // @ts-ignore
    __APPLICATION_VERSION__
  }
${newLine}
${i18n.t('navigation.support.userAgent')}: ${navigator.userAgent}
`

  return (
    <a target="_top" href={`mailto:fra@fao.org?subject=${subject}&body=${body.trim()}`}>
      {i18n.t<string>('footer.sendFeedback')}
    </a>
  )
}
export default SendFeedback
