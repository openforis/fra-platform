import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { save, fetch, generateFraValues } from './actions'
import { Link } from './../link'
import Chart from './chart/chart'
import IssueWidget from '../issue/issueWidget'

const OdpHeading = ({countryIso, odpValue}) =>
  <Link to={`/country/${countryIso}/odp/${odpValue.odpId}`}>
    {odpValue.draft ? '!' : ''}
    {odpValue.name}
  </Link>

class DataTable extends React.Component {

  render () {
    return <div className="nde__data-table-container">
      <div className="nde__input-table">
        <div className="nde__input-table-heading">
          <div className="nde__input-table-content-row-header-cell"/>
          {
            R.values(this.props.fra).map(v =>
              <div className="nde__input-header-cell" key={`${v.type}_${v.name}`}>
                { v.type === 'odp' ? <OdpHeading countryIso={this.props.countryIso} odpValue={v}/>
                  : v.name
                }
              </div>
            )
          }
        </div>
        { fraValueRow('Forest', "forest", this.props.countryIso, 'forestArea', this.props.fra, this.props.save) }
        { fraValueRow('Other wooded land', 'otherWoodedLand', this.props.countryIso, 'otherWoodedLand', this.props.fra, this.props.save) }
        { fraValueRow('Other land', 'otherLand', this.props.countryIso, 'otherLand', this.props.fra, this.props.save) }
      </div>
      <div className="nde__comment-column">
        <div className="nde__comment-cell"><IssueWidget target='forestArea'
                                                        countryIso={this.props.countryIso}/></div>
        <div className="nde__comment-cell"><IssueWidget target='otherWoodedLand'
                                                        countryIso={this.props.countryIso}/></div>
        <div className="nde__comment-cell"><IssueWidget target='otherLand'
                                                        countryIso={this.props.countryIso}/></div>
      </div>
    </div>
  }
}

const fraValueRow = (rowHeading, target, countryIso, field, fra, save) =>
  <div className="nde__input-table-content">
    <div className="nde__input-table-content-row-header-cell">{ rowHeading }</div>
    {
      R.values(fra).map(v =>
        <div className="nde__input-table-content-cell" key={`${v.type}_${v.name}`}>
          {
            v.type === 'odp'
              ? odpCell(v, field)
              : fraValueCell(v, fra, countryIso, save, field)
          }
        </div>
      )
    }
  </div>

const fraFieldValueForInput = (fieldValue) =>
  typeof fieldValue === 'number'
  ? fieldValue
  : ''

const fraValueCell = (fraValue, fra, countryIso, save, field) =>
  <input
    className="nde__input-table-input"
    value={ fraFieldValueForInput(fraValue[field]) }
    onChange={ e => {
      save(countryIso, fraValue.name, e.target.value, fraValue, field)
    }}/>

const odpCell = (odpValue, field) =>
  <span className="nde__input-table-readonly-cell">
    {odpValue[field]}
  </span>

const NationalDataEntry = (props) => {

  const disableGenerateFRAValues = () => {
    const odps = R.pipe(
      R.values,
      R.filter(v => v.type === 'odp')
    )(props.fra)
    return props.generatingFraValues || odps.length < 2
  }

  const marginClass = R.isNil(props.openCommentThread) ? "" : "nde__comment-thread-margin"

  return <div className={`nde__data-input-component`}>
    <div className="nde__data-page-header">
      <h2 className="headline">Extent of forest</h2>
    </div>
    <div className={`${marginClass}`}>
      <div className="nde__data-input-header">
        <Link className="btn btn-primary" to={`/country/${props.countryIso}/odp`}>
          <svg className="icon icon-middle icon-white">
            <use xlinkHref="img/icon.svg#icon-small-add"/>
          </svg>
          Add national data point
        </Link>
      </div>
      <div className="nde__data-chart">
        <Chart />
      </div>
      <div className="nde__data-table-header">
        <h3 className="subhead">Extent of forest values</h3>
        <button disabled={disableGenerateFRAValues()} className="btn btn-primary"
                onClick={() => props.generateFraValues(props.countryIso)}>Generate FRA values
        </button>
      </div>
    </div>
      <DataTable {...props} />
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
    return <NationalDataEntry {...this.props} countryIso={this.props.match.params.countryIso}/>
  }
}

const mapStateToProps = state => R.merge(state.nationalDataEntry, {"openCommentThread": state.issue.openThread})

export default connect(mapStateToProps, {save, fetch, generateFraValues})(DataFetchingComponent)
