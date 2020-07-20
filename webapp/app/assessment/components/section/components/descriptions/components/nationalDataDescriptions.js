import React from 'react'
import PropTypes from 'prop-types'

import useI18n from '@webapp/components/hooks/useI18n'

import CommentableDescription from './commentableDescription'

const NationalDataDescriptions = (props) => {
  const { section, disabled, showAlertEmptyContent, showDashEmptyContent } = props
  const i18n = useI18n()

  return (
    <div className="fra-description__container">
      <h2 className="headline fra-description__group-header">{i18n.t('description.nationalData')}</h2>
      <CommentableDescription
        title={i18n.t('description.dataSourcesPlus')}
        disabled={disabled}
        section={section}
        name="dataSources"
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent}
      />
      <CommentableDescription
        title={i18n.t('description.nationalClassificationAndDefinitions')}
        disabled={disabled}
        section={section}
        name="nationalClassificationAndDefinitions"
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent}
      />
      <CommentableDescription
        title={i18n.t('description.originalData')}
        disabled={disabled}
        section={section}
        name="originalData"
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent}
      />
    </div>
  )
}

NationalDataDescriptions.propTypes = {
  section: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  showAlertEmptyContent: PropTypes.bool,
  showDashEmptyContent: PropTypes.bool,
}

NationalDataDescriptions.defaultProps = {
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
}

export default NationalDataDescriptions
