import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { CommentableDescriptions } from '../../description/commentableDescription'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import TableIndicatorAgency from './tableIndicatorAgency'

import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'

import { fetch } from './actions'
import { formatDecimal } from '../../utils/numberFormat'
import { sum, div, mul, eq } from '../../../common/bignumberUtils'

const Table_15_1_1 = ({i18n, countryIso, data}) => {
  const years = R.pipe(
    R.filter(v => v.type !== 'odp'),
    R.map(v => v.name)
  )(data.extentOfForest)

  const getDataPoint = year => R.pipe(
    R.find(v => eq(v.year, year) && R.propEq('type', 'odp', v)),
    o => R.isNil(o)
      ? R.find(v => eq(v.year, year) && R.propEq('type', 'fra', v), data.extentOfForest)
      : o,
  )(data.extentOfForest)

  const area2015 = R.pipe(
    getDataPoint,
    dataPoint => sum([dataPoint.forestArea, dataPoint.otherWoodedLand, dataPoint.otherLand])
  )(2015)

  const getValueByYear = year => R.pipe(
    getDataPoint,
    dataPoint => div(dataPoint.forestArea, area2015),
    res => R.isNil(res) ? null : mul(res, 100)
  )(year)

  return <div>
    <div className="fra-view__section-header">
      <h3 className="subhead">{i18n.t('sustainableDevelopment.sdgIndicator15_1_1')}</h3>
    </div>
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table">
          <thead>
          <tr>
            <th rowSpan="2" className="fra-table__header-cell-left">{i18n.t('sustainableDevelopment.indicator')}</th>
            <th colSpan="9" className="fra-table__header-cell">{i18n.t('sustainableDevelopment.percent')}</th>
          </tr>
          <tr>
            {
              R.map(year =>
                <th key={`${year}h`} className="fra-table__header-cell">{year}</th>
              )(years)
            }
          </tr>
          </thead>
          <tbody>
          <tr>
            <th className="fra-table__category-cell">
              {i18n.t('sustainableDevelopment.forestAreaProportionLandArea2015')}
            </th>
            {
              R.map(year =>
                <td key={`${year}v`} className="fra-table__calculated-cell">{formatDecimal(getValueByYear(year))}</td>
              )(years)
            }
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <TableIndicatorAgency
      i18n={i18n}
      countryIso={countryIso}
      tableSpecName="sustainableDevelopmentAgencyIndicator15_1_1"/>

  </div>
}

class SustainableDevelopmentView extends React.Component {

  componentWillMount () {
    const countryIso = this.props.match.params.countryIso

    this.props.fetchLastSectionUpdateTimestamp(countryIso, 'sustainableDevelopment')
    this.props.fetch(countryIso)
  }

  render () {
    const {match, i18n, data} = this.props
    const countryIso = match.params.countryIso
    const lang = i18n.language
    // console.log(data)

    return R.isEmpty(data)
      ? null
      : <LoggedInPageTemplate>
        <div className="fra-view__content">
          <div className="fra-view__page-header">
            <h1 className="title">{i18n.t('sustainableDevelopment.sustainableDevelopment')}</h1>

            <div className="fra-view__header-secondary-content">
              <DefinitionLink document="tad" anchor="8" title={i18n.t('definition.definitionLabel')} lang={lang}/>
              <DefinitionLink document="faq" anchor="8" title={i18n.t('definition.faqLabel')} lang={lang}/>
            </div>
          </div>
          <Table_15_1_1 i18n={i18n} countryIso={countryIso} data={data}/>
          <CommentableDescriptions
            section="sustainableDevelopment"
            name="sustainableDevelopment"
            countryIso={countryIso}
            i18n={i18n}
          />
        </div>
      </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  data: state.sustainableDevelopment
})

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp, fetch})(SustainableDevelopmentView)
