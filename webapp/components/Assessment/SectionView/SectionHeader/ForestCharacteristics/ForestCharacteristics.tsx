import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import * as ForestCharacteristicsState from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsState'
import { toggleUseOriginalDataPoints } from '@webapp/app/assessment/fra/sections/forestCharacteristics/actions'
import { useI18n, useUserInfo } from '@webapp/components/hooks'

import { Props } from '../props'

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { disabled } = props

  const dispatch = useDispatch()
  const userInfo = useUserInfo()
  const i18n = useI18n()
  const extentOfForestStateHasOdps = useSelector(ExtentOfForestState.hasOriginalDataPoints)
  const forestCharacteristicsHasOdps = useSelector(ForestCharacteristicsState.hasOriginalDataPoints)

  if (!userInfo || !extentOfForestStateHasOdps) {
    return null
  }
  return (
    <>
      <button
        type="button"
        className={`btn btn-${forestCharacteristicsHasOdps ? 'secondary' : 'primary'} no-print`}
        onClick={() => dispatch(toggleUseOriginalDataPoints(!forestCharacteristicsHasOdps))}
        disabled={disabled}
      >
        {forestCharacteristicsHasOdps
          ? i18n.t('forestCharacteristics.dontUseOriginalDataPoints')
          : i18n.t('forestCharacteristics.useOriginalDataPoints')}
      </button>
      <hr className="no-print" />
    </>
  )
}

export default ForestCharacteristics
