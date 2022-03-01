import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Icon from '@client/components/Icon'
import { useUser } from '@client/store/user'
import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { OriginalDataPointActions } from '@client/store/pages/originalDataPoint'
import { useCountryIso } from '@client/hooks'

import { Props } from '../props'

const ExtentOfForest: React.FC<Props> = (props) => {
  const { disabled } = props

  const dispatch = useAppDispatch()
  const history = useHistory()
  const { i18n } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const user = useUser()

  if (!user) return null

  const handleClick = async () => {
    dispatch(
      OriginalDataPointActions.createOriginalDataPoint({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        countryIso,
        history,
      })
    )
  }

  return (
    <>
      <button
        type="button"
        className={`btn btn-primary no-print${disabled ? ' disabled' : ''}`}
        onClick={handleClick}
        style={{ marginRight: 16 }}
      >
        <Icon className="icon-sub icon-white" name="small-add" />
        {i18n.t('nationalDataPoint.addNationalDataPoint')}
      </button>
      <hr className="no-print" />
    </>
  )
}

export default ExtentOfForest
