import './footer.less'
import React from 'react'
import { useI18n } from '@webapp/components/hooks'

import SendFeedback from './components/sendFeedback'

const links = [
  {
    key: 'footer.contactUs',
    to: 'http://www.fao.org/contact-us/',
    target: '_blank',
  },
  {
    key: 'footer.termsAndConditions',
    to: 'http://www.fao.org/contact-us/terms/',
    target: '_blank',
  },
  {
    key: 'footer.scamAlert',
    to: 'http://www.fao.org/contact-us/scam-alert/',
    target: '_blank',
  },
  {
    key: 'footer.reportMisconduct',
    to: 'http://www.fao.org/contact-us/report-fraud/',
    target: '_blank',
  },
  {
    key: 'footer.userGuide',
    to: '/api/fileRepository/userGuide/',
    target: '_top',
  },
]

const Footer = () => {
  const i18n = useI18n()

  return (
    <footer>
      {links.map((link) => (
        <React.Fragment key={link.key}>
          <a target={link.target || ''} href={`${link.to}${i18n.language}`}>
            {i18n.t(link.key)}
          </a>
          <div className="separator" />
        </React.Fragment>
      ))}

      <SendFeedback />
      <span className="copyright">&copy; FAO, {new Date().getFullYear()}</span>
    </footer>
  )
}

export default Footer
