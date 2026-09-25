import './ConsentBanner.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ConsentStatus } from 'meta/tracking/consent'

import { useLanguage } from 'client/hooks/language'
import Button, { ButtonSize } from 'client/components/Buttons/Button'

import { useConsentBanner } from './hooks/useConsentBanner'

const ConsentBanner: React.FC = () => {
  const { t } = useTranslation()
  const language = useLanguage()
  const { choose, isOpen } = useConsentBanner()

  if (!isOpen) return null

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

      <Button label={t('consent.decline')} onClick={() => choose(ConsentStatus.denied)} size={ButtonSize.m} />
      <Button label={t('consent.accept')} onClick={() => choose(ConsentStatus.granted)} size={ButtonSize.m} />
    </div>
  )
}

export default ConsentBanner
