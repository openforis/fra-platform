import React from 'react'

import { isPrintingMode, isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'

import CommentableDescription from '@webapp/components/description/commentableDescription'
import useI18n from '@webapp/components/hooks/useI18n'

const NationalDataDescriptions = props => {
  const i18n = useI18n()

  return !isPrintingOnlyTables() &&
    <div className="fra-description__container">
      <h2 className="headline fra-description__group-header">{i18n.t('description.nationalData')}</h2>
      <CommentableDescription
        title={i18n.t('description.dataSourcesPlus')}
        name="dataSources"
        showAlertEmptyContent={!isPrintingMode()}
        showDashEmptyContent={isPrintingMode()}
        {...props}
      />
      <CommentableDescription
        title={i18n.t('description.nationalClassificationAndDefinitions')}
        name="nationalClassificationAndDefinitions"
        showAlertEmptyContent={!isPrintingMode()}
        showDashEmptyContent={isPrintingMode()}
        {...props}
      />
      <CommentableDescription
        title={i18n.t('description.originalData')}
        name="originalData"
        showAlertEmptyContent={!isPrintingMode()}
        showDashEmptyContent={isPrintingMode()}
        {...props}
      />
    </div>
}

export default NationalDataDescriptions
