import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { connect } from 'react-redux'
import * as R from 'ramda'
import clipboard from 'clipboard-polyfill'
import { Link } from '../../reusableUiComponents/link'
import Icon from '../../reusableUiComponents/icon'

import { fetchItem, save, saveMany, generateFraValues } from '../../tableWithOdp/actions'
import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { TableWithOdp, hasFraValues, getFraValues, disableGenerateFraValues } from '../../tableWithOdp/tableWithOdp'
import ChartWrapper from '../extentOfForest/chart/chartWrapper'
import { CommentableDescriptions } from '../../description/commentableDescription'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { sum, formatNumber, eq, greaterThanOrEqualTo, toFixed } from '../../../common/bignumberUtils'
import { getForestAreaForYear } from '../extentOfForest/extentOfForestHelper'

const mapIndexed = R.addIndex(R.map)
const sectionName = 'forestCharacteristics'
const odpValueCellClass = (fraColumn) => fraColumn.type === 'odp' ? 'odp-value-cell-total' : 'fra-table__calculated-cell'

const ForestCharacteristics = props => {

  const plantedForestRow = fra => {
    return <tr key="plantedForest">
      <th className="fra-table__header-cell-left">
        {props.i18n.t('forestCharacteristics.plantedForest')}
      </th>
      {
        mapIndexed((fraColumn, i) => {
          const plantedForestArea = sum([fraColumn.plantationForestArea, fraColumn.otherPlantedForestArea])
          return <td className={odpValueCellClass(fraColumn)} key={i}>
            {formatNumber(plantedForestArea)}
          </td>
        }, R.values(fra))
      }
    </tr>
  }

  const totalForestArea = (fraColumn) =>
    sum([
      fraColumn.plantationForestArea,
      fraColumn.otherPlantedForestArea,
      fraColumn.naturalForestArea
    ])

  const totalForestAreaNotEqualToExtentOfForest = (eofForestArea, totalForestArea) => {
    if (R.isNil(eofForestArea)) return false
    if (R.isNil(totalForestArea)) return false
    return !eq(eofForestArea, totalForestArea)
  }

  const totalForestAreaRow = fra => {
    return <tr key="totalForestArea">
      <th className="fra-table__header-cell-left">
        {props.i18n.t('forestCharacteristics.totalForestArea')}
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
    </tr>
  }

  const validationErrorMessages = fra =>
    R.map(fraColumn => {
      const forestArea = totalForestArea(fraColumn)
      const eofForestArea = getForestAreaForYear(props.extentOfForest, fraColumn.name)
      const validationErrors =
        R.reject(
          R.isNil,
          [
            !plantationForestValidator(fraColumn)
              ? props.i18n.t('generalValidation.subCategoryExceedsParent')
              : null,
            totalForestAreaNotEqualToExtentOfForest(eofForestArea, forestArea)
              ? props.i18n.t
                (
                  'generalValidation.forestAreaDoesNotMatchExtentOfForest',
                  {eofForestArea: formatNumber(eofForestArea)}
                )
              : null
          ]
        )
      return validationErrors
    },R.values(fra))

  const i18n = props.i18n

  const plantationForestValidator = fraColumn => {
    const plantationForest = fraColumn.plantationForestArea
    const introduced = fraColumn.plantationForestIntroducedArea
    if (R.isNil(plantationForest) || R.isNil(introduced)) return true
    return greaterThanOrEqualTo(plantationForest, introduced)
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
      localizedName: i18n.t('forestCharacteristics.naturalForestArea')
    },
    {
      type: 'custom',
      render: plantedForestRow
    },
    {
      type: 'field',
      field: 'plantationForestArea',
      localizedName: i18n.t('forestCharacteristics.plantationForestArea')
    },
    {
      type: 'field',
      field: 'plantationForestIntroducedArea',
      validator: plantationForestValidator,
      className: 'fra-table__subcategory-cell',
      localizedName: i18n.t('forestCharacteristics.plantationForestIntroducedArea')
    },
    {
      type: 'field',
      field: 'otherPlantedForestArea',
      localizedName: i18n.t('forestCharacteristics.otherPlantedForestArea')
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
      <h1 className="title">{i18n.t('forestCharacteristics.estimationAndForecasting')}</h1>
      <Link className="btn btn-primary align-right" to={`/country/${props.countryIso}/odp`}>
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
      <button
        className="btn btn-secondary"
        onClick={() => copyTableAsHtml(props.fra, rows)}>
        {i18n.t('forestCharacteristics.copyToClipboard')}
      </button>
      <button
        disabled={disableGenerateFraValues(props.fra, props.generatingFraValues)}
        className="btn btn-primary"
        onClick={() => hasFraValues(props.fra, rows)
          ? window.confirm(i18n.t('extentOfForest.confirmGenerateFraValues'))
            ? props.generateFraValues(sectionName, props.countryIso)
            : null
          : props.generateFraValues(sectionName, props.countryIso)
      }>
        {i18n.t('extentOfForest.generateFraValues')}
      </button>
      {
        !disableGenerateFraValues(props.fra, props.generatingFraValues) && props.odpDirty
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
      areaUnitLabel={i18n.t('forestCharacteristics.areaUnitLabel')}
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
