import './Dashboard.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { Areas } from 'meta/area'

import { useHomeCountriesFilter } from 'client/store/ui/home'
import { useCountryIso } from 'client/hooks'

import CarbonGrowingStock from './CarbonGrowingStock'
import ForestArea from './ForestArea'
import ForestAreaPercent from './ForestAreaPercent'
import ForestAreaWithinProtectedAreas from './ForestAreaWithinProtectedAreas'
import ForestOwnership from './ForestOwnership'
import NaturallyRegeneratingForest from './NaturallyRegeneratingForest'
import PrimaryDesignatedManagementObjective from './PrimaryDesignatedManagementObjective'
import PrimaryForest from './PrimaryForest'

/**
 * @deprecated
 */
const Dashboard: React.FC = () => {
  const i18n = useTranslation()
  const countryIso = useCountryIso()
  const isCountry = Areas.isISOCountry(countryIso)
  const countriesFilter = useHomeCountriesFilter()

  return (
    <div>
      {!Objects.isEmpty(countriesFilter) && (
        <p className="statistical-factsheets__disclaimer">{i18n.t<string>('disclaimer.statisticalFactsheets')}</p>
      )}

      <div className={classNames('statistical-factsheets', { country: isCountry })}>
        <ForestArea />
        <CarbonGrowingStock />

        <ForestAreaPercent />
        <PrimaryForest />

        <ForestAreaWithinProtectedAreas />
        <ForestOwnership />

        <PrimaryDesignatedManagementObjective />
        <NaturallyRegeneratingForest />
      </div>
    </div>
  )
}

export default Dashboard
