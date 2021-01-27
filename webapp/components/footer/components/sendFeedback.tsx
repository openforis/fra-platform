import React from 'react'
import { useI18n, useUserInfo } from '@webapp/components/hooks'
/* global  __APPLICATION_VERSION__ */
const SendFeedback = () => {
  const i18n = useI18n()
  const userInfo = useUserInfo()
  const newLine = `%0D%0A`
  const subject = (i18n as any).t('navigation.support.feedbackEmailSubject')
  let userInformationLine = ''
  if (userInfo) {
    userInformationLine = `${(i18n as any).t('navigation.support.user')}: ${(userInfo as any).name} (${
      (userInfo as any).id
    })`
  }
  const body = `
${newLine}${newLine}
*** ${(i18n as any).t('navigation.support.dontDelete')} ***
${newLine}${newLine}
${userInformationLine}
${newLine}
${(i18n as any).t('navigation.support.platformVersion')}: ${
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__APPLICATION_VERSION__'.
    __APPLICATION_VERSION__
  }
${newLine}
${(i18n as any).t('navigation.support.userAgent')}: ${navigator.userAgent}
`
  return (
    <a target="_top" href={`mailto:fra@fao.org?subject=${subject}&body=${body.trim()}`}>
      {(i18n as any).t('footer.sendFeedback')}
    </a>
  )
}
export default SendFeedback
