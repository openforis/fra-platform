import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MediaQuery from 'react-responsive'

import * as Assessment from '@common/assessment/assessment'
import { useI18n, useIsDataExportView } from '@webapp/components/hooks'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { toggleAssessmentLock } from '@webapp/app/assessment/actions'
import { useCanToggleLock } from '@webapp/store/assessment/hooks'
import { Breakpoints } from '@webapp/utils/breakpoints'

import Icon from '@webapp/components/icon'

type Props = {
  assessment: any
  lockEnabled: boolean
}
const Title = (props: Props) => {
  const { assessment, lockEnabled } = props
  const type = Assessment.getType(assessment)
  const deskStudy = Assessment.getDeskStudy(assessment)
  const dispatch = useDispatch()
  const i18n = useI18n()
  const isDataExportView = useIsDataExportView()
  const locked = useSelector(AssessmentState.isLocked(assessment))
  const canToggleLock = useCanToggleLock()
  return (
    <div className="nav-assessment-header__lock">
      <div>
        {(i18n as any).t(`assessment.${type}`)}
        {isDataExportView ? ` - ${(i18n as any).t('common.dataExport')}` : ''}
        {deskStudy && <div className="desk-study">({(i18n as any).t('assessment.deskStudy')})</div>}
      </div>

      {lockEnabled && (
        <MediaQuery minWidth={Breakpoints.laptop}>
          <button
            type="button"
            className="btn-s btn-secondary nav-assessment-header__btn-lock"
            disabled={!canToggleLock}
            onClick={() => dispatch(toggleAssessmentLock(type, !locked))}
          >
            <Icon name={locked ? 'lock-circle' : 'lock-circle-open'} className="icon-no-margin" />
          </button>
        </MediaQuery>
      )}
    </div>
  )
}
export default Title
