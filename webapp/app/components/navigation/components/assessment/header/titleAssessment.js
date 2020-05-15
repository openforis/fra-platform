import React from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'

const AssessmentTitle = (props) => {
  const { type, deskStudy } = props
  const i18n = useI18n()
  return (
    <div>
      {i18n.t(`assessment.${type}`)}
      {deskStudy && <div className="desk-study">({i18n.t('assessment.deskStudy')})</div>}
    </div>
  )
}

AssessmentTitle.defaultProps = {
  deskStudy: false,
}
AssessmentTitle.propTypes = {
  type: PropTypes.string.isRequired,
  deskStudy: PropTypes.bool,
}

export default AssessmentTitle
