import './areaSelector.scss'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Area, Country } from '@common/country'
import FRA from '@common/assessment/fra'
import * as BasePaths from '@webapp/main/basePaths'
import { useCountries } from '@webapp/store/app'
import { useI18n } from '@webapp/components/hooks'
import { useGroupedRegions } from '@webapp/store/app/hooks'
import DropdownAreas from './DropdownAreas'

export const areas = {
  countries: 'countries',
  regions: 'regions',
}
const AreaSelector = () => {
  const i18n = useI18n()
  const groupedRegions = useGroupedRegions()
  const countries = useCountries()
  const [dropdownOpened, setDropdownOpened] = useState('')
  const [countryISOs, setCountryISOs] = useState([])
  useEffect(() => {
    setCountryISOs((countries as any).map(Country.getCountryIso))
  }, [i18n.language, countries])
  return (
    <div className="home-area-selector">
      <img alt="" src="/img/iconGlobal.svg" />
      <Link className="home-link m-r" to={BasePaths.getAssessmentHomeLink(Area.levels.global, FRA.type)}>
        {(i18n as any).t(`area.${Area.levels.global}.listName`)}
      </Link>

      <>
        <img alt="" src="/img/iconRegions.svg" />
        <div>{(i18n as any).t('common.regions')}</div>
        <DropdownAreas
          area={areas.regions}
          areaISOs={groupedRegions}
          assessmentType={FRA.type}
          dropdownOpened={dropdownOpened}
          setDropdownOpened={setDropdownOpened}
        />
      </>

      <img alt="" src="/img/iconCountries.svg" />
      <div>{(i18n as any).t('common.countries')}</div>
      <DropdownAreas
        area={areas.countries}
        areaISOs={countryISOs}
        assessmentType={FRA.type}
        dropdownOpened={dropdownOpened}
        setDropdownOpened={setDropdownOpened}
      />
    </div>
  )
}
export default AreaSelector
