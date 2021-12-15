import React from 'react'
import { useHistory } from 'react-router-dom'

import Icon from '@client/components/Icon'

import { useTranslation } from 'react-i18next'
import { BasePaths } from '@client/basePaths'
import { AssessmentName } from '@meta/assessment'
import { areas } from '../AreaSelector'

type Props = {
  area: string
  areaISOs: Array<any>
  assessmentType: AssessmentName
}

const SelectMobile: React.FC<Props> = (props) => {
  const { area, areaISOs, assessmentType } = props

  const history = useHistory()
  const { i18n } = useTranslation()

  return (
    <div className="country-select__icon">
      <select
        className="btn-country-select"
        onChange={(event) => {
          history.push(BasePaths.Assessment.root(event.target.value, assessmentType))
        }}
      >
        <option>- {i18n.t('common.select')}</option>
        {areas.regions === area
          ? Object.entries(areaISOs).map(([_, { regions }]) =>
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
