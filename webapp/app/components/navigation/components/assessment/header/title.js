import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import * as Assessment from '@common/assessment/assessment'

import { useI18n, useIsDataExportView } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { toggleAssessmentLock } from '@webapp/app/assessment/actions'
import { useCanToggleLock } from '@webapp/store/assessment/hooks'

const Title = (props) => {
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
        {i18n.t(`assessment.${type}`)}
        {isDataExportView ? ` - ${i18n.t('common.dataExport')}` : ''}
        {deskStudy && <div className="desk-study">({i18n.t('assessment.deskStudy')})</div>}
      </div>

      {lockEnabled && (
        <button
          type="button"
          className="btn-s btn-secondary nav-assessment-header__btn-lock"
          disabled={!canToggleLock}
          onClick={() => dispatch(toggleAssessmentLock(type, !locked))}
        >
          <Icon name={locked ? 'lock-circle' : 'lock-circle-open'} className="icon-no-margin" />
        </button>
      )}
    </div>
  )
}

Title.propTypes = {
  assessment: PropTypes.object.isRequired,
  lockEnabled: PropTypes.bool.isRequired,
}

export default Title
