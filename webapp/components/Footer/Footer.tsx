import './footer.scss'
import React from 'react'

import { useI18n, useUserInfo } from '@webapp/hooks'
import SendFeedback from './components/sendFeedback'

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
  const i18n = useI18n()
  const userInfo = useUserInfo()
  const { language } = i18n

  return (
    <footer>
      <div className="footer__links">
        {links.map((link, i) => (
          <React.Fragment key={link.key}>
            {i !== 0 && <div className="separator" />}

            <a target="_blank" rel="noreferrer" href={`${link.to}${language}`}>
              {i18n.t(link.key)}
            </a>
          </React.Fragment>
        ))}

        {userInfo && (
          <>
            <div className="separator" />
            <a target="_top" href={`/api/fileRepository/userGuide/${language}`}>
              {i18n.t('footer.userGuide')}
            </a>
          </>
        )}
        <div className="separator" />
        <SendFeedback />
      </div>

      <span className="copyright">&copy; FAO, {new Date().getFullYear()}</span>
    </footer>
  )
}

export default Footer
