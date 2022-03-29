import React from 'react'

import { Users } from '@meta/user'
import { useUser } from '@client/store/user'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@client/store'
import {
  AssessmentSectionActions,
  useOriginalDataPointYears,
  useShowOriginalDatapoints,
} from '@client/store/pages/assessmentSection'
import { Props } from '../props'

const ExtentOfForest: React.FC<Props> = (props) => {
  const { sectionName } = props

  const user = useUser()
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  // const [printView, printOnlyTablesView] = [false, false] // TODO usePrintView()
  const odpYears = useOriginalDataPointYears()
  const hasOdps = Array.isArray(odpYears)
  const showOdps = useShowOriginalDatapoints()

  return (
    <>
      <h2 className="headline no-print">
        {i18n.t(`${sectionName}.${sectionName}`)}
        {Users.isAdministrator(user) && hasOdps && (
          <button
            type="button"
            className="btn-s btn-secondary"
            style={{ marginLeft: '12px' }}
            onClick={() => dispatch(AssessmentSectionActions.toggleShowOriginalDataPoint())}
          >
            {i18n.t(`extentOfForest.${showOdps ? 'hideNDPs' : 'showNDPs'}`)}
          </button>
        )}
      </h2>

      {/* {hasOdps && printView && !printOnlyTablesView && <OriginalDataPointsPrint section={sectionName} />} */}
    </>
  )
}

export default ExtentOfForest
