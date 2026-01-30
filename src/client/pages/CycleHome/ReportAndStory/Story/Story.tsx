import './Story.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useLanguage } from 'client/hooks/language'
import { useCycleRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

const Story: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const lang = useLanguage()

  const url = `https://www.fao.org/interactive/2025/forest-resources-assessment/${lang}/`

  return (
    <div className="home-story">
      <img
        alt={t('landing.interactiveStory')}
        className="home-story__image"
        src={`/img/${assessmentName}/${cycleName}/landing/interactive-story.jpg`}
      />

      <div className="home-story__content">
        <h3 className="home-story__title">{t('landing.interactiveStory')}</h3>
        <Button
          label={t('landing.exploreKeyFindings')}
          onClick={() => window.open(url, '_blank')}
          size={ButtonSize.l}
          type={ButtonType.primary}
        />
      </div>
    </div>
  )
}

export default Story
