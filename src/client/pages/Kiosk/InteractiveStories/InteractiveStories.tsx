import './InteractiveStories.scss'
import 'client/pages/Kiosk/Kiosk.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Routes } from 'meta/routes/routes'

import Card from 'client/pages/Kiosk/components/Card/'
import { KioskCardProps } from 'client/pages/Kiosk/components/Card/types'

type InteractiveStoryCard = Omit<KioskCardProps, 'title'> & {
  titleKey: string
}

const cards: Array<InteractiveStoryCard> = [
  {
    altText: 'Watching over our forests',
    imageUrl: '/img/kiosk/watching-over-out-forests.png',
    link: Routes.WatchingOverOurForests.path.relative,
    titleKey: 'watchingOverOurForests',
  },
  {
    altText: 'Hidden in plain sight',
    imageUrl: '/img/kiosk/hidden-in-plain-sight.png',
    link: Routes.HiddenInPlainSight.path.relative,
    titleKey: 'Hidden \n in plain sight',
  },
  {
    altText: 'Exploring our forests',
    imageUrl: '/img/kiosk/exploring-our-forests.png',
    link: Routes.ExploringOurForests.path.relative,
    titleKey: 'Exploring \n our forests',
  },
  {
    altText: 'The secrets of mangroves',
    imageUrl: '/img/kiosk/the-secrets-of-mangroves.jpg',
    link: Routes.TheSecretsOfMangroves.path.relative,
    titleKey: 'theSecretsOfMangroves',
  },
]

const InteractiveStories: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="kiosk-content">
      <div>
        <h1 className="kiosk-content__title kiosk-interactive-stories__title">{t('kiosk.interactiveStories')}</h1>
        <div className="kiosk-interactive-stories__grid-container">
          {cards.map(({ altText, imageUrl, link, titleKey }) => {
            const title = t(`kiosk.${titleKey}`, { defaultValue: titleKey })

            return <Card key={titleKey} altText={altText} imageUrl={imageUrl} link={link} title={title} />
          })}
        </div>
      </div>
    </div>
  )
}

export default InteractiveStories
