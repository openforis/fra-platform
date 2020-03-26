import React from 'react'
import PropTypes from 'prop-types'

import CommentableDescription from '@webapp/app/components/description/commentableDescription'
import useI18n from '@webapp/components/hooks/useI18n'

const GeneralComments = ({ section }) => {
  const i18n = useI18n()

  return (
    <div className="fra-description__container">
      <CommentableDescription
        section={section}
        title={i18n.t('description.generalCommentsTitle')}
        name="generalComments"
      />
    </div>
  )
}

GeneralComments.propTypes = {
  section: PropTypes.string.isRequired,
}

export default GeneralComments
