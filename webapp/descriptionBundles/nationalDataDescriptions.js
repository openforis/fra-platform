import React from 'react'
import CommentableDescription from '../description/commentableDescription'
import { connect } from 'react-redux'
import assert from 'assert'

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
      showAlertEmptyContent={true}
      {...props}
    />
    <CommentableDescription
      title={props.i18n.t('description.nationalClassificationAndDefinitions')}
      name="nationalClassificationAndDefinitions"
      showAlertEmptyContent={true}
      {...props}
    />
    <CommentableDescription
      title={props.i18n.t('description.originalData')}
      name="originalData"
      showAlertEmptyContent={true}
      {...props}
    />
  </div>
}

const mapStateToProps = (state) => ({i18n: state.user.i18n})

export default connect(mapStateToProps, {})(NationalDataDescriptions)
