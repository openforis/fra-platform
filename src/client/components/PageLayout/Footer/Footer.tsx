import './Footer.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useFooterLogic } from './hooks/useFooterLogic'
import SendFeedback from './SendFeedback'
import UserGuideLink from './UserGuideLink'

const links = [
  {
    key: 'footer.contactUs',
    to: 'http://www.fao.org/contact-us/',
  },
  {
    key: 'footer.termsAndConditions',
    to: 'http://www.fao.org/contact-us/terms/',
  },
  {
    key: 'footer.scamAlert',
    to: 'http://www.fao.org/contact-us/scam-alert/',
  },
  {
    key: 'footer.reportMisconduct',
    to: 'http://www.fao.org/contact-us/report-fraud/',
  },
]

const Footer: React.FC = () => {
  const { i18n, t } = useTranslation()
  const { language } = i18n

  // @ts-ignore
  const buildVersion = `${__APPLICATION_VERSION__} | ${__BUILD_DATE__}`

  const { isFooterVisible } = useFooterLogic()

  if (!isFooterVisible) return null

  return (
    <footer>
      <div className="footer__links">
        {links.map((link, i) => (
          <React.Fragment key={link.key}>
            {i !== 0 && <div className="separator" />}

            <a target="_blank" rel="noreferrer" href={`${link.to}${language}`}>
              {t(link.key)}
            </a>
          </React.Fragment>
        ))}

        <UserGuideLink />

        <div className="separator" />

        <SendFeedback />

        <div className="separator" />

        <a target="_blank" href={`https://www.fao.org/contact-us/terms/db-terms-of-use/${language}`} rel="noreferrer">
          {t('footer.licenses')}
        </a>

        <div className="separator" />
      </div>

      <span className="copyright">&copy; FAO, {new Date().getFullYear()}</span>

      <div className="footer__version">
        <span className="build-version">
          {t('footer.platformVersion')} #{buildVersion}
        </span>
      </div>
    </footer>
  )
}

export default Footer
