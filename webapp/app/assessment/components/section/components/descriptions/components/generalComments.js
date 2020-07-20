import React from 'react'
import PropTypes from 'prop-types'

import CommentableDescription from '@webapp/app/assessment/components/section/components/descriptions/components/commentableDescription'
import useI18n from '@webapp/components/hooks/useI18n'

const GeneralComments = (props) => {
  const { section, disabled } = props
  const i18n = useI18n()

  return (
    <div className="fra-description__container">
      <CommentableDescription
        section={section}
        title={i18n.t('description.generalCommentsTitle')}
        name="generalComments"
        disabled={disabled}
      />
    </div>
  )
}

GeneralComments.propTypes = {
  section: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default GeneralComments
