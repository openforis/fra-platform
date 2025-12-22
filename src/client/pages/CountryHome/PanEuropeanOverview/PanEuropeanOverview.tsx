import './PanEuropeanOverview.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentNames } from 'meta/assessment/assessment'

import CycleSwitch from 'client/components/CycleSwitch'
import Description2020 from 'client/pages/CountryHome/PanEuropeanOverview/Description2020'
import Description2025 from 'client/pages/CountryHome/PanEuropeanOverview/Description2025'

const components = {
  [AssessmentNames.panEuropean]: {
    '2020': Description2020,
    '2025': Description2025,
  },
}

const PanEuropeanOverview: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className="pan-eu-home">
      <CycleSwitch components={components} />

      <div className="partners__disclaimer">
        <div>
          {t('panEuropean.disclaimer.technicalSupport')}{' '}
          <a href="https://foresteurope.org" rel="noreferrer" target="_blank">
            {t('panEuropean.disclaimer.forestEurope')}
          </a>
        </div>
      </div>
      <div className="partners__disclaimerLogos">
        <img alt="" className="forestEurope" src="/img/partners/ForestEurope.png" />
      </div>

      <div className="partners">
        <div className="partners__disclaimer">
          <div>
            {t('panEuropean.disclaimer.part1')}{' '}
            <a href="https://www.admin.ch/gov/en/start.html" rel="noreferrer" target="_blank">
              {t('panEuropean.disclaimer.switzerland')}
            </a>{' '}
            {t('panEuropean.disclaimer.and')}{' '}
            <a href="https://www.skogsstyrelsen.se/en/" rel="noreferrer" target="_blank">
              {t('panEuropean.disclaimer.sweden')}
            </a>
          </div>
        </div>
        <div className="partners__disclaimerLogos">
          <img alt={t('panEuropean.disclaimer.govSwitzerland')} src="/img/partners/CHE.png" />
          <img alt={t('panEuropean.disclaimer.sweden')} src="/img/partners/skogsstyrelsen.png" />
        </div>
      </div>
    </div>
  )
}

export default PanEuropeanOverview
