import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { save, saveMany, fetch, generateFraValues } from './actions'
import { Link } from './../link'
import Chart from './chart/chart'
import ReviewIndicator from '../review/reviewIndicator'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import { separateThousandsWithSpaces } from '../utils/numberFormat'
import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import Description from '../description/description'
import { readPasteClipboard } from '../utils/copyPasteUtil'

const mapIndexed = R.addIndex(R.map)

const OdpHeading = ({countryIso, odpValue}) =>
    <Link className="link" to={`/country/${countryIso}/odp/${odpValue.odpId}`}>
      {odpValue.draft ? <svg className="icon icon-sub icon-red icon-margin"><use xlinkHref="img/icon.svg#icon-alert"/></svg> : ''}
      {odpValue.name}
    </Link>

class DataTable extends React.Component {



  render () {
    console.log('open thread', this.props.openCommentThread)
    if(this.props.openCommentThread &&
      this.props.openCommentThread.section === 'EOF') {

    }
    return <div className="nde__data-table-container">
      <div className="nde__data-table-scroll-content">
      <table className="fra-table">
        <thead>
          <tr>
          <th className="fra-table__header-cell"></th>
          {
            R.values(this.props.fra).map(v =>
              <th className={`fra-table__header-cell-align-right ${v.type === 'odp' ? 'odp-header-cell' : ''}`} key={`${v.type}_${v.name}`}>
                { v.type === 'odp' ? <OdpHeading countryIso={this.props.countryIso} odpValue={v}/>
                  : v.name
                }
              </th>
            )
          }
          </tr>
        </thead>
        <tbody>
        { fraValueRow('Forest area', 'forest', this.props.countryIso, 'forestArea',
          this.props.fra, this.props.save, this.props.saveMany, 0, this.props.openCommentThread) }
        { fraValueRow('Other wooded land', 'otherWoodedLand', this.props.countryIso, 'otherWoodedLand',
          this.props.fra, this.props.save, this.props.saveMany, 1, this.props.openCommentThread) }
        { fraValueRow('Other land', 'otherLand', this.props.countryIso, 'otherLand',
          this.props.fra, this.props.save, this.props.saveMany, 2, this.props.openCommentThread) }
          </tbody>
      </table>
      </div>
      <div className="nde__comment-column">
        <div className="nde__comment-cell"><ReviewIndicator target={['forest']}
                                                        name="Forest"
                                                        countryIso={this.props.countryIso}
                                                        section='EOF'/></div>
        <div className="nde__comment-cell"><ReviewIndicator section='EOF'
                                                        name="Other wooded land"
                                                        target={['otherWoodedLand']}
                                                        countryIso={this.props.countryIso}/></div>
        <div className="nde__comment-cell"><ReviewIndicator section='EOF'
                                                        name="Other land"
                                                        target={['otherLand']}
                                                        countryIso={this.props.countryIso}/></div>
      </div>
    </div>
  }
}

const fraValueRow = (rowHeading, target, countryIso, field, fra, save, saveMany, colId, openThread) => {
  console.log('thread', openThread)
  return <tr
    className={`${openThread && R.isEmpty(R.difference(openThread.target, target)) ? 'fra-row-comments__open' : ''}`}>
    <td className="fra-table__header-cell">{ rowHeading }</td>
    {
      mapIndexed((v, i) =>
          <td className={`fra-table__${v.type === 'odp' ? 'text-readonly-cell' : 'cell'}`} key={`${v.type}_${v.name}`}>
            {
              v.type === 'odp'
                ? odpCell(v, field)
                : fraValueCell(v, fra, countryIso, save, saveMany, field, colId, i)
            }
          </td>
        , R.values(fra))
    }
  </tr>
}

const updatePastedValues = (evt, rowIdx, colIdx, fra, rowNames = {
  0: 'forestArea',
  1: 'otherWoodedLand',
  2: 'otherLand'
}) => {

  let toPaste = {}
  mapIndexed((r, i) => {
    const row = rowIdx + i
    mapIndexed((c, j) => {
      const col = colIdx + j
      if (fra.type === 'odp' || R.isNil(fra[col])) return
      toPaste = R.mergeDeepRight({[fra[col].year]: {[rowNames[row]]: c}}, toPaste)
    }, r)
  }, readPasteClipboard(evt))

  const pasted = R.pipe(
    R.map(fra => toPaste[fra.year] ? R.merge(fra, toPaste[fra.year]) : null),
    R.reject(R.isNil))(fra)

  return pasted
}

const fraValueCell = (fraValue, fra, countryIso, save, saveMany, field, colIdx, rowIdx) =>
  <ThousandSeparatedIntegerInput
    className="fra-table__integer-input"
    integerValue={ fraValue[field] }
    onPaste={ e => saveMany(countryIso, updatePastedValues(e, colIdx, rowIdx, fra)) }
    onChange={ e => { save(countryIso, fraValue.name, e.target.value, fraValue, field) } }/>

const odpCell = (odpValue, field) =>
  <span className="nde__input-table-cell_odp">
    {separateThousandsWithSpaces(Math.round(odpValue[field]))}
  </span>

class ChartWrapper extends React.Component {

  constructor () {
    super()
    this.resizeListener = () => this.forceUpdate()
  }

  componentDidMount () {
    window.addEventListener('resize', this.resizeListener, true)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeListener, true)
  }

  render () {
    const defaultWidth = 913 //TODO what's a good default before we have bounding rect?
    const width = this.refs.chartWrapper ? this.refs.chartWrapper.getBoundingClientRect().width : defaultWidth
    return <div ref="chartWrapper" className="nde__data-chart">
      <Chart wrapperWidth={width}/>
    </div>
  }
}

const NationalDataEntry = (props) => {

  const disableGenerateFRAValues = () => {
    const odps = R.pipe(
      R.values,
      R.filter(v => v.type === 'odp')
    )(props.fra)
    return props.generatingFraValues || odps.length < 2
  }

  return <div className='nde__data-input-component'>
    <div className="nde__data-page-header">
      <h2 className="headline">Extent of forest</h2>
    </div>
    <div className='nde__comment-margin'>
      <div className="nde__data-input-header">
        <Link className="btn btn-primary" to={`/country/${props.countryIso}/odp`}>
          <svg className="icon icon-middle icon-white">
            <use xlinkHref="img/icon.svg#icon-small-add"/>
          </svg>
          Add national data point
        </Link>
      </div>
      <ChartWrapper/>
      <div className="nde__data-table-header">
        <h3 className="subhead">Extent of forest values</h3>
        <button disabled={ disableGenerateFRAValues() } className="btn btn-primary"
                onClick={() => props.generateFraValues(props.countryIso)}>Generate FRA values
        </button>
      </div>
    </div>
    <DataTable {...props} />
    <div className="nde__description-field nde__comment-margin">
      <Description title="Data Sources" name="dataSources"
                   countryIso={props.match.params.countryIso}/>
      <ReviewIndicator section='EOF'
                       name="Data Sources"
                       target={['data_sources']}
                       countryIso={props.match.params.countryIso}/>
    </div>
    <div className="nde__description-field nde__comment-margin">
      <Description title="National classification and definitions" name="nationalClassification"
                   countryIso={props.match.params.countryIso}/>
      <ReviewIndicator section='EOF'
                       name="National classification and definitions"
                       target={['national_classifications']}
                       countryIso={props.match.params.countryIso}/>
    </div>
    <div className="nde__description-field nde__comment-margin">
      <Description title="Original data" name="originalData"
                   countryIso={props.match.params.countryIso}/>
      <ReviewIndicator section='EOF'
                       name="Original data"
                       target={['original_data']}
                       countryIso={props.match.params.countryIso}/>
    </div>
  </div>
}

class DataFetchingComponent extends React.Component {
  componentWillMount () {
    this.fetch(this.props.match.params.countryIso)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.fetch(next.match.params.countryIso)
  }

  fetch (countryIso) {
    this.props.fetch(countryIso)
  }

  render () {
    return <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
      <NationalDataEntry {...this.props} countryIso={this.props.match.params.countryIso}/>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => R.merge(state.nationalDataEntry, {'openCommentThread': state.review.openThread})

export default connect(mapStateToProps, {save, saveMany, fetch, generateFraValues})(DataFetchingComponent)
