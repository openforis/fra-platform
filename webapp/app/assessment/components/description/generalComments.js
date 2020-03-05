import React from 'react'
import PropTypes from 'prop-types'

import CommentableDescription from '@webapp/app/assessment/components/description/commentableDescription'
import useI18n from '@webapp/components/hooks/useI18n'

const GeneralComments = props => {
  const i18n = useI18n()

  return (
    <div className="fra-description__container">
      <CommentableDescription
        title={i18n.t('description.generalCommentsTitle')}
        name="generalComments"
        {...props}
      />
    </div>
  )
}

GeneralComments.propTypes = {
  section: PropTypes.string.isRequired
}

export default GeneralComments
