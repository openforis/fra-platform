import React from 'react'
import PropTypes from 'prop-types'

import { isPrintingMode, isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'

import CommentableDescription from '@webapp/app/assessment/components/section/components/descriptions/components/commentableDescription'
import useI18n from '@webapp/components/hooks/useI18n'

const NationalDataDescriptions = props => {
  const { section, disabled } = props
  const i18n = useI18n()

  return (
    !isPrintingOnlyTables() && (
      <div className="fra-description__container">
        <h2 className="headline fra-description__group-header">{i18n.t('description.nationalData')}</h2>
        <CommentableDescription
          title={i18n.t('description.dataSourcesPlus')}
          disabled={disabled}
          section={section}
          name="dataSources"
          showAlertEmptyContent={!isPrintingMode()}
          showDashEmptyContent={isPrintingMode()}
        />
        <CommentableDescription
          title={i18n.t('description.nationalClassificationAndDefinitions')}
          disabled={disabled}
          section={section}
          name="nationalClassificationAndDefinitions"
          showAlertEmptyContent={!isPrintingMode()}
          showDashEmptyContent={isPrintingMode()}
        />
        <CommentableDescription
          title={i18n.t('description.originalData')}
          disabled={disabled}
          section={section}
          name="originalData"
          showAlertEmptyContent={!isPrintingMode()}
          showDashEmptyContent={isPrintingMode()}
        />
      </div>
    )
  )
}

NationalDataDescriptions.propTypes = {
  section: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default NationalDataDescriptions
