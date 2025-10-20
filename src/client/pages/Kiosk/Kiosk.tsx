import './Kiosk.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Routes } from 'meta/routes'

import Card from 'client/pages/Kiosk/components/Card'
import { KioskCardProps } from 'client/pages/Kiosk/components/Card/types'

type KioskCardConfig = Omit<KioskCardProps, 'title'> & { titleKey: string }

const cards: Array<KioskCardConfig> = [
  {
    altText: 'FRA process',
    imageUrl: '/img/kiosk/FRA-process.png',
    link: Routes.FraProcess.path.relative,
    titleKey: 'fraProcess',
  },
  {
    altText: 'Recent highlights',
    imageUrl: '/img/kiosk/recent-highlights.jpg',
    link: Routes.RecentHighlights.path.relative,
    titleKey: 'recentHighlights',
  },
  {
    altText: 'Explore FRA Data',
    imageUrl: '/img/fra/latest/landing/map.png',
    link: Routes.FraDataPlatform.path.relative,
    titleKey: 'exploreFraData',
  },
  {
    altText: 'Remote sensing survey',
    imageUrl: '/img/kiosk/latest-activities.png',
    link: Routes.RemoteSensingSurvey.path.relative,
    titleKey: 'remoteSensingSurvey',
  },
  {
    altText: 'Interactive stories',
    imageUrl: '/img/kiosk/watching-over-out-forests.png',
    link: Routes.InteractiveStories.path.relative,
    titleKey: 'interactiveStories',
  },
  {
    altText: 'Forest kids',
    imageUrl: '/img/kiosk/forest-kids.png',
    link: Routes.ForestKids.path.relative,
    titleKey: 'forestKidsVideoGame',
  },
]

const qrCodeSources: Record<string, string> = {
  en: '/img/kiosk/qr_code_FRA_website_en.png',
  es: '/img/kiosk/qr_code_FRA_website_es.png',
  fr: '/img/kiosk/qr_code_FRA_website_fr.png',
}

const Kiosk: React.FC = () => {
  const { i18n, t } = useTranslation()
  const title = t('kiosk.globalForestResourcesAssessmentFra')
  const language = i18n.language ?? 'en'
  const qrCodeSrc = qrCodeSources[language] ?? qrCodeSources.en
  const qrCodeLabel = t('kiosk.forMoreInformation')

  return (
    <div className="kiosk-content">
      <div>
        <div className="kiosk-content__header">
          <h1 className="kiosk-content__title">
            {title.split('\n').map((line) => (
              <React.Fragment key={line}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h1>
          <div className="kiosk-content__qr">
            <img alt={qrCodeLabel} className="kiosk-content__qr-image" src={qrCodeSrc} />
            <span className="kiosk-content__qr-label">
              {qrCodeLabel.split('\n').map((line) => (
                <React.Fragment key={line}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </span>
          </div>
        </div>
        <div className="kiosk-content__grid-container">
          {cards.map(({ altText, imageUrl, link, titleKey }) => (
            <Card key={titleKey} altText={altText} imageUrl={imageUrl} link={link} title={t(`kiosk.${titleKey}`)} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Kiosk
