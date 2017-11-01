import './style.less'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { CommentableDescriptions } from '../../description/commentableDescription'
import GrowingStockTable from './growingStockTable'
import { rows } from './growingStock'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import { fetch, updateValue, updateValues } from './actions'

const sectionName = 'growingStock'

const GrowingStock = (props) => {
  const i18n = props.i18n

  return <div className='fra-view__content growing-stock-view'>
    <div className="fra-view__page-header">
      <h1 className="title">{i18n.t('growingStock.growingStock')}</h1>
      <DefinitionLink document="tad" anchor="2a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink document="faq" anchor="2a" title={i18n.t('definition.faqLabel')} lang={i18n.language} className="align-left"/>
      <div className="support-text">{i18n.t('growingStock.supportText')}</div>
    </div>
    <GrowingStockTable
      section={sectionName}
      header={props.i18n.t('growingStock.categoryHeader')}
      avgTableHeader={props.i18n.t('growingStock.avgTableHeader')}
      totalTableHeader={props.i18n.t('growingStock.totalTableHeader')}
      rows={rows}
      {...props}
    />
    <CommentableDescriptions
      section={sectionName}
      name={sectionName}
      countryIso={props.countryIso}
      i18n={i18n}
    />
  </div>
}
class GrowingStockView extends Component {

  componentWillMount () {
    this.fetch(this.props.match.params.countryIso)
    this.props.fetchLastSectionUpdateTimestamp(
      this.props.match.params.countryIso,
      sectionName
    )
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.fetch(next.match.params.countryIso)
  }

  fetch (countryIso) {
    this.props.fetch(countryIso)
  }

  render () {
    return R.isEmpty(this.props.growingStock)
      ? null
      : <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
        <GrowingStock
          areaValues={this.props.growingStock.areaValues}
          countryIso={this.props.match.params.countryIso}
          values={this.props.growingStock.values}
          {...this.props}/>
      </LoggedInPageTemplate>
  }

}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  growingStock: state.growingStock,
  'openCommentThread': state.review.openThread
})

export default connect(
  mapStateToProps,
  {
    fetch,
    updateValue,
    updateValues,
    fetchLastSectionUpdateTimestamp
  }
)(GrowingStockView)
