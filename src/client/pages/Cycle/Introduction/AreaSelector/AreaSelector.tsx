import './areaSelector.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { Global } from '@meta/area'
import { AssessmentNames } from '@meta/assessment'

import { useCountries, useCycle, useRegionGroups } from '@client/store/assessment'
import { Breakpoints } from '@client/utils'

import DropdownAreas from './DropdownAreas'
import SelectMobile from './SelectMobile'

export const areas = {
  countries: 'countries',
  regions: 'regions',
}

const AreaSelector: React.FC = () => {
  const { i18n } = useTranslation()
  const regionGroups = useRegionGroups()
  const cycle = useCycle()

  const countries = useCountries().map((c) => c.countryIso)
  const [dropdownOpened, setDropdownOpened] = useState<string>('')

  if (!cycle) return null

  return (
    <div className="home-area-selector">
      <div className="home-area-selector__group">
        <img alt="" src="/img/iconGlobal.svg" />
        <Link
          className="home-link m-r"
          to={ClientRoutes.Assessment.Cycle.Country.Landing.getLink({
            countryIso: Global.WO,
            assessmentName: AssessmentNames.fra,
            cycleName: cycle.name,
          })}
        >
          {i18n.t<string>(`area.${Global.WO}.listName`)}
        </Link>
      </div>

      <div className="home-area-selector__group">
        <img alt="" src="/img/iconRegions.svg" />
        <div>{i18n.t<string>('common.regions')}</div>

        <MediaQuery minWidth={Breakpoints.laptop}>
          <DropdownAreas
            area={areas.regions}
            areaISOs={regionGroups}
            assessmentName={AssessmentNames.fra}
            cycleName={cycle.name}
            dropdownOpened={dropdownOpened}
            setDropdownOpened={setDropdownOpened}
          />
        </MediaQuery>
        <MediaQuery maxWidth={Breakpoints.laptop - 1}>
          <SelectMobile
            area={areas.regions}
            areaISOs={regionGroups}
            assessmentName={AssessmentNames.fra}
            cycleName={cycle.name}
          />
        </MediaQuery>
      </div>

      <div className="home-area-selector__group">
        <img alt="" src="/img/iconCountries.svg" />
        <div>{i18n.t<string>('common.countries')}</div>

        <MediaQuery minWidth={Breakpoints.laptop}>
          <DropdownAreas
            area={areas.countries}
            areaISOs={countries}
            assessmentName={AssessmentNames.fra}
            cycleName={cycle.name}
            dropdownOpened={dropdownOpened}
            setDropdownOpened={setDropdownOpened}
          />
        </MediaQuery>
        <MediaQuery maxWidth={Breakpoints.laptop - 1}>
          <SelectMobile
            area={areas.countries}
            areaISOs={countries}
            assessmentName={AssessmentNames.fra}
            cycleName={cycle.name}
          />
        </MediaQuery>
      </div>
    </div>
  )
}
export default AreaSelector
