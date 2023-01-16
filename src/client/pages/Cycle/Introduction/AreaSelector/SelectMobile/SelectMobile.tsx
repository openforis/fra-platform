import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { CountryIso, RegionGroup } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

import Icon from '@client/components/Icon'

import { areas } from '../AreaSelector'

type Props = {
  area: string
  areaISOs: string[] | Record<string, RegionGroup>
  assessmentName: AssessmentName
  cycleName: string
}

const SelectMobile: React.FC<Props> = (props) => {
  const { area, areaISOs, assessmentName, cycleName } = props

  const navigate = useNavigate()
  const { i18n } = useTranslation()

  return (
    <div className="country-select__icon">
      <select
        className="btn-country-select"
        onChange={(event) => {
          navigate(
            ClientRoutes.Assessment.Cycle.Country.Landing.getLink({
              countryIso: event.target.value as CountryIso,
              assessmentName,
              cycleName,
            })
          )
        }}
      >
        <option>- {i18n.t<string>('common.select')}</option>
        {areas.regions === area
          ? Object.entries(areaISOs).map(([_, { regions }]) =>
              regions.map(({ regionCode }: any) => (
                <option key={regionCode} value={regionCode}>
                  {i18n.t<string>(`area.${regionCode}.listName`)}
                </option>
              ))
            )
          : Array.isArray(areaISOs) &&
            areaISOs.map((iso) => (
              <option key={iso} value={iso}>
                {i18n.t<string>(`area.${iso}.listName`)}
              </option>
            ))}
      </select>
      <Icon name="small-down" className="select__icon" />
    </div>
  )
}

export default SelectMobile
