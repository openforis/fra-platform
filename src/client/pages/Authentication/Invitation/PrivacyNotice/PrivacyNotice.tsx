import './PrivacyNotice.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useLanguage } from 'client/hooks/language'
import Hr from 'client/components/Hr'
import Flex from 'client/components/Layout/Flex'

const privacyNoticeUrlBase = 'https://www.fao.org/contact-us/data-protection-and-privacy'

const PrivacyNotice: React.FC = () => {
  const { t } = useTranslation()
  const lang = useLanguage()
  const privacyNoticeUrl = `${privacyNoticeUrlBase}/${lang}`

  return (
    <>
      <Hr className="invitation-privacy-notice__divider" />
      <Flex className="invitation-privacy-notice" flexDirection="column" gap="8">
        <div>{t('login.invitationPrivacyNotice')}</div>
        <div className="invitation-privacy-notice__link">
          <a href={privacyNoticeUrl} rel="noreferrer" target="_blank">
            {t('login.invitationPrivacyNoticeLinkLabel')}
          </a>
        </div>
      </Flex>
    </>
  )
}

export default PrivacyNotice
