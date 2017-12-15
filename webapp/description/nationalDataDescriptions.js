import React from 'react'
import CommentableDescription from './commentableDescription'
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
    <h3 className="subhead fra-description__group-header">National Data</h3>
   <CommentableDescription
      title={props.i18n.t('description.dataSourcesPlus')}
      name="dataSources"
      {...props}
    />
    <hr/>
    <CommentableDescription
      title={props.i18n.t('description.nationalClassificationAndDefinitions')}
      name="nationalClassificationAndDefinitions"
      {...props}
    />
    <hr/>
    <CommentableDescription
      title={props.i18n.t('description.originalData')}
      name="originalData"
      {...props}
    />
  </div>
}

const mapStateToProps = (state) => ({i18n: state.user.i18n})

export default connect(mapStateToProps, {})(NationalDataDescriptions)
