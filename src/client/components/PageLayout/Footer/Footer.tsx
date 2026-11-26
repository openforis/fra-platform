import './Footer.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useLanguage } from 'client/hooks/language'

import { useIsFooterVisible } from './hooks/useIsFooterVisible'
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
    to: 'https://www.fao.org/contact-us/report-misconduct/',
  },
]

const Footer: React.FC = () => {
  const { t } = useTranslation()
  const language = useLanguage()

  // @ts-ignore
  const buildVersion = `${__APPLICATION_VERSION__} | ${__BUILD_DATE__}`

  const isFooterVisible = useIsFooterVisible()

  if (!isFooterVisible) return null

  const faoTermsHref = `https://www.fao.org/contact-us/terms/db-terms-of-use/${language}`

  return (
    <footer>
      <div className="footer__links">
        {links.map((link, i) => (
          <React.Fragment key={link.key}>
            {i !== 0 && <div className="separator" />}

            <a href={`${link.to}${language}`} rel="noreferrer" target="_blank">
              {t(link.key)}
            </a>
          </React.Fragment>
        ))}

        <UserGuideLink />

        <div className="separator" />

        <SendFeedback />

        <div className="separator" />

        <a href={faoTermsHref} rel="noreferrer" target="_blank">
          {t('footer.licenses')}
        </a>
      </div>

      <span className="copyright">&copy; FAO, {new Date().getFullYear()}</span>

      <div className="footer__ccBy">
        <img alt="CC BY" src="/img/creativeCommonsBy.png" />
        <div>
          <div>
            {t('footer.ccDescription1')} (CC BY 4.0;{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/legalcode.en" rel="noreferrer" target="_blank">
              https://creativecommons.org/licenses/by/4.0/legalcode.en
            </a>
            ).
          </div>
          <div>
            {t('footer.ccDescription2')}{' '}
            <a href={faoTermsHref} rel="noreferrer" target="_blank">
              {t('footer.faoTerms')}
            </a>
            .
          </div>
        </div>
      </div>

      <div className="footer__version">
        <span className="build-version">
          {t('footer.platformVersion')} #{buildVersion}
        </span>
      </div>
    </footer>
  )
}

export default Footer
