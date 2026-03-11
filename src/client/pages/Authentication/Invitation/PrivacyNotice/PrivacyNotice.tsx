import './PrivacyNotice.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useLanguage } from 'client/hooks/language'
import Hr from 'client/components/Hr'

const privacyNoticeUrlBase = 'https://www.fao.org/contact-us/data-protection-and-privacy'

const PrivacyNotice: React.FC = () => {
  const { t } = useTranslation()
  const lang = useLanguage()
  const privacyNoticeUrl = `${privacyNoticeUrlBase}/${lang}`

  return (
    <>
      <Hr className="invitation-privacy-notice__divider" />
      <div className="invitation-privacy-notice">
        {t('login.invitationPrivacyNotice')}{' '}
        <a href={privacyNoticeUrl} rel="noreferrer" target="_blank">
          {t('login.invitationPrivacyNoticeLinkLabel')}
        </a>
      </div>
    </>
  )
}

export default PrivacyNotice
