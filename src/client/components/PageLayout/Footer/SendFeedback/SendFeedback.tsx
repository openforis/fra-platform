import React from 'react'
import { useTranslation } from 'react-i18next'

import { Users } from 'meta/user/users'

import { useUser } from 'client/store/user/hooks/user'
/* global  __APPLICATION_VERSION__ */

const SendFeedback: React.FC = () => {
  const { t } = useTranslation()
  const user = useUser()

  const newLine = `%0D%0A`
  const subject = t('navigation.support.feedbackEmailSubject')

  let userInformationLine = ''
  if (user) {
    userInformationLine = `${t('navigation.support.user')}: ${Users.getFullName(user)} (${user.id})`
  }

  const body = `
${newLine}${newLine}
*** ${t('navigation.support.dontDelete')} ***
${newLine}${newLine}
${userInformationLine}
${newLine}
${t('navigation.support.platformVersion')}: ${
    // @ts-ignore
    __APPLICATION_VERSION__
  }
${newLine}
${t('navigation.support.userAgent')}: ${navigator.userAgent}
`

  return (
    <a href={`mailto:fra@fao.org?subject=${subject}&body=${body.trim()}`} target="_top">
      {t('footer.sendFeedback')}
    </a>
  )
}
export default SendFeedback
