import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MediaQuery from 'react-responsive'

import { Assessment } from '@core/assessment'
import { useI18n, useIsDataExportView } from '../../../../../hooks'
import * as AssessmentState from '../../../../../app/assessment/assessmentState'
import { toggleAssessmentLock } from '../../../../../app/assessment/actions'
import { useCanToggleLock } from '../../../../../store/assessment/hooks'
import { Breakpoints } from '../../../../../utils/breakpoints'

import Icon from '../../../../../components/icon'

type Props = {
  assessment: Assessment
  lockEnabled: boolean
}

const Title: React.FC<Props> = (props) => {
  const { assessment, lockEnabled } = props

  const dispatch = useDispatch()
  const i18n = useI18n()
  const isDataExportView = useIsDataExportView()
  const locked = useSelector(AssessmentState.isLocked(assessment))
  const canToggleLock = useCanToggleLock()

  const { deskStudy, type } = assessment

  return (
    <div className="nav-assessment-header__lock">
      <div>
        {i18n.t(`assessment.${type}`)}
        {isDataExportView ? ` - ${i18n.t('common.dataExport')}` : ''}
        {deskStudy && <div className="desk-study">({i18n.t('assessment.deskStudy')})</div>}
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
