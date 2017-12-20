import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetch, changeAvgValue, changeTotalValue } from './actions'
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
            onChange={e => props.changeValue(props.countryIso, year, props.row, e.target.value || null)}/>
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
            <InputRow
              data={avgTableArea}
              row="naturallyRegeneratingForest"
              changeValue={props.changeAvgValue}
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
              changeValue={props.changeAvgValue}
              {...props}
            />
            <InputRow
              data={avgTableArea}
              row="otherPlantedForest"
              subCategory={true}
              changeValue={props.changeAvgValue}
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
              changeValue={props.changeAvgValue}
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
              changeValue={props.changeTotalValue}
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
              changeValue={props.changeTotalValue}
              {...props}
            />
            <InputRow
              data={totalTableArea}
              row="otherPlantedForest"
              subCategory={true}
              changeValue={props.changeTotalValue}
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
              changeValue={props.changeTotalValue}
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
      changeAvgValue,
      fetchLastSectionUpdateTimestamp
    }
  )(GrowingStockView)
