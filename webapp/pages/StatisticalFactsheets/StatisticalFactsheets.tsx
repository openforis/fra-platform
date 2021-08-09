import './StatisticalFactsheets.scss'
import React from 'react'
import { useParams } from 'react-router'

import { Areas } from '@core/country'
import { Objects } from '@core/utils'
import { useHomeCountriesFilter } from '@webapp/store/page/home'
import { useI18n } from '@webapp/components/hooks'

import ForestArea from './ForestArea'
import CarbonGrowingStock from './CarbonGrowingStock'
import ForestAreaPercent from './ForestAreaPercent'
import PrimaryForest from './PrimaryForest'
import ForestOwnership from './ForestOwnership'
import ForestAreaWithinProtectedAreas from './ForestAreaWithinProtectedAreas'
import NaturallyRegeneratingForest from './NaturallyRegeneratingForest'
import PrimaryDesignatedManagementObjective from './PrimaryDesignatedManagementObjective'

const StatisticalFactsheets: React.FC = () => {
  const i18n = useI18n()
  const { countryIso: levelIso }: any = useParams()
  const isCountry = Areas.isISOCountry(levelIso)
  const countriesFilter = useHomeCountriesFilter()

  return (
    <div>
      {!Objects.isEmpty(countriesFilter) && (
        <p className="statistical-factsheets__disclaimer">{i18n.t('disclaimer.statisticalFactsheets')}</p>
      )}

      <div className={`statistical-factsheets${isCountry ? ' country' : ''}`}>
        <ForestArea levelIso={levelIso} />
        <CarbonGrowingStock levelIso={levelIso} />

        <ForestAreaPercent levelIso={levelIso} />
        <PrimaryForest levelIso={levelIso} />

        <ForestAreaWithinProtectedAreas levelIso={levelIso} />
        <ForestOwnership levelIso={levelIso} />

        <PrimaryDesignatedManagementObjective levelIso={levelIso} />
        <NaturallyRegeneratingForest levelIso={levelIso} />
      </div>
    </div>
  )
}

export default StatisticalFactsheets
