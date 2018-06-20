import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import ReactDOMServer from 'react-dom/server'
import clipboard from 'clipboard-polyfill'

import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import { fetch, changeAvgValue, changeTotalValue, pasteAvgValue, pasteTotalValue } from './actions'
import { div, greaterThan, sub, toFixed, add, defaultTo0 } from '../../../common/bignumberUtils'
import { readPasteClipboard } from '../../utils/copyPasteUtil'

import { ThousandSeparatedDecimalInput } from '../../reusableUiComponents/thousandSeparatedDecimalInput'
import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import ReviewIndicator from '../../review/reviewIndicator'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '../../descriptionBundles/analysisDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'

import defaultYears from '../../../server/eof/defaultYears'
import { isFRA2020SectionEditDisabled } from '../../utils/assessmentAccess'

const sectionName = 'growingStock'
const mapIndexed = R.addIndex(R.map)

const InputRowAvg = (props) => {
  const {isEditDataDisabled} = props
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
            onChange={e => props.changeAvgValue(props.countryIso, year, props.row, e.target.value)}
            disabled={isEditDataDisabled}/>
        </td>
      }, defaultYears)
    }
    <td className="fra-table__row-anchor-cell">
      <div className="fra-table__review-indicator-anchor">
        {
          isEditDataDisabled
            ? null
            : <ReviewIndicator key={target}
                               section={sectionName}
                               title={props.i18n.t(`growingStock.${props.row}`)}
                               target={[target]}
                               countryIso={props.countryIso}/>
        }
      </div>
    </td>
  </tr>
}

const InputRowTotal = (props) => {
  const {countryIso, totalTable, subCategory, row, validator, isEditDataDisabled} = props

  const thClassName = subCategory ? 'fra-table__subcategory-cell' : 'fra-table__category-cell'
  const target = row + 'Total'

  return <tr>
    <th className={thClassName}>{props.i18n.t(`growingStock.${row}`)}</th>
    {
      R.map(year => {
        const value = R.path([year, row], totalTable)
        const valid = validator ? validator(props, year, row).valid : true
        return <td className={`fra-table__cell${valid ? '' : ' error'}`} key={year}>
          <ThousandSeparatedDecimalInput
            numberValue={value}
            onPaste={e => props.pasteTotalValue(countryIso, year, row, readPasteClipboard(e, 'decimal'))}
            onChange={e => props.changeTotalValue(countryIso, year, row, e.target.value)}
            disabled={isEditDataDisabled}/>
        </td>
      }, defaultYears)
    }
    <td className="fra-table__row-anchor-cell">
      <div className="fra-table__review-indicator-anchor">
        {
          isEditDataDisabled
            ? null
            : <ReviewIndicator key={target}
                               section={sectionName}
                               title={props.i18n.t(`growingStock.${props.row}`)}
                               target={[target]}
                               countryIso={props.countryIso}/>
        }
      </div>
    </td>
  </tr>
}

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

const copyTableAsHtml = (tableData, i18n) => {
  const tableValues = R.pipe(
    R.values,
    R.map(y => R.omit(['year', 'otherWoodedLand', 'forest'], y)),
    R.map(R.values),
    R.transpose,
  )(tableData)
  const htmlTable = ReactDOMServer.renderToString(<ClipboardTable tableValues={tableValues}/>)
  const dataTransfer = new clipboard.DT()
  dataTransfer.setData('text/plain', i18n.t('growingStock.growingStock'))
  dataTransfer.setData('text/html', htmlTable)
  clipboard.write(dataTransfer)
}

export const plantedForestSubCategoryValidator = (props, year, row) => {
  const {totalTable} = props
  const totalValue = R.path([year, 'plantedForest'], totalTable)
  const sumOfPartsProp = prop => defaultTo0(R.path([year, prop], totalTable))
  const sumOfParts = add(sumOfPartsProp('plantationForest'), sumOfPartsProp('otherPlantedForest'))
  const value = R.path([year, row], totalTable)
  if (R.isNil(value) || R.isNil(sumOfParts) || R.isNil(totalValue)) return {valid: true}

  const tolerance = -1
  const difference = sub(totalValue, sumOfParts)
  const valid = greaterThan(difference, tolerance)
  return {
    valid: valid,
    message: valid
      ? null
      : props.i18n.t('generalValidation.subCategoryExceedsParent')
  }
}

const GrowingStock = (props) => {
  const {i18n, countryIso, avgTable, totalTable, isEditDataDisabled} = props

  if (R.isNil(avgTable) || R.isNil(totalTable)) return null

  return <div className='fra-view__content'>
    <NationalDataDescriptions section={sectionName} countryIso={countryIso} disabled={isEditDataDisabled}/>
    <AnalysisDescriptions section={sectionName} countryIso={countryIso} disabled={isEditDataDisabled}/>
    <h2 className="headline">
      <span className="only-print">2a </span>{i18n.t('growingStock.growingStock')}
    </h2>
    <div className="fra-view__section-toolbar">
      <DefinitionLink className="margin-right-big" document="tad" anchor="2a"
                      title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink className="align-left" document="faq" anchor="2a" title={i18n.t('definition.faqLabel')}
                      lang={i18n.language}/>
      <div className="support-text full-width no-print">{i18n.t('growingStock.supportText')}</div>
    </div>

    {/*AVG Table*/}
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table">
          <thead>
          <tr>
            <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('growingStock.categoryHeader')}</th>
            <th className="fra-table__header-cell" colSpan={defaultYears.length}>
              <div>
                {props.i18n.t('growingStock.avgTableHeader')}
                <button className="fra-table__header-button btn-xs btn-primary no-print"
                        onClick={() => copyTableAsHtml(avgTable, i18n)}>
                  {props.i18n.t('growingStock.copyToClipboard')}
                </button>
              </div>
            </th>
          </tr>
          <tr>
            {R.map(year => <th className="fra-table__header-cell" key={year}>{year}</th>, defaultYears)}
          </tr>
          </thead>
          <tbody>
          <InputRowAvg
            row="naturallyRegeneratingForest"
            {...props}
          />
          <InputRowAvg
            row="plantedForest"
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
          <InputRowAvg
            row="forest"
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

    {/*TOTAL Table*/}
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table">
          <thead>
          <tr>
            <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('growingStock.categoryHeader')}</th>
            <th className="fra-table__header-cell"
                colSpan={defaultYears.length}>{i18n.t('growingStock.totalTableHeader')}</th>
          </tr>
          <tr>
            {R.map(year => <th className="fra-table__header-cell" key={year}>{year}</th>, defaultYears)}
          </tr>
          </thead>
          <tbody>
          <InputRowTotal
            row="naturallyRegeneratingForest"
            {...props}
          />
          <InputRowTotal
            row="plantedForest"
            {...props}
          />
          <InputRowTotal
            row="plantationForest"
            subCategory={true}
            validator={plantedForestSubCategoryValidator}
            {...props}
          />
          <InputRowTotal
            row="otherPlantedForest"
            subCategory={true}
            validator={plantedForestSubCategoryValidator}
            {...props}
          />
          <InputRowTotal
            row="forest"
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

    <GeneralComments section={sectionName} countryIso={countryIso} disabled={isEditDataDisabled}/>
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
    i18n: state.user.i18n,
    isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName)
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
