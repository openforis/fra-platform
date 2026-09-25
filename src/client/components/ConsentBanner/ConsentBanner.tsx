import './ConsentBanner.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useLanguage } from 'client/hooks/language'
import { useIsPrintRoute } from 'client/hooks/routes'
import Button, { ButtonSize } from 'client/components/Buttons/Button'

const ConsentBanner: React.FC = () => {
  const { t } = useTranslation()
  const language = useLanguage()
  const { print } = useIsPrintRoute()
  const [isOpen, setIsOpen] = useState<boolean>(true)

  if (!isOpen || print) return null

  return (
    <div aria-label={t('consent.title')} className="consent-banner" role="dialog">
      <div className="consent-banner__text">
        <strong>{t('consent.title')}</strong>
        <p>{t('consent.description')}</p>
        <a
          href={`https://www.fao.org/contact-us/data-protection-and-privacy/${language}`}
          rel="noreferrer"
          target="_blank"
        >
          {t('consent.learnMore')}
        </a>
      </div>

      <Button label={t('consent.decline')} onClick={() => setIsOpen(false)} size={ButtonSize.m} />
      <Button label={t('consent.accept')} onClick={() => setIsOpen(false)} size={ButtonSize.m} />
    </div>
  )
}

export default ConsentBanner
