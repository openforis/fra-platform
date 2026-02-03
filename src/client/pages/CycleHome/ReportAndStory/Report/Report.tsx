import './Report.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

const readOnlineUrl = 'https://openknowledge.fao.org/bitstreams/2dee6e93-1988-4659-aa89-30dd20b43b15/download'
const downloadPdfUrl = 'https://openknowledge.fao.org/bitstreams/12322cae-5b20-4be2-927a-72a86fd319e9/download'

const Report: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()

  return (
    <div className="home-hero home-report">
      <div className="home-report__fra-title">
        {t('common.globalFRA')
          .split(' ')
          .map((word) => (
            <span key={word}>{word}</span>
          ))}
        <span className="home-report__fra-title-year">2025</span>
      </div>

      <img
        key={cycleName}
        alt={t('common.globalFRA')}
        className="home-hero__image home-report__cover"
        src={`/img/${assessmentName}/${cycleName}/landing/report-cover.png`}
      />

      <div className="home-hero__content">
        <h3 className="home-hero__title">{t('landing.mainReport')}</h3>
        <div className="home-report__links">
          <Button
            label={t('common.readOnline')}
            onClick={() => window.open(readOnlineUrl, '_blank')}
            size={ButtonSize.l}
            type={ButtonType.primary}
          />
          <Button
            label={t('common.downloadPdf')}
            onClick={() => window.open(downloadPdfUrl, '_blank')}
            size={ButtonSize.l}
            type={ButtonType.primary}
          />
        </div>
      </div>
    </div>
  )
}
export default Report
