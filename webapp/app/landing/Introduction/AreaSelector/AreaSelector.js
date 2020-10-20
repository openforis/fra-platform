import './areaSelector.less'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import * as BasePaths from '@webapp/main/basePaths'

import { Area, Country } from '@common/country'

import { useI18n } from '@webapp/components/hooks'
import { useRegions } from '@webapp/app/hooks'

import DropdownAreas from './DropdownAreas'

const areas = {
  countries: 'countries',
  regions: 'regions',
}

const AreaSelector = () => {
  const i18n = useI18n()
  const regions = useRegions()
  const [dropdownOpened, setDropdownOpened] = useState('')
  const [countryISOs, setCountryISOs] = useState([])

  // on mount fetch countries
  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(`/api/countries`)
      setCountryISOs(data.map(Country.getCountryIso))
    })()
  }, [])

  return (
    <div className="home-area-selector">
      <img alt="" src="/img/iconGlobal.svg" />
      <Link className="m-r" to={BasePaths.getCountryHomeLink(Area.levels.global)}>
        {i18n.t('area.WO.listName')}
      </Link>

      <img alt="" src="/img/iconRegions.svg" />
      <div>{i18n.t('common.regions')}</div>
      <DropdownAreas
        area={areas.regions}
        areaISOs={regions}
        dropdownOpened={dropdownOpened}
        setDropdownOpened={setDropdownOpened}
      />

      <img alt="" src="/img/iconCountries.svg" />
      <div>{i18n.t('common.countries')}</div>
      <DropdownAreas
        area={areas.countries}
        areaISOs={countryISOs}
        dropdownOpened={dropdownOpened}
        setDropdownOpened={setDropdownOpened}
      />
    </div>
  )
}

export default AreaSelector
