import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Country } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

type Props = {
  userAssessmentCycles: Array<{ assessment: Assessment; cycle: Cycle; countries: Array<Country> }>
}

const SelectAssessmentCycle = (props: Props) => {
  const { userAssessmentCycles } = props

  const { t } = useTranslation()

  const onChangeAssessmentCycle = useCallback(
    (/* e: React.ChangeEvent<HTMLSelectElement> */) => {
      // const [assessmentName, cycleName] = e.target.value.split(';;')
      // setSelectedAssessment(assessmentName)
      // setSelectedCycle(cycleName)
    },
    []
  )

  return (
    <select
      onChange={onChangeAssessmentCycle}
      // value={`${selectedAssessment};;${selectedCycle}`}
      // disabled={!enabled}
    >
      <option value="">{t('userManagement.placeholder')}</option>
      {userAssessmentCycles.map(({ assessment, cycle }) => {
        return (
          <option key={`${assessment.props.name}-${cycle.name}`} value={`${assessment.props.name};;${cycle.name}`}>
            {`${t(`${assessment.props.name}.labels.short`)} ${cycle.name}`}
          </option>
        )
      })}
    </select>
  )
}
export default SelectAssessmentCycle
