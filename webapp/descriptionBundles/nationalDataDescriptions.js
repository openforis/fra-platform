import React from 'react'
import { connect, useSelector } from 'react-redux'

import CommentableDescription from '@webapp/description/commentableDescription'
import { isPrintingMode, isPrintingOnlyTables } from '@webapp/loggedin/printAssessment/printAssessment'
import * as AppState from '@webapp/app/appState'
import * as UserState from '@webapp/user/userState'

const NationalDataDescriptions = props => {
  const countryIso = useSelector(AppState.getCountryIso)
  return !isPrintingOnlyTables() &&
    <div className="fra-description__container">
      <h2 className="headline fra-description__group-header">{props.i18n.t('description.nationalData')}</h2>
      <CommentableDescription
        countryIso={countryIso}
        title={props.i18n.t('description.dataSourcesPlus')}
        name="dataSources"
        showAlertEmptyContent={!isPrintingMode()}
        showDashEmptyContent={isPrintingMode()}
        {...props}
      />
      <CommentableDescription
        countryIso={countryIso}
        title={props.i18n.t('description.nationalClassificationAndDefinitions')}
        name="nationalClassificationAndDefinitions"
        showAlertEmptyContent={!isPrintingMode()}
        showDashEmptyContent={isPrintingMode()}
        {...props}
      />
      <CommentableDescription
        countryIso={countryIso}
        title={props.i18n.t('description.originalData')}
        name="originalData"
        showAlertEmptyContent={!isPrintingMode()}
        showDashEmptyContent={isPrintingMode()}
        {...props}
      />
    </div>
}

const mapStateToProps = (state) => ({i18n: UserState.getI18n(state)})

export default connect(mapStateToProps, {})(NationalDataDescriptions)
