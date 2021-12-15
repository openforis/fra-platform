import './areaSelector.scss'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'

import { Global } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { BasePaths } from '@client/basePaths'
import { Breakpoints } from '@client/utils'

import { useCountries, useRegionGroups } from '@client/store/assessment'

import { useTranslation } from 'react-i18next'
import DropdownAreas from './DropdownAreas'
import SelectMobile from './SelectMobile'

export const areas = {
  countries: 'countries',
  regions: 'regions',
}

const AreaSelector: React.FC = () => {
  const { i18n } = useTranslation()
  const regionGroups = useRegionGroups()
  const countries = useCountries()
  const [dropdownOpened, setDropdownOpened] = useState<string>('')

  return (
    <div className="home-area-selector">
      <div className="home-area-selector__group">
        <img alt="" src="/img/iconGlobal.svg" />
        <Link className="home-link m-r" to={BasePaths.Assessment.root(Global.WO, AssessmentName.fra)}>
          {i18n.t(`area.${Global.WO}.listName`)}
        </Link>
      </div>

      <div className="home-area-selector__group">
        <img alt="" src="/img/iconRegions.svg" />
        <div>{i18n.t('common.regions')}</div>

        <MediaQuery minWidth={Breakpoints.laptop}>
          <DropdownAreas
            area={areas.regions}
            areaISOs={regionGroups}
            assessmentType={AssessmentName.fra}
            dropdownOpened={dropdownOpened}
            setDropdownOpened={setDropdownOpened}
          />
        </MediaQuery>
        <MediaQuery maxWidth={Breakpoints.laptop - 1}>
          <SelectMobile area={areas.regions} areaISOs={regionGroups} assessmentType={AssessmentName.fra} />
        </MediaQuery>
      </div>

      <div className="home-area-selector__group">
        <img alt="" src="/img/iconCountries.svg" />
        <div>{i18n.t('common.countries')}</div>

        <MediaQuery minWidth={Breakpoints.laptop}>
          <DropdownAreas
            area={areas.countries}
            areaISOs={countries}
            assessmentType={AssessmentName.fra}
            dropdownOpened={dropdownOpened}
            setDropdownOpened={setDropdownOpened}
          />
        </MediaQuery>
        <MediaQuery maxWidth={Breakpoints.laptop - 1}>
          <SelectMobile area={areas.countries} areaISOs={countries} assessmentType={AssessmentName.fra} />
        </MediaQuery>
      </div>
    </div>
  )
}
export default AreaSelector
