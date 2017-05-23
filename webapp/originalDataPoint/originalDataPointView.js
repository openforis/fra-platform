import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as originalDataPoint from './originalDataPoint'
import { saveDraft, markAsActual, fetch, clearActive } from './actions'
import R from 'ramda'

const years = ['', ...R.range(1990, 2020)]

const DataInput = ({match, saveDraft, markAsActual, active, autoSaving}) => {
  const countryIso = match.params.countryIso

  return <div className="odp__data-input-component">
    <div className="odp_data-input-row">
      <div><h3>Year</h3></div>
      <div>
        <select
          value={active.year || ''}
          onChange={(e) => saveDraft(countryIso, R.assoc('year', Number(e.target.value), active)) }>
          {years.map((year) => <option key={year} value={year}>{year}</option>)}
        </select>
      </div>
    </div>
    <div className="odp_data-input-row">
      <div><h3>Forest area</h3></div>
      <div>
        <input
          value={active.forestArea || ''}
          onChange={(e) => saveDraft(countryIso, R.assoc('forestArea', Number(e.target.value), active)) }/>
      </div>
    </div>
    <div>
      <h3 className="odp__section">National classes</h3>
      <table className="odp__input-table">
        <thead>
        <tr>
          <th>National class</th>
          <th>Definition</th>
        </tr>
        </thead>
        <tbody>
        {
          nationalClassRows(countryIso, active, saveDraft)
        }
        </tbody>
      </table>
    </div>
    <div>
      <h3 className="odp__section">Extent of forest</h3>
      <table className="odp__input-table">
        <thead>
        <tr>
          <th>National class</th>
          <th>Value</th>
          <th>Forest</th>
          <th>Other wooded land</th>
          <th>Other land</th>
        </tr>
        </thead>
        <tbody>
        {
          extentOfForestRows(active.nationalClasses)
        }
        </tbody>
      </table>
    </div>
    <div className="odp_data-input-row">
      <button disabled={!active.odpId || autoSaving} className="btn-primary"
              onClick={() => markAsActual(countryIso, active.odpId) }>Save & Close
      </button>
    </div>
  </div>
}

const mapIndexed = R.addIndex(R.map)

const nationalClassRows = (countryIso, odp, saveDraft) => {
  return mapIndexed((nationalClass, index) => <NationalClassRow
    key={index}
    index={index}
    odp={odp}
    saveDraft={saveDraft}
    countryIso={countryIso}
    {...nationalClass}/>, odp.nationalClasses)
}

const extentOfForestRows = nationalClasses =>
  R.pipe(
    R.filter((nationalClass) => !nationalClass.placeHolder),
    mapIndexed((nationalClass, index) => <ExtentOfForestRow key={index} {...nationalClass}/>)
  )(nationalClasses)

const NationalClassRow = ({className, definition, odp, index, saveDraft, countryIso}) =>
  <tr>
    <td className="odp__national-class-row-class-name">
      <div className="odp__national-class-remove">x</div>
      <input className="odp__national-class-row-class-name-input"
             type="text"
             value={className || ''}
             onChange={(evt) =>
               saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, 'className', evt.target.value))}/>
    </td>
    <td><input type="text" value={definition || '' } onChange={(evt) => console.log(evt.target.value)}/></td>
  </tr>

const ExtentOfForestRow = ({className, forestPercent, otherWoodedLandPercent, otherLandPercent}) =>
  <tr>
    <td className="odp__extent-of-forest-class-name"><span>{className}</span></td>
    <td><input type="text" value={forestPercent || ''} onChange={(evt) => console.log(evt.target.value)}/></td>
    <td><input type="text" value={otherWoodedLandPercent || ''} onChange={(evt) => console.log(evt.target.value)}/></td>
    <td><input type="text" value={otherLandPercent || ''} onChange={(evt) => console.log(evt.target.value)}/></td>
    <td><input type="text" value={forestPercent || ''} onChange={(evt) => console.log(evt.target.value)}/></td>
  </tr>

class OriginalDataPointView extends React.Component {
  componentWillMount () {
    const odpId = this.props.match.params.odpId
    console.log('match', this.props.match)
    if (odpId) {
      this.props.fetch(odpId)
    } else {
      this.props.clearActive()
    }
  }

  render () {
    return <div className="odp__container">
      <h2>Add original data point</h2>
      <DataInput {...this.props}/>
    </div>
  }
}

const mapStateToProps = state => {
  const odp = state.originalDataPoint
  const autoSaving = !!state.autoSave.status
  const active = odp.active || originalDataPoint.emptyDataPoint()
  return {...odp, active, autoSaving}
}

export default connect(mapStateToProps, {saveDraft, markAsActual, fetch, clearActive})(OriginalDataPointView)
