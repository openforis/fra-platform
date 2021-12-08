import './areaSelector.scss'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'

import { Global } from '@core/meta/area'
import { FRA } from '@core/assessment'
import * as BasePaths from '@webapp/main/basePaths'
import { Breakpoints } from '@webapp/utils/breakpoints'

import { useCountries } from '@webapp/store/app'
import { useGroupedRegions } from '@webapp/store/app/hooks'

import { useI18n } from '@webapp/hooks'
import DropdownAreas from './DropdownAreas'
import SelectMobile from './SelectMobile'

export const areas = {
  countries: 'countries',
  regions: 'regions',
}

const AreaSelector: React.FC = () => {
  const i18n = useI18n()
  const groupedRegions = useGroupedRegions()
  const countries = useCountries()
  const [dropdownOpened, setDropdownOpened] = useState<string>('')
  const [countryISOs, setCountryISOs] = useState<Array<string>>([])

  useEffect(() => {
    setCountryISOs(countries.map((country) => country.countryIso))
  }, [i18n.language])

  return (
    <div className="home-area-selector">
      <div className="home-area-selector__group">
        <img alt="" src="/img/iconGlobal.svg" />
        <Link className="home-link m-r" to={BasePaths.getAssessmentHomeLink(Global.WO, FRA.type)}>
          {i18n.t(`area.${Global.WO}.listName`)}
        </Link>
      </div>

      <div className="home-area-selector__group">
        <img alt="" src="/img/iconRegions.svg" />
        <div>{i18n.t('common.regions')}</div>

        <MediaQuery minWidth={Breakpoints.laptop}>
          <DropdownAreas
            area={areas.regions}
            areaISOs={groupedRegions}
            assessmentType={FRA.type}
            dropdownOpened={dropdownOpened}
            setDropdownOpened={setDropdownOpened}
          />
        </MediaQuery>
        <MediaQuery maxWidth={Breakpoints.laptop - 1}>
          <SelectMobile area={areas.regions} areaISOs={groupedRegions} assessmentType={FRA.type} />
        </MediaQuery>
      </div>

      <div className="home-area-selector__group">
        <img alt="" src="/img/iconCountries.svg" />
        <div>{i18n.t('common.countries')}</div>

        <MediaQuery minWidth={Breakpoints.laptop}>
          <DropdownAreas
            area={areas.countries}
            areaISOs={countryISOs}
            assessmentType={FRA.type}
            dropdownOpened={dropdownOpened}
            setDropdownOpened={setDropdownOpened}
          />
        </MediaQuery>
        <MediaQuery maxWidth={Breakpoints.laptop - 1}>
          <SelectMobile area={areas.countries} areaISOs={countryISOs} assessmentType={FRA.type} />
        </MediaQuery>
      </div>
    </div>
  )
}
export default AreaSelector
