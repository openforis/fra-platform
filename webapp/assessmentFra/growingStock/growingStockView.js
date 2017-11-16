import './style.less'
import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'
import { connect } from 'react-redux'
import * as R from 'ramda'
import clipboard from 'clipboard-polyfill'
import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { CommentableDescriptions } from '../../description/commentableDescription'
import GrowingStockTable from './growingStockTable'
import { rows, avgRows, getGrowingStockValues } from './growingStock'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import { fetch, updateValue, updateValues } from './actions'
import { toFixed } from '../../../common/bignumberUtils'

const sectionName = 'growingStock'
const mapIndexed = R.addIndex(R.map)

const GrowingStock = (props) => {
  const i18n = props.i18n

  const avgRows = [
    'naturallyRegeneratingForestAvg',
    'plantedForestAvg',
    'plantationForestAvg',
    'otherPlantedForestAvg'
  ]

  const ClipboardTable = ({tableValues}) =>
    <table>
      <tbody>
        {mapIndexed((row, i) =>
          <tr key={i}>
            {mapIndexed((value, i) =>
              <td key={i}> {toFixed(value)} </td>
            , row)}
          </tr>
        , tableValues)}
      </tbody>
    </table>

  const copyTableAsHtml = (growingStock, rowsSpecs) => {
    const transposedGsValues = getGrowingStockValues(growingStock, rowsSpecs)
    const htmlTable = ReactDOMServer.renderToString(<ClipboardTable tableValues={transposedGsValues}/>)
    const dataTransfer = new clipboard.DT()
    dataTransfer.setData("text/plain", i18n.t('growingStock.growingStock'))
    dataTransfer.setData("text/html", htmlTable)
    clipboard.write(dataTransfer)
  }

  return <div className='fra-view__content growing-stock-view'>
    <div className="fra-view__page-header">
      <h1 className="title">{i18n.t('growingStock.growingStock')}</h1>
      <DefinitionLink document="tad" anchor="2a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink document="faq" anchor="2a" title={i18n.t('definition.faqLabel')} lang={i18n.language} className="align-left"/>
    </div>
    <div className="fra-view__section-header">
      <div className="growing-stock-view__support-text align-left">{i18n.t('growingStock.supportText')}</div>
      <button
        className="btn-s btn-secondary"
        onClick={() => copyTableAsHtml(props.values, avgRows)}>
          {i18n.t('growingStock.copyToClipboard')}
      </button>
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
  openCommentThread: state.review.openThread,
  extentOfForest: state.extentOfForest
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
