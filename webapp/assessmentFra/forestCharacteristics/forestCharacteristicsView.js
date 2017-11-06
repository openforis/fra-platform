import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Link } from '../../reusableUiComponents/link'

import { fetchItem, save, saveMany, generateFraValues } from '../../tableWithOdp/actions'
import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { TableWithOdp } from '../../tableWithOdp/tableWithOdp'
import ChartWrapper from '../extentOfForest/chart/chartWrapper'
import { CommentableDescriptions } from '../../description/commentableDescription'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { sum, formatNumber, eq } from '../../../common/bignumberUtils'
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
      return totalForestAreaNotEqualToExtentOfForest(eofForestArea, forestArea)
        ? props.i18n.t('generalValidation.forestAreaDoesNotMatchExtentOfForest', {eofForestArea: formatNumber(eofForestArea)})
        : null
    },R.values(fra))

  const disableGenerateFRAValues = () => {
    const odps = R.pipe(
      R.values,
      R.filter(v => v.type === 'odp')
    )(props.fra)
    return props.generatingFraValues || odps.length < 2
  }
  const i18n = props.i18n
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
        <svg className="icon icon-sub icon-white">
          <use xlinkHref="img/icons.svg#small-add"/>
        </svg>
        {i18n.t('nationalDataPoint.addNationalDataPoint')}
      </Link>
    </div>
    <ChartWrapper stateName="forestCharacteristics" trends={[
      {name:'naturalForestArea', label:props.i18n.t('forestCharacteristics.naturalForestArea'), color:'#0098a6'},
      {name:'plantationForestArea', label:props.i18n.t('forestCharacteristics.plantationForestArea'), color:'#bf00af'},
      {name:'otherPlantedForestArea', label:props.i18n.t('forestCharacteristics.otherPlantedForestArea'), color:'#f28130'}
      ]} />
    <div className="fra-view__section-header">
      <h3 className="subhead">{i18n.t('forestCharacteristics.forestCharacteristics')}</h3>
      <DefinitionLink document="tad" anchor="1b" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink document="faq" anchor="1b" title={i18n.t('definition.faqLabel')} lang={i18n.language} className="align-left"/>
      <button disabled={disableGenerateFRAValues()} className="btn btn-primary"
              onClick={() => props.generateFraValues(sectionName, props.countryIso)}>
        {i18n.t('extentOfForest.generateFraValues')}
      </button>
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
    this.props.fetchItem(sectionName, countryIso)
  }

  render () {
    return <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
      <ForestCharacteristics {...this.props} countryIso={this.props.match.params.countryIso}
      />
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({
  ...state.forestCharacteristics,
  openCommentThread: state.review.openThread,
  i18n: state.user.i18n,
  extentOfForest: state.extentOfForest
})

export default connect(
    mapStateToProps,
    {
      fetchItem,
      save,
      saveMany,
      generateFraValues,
      fetchLastSectionUpdateTimestamp
    }
  )(DataFetchingComponent)
