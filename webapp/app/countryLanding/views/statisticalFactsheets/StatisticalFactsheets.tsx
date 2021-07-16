import './StatisticalFactsheets.scss'
import React from 'react'
import { useParams } from 'react-router'

import { Area } from '@common/country'

import useI18n from '@webapp/components/hooks/useI18n'
import { useSelector } from 'react-redux'
import * as UiState from '@webapp/store/ui/state'
import { __MIN_COUNTRIES__ } from '@webapp/pages/Assessment/AssessmentHome/FraHome/components/CountrySelector'
import ForestArea from './ForestArea'
import CarbonGrowingStock from './CarbonGrowingStock'
import ForestAreaPercent from './ForestAreaPercent'
import PrimaryForest from './PrimaryForest'
import ForestOwnership from './ForestOwnership'
import ForestAreaWithinProtectedAreas from './ForestAreaWithinProtectedAreas'
import NaturallyRegeneratingForest from './NaturallyRegeneratingForest'
import PrimaryDesignatedManagementObjective from './PrimaryDesignatedManagementObjective'

const StatisticalFactsheets = () => {
  const i18n = useI18n()
  const { countryIso: levelIso }: any = useParams()
  const isCountry = Area.isISOCountry(levelIso)
  const selectedCountries: any = useSelector(UiState.getSelectedCountries)

  return (
    <div>
      {selectedCountries.length > __MIN_COUNTRIES__ && (
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
