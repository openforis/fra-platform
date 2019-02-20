import React from 'react'
import { connect } from 'react-redux'
import assert from 'assert'

import CommentableDescription from '../description/commentableDescription'
import { isPrintingMode } from '../printAssessment/printAssessment'

const assertProps = props =>
  assert(
    props.countryIso &&
    props.section,
    'Some property is missing for DataSourceDescriptionAndComments'
  )

const NationalDataDescriptions = props => {
  assertProps(props)
  return <div className="fra-description__container">
    <h2 className="headline fra-description__group-header">{props.i18n.t('description.nationalData')}</h2>
    <CommentableDescription
      title={props.i18n.t('description.dataSourcesPlus')}
      name="dataSources"
      showAlertEmptyContent={!isPrintingMode()}
      showDashEmptyContent={isPrintingMode()}
      {...props}
    />
    <CommentableDescription
      title={props.i18n.t('description.nationalClassificationAndDefinitions')}
      name="nationalClassificationAndDefinitions"
      showAlertEmptyContent={!isPrintingMode()}
      showDashEmptyContent={isPrintingMode()}
      {...props}
    />
    <CommentableDescription
      title={props.i18n.t('description.originalData')}
      name="originalData"
      showAlertEmptyContent={!isPrintingMode()}
      showDashEmptyContent={isPrintingMode()}
      {...props}
    />
  </div>
}

const mapStateToProps = (state) => ({ i18n: state.user.i18n })

export default connect(mapStateToProps, {})(NationalDataDescriptions)
