import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Users } from '@core/auth'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import { toggleOdps } from '@webapp/app/assessment/fra/sections/extentOfForest/actions'
import { useI18n, usePrintView, useUserInfo } from '@webapp/components/hooks'

import { OriginalDataPointsPrint } from '@webapp/components/OriginalDataPoint'
import { Props } from '../props'

const ExtentOfForest: React.FC<Props> = (props) => {
  const { sectionName } = props

  const dispatch = useDispatch()
  const userInfo = useUserInfo()
  const i18n = useI18n()
  const [printView, printOnlyTablesView] = usePrintView()
  const hasOdps = useSelector(ExtentOfForestState.hasOriginalDataPoints)
  const showOdps = useSelector(ExtentOfForestState.showOriginalDataPoints)

  return (
    <>
      <h2 className="headline no-print">
        {i18n.t(`${sectionName}.${sectionName}`)}
        {Users.isAdministrator(userInfo) && hasOdps && (
          <button
            type="button"
            className="btn-s btn-secondary"
            style={{ marginLeft: '12px' }}
            onClick={() => dispatch(toggleOdps(!showOdps))}
          >
            {i18n.t(`extentOfForest.${showOdps ? 'hideNDPs' : 'showNDPs'}`)}
          </button>
        )}
      </h2>

      {hasOdps && printView && !printOnlyTablesView && <OriginalDataPointsPrint section={sectionName} />}
    </>
  )
}

export default ExtentOfForest
