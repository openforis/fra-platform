import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'
import { Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useCycle } from 'client/store/assessment'
import { useOriginalDataPointYears } from 'client/store/data'
import { AssessmentSectionActions, useShowOriginalDatapoints } from 'client/store/ui/assessmentSection'
import { useUser } from 'client/store/user'
import { useIsPrint } from 'client/hooks/useIsPath'
import OriginalDataPointsPrint from 'client/pages/Print/OriginalDataPointsPrint'

import { Props } from '../props'

const ExtentOfForest: React.FC<Props> = (props) => {
  const { subSection } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const user = useUser()
  const cycle = useCycle()
  const { print, onlyTables } = useIsPrint()
  const odpYears = useOriginalDataPointYears()
  const showOdps = useShowOriginalDatapoints()

  const hasOdps = Array.isArray(odpYears)
  const sectionName = subSection.props.name

  const onClick = useCallback(() => {
    dispatch(AssessmentSectionActions.toggleShowOriginalDataPoint())
  }, [dispatch])

  return (
    <>
      <h2 className="headline no-print">
        {Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })}
        {Users.isAdministrator(user) && hasOdps && (
          <button type="button" className="btn-s btn-secondary btn-toggle-odp" onClick={onClick}>
            {t(`extentOfForest.${showOdps ? 'hideNDPs' : 'showNDPs'}`)}
          </button>
        )}
      </h2>

      {hasOdps && print && !onlyTables && <OriginalDataPointsPrint sectionName={sectionName} />}
    </>
  )
}

export default ExtentOfForest
