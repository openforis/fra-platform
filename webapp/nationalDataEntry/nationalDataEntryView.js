import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { save, fetch, generateFraValues } from './actions'
import { Link } from './../link'
import Chart from './chart/chart'

const OdpCell = ({odpValue}) => {
  return <span className="nde__input-table-readonly-cell">
        {odpValue.forestArea}
        </span>
}

const OdpHeading = ({countryIso, odpValue}) =>
  <Link to={`/country/${countryIso}/odp/${odpValue.odpId}`}>
    {odpValue.draft ? '!' : ''}
    {odpValue.name}
  </Link>

const FraValueCell = ({fraValue, fra, countryIso, save}) =>
  <input
    value={ fraValue.forestArea || ''}
    onChange={ e => {
      save(countryIso, fraValue.name, e.target.value, fraValue.forestArea)
    }}/>

const DataTable = ({fra, save, countryIso}) =>
  <div className="nde__input-table">
    <div className="nde__input-table-heading">
      <div className="nde__input-header-cell "/>
      {
        R.values(fra).map(v =>
          <div className="nde__input-header-cell" key={`${v.type}_${v.name}`}>
            { v.type === 'odp' ? <OdpHeading countryIso={countryIso} odpValue={v}/>
              : v.name
            }
          </div>
        )
      }
    </div>
    <div className="nde__input-table-content">
      <div className="nde__input-header-cell">Forest</div>
      {
        R.values(fra).map(v =>
          <div className="nde__input-table-content-cell" key={`${v.type}_${v.name}`}>
            {
              v.type === 'odp' ? <OdpCell odpValue={v}/>
                : <FraValueCell fraValue={v} fra={fra} countryIso={countryIso} save={save}/>
            }
          </div>
        )
      }
    </div>
  </div>

const DataInput = (props) => {

  const disableGenerateFRAValues = () => {
    const odps = R.pipe(
      R.values,
      R.filter(v => v.type == 'odp')
    )(props.fra)
    return props.generatingFraValues || odps.length < 2
  }

  return <div className="nde__data-input-component">
    <h2>{props.name}</h2>
    <div className="nde__data-input-header">
      <div>
        {/*placeholder for chart heading*/}
      </div>
      <Link className="btn-primary" to={`/country/${props.countryIso}/odp`}>+ Add original data point</Link>
    </div>
    <div className="nde__data-chart">
      <Chart />
    </div>
    <div className="nde__data-table-header">
      <div>
        {/*placeholder for chart heading*/}
      </div>
      <button disabled={disableGenerateFRAValues()} className="btn-primary"
              onClick={() => props.generateFraValues(props.countryIso)}>Generate FRA values
      </button>
    </div>
    <div className="nde__data-table-container">
      <DataTable {...props} />
    </div>
  </div>
}

const NationalDataEntry = (props) => {
  return <div>
    <DataInput {...props} name="Forest area"/>
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

const mapStateToProps = state => state['nationalDataEntry']

export default connect(mapStateToProps, {save, fetch, generateFraValues})(DataFetchingComponent)
