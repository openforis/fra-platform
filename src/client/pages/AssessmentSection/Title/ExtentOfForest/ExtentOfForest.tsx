import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import {
  AssessmentSectionActions,
  useOriginalDataPointYears,
  useShowOriginalDatapoints,
} from '@client/store/pages/assessmentSection'
import { useUser } from '@client/store/user'
import { useIsPrint } from '@client/hooks/useIsPath'
import OriginalDataPointsPrint from '@client/pages/AssessmentPrint/OriginalDataPointsPrint'

import { Props } from '../props'

const ExtentOfForest: React.FC<Props> = (props) => {
  const { subSection } = props
  const user = useUser()
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const { print, onlyTables } = useIsPrint()
  const odpYears = useOriginalDataPointYears()
  const hasOdps = Array.isArray(odpYears)
  const showOdps = useShowOriginalDatapoints()

  const sectionName = subSection.props.name

  const onClick = useCallback(() => {
    dispatch(AssessmentSectionActions.toggleShowOriginalDataPoint())
  }, [dispatch])

  return (
    <>
      <h2 className="headline no-print">
        {i18n.t<string>(`${sectionName}.${sectionName}`)}
        {Users.isAdministrator(user) && hasOdps && (
          <button type="button" className="btn-s btn-secondary btn-toggle-odp" onClick={onClick}>
            {i18n.t<string>(`extentOfForest.${showOdps ? 'hideNDPs' : 'showNDPs'}`)}
          </button>
        )}
      </h2>

      {hasOdps && print && !onlyTables && <OriginalDataPointsPrint sectionName={sectionName} />}
    </>
  )
}

export default ExtentOfForest
