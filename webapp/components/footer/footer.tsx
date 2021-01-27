import './footer.less'
import React from 'react'
import { useI18n, useUserInfo } from '@webapp/components/hooks'
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
const Footer = () => {
  const i18n = useI18n()
  const userInfo = useUserInfo()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'language' does not exist on type '{}'.
  const { language } = i18n
  return (
    <footer>
      {links.map((link, i) => (
        <React.Fragment key={link.key}>
          {i !== 0 && <div className="separator" />}

          <a target="_blank" rel="noreferrer" href={`${link.to}${language}`}>
            {(i18n as any).t(link.key)}
          </a>
        </React.Fragment>
      ))}

      {userInfo && (
        <>
          <div className="separator" />
          <a target="_top" href={`/api/fileRepository/userGuide/${language}`}>
            {(i18n as any).t('footer.userGuide')}
          </a>
        </>
      )}
      <div className="separator" />
      <SendFeedback />

      <span className="copyright">&copy; FAO, {new Date().getFullYear()}</span>
    </footer>
  )
}
export default Footer
