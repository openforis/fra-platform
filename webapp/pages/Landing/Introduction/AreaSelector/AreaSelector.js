import './areaSelector.less'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Area, Country } from '@common/country'
import * as Fra from '@common/assessment/fra'
import * as PanEuropean from '@common/assessment/panEuropean'
import * as BasePaths from '@webapp/main/basePaths'

import { useCountries } from '@webapp/store/app'

import { useRegions } from '@webapp/app/hooks'
import { useI18n } from '@webapp/components/hooks'

import DropdownAreas from './DropdownAreas'

const areas = {
  countries: 'countries',
  regions: 'regions',
}

const AreaSelector = (props) => {
  const { assessmentType } = props
  const i18n = useI18n()
  const regions = useRegions()
  const countries = useCountries()

  const [dropdownOpened, setDropdownOpened] = useState('')
  const [countryISOs, setCountryISOs] = useState([])

  const fra = assessmentType === Fra.type
  const globalCode = fra ? Area.levels.global : Area.levels.europe

  // on mount fetch countries
  useEffect(() => {
    const countriesFiltered = fra
      ? countries
      : countries.filter((country) => Country.getRegionCodes(country).includes(Area.levels.europe))
    setCountryISOs(countriesFiltered.map(Country.getCountryIso))
  }, [])

  return (
    <div className="home-area-selector">
      <img alt="" src="/img/iconGlobal.svg" />
      <Link
        className="home-link m-r"
        to={BasePaths.getAssessmentHomeLink(globalCode, assessmentType)}
        target={fra ? '_self' : '_blank'}
      >
        {i18n.t(`area.${globalCode}.listName`)}
      </Link>

      {fra && (
        <>
          <img alt="" src="/img/iconRegions.svg" />
          <div>{i18n.t('common.regions')}</div>
          <DropdownAreas
            area={areas.regions}
            areaISOs={regions}
            assessmentType={assessmentType}
            dropdownOpened={dropdownOpened}
            setDropdownOpened={setDropdownOpened}
          />
        </>
      )}

      <img alt="" src="/img/iconCountries.svg" />
      <div>{i18n.t('common.countries')}</div>
      <DropdownAreas
        area={areas.countries}
        areaISOs={countryISOs}
        assessmentType={assessmentType}
        dropdownOpened={dropdownOpened}
        setDropdownOpened={setDropdownOpened}
      />
    </div>
  )
}

AreaSelector.propTypes = {
  assessmentType: PropTypes.oneOf([Fra.type, PanEuropean.type]),
}

AreaSelector.defaultProps = {
  assessmentType: Fra.type,
}

export default AreaSelector
