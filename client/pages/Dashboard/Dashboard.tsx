import './Dashboard.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@core/utils'

import { Areas } from '@meta/area'

import { useHomeCountriesFilter } from '@client/store/ui/home'
import { useCountryIso } from '@client/hooks'

// import CarbonGrowingStock from './CarbonGrowingStock'
import ForestArea from './ForestArea'
import ForestAreaPercent from './ForestAreaPercent'
import ForestAreaWithinProtectedAreas from './ForestAreaWithinProtectedAreas'
import ForestOwnership from './ForestOwnership'
import NaturallyRegeneratingForest from './NaturallyRegeneratingForest'
import PrimaryDesignatedManagementObjective from './PrimaryDesignatedManagementObjective'
import PrimaryForest from './PrimaryForest'

const Dashboard: React.FC = () => {
  const i18n = useTranslation()
  const countryIso = useCountryIso()
  const isGlobal = Areas.isGlobal(countryIso)
  const countriesFilter = useHomeCountriesFilter()

  if (isGlobal) {
    return <pre>Placeholder for Global Dashboard</pre>
  }

  return (
    <div>
      {!Objects.isEmpty(countriesFilter) && (
        <p className="statistical-factsheets__disclaimer">{i18n.t<string>('disclaimer.statisticalFactsheets')}</p>
      )}

      {/* <div className={`statistical-factsheets${isCountry ? ' country' : ''}`}> */}
      <div className="statistical-factsheets country">
        <ForestArea />
        <PrimaryDesignatedManagementObjective />
        {/* TODO */}
        {/* <CarbonGrowingStock /> */}

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
