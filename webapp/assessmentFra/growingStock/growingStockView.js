import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetch } from './actions'

const sectionName = 'growingStock'
const mapIndexed = R.addIndex(R.map)

const GrowingStock = (props) => {
  const i18n = props.i18n
  console.log(props)
  return <div className='fra-view__content growing-stock-view'>
    <div className="fra-view__page-header">
      <h1 className="title">{i18n.t('growingStock.growingStock')}</h1>
      <div className="fra-view__header-secondary-content">
        <DefinitionLink document="tad" anchor="2a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
        <DefinitionLink document="faq" anchor="2a" title={i18n.t('definition.faqLabel')} lang={i18n.language}/>
        <p className="support-text">{i18n.t('growingStock.supportText')}</p>
      </div>
    </div>
  </div>
}

class GrowingStockView extends React.Component {
  componentWillMount () {
    const countryIso = this.props.match.params.countryIso
    this.fetch(countryIso)
    this.props.fetchLastSectionUpdateTimestamp(countryIso, sectionName)
  }

  fetch (countryIso) {
    this.props.fetch(countryIso)
  }

  render () {
    return <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
      <GrowingStock
        countryIso={this.props.match.params.countryIso}
        {...this.props}/>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state =>
  ({
    growingStockTotal: state.growingStock.growingStockTotal,
    growingStockAvg: state.growingStock.growingStockAvg,
    focEofArea: state.growingStock.focEofArea,
    openCommentThread: state.review.openThread,
    i18n: state.user.i18n
  })

export default connect(
    mapStateToProps,
    {
      fetch,
      fetchLastSectionUpdateTimestamp
    }
  )(GrowingStockView)
