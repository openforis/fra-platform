import React from 'react'
import { useI18n, useUserInfo } from '@webapp/components/hooks'

/* global  __APPLICATION_VERSION__ */

const SendFeedback = () => {
  const i18n = useI18n()
  const userInfo = useUserInfo()

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
    <a target="_top" href={`mailto:fra@fao.org?subject=${subject}&body=${body.trim()}`}>
      {i18n.t('footer.sendFeedback')}
    </a>
  )
}

export default SendFeedback
