import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetch, changeAvgValue, changeTotalValue, pasteAvgValue, pasteTotalValue } from './actions'
import { ThousandSeparatedDecimalInput } from '../../reusableUiComponents/thousandSeparatedDecimalInput'
import { sum, div, mul, formatNumber } from '../../../common/bignumberUtils'
import ReviewIndicator from '../../review/reviewIndicator'
import { readPasteClipboard } from '../../utils/copyPasteUtil'

const sectionName = 'growingStock'
const mapIndexed = R.addIndex(R.map)
const years = [1990, 2000, 2010, 2015, 2020]

const InputRowAvg = (props) => {
  const thClassName = props.subCategory ? 'fra-table__subcategory-cell' : 'fra-table__category-cell'
  const target = props.row + 'Avg'
  return <tr>
    <th className={thClassName}>{props.i18n.t(`growingStock.${props.row}`)}</th>
    {
      R.map(year => {
        const value = R.path([year, props.row], props.avgTable)
        return <td className="fra-table__cell" key={year}>
          <ThousandSeparatedDecimalInput
            numberValue={value}
            onPaste={e => props.pasteAvgValue(props.countryIso, year, props.row, readPasteClipboard(e, 'decimal'))}
            onChange={e => props.changeAvgValue(props.countryIso, year, props.row, e.target.value)}/>
        </td>
      }, years)
    }
    <td className="fra-table__row-anchor-cell">
      <div className="fra-table__review-indicator-anchor">
        <ReviewIndicator
          key={target}
          section={sectionName}
          title={props.i18n.t(`growingStock.${props.row}`)}
          target={[target]}
          countryIso={props.countryIso}/>
      </div>
    </td>
  </tr>
}

const InputRowTotal = (props) => {
  const thClassName = props.subCategory ? 'fra-table__subcategory-cell' : 'fra-table__category-cell'
  const target = props.row + 'Total'
  return <tr>
    <th className={thClassName}>{props.i18n.t(`growingStock.${props.row}`)}</th>
    {
      R.map(year => {
        const value = R.path([year, props.row], props.totalTable)
        return <td className="fra-table__cell" key={year}>
          <ThousandSeparatedDecimalInput
            numberValue={value}
            onPaste={e => props.pasteTotalValue(props.countryIso, year, props.row, readPasteClipboard(e, 'decimal'))}
            onChange={e => props.changeTotalValue(props.countryIso, year, props.row, e.target.value)}/>
        </td>
      }, years)
    }
    <td className="fra-table__row-anchor-cell">
      <div className="fra-table__review-indicator-anchor">
        <ReviewIndicator
          key={target}
          section={sectionName}
          title={props.i18n.t(`growingStock.${props.row}`)}
          target={[target]}
          countryIso={props.countryIso}/>
      </div>
    </td>
  </tr>
}

const SumRowAvg = (props) => {
  const target = props.row + 'Avg'
  return <tr>
    <th className="fra-table__header-cell-left">{props.i18n.t(`growingStock.${props.row}`)}</th>
    {
      R.map(year => {
        const yearData = R.path([year], props.totalTable) || {}
        const value = R.values(R.pick(props.sumFields, yearData)) || null
        const baseYearData = R.path([year], props.baseTable) || {}
        const baseValue = R.values(R.pick(props.baseFields, baseYearData)) || null
        const avg = div(mul(sum(value), 1000), sum(baseValue))
        return <td className="fra-table__calculated-cell" key={year}>
          {formatNumber(avg)}
        </td>
      }, years)
    }
    <td className="fra-table__row-anchor-cell">
      <div className="fra-table__review-indicator-anchor">
        <ReviewIndicator
          key={target}
          section={sectionName}
          title={props.i18n.t(`growingStock.${props.row}`)}
          target={[target]}
          countryIso={props.countryIso}/>
      </div>
    </td>
  </tr>
}

const SumRowTotal = (props) => {
  const target = props.row + 'Total'
  return <tr>
    <th className="fra-table__header-cell-left">{props.i18n.t(`growingStock.${props.row}`)}</th>
    {
      R.map(year => {
        const yearData = R.path([year], props.totalTable) || {}
        const value = R.values(R.pick(props.sumFields, yearData)) || null
        return <td className="fra-table__calculated-cell" key={year}>
          {formatNumber(sum(value))}
        </td>
      }, years)
    }
    <td className="fra-table__row-anchor-cell">
      <div className="fra-table__review-indicator-anchor">
        <ReviewIndicator
          key={target}
          section={sectionName}
          title={props.i18n.t(`growingStock.${props.row}`)}
          target={[target]}
          countryIso={props.countryIso}/>
      </div>
    </td>
  </tr>
}

const GrowingStock = (props) => {
  const i18n = props.i18n
  const countryIso = props.countryIso
  const avgTable = R.path(['avgTable'], props)
  const totalTable = R.path(['totalTable'], props)

  if (R.isNil(avgTable) || R.isNil(totalTable)) return null

  return <div className='fra-view__content growing-stock-view'>
    <h2 className="headline">{i18n.t('growingStock.growingStock')}</h2>
    <div className="fra-view__section-toolbar">
      <DefinitionLink className="margin-right-big" document="tad" anchor="2a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink className="align-left" document="faq" anchor="2a" title={i18n.t('definition.faqLabel')} lang={i18n.language}/>
      <p className="support-text">{i18n.t('growingStock.supportText')}</p>
    </div>
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table">
          <thead>
            <tr>
              <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('growingStock.categoryHeader')}</th>
              <th className="fra-table__header-cell" colSpan="5">{i18n.t('growingStock.avgTableHeader')}</th>
            </tr>
            <tr>
              {R.map(year => <th className="fra-table__header-cell" key={year}>{year}</th>, years)}
            </tr>
          </thead>
          <tbody>
            <InputRowAvg
              row="naturallyRegeneratingForest"
              {...props}
            />
            <SumRowAvg
              row="plantedForest"
              sumFields={['plantationForest', 'otherPlantedForest']}
              baseFields={['plantationForestArea', 'otherPlantedForestArea']}
              {...props}
            />
            <InputRowAvg
              row="plantationForest"
              subCategory={true}
              {...props}
            />
            <InputRowAvg
              row="otherPlantedForest"
              subCategory={true}
              {...props}
            />
            <SumRowAvg
              row="totalForest"
              sumFields={['naturallyRegeneratingForest', 'plantationForest', 'otherPlantedForest']}
              baseFields={['forestArea']}
              {...props}
            />
            <InputRowAvg
              row="otherWoodedLand"
              {...props}
            />
          </tbody>
        </table>
      </div>
    </div>
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table">
          <thead>
            <tr>
              <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('growingStock.categoryHeader')}</th>
              <th className="fra-table__header-cell" colSpan="5">{i18n.t('growingStock.totalTableHeader')}</th>
            </tr>
            <tr>
              {R.map(year => <th className="fra-table__header-cell" key={year}>{year}</th>, years)}
            </tr>
          </thead>
          <tbody>
            <InputRowTotal
              row="naturallyRegeneratingForest"
              {...props}
            />
            <SumRowTotal
              row="plantedForest"
              sumFields={['plantationForest', 'otherPlantedForest']}
              {...props}
            />
            <InputRowTotal
              row="plantationForest"
              subCategory={true}
              {...props}
            />
            <InputRowTotal
              row="otherPlantedForest"
              subCategory={true}
              {...props}
            />
            <SumRowTotal
              row="totalForest"
              sumFields={['naturallyRegeneratingForest', 'plantationForest', 'otherPlantedForest']}
              {...props}
            />
            <InputRowTotal
              row="otherWoodedLand"
              {...props}
            />
          </tbody>
        </table>
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
    totalTable: state.growingStock.totalTable,
    avgTable: state.growingStock.avgTable,
    baseTable: state.growingStock.baseTable,
    openCommentThread: state.review.openThread,
    i18n: state.user.i18n
  })

export default connect(
    mapStateToProps,
    {
      fetch,
      changeTotalValue,
      changeAvgValue,
      pasteAvgValue,
      pasteTotalValue,
      fetchLastSectionUpdateTimestamp
    }
  )(GrowingStockView)
