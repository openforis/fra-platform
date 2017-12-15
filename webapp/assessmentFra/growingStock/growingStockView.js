import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetch, changeTotalValue } from './actions'
import { ThousandSeparatedDecimalInput } from '../../reusableUiComponents/thousandSeparatedDecimalInput'
import { sum, formatNumber, greaterThanOrEqualTo, lessThanOrEqualTo, abs, sub, greaterThan } from '../../../common/bignumberUtils'

const sectionName = 'growingStock'
const mapIndexed = R.addIndex(R.map)
const years = [1990, 2000, 2010, 2015, 2020]

const InputRow = (props) => {
  const thClassName = props.subCategory ? 'fra-table__subcategory-cell' : 'fra-table__category-cell'
  return <tr>
    <th className={thClassName}>{props.i18n.t(`growingStock.${props.row}`)}</th>
    {
      R.map(year => {
        const value = R.path([year, props.row], props.data) || null
        return <td className="fra-table__cell" key={year}>
          <ThousandSeparatedDecimalInput
            numberValue={value}
            onChange={e => props.changeTotalValue(props.countryIso, year, props.row, e.target.value)}/>
        </td>
      }, years)
    }
  </tr>
}

const TotalRow = (props) => {
  return <tr>
    <th className="fra-table__header-cell-left">{props.i18n.t(`growingStock.${props.row}`)}</th>
    {
      R.map(year => {
        const value = R.path([year, props.row], props.data) || null
        return <td className="fra-table__calculated-cell" key={year}>
          {formatNumber(value)}
        </td>
      }, years)
    }
  </tr>
}

const GrowingStock = (props) => {
  const i18n = props.i18n
  const countryIso = props.countryIso
  const avgTableArea = R.path(['avgTableArea'], props)
  const totalTableArea = R.path(['totalTableArea'], props)

  // console.log(avgTableArea, props.avgTableArea)

  return <div className='fra-view__content growing-stock-view'>
    <div className="fra-view__page-header">
      <h1 className="title">{i18n.t('growingStock.growingStock')}</h1>
      <div className="fra-view__header-secondary-content">
        <DefinitionLink document="tad" anchor="2a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
        <DefinitionLink document="faq" anchor="2a" title={i18n.t('definition.faqLabel')} lang={i18n.language}/>
        <p className="support-text">{i18n.t('growingStock.supportText')}</p>
      </div>
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
            <InputRow
              data={avgTableArea}
              row="naturallyRegeneratingForest"
              {...props}
            />
            <TotalRow
              data={avgTableArea}
              row="plantedForest"
              {...props}
            />
            <InputRow
              data={avgTableArea}
              row="plantationForest"
              subCategory={true}
              {...props}
            />
            <InputRow
              data={avgTableArea}
              row="otherPlantedForest"
              subCategory={true}
              {...props}
            />
            <TotalRow
              data={avgTableArea}
              row="totalForest"
              {...props}
            />
            <InputRow
              data={avgTableArea}
              row="otherWoodedLand"
              {...props}
            />

          </tbody>
        </table>
      </div>
    </div>
    <div style={{height: '32px'}}></div>
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
            <InputRow
              data={totalTableArea}
              row="naturallyRegeneratingForest"
              {...props}
            />
            <TotalRow
              data={totalTableArea}
              row="plantedForest"
              {...props}
            />
            <InputRow
              data={totalTableArea}
              row="plantationForest"
              subCategory={true}
              {...props}
            />
            <InputRow
              data={totalTableArea}
              row="otherPlantedForest"
              subCategory={true}
              {...props}
            />
            <TotalRow
              data={totalTableArea}
              row="totalForest"
              {...props}
            />
            <InputRow
              data={totalTableArea}
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
    totalTableArea: state.growingStock.totalTable,
    avgTableArea: state.growingStock.avgTable,
    focEofArea: state.growingStock.focEofArea,
    openCommentThread: state.review.openThread,
    i18n: state.user.i18n
  })

export default connect(
    mapStateToProps,
    {
      fetch,
      changeTotalValue,
      fetchLastSectionUpdateTimestamp
    }
  )(GrowingStockView)
