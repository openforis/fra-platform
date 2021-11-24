import React from 'react'
import { useHistory } from 'react-router-dom'

import { useI18n } from '../../../../../hooks'
import * as BasePaths from '../../../../../main/basePaths'

import Icon from '../../../../../components/icon'

import { areas } from '../AreaSelector'

type Props = {
  area: string
  areaISOs: Array<any>
  assessmentType: string
}

const SelectMobile: React.FC<Props> = (props) => {
  const { area, areaISOs, assessmentType } = props

  const history = useHistory()
  const i18n = useI18n()

  return (
    <div className="country-select__icon">
      <select
        className="btn-country-select"
        onChange={(event) => {
          history.push(BasePaths.getAssessmentHomeLink(event.target.value, assessmentType))
        }}
      >
        <option>- {i18n.t('common.select')}</option>
        {areas.regions === area
          ? areaISOs.map(({ regions }) =>
              // @ts-ignore
              regions.map(({ regionCode }) => (
                <option key={regionCode} value={regionCode}>
                  {i18n.t(`area.${regionCode}.listName`)}
                </option>
              ))
            )
          : areaISOs.map((iso) => (
              <option key={iso} value={iso}>
                {i18n.t(`area.${iso}.listName`)}
              </option>
            ))}
      </select>
      <Icon name="small-down" className="select__icon" />
    </div>
  )
}

export default SelectMobile
