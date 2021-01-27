import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as Assessment from '@common/assessment/assessment'
import { useI18n, useIsDataExportView } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { toggleAssessmentLock } from '@webapp/app/assessment/actions'
import { useCanToggleLock } from '@webapp/store/assessment/hooks'

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
        <button
          type="button"
          className="btn-s btn-secondary nav-assessment-header__btn-lock"
          disabled={!canToggleLock}
          onClick={() => dispatch(toggleAssessmentLock(type, !locked))}
        >
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: string; className: string; }' is not... Remove this comment to see the full error message */}
          <Icon name={locked ? 'lock-circle' : 'lock-circle-open'} className="icon-no-margin" />
        </button>
      )}
    </div>
  )
}
export default Title
