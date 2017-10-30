import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Link } from './../reusableUiComponents/link'

import { fetchItem, save, saveMany, generateFraValues } from '../tableWithOdp/actions'
import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import { TableWithOdp } from '../tableWithOdp/tableWithOdp'
import ChartWrapper from '../extentOfForest/chart/chartWrapper'
import { CommentableReviewDescription } from '../description/commentableDescription'
import { fetchLastSectionUpdateTimestamp } from '../audit/actions'
import DefinitionLink from './../reusableUiComponents/definitionLink'
import { sum, formatNumber } from '../../common/bignumberUtils'

const mapIndexed = R.addIndex(R.map)
const sectionName = 'forestCharacteristics'

const ForestCharacteristics = props => {

  const plantedForestRow = fra => {
    return <tr key="plantedForest">
      <th className="fra-table__header-cell">
        {props.i18n.t('forestCharacteristics.plantedForest')}
      </th>
      {
        mapIndexed((fraColumn, i) => {
          const plantedForestArea = sum([fraColumn.plantationForestArea, fraColumn.otherPlantedForestArea])
          return <td className="fra-table__calculated-cell" key={i}>
            {formatNumber(plantedForestArea)}
          </td>
        }, R.values(fra))
      }
    </tr>
  }

  const totalForestAreaRow = fra => {
    return <tr key="totalForestArea">
      <th className="fra-table__header-cell">
        {props.i18n.t('forestCharacteristics.totalForestArea')}
      </th>
      {
        mapIndexed((fraColumn, i) => {
          const totalForestArea = sum([
            fraColumn.plantationForestArea,
            fraColumn.otherPlantedForestArea,
            fraColumn.naturalForestArea
          ])
          return <td className="fra-table__calculated-cell" key={i}>
            {formatNumber(totalForestArea)}
          </td>
        }, R.values(fra))
      }
    </tr>
  }

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
      field: 'naturalForestArea',
      localizedName: i18n.t('forestCharacteristics.naturalForestArea')
    },
    { customRenderRow: plantedForestRow },
    {
      field: 'plantationForestArea',
      localizedName: i18n.t('forestCharacteristics.plantationForestArea')
    },
    {
      field: 'plantationForestIntroducedArea',
      className: 'fra-table__subcategory-cell',
      localizedName: i18n.t('forestCharacteristics.plantationForestIntroducedArea')
    },
    {
      field: 'otherPlantedForestArea',
      localizedName: i18n.t('forestCharacteristics.otherPlantedForestArea')
    },
    { customRenderRow: totalForestAreaRow }
  ]

  return <div className='fra-view__content'>
    <div className="fra-view__page-header">
      <h1 className="title">{i18n.t('forestCharacteristics.forestCharacteristics')}</h1>
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
    <CommentableReviewDescription
      section={sectionName}
      countryIso={props.countryIso}
      descriptionName={`forestCharacterstics_generalComments`}
      commentTarget={['generalComments']}
      descriptionTitle={i18n.t('description.generalCommentsTitle')}
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
  'openCommentThread': state.review.openThread,
  i18n: state.user.i18n
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
