import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import ReactDOMServer from 'react-dom/server'
import clipboard from 'clipboard-polyfill'

import { fetchLastSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'
import { changeAvgValue, changeTotalValue, fetch, pasteAvgValue, pasteTotalValue } from './actions'
import { add, formatNumber, greaterThan, sub, toFixed } from '@common/bignumberUtils'
import { readPasteClipboard } from '@webapp/utils/copyPasteUtil'

import ButtonTableExport from '@webapp/components/buttonTableExport'
import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
import DefinitionLink from '@webapp/components/definitionLink'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import NationalDataDescriptions from '@webapp/components/description/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/components/description/analysisDescriptions'
import GeneralComments from '@webapp/components/description/generalComments'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

import defaultYears from '@server/eof/defaultYears'
import { isFRA2020SectionEditDisabled } from '@webapp/utils/assessmentAccess'
import { calculateAvgValue, calculateTotalValue, getTotalGrowingStockFieldsSum } from './growingStock'
import { equalToTotalGrowingStock } from '@webapp/app/assessment/components/traditionalTable/validators'
import FraUtils from '@common/fraUtils'
import { isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'

import * as AppState from '@webapp/app/appState'
import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'

const sectionName = 'growingStock'
const mapIndexed = R.addIndex(R.map)

const InputRowAvg = (props) => {
  const { isEditDataDisabled, validator, row } = props
  const thClassName = props.subCategory ? 'fra-table__subcategory-cell' : 'fra-table__category-cell'
  const target = props.row + 'Avg'
  return <tr>
    <th className={thClassName}>{props.i18n.t(`growingStock.${props.row}`)}</th>
    {
      R.map(year => {
        const value = R.path([year, props.row], props.avgTable)
        const valid = validator ? validator(props, year, row).valid : true
        return <td className={`fra-table__cell${valid ? '' : ' error'}`} key={year}>
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
  const { countryIso, totalTable, subCategory, row, validator, isEditDataDisabled } = props

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

const ClipboardTable = ({ tableValues }) =>
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

const subCategoryValidator = (parentField, childFields) =>
  (props, year, row) => {
    const parentValue = R.path(['totalTable', year, parentField])(props)
    const childValues = getTotalGrowingStockFieldsSum(props, year, childFields)

    const tolerance = -1
    const difference = sub(parentValue, childValues)
    const valid = parentValue
      ? greaterThan(difference, tolerance)
      : true

    if (valid) {
      return totalValidator(props, year, row)
    }

    return {
      valid: valid,
      message: valid
        ? ''
        : props.i18n.t('generalValidation.subCategoryExceedsParent')
    }
  }

export const plantedForestSubCategoryValidator = subCategoryValidator('plantedForest', ['plantationForest', 'otherPlantedForest'])

const equalToTotalGrowingStockSubCategoryValidator = (props, year, row) => {
  return equalToTotalGrowingStock(
    year,
    props,
    () => {
      const plantedForest = R.path(['totalTable', year, 'plantedForest'])(props)
      const naturallyRegeneratingForest = R.path(['totalTable', year, 'naturallyRegeneratingForest'])(props)

      if (R.isNil(plantedForest) || R.isNil(naturallyRegeneratingForest))
        return null

      return add(plantedForest, naturallyRegeneratingForest)

    })(props, row, year)
}

export const forestSubCategoryValidator = (props, year, row) => {
  const forestValidator = subCategoryValidator('forest', ['plantedForest', 'naturallyRegeneratingForest'])(props, year, row)
  const equalToTotal = equalToTotalGrowingStockSubCategoryValidator(props, year, row)
  return forestValidator.valid
    ? equalToTotal
    : forestValidator
}

const totalValidator = (props, year, row) => {
  // console.log(props, year, row)
  const totalValue = R.path(['totalTable', year, row], props)
  const avgValue = R.path(['avgTable', year, row], props)
  const value = formatNumber(calculateTotalValue(props, year, row, avgValue))
  const equals = value === formatNumber(totalValue)

  if (value) {
    return equals
      ? { valid: true }
      : {
        valid: false,
        message: props.i18n.t('generalValidation.valuesAreInconsistent1aOr1b')
      }
  } else {
    return { valid: true }
  }
}

const avgValidator = (props, year, row) => {
  // console.log(props, year, row)
  const totalValue = R.path(['totalTable', year, row], props)
  const avgValue = R.path(['avgTable', year, row], props)
  const value = formatNumber(calculateAvgValue(props, year, row, totalValue))
  const equals = value === formatNumber(avgValue)

  if (value) {
    return equals
      ? { valid: true }
      : {
        valid: false,
        message: props.i18n.t('generalValidation.valuesAreInconsistent1aOr1b')
      }
  } else {
    return { valid: true }
  }
}

const GrowingStock = (props) => {
  const { i18n, countryIso, userInfo, avgTable, totalTable, isEditDataDisabled } = props
  const tableRefTotal = React.useRef(null);
  const tableRefAvg = React.useRef(null);

  if (R.isNil(avgTable) || R.isNil(totalTable)) return null

  return <div className='app-view__content'>

    <h2 className="title only-print">
      {`${isPrintingOnlyTables() ? '' : '2a '}${i18n.t('growingStock.growingStock')}`}
    </h2>

    <NationalDataDescriptions section={sectionName} countryIso={countryIso} disabled={isEditDataDisabled}/>
    <AnalysisDescriptions section={sectionName} countryIso={countryIso} disabled={isEditDataDisabled}/>
    <h2 className="headline no-print">
      {i18n.t('growingStock.growingStock')}
    </h2>
    <div className="app-view__section-toolbar">
      <DefinitionLink className="margin-right-big" document="tad" anchor="2a"
                      title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink className="align-left" document="faq" anchor="2a" title={i18n.t('definition.faqLabel')}
                      lang={i18n.language}/>
      <div className="support-text full-width no-print">{i18n.t('growingStock.supportText')}</div>
    </div>

    {
      !isPrintingOnlyTables() &&
      <div className="page-break" />
    }

    {/*AVG Table*/}
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <ButtonTableExport
          tableRef={tableRefAvg}
          filename='avg'
        />
        <table ref={tableRefAvg} id="growing_stock_avg_table" className="fra-table">
          <thead>
          <tr>
            <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('growingStock.categoryHeader')}</th>
            <th className="fra-table__header-cell" colSpan={defaultYears.length}>
              <div>
                {props.i18n.t('growingStock.avgTableHeader')}
                {
                  userInfo &&
                  <button className="fra-table__header-button btn-xs btn-primary no-print"
                          onClick={() => copyTableAsHtml(avgTable, i18n)}>
                    {props.i18n.t('growingStock.copyToClipboard')}
                  </button>
                }
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
            validator={avgValidator}
            {...props}
          />
          <InputRowAvg
            row="plantedForest"
            {...props}
          />
          <InputRowAvg
            row="plantationForest"
            validator={avgValidator}
            subCategory={true}
            {...props}
          />
          <InputRowAvg
            row="otherPlantedForest"
            validator={avgValidator}
            subCategory={true}
            {...props}
          />
          <InputRowAvg
            row="forest"
            validator={avgValidator}
            {...props}
          />
          <InputRowAvg
            row="otherWoodedLand"
            validator={avgValidator}
            {...props}
          />
          <tr className="no-print">
            <td></td>
            {
              R.map(year => <td className="fra-table__validation-cell" key={year}>
                <div className="fra-table__validation-container">
                  {
                    R.uniq([
                      ...['naturallyRegeneratingForest', 'plantedForest', 'plantationForest', 'otherPlantedForest', 'forest', 'otherWoodedLand']
                        .map(row => avgValidator(props, year, row).message)
                    ]).map((m, i) =>
                      <div key={i} className="fra-table__validation-error">{m}</div>
                    )
                  }
                </div>
              </td>, defaultYears)
            }
          </tr>

          </tbody>
        </table>
      </div>
    </div>

    {/*TOTAL Table*/}
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
      <ButtonTableExport
          tableRef={tableRefTotal}
          filename='total'
        />
        <table ref={tableRefTotal} id="growing_stock_total_table" className="fra-table">
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
            validator={forestSubCategoryValidator}
          />
          <InputRowTotal
            row="plantedForest"
            {...props}
            validator={forestSubCategoryValidator}
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
            validator={totalValidator}
            {...props}
          />
          <InputRowTotal
            row="otherWoodedLand"
            validator={totalValidator}
            {...props}
          />
          <tr className="no-print">
            <td></td>
            {
              R.map(year => <td className="fra-table__validation-cell" key={year}>
                <div className="fra-table__validation-container">
                  {
                    R.uniq([
                      forestSubCategoryValidator(props, year).message,
                      plantedForestSubCategoryValidator(props, year).message,
                      equalToTotalGrowingStockSubCategoryValidator(props, year).message,
                      ...['naturallyRegeneratingForest', 'plantedForest', 'plantationForest', 'otherPlantedForest', 'forest', 'otherWoodedLand']
                        .map(row => totalValidator(props, year, row).message)
                    ]).map((m, i) =>
                      <div key={i} className="fra-table__validation-error">{m}</div>
                    )
                  }
                </div>
              </td>, defaultYears)
            }
          </tr>

          </tbody>
        </table>
      </div>
    </div>

    <GeneralComments section={sectionName} countryIso={countryIso} disabled={isEditDataDisabled}/>
  </div>
}

const GrowingStockView = props => {
  const { totalTable, avgTable, fetch, fetchLastSectionUpdateTimestamp } = props
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()

  const hasData = (table) => {
    return R.pipe(
      R.values,
      R.map(R.omit(['year'])),
      R.map(R.values),
      FraUtils.hasData
    )(table)
  }

  const render = isPrintingOnlyTables() ? hasData(totalTable) || hasData(avgTable) : true

  useEffect(() => {
    fetch(countryIso)
    fetchLastSectionUpdateTimestamp(countryIso, sectionName)
  }, [])

  if (!render) return null

  return (
    <GrowingStock
      countryIso={countryIso}
      userInfo={userInfo}
      {...props}
    />
  )
}

const mapStateToProps = state =>
  ({
    totalTable: state.growingStock.totalTable,
    avgTable: state.growingStock.avgTable,
    baseTable: state.growingStock.baseTable,
    openCommentThread: ReviewState.getOpenThread(state),
    i18n: AppState.getI18n(state),
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
