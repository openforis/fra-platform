import React from 'react'
import { useUser } from '@client/store/user'
import { useTranslation } from 'react-i18next'
import { Props } from '../props'

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { disabled } = props

  const user = useUser()
  const i18n = useTranslation()
  const extentOfForestStateHasOdps = false // TODO? useSelector(ExtentOfForestState.hasOriginalDataPoints)
  const forestCharacteristicsHasOdps = false // TODO?useSelector(ForestCharacteristicsState.hasOriginalDataPoints)

  if (!user || !extentOfForestStateHasOdps) {
    return null
  }
  return (
    <>
      <button
        type="button"
        className={`btn btn-${forestCharacteristicsHasOdps ? 'secondary' : 'primary'} no-print`}
        // onClick={() => dispatch(toggleUseOriginalDataPoints(!forestCharacteristicsHasOdps))}
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
