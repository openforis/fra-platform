import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { AssessmentName } from '@meta/assessment'

import Icon from '@client/components/Icon'

import { areas } from '../AreaSelector'

type Props = {
  area: string
  areaISOs: Array<any>
  assessmentName: AssessmentName
}

const SelectMobile: React.FC<Props> = (props) => {
  const { area, areaISOs, assessmentName } = props

  const navigate = useNavigate()
  const { i18n } = useTranslation()

  return (
    <div className="country-select__icon">
      <select
        className="btn-country-select"
        onChange={(event) => {
          navigate(
            ClientRoutes.Assessment.Root.getLink({
              countryIso: event.target.value,
              assessmentName,
              cycleName: ':cycleName',
            })
          )
        }}
      >
        <option>- {i18n.t<string>('common.select')}</option>
        {areas.regions === area
          ? Object.entries(areaISOs).map(([_, { regions }]) =>
              // @ts-ignore
              regions.map(({ regionCode }) => (
                <option key={regionCode} value={regionCode}>
                  {i18n.t<string>(`area.${regionCode}.listName`)}
                </option>
              ))
            )
          : areaISOs.map((iso) => (
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
