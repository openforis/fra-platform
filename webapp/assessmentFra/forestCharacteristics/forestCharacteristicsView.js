import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { connect } from 'react-redux'
import * as R from 'ramda'
import clipboard from 'clipboard-polyfill'
import { Link } from '../../reusableUiComponents/link'
import Icon from '../../reusableUiComponents/icon'

import { fetchItem, save, saveMany, generateFraValues } from '../../tableWithOdp/actions'
import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { TableWithOdp, GenerateFraValuesControl, getFraValues } from '../../tableWithOdp/tableWithOdp'
import ChartWrapper from '../extentOfForest/chart/chartWrapper'
import { CommentableDescriptions } from '../../description/commentableDescription'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { sum, formatNumber, eq, greaterThanOrEqualTo, abs, sub, greaterThan, toFixed } from '../../../common/bignumberUtils'
import { getForestAreaForYear } from '../extentOfForest/extentOfForestHelper'
import ReviewIndicator from '../../review/reviewIndicator'

const mapIndexed = R.addIndex(R.map)
const sectionName = 'forestCharacteristics'
const odpValueCellClass = (fraColumn) => fraColumn.type === 'odp' ? 'odp-value-cell-total' : 'fra-table__calculated-cell'

const ForestCharacteristics = props => {

  const i18n = props.i18n

  const totalForestArea = (fraColumn) =>
    sum([
      fraColumn.plantationForestArea,
      fraColumn.otherPlantedForestArea,
      fraColumn.naturalForestArea
    ])

  const totalForestAreaNotEqualToExtentOfForest = (eofForestArea, totalForestArea) => {
    if (R.isNil(eofForestArea)) return false
    if (R.isNil(totalForestArea)) return false
    const tolerance = 1
    const absDifference = abs(sub(eofForestArea, totalForestArea))
    return greaterThanOrEqualTo(absDifference, tolerance)
  }

  const plantationForestValidator = fraColumn => {
    const plantationForest = fraColumn.plantationForestArea
    const introduced = fraColumn.plantationForestIntroducedArea
    if (R.isNil(plantationForest) || R.isNil(introduced)) return true
    const tolerance = -1
    const difference = sub(plantationForest, introduced)
    return greaterThan(difference, tolerance)
  }

  const rowHighlightClass = (target) => props.openCommentThread && R.isEmpty(R.difference(props.openCommentThread.target, [target])) ? 'fra-row-comments__open' : ''

  const plantedForestRow = fra =>
    <tr className={rowHighlightClass('plantedForest')}>
      <th className="fra-table__header-cell-left">
        {i18n.t('forestCharacteristics.plantedForest')} (b)
      </th>
      {
        mapIndexed((fraColumn, i) => {
          const plantedForestArea = sum([fraColumn.plantationForestArea, fraColumn.otherPlantedForestArea])
          return <td className={odpValueCellClass(fraColumn)} key={i}>
            {formatNumber(plantedForestArea)}
          </td>
        }, R.values(fra))
      }
      <td className="fra-table__row-anchor-cell">
        <div className="fra-table__review-indicator-anchor">
          <ReviewIndicator
            key="plantedForest"
            section={sectionName}
            title={i18n.t('forestCharacteristics.plantedForest')}
            target={['plantedForest']}
            countryIso={props.countryIso} />
        </div>
      </td>
    </tr>

  const totalRow = fra =>
    <tr className={rowHighlightClass('total')}>
      <th className="fra-table__header-cell-left">
        {i18n.t('forestCharacteristics.total')} (a+b)
      </th>
      {
        mapIndexed((fraColumn, i) => {
          const forestArea = totalForestArea(fraColumn)
          const eofForestArea = getForestAreaForYear(props.extentOfForest, fraColumn.name)
          const validationErrorClass =
            totalForestAreaNotEqualToExtentOfForest(eofForestArea, forestArea)
              ? 'validation-error'
              : ''
          return <td className={`${odpValueCellClass(fraColumn)} ${validationErrorClass}`} key={i}>
            {formatNumber(forestArea)}
          </td>
        }, R.values(fra))
      }
      <td className="fra-table__row-anchor-cell">
        <div className="fra-table__review-indicator-anchor">
          <ReviewIndicator
            key="total"
            section={sectionName}
            title={i18n.t('forestCharacteristics.total')}
            target={['total']}
            countryIso={props.countryIso} />
        </div>
      </td>
    </tr>

  const totalForestAreaRow = fra =>
    <tr className={rowHighlightClass('totalForestArea')}>
      <th className="fra-table__header-cell-left">
        <Link to={`/country/${props.countryIso}/extentOfForest`} className="link">
          {i18n.t('forestCharacteristics.totalForestArea')}
        </Link>
      </th>
      {
        mapIndexed((fraColumn, i) => {
          const eofForestArea = getForestAreaForYear(props.extentOfForest, fraColumn.name)
          return <td className={`${odpValueCellClass(fraColumn)}`} key={i}>
            {formatNumber(eofForestArea)}
          </td>
        }, R.values(fra))
      }
      <td className="fra-table__row-anchor-cell">
        <div className="fra-table__review-indicator-anchor">
          <ReviewIndicator
            key="totalForestArea"
            section={sectionName}
            title={i18n.t('forestCharacteristics.totalForestArea')}
            target={['totalForestArea']}
            countryIso={props.countryIso} />
        </div>
      </td>
    </tr>

  const validationErrorMessages = fra =>
    R.map(fraColumn => {
      const forestArea = totalForestArea(fraColumn)
      const eofForestArea = getForestAreaForYear(props.extentOfForest, fraColumn.name)
      const validationErrors =
        R.reject(
          R.isNil,
          [
            !plantationForestValidator(fraColumn)
              ? i18n.t('generalValidation.subCategoryExceedsParent')
              : null,
            totalForestAreaNotEqualToExtentOfForest(eofForestArea, forestArea)
              ? i18n.t ('generalValidation.forestAreaDoesNotMatchExtentOfForest')
              : null
          ]
        )
      return validationErrors
    },R.values(fra))

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

  const copyTableAsHtml = (fra, rowsSpecs) => {
    const transposedFraValues = R.transpose(getFraValues(fra, rowsSpecs))
    const htmlTable = ReactDOMServer.renderToString(<ClipboardTable tableValues={transposedFraValues}/>)
    const dataTransfer = new clipboard.DT()
    dataTransfer.setData("text/plain", i18n.t('forestCharacteristics.forestCharacteristics'))
    dataTransfer.setData("text/html", htmlTable)
    clipboard.write(dataTransfer)
  }

  const rows = [
    {
      type: 'field',
      field: 'naturalForestArea',
      rowHeader: i18n.t('forestCharacteristics.naturalForestArea'),
      rowVariable: '(a)'
    },
    {
      type: 'custom',
      render: plantedForestRow
    },
    {
      type: 'field',
      field: 'plantationForestArea',
      rowHeader: i18n.t('forestCharacteristics.plantationForestArea')
    },
    {
      type: 'field',
      field: 'plantationForestIntroducedArea',
      validator: plantationForestValidator,
      className: 'fra-table__subcategory-cell',
      rowHeader: i18n.t('forestCharacteristics.plantationForestIntroducedArea')
    },
    {
      type: 'field',
      field: 'otherPlantedForestArea',
      rowHeader: i18n.t('forestCharacteristics.otherPlantedForestArea')
    },
    {
      type: 'custom',
      render: totalRow
    },
    {
      type: 'custom',
      render: totalForestAreaRow
    },
    {
      type: 'validationErrors',
      validationErrorMessages
    }
  ]

  return <div className='fra-view__content'>
    <div className="fra-view__page-header">
      <h1 className="title align-left">{i18n.t('forestCharacteristics.estimationAndForecasting')}</h1>
      <Link className="btn btn-primary" to={`/country/${props.countryIso}/odp/extentOfForest`}>
        <Icon className="icon-sub icon-white" name="small-add"/>
        {i18n.t('nationalDataPoint.addNationalDataPoint')}
      </Link>
    </div>
    <ChartWrapper stateName="forestCharacteristics" trends={[
      {name:'naturalForestArea', label:props.i18n.t('forestCharacteristics.naturalForestArea'), color:'#0098a6'},
      {name:'plantationForestArea', label:props.i18n.t('forestCharacteristics.plantationForestArea'), color:'#bf00af'},
      {name:'otherPlantedForestArea', label:props.i18n.t('forestCharacteristics.otherPlantedForestArea'), color:'#f58833'}
    ]} />
    <div className="fra-view__section-header">
      <h3 className="subhead">{i18n.t('forestCharacteristics.forestCharacteristics')}</h3>
      <DefinitionLink document="tad" anchor="1b" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink document="faq" anchor="1b" title={i18n.t('definition.faqLabel')} lang={i18n.language} className="align-left"/>
      <GenerateFraValuesControl section={sectionName} rows={rows} {...props} />
      <button
        className="btn-s btn-secondary"
        onClick={() => copyTableAsHtml(props.fra, rows)}>
         {i18n.t('forestCharacteristics.copyToClipboard')}
      </button>
      {
        props.odpDirty
          ? <div className="support-text">
              <Icon name="alert" className="icon-orange icon-sub icon-margin-right"/>
              {i18n.t('nationalDataPoint.remindDirtyOdp')}
            </div>
          : null
      }
    </div>
    <TableWithOdp
      section={sectionName}
      rows={rows}
      tableHeader={i18n.t('forestCharacteristics.areaUnitLabel')}
      categoryHeader={i18n.t('forestCharacteristics.categoryHeader')}
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

class DataFetchingComponent extends React.Component {
  componentWillMount () {
    const countryIso = this.props.match.params.countryIso
    this.fetch(countryIso)
    this.props.fetchLastSectionUpdateTimestamp(countryIso, sectionName)
  }

  fetch (countryIso) {
    this.props.fetchItem(sectionName, countryIso)
  }

  render () {
    return <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
      <ForestCharacteristics {...this.props} countryIso={this.props.match.params.countryIso}
      />
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state =>
  ({
    ...state.forestCharacteristics,
    openCommentThread: state.review.openThread,
    i18n: state.user.i18n,
    extentOfForest: state.extentOfForest
  })

export default connect(
    mapStateToProps,
    {
      save,
      saveMany,
      fetchItem,
      generateFraValues,
      fetchLastSectionUpdateTimestamp
    }
  )(DataFetchingComponent)
