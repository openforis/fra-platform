import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as originalDataPoint from './originalDataPoint'
import { saveDraft, markAsActual, remove, fetch, clearActive } from './actions'
import { acceptNextInteger } from '../utils/numberInput'
import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import R from 'ramda'

const years = ['', ...R.range(1990, 2021)]

const DataInput = ({match, saveDraft, markAsActual, remove, active, autoSaving}) => {
  const countryIso = match.params.countryIso
  const saveControlsDisabled = () => !active.odpId || autoSaving
  return <div className="odp__data-input-component">
    <div className="odp_data-input-row">
      <div><h3 className="subhead">Year</h3></div>
      <div>
        <select
          value={active.year || ''}
          onChange={(e) => saveDraft(countryIso, R.assoc('year', Number(e.target.value), active)) }>
          {years.map((year) => <option key={year} value={year}>{year}</option>)}
        </select>
      </div>
    </div>
    <div>
      <h3 className="subhead odp__section">National classes</h3>
      <table className="odp__input-table odp__national-class-table">
        <thead>
        <tr>
          <th className="odp__national-class-table-national-class-column">National class</th>
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
      <h3 className="subhead odp__section">Extent of forest</h3>
      <table className="odp__input-table odp__eof-table">
        <thead>
        <tr>
          <th className="odp__eof-header-left odp__eof-divide-after-cell" colSpan="2">National classes</th>
          <th className="odp__eof-header-left" colSpan="3">FRA classes</th>
        </tr>
        <tr>
          <th className="odp__eof-header-left">Class</th>
          <th className="odp__eof-divide-after-cell odp__eof-header-right">Area</th>
          <th className="odp__eof-header-right">Forest</th>
          <th className="odp__eof-header-right">Other wooded land</th>
          <th className="odp__eof-header-right">Other land</th>
        </tr>
        </thead>
        <tbody>
        {
          extentOfForestRows(countryIso, active, saveDraft)
        }
        <tr>
          <td className="odp__national-class-total-heading">Total</td>
          <td className="odp__national-class-total-cell odp__eof-divide-after-cell"></td>
          <td className="odp__national-class-total-cell">{ originalDataPoint.totalForest(active, 'forestPercent') }</td>
          <td
            className="odp__national-class-total-cell">{ originalDataPoint.totalForest(active, 'otherWoodedLandPercent') }</td>
          <td
            className="odp__national-class-total-cell">{ originalDataPoint.totalForest(active, 'otherLandPercent') }</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div className="odp__bottom-buttons">
      <span className={ saveControlsDisabled() ? 'btn btn-destructive disabled' : 'btn btn-destructive' }
            onClick={ () => saveControlsDisabled() ? null : remove(countryIso, active.odpId) }>
         Delete
      </span>
      <div>
        <a className="btn btn-secondary odp__cancel-button"
           href={`/\#/country/${countryIso}`}>
          Cancel
        </a>
        <button disabled={ saveControlsDisabled() }
                className="btn btn-primary"
                onClick={() => markAsActual(countryIso, active.odpId) }>
          Save & Close
        </button>
      </div>
    </div>
  </div>
}

const mapIndexed = R.addIndex(R.map)

const updatePastedValues = (odp, rowIndex, saveDraft, countryIso, dataCols, colIndex, isInteger) => evt => {
  evt.stopPropagation()
  evt.preventDefault()

  const el = document.createElement('html')
  el.innerHTML = evt.clipboardData.getData('text/html')

  let i = rowIndex * dataCols.length + colIndex
  R.map(row => {
    const cols = row.getElementsByTagName('td')
    const offset = dataCols.length - cols.length
    mapIndexed((col, j) => {
      const property = dataCols[i % dataCols.length]
      const value = isInteger ? Math.round(Number(col.innerText.replace(/\s+/g, ''))) : col.innerText
      odp = originalDataPoint.updateNationalClass(odp, Math.floor(i / dataCols.length), property, value)
      i += (j === cols.length - 1) ? offset + 1 : 1
    }, cols)
  }, el.getElementsByTagName('tr'))

  saveDraft(countryIso, odp)
}

const nationalClassCols = ['className', 'definition']
const nationalClassRows = (countryIso, odp, saveDraft) => {
  return mapIndexed((nationalClass, index) => <NationalClassRow
    key={index}
    index={index}
    odp={odp}
    saveDraft={saveDraft}
    countryIso={countryIso}
    {...nationalClass}/>, odp.nationalClasses)
}

const NationalClassRow = ({odp, index, saveDraft, countryIso, className, definition, placeHolder}) =>
  <tr>
    <td className="odp__national-class-row-class-name">
      { placeHolder
        ? null //placeHolder-rows can't be removed
        : <div
          className="odp__national-class-remove"
          onClick={(evt) => saveDraft(countryIso, originalDataPoint.removeNationalClass(odp, index))}>
            <svg className="icon"><use xlinkHref="img/icon.svg#icon-small-remove"/></svg>
        </div>
      }
      <input className="odp__national-class-row-class-name-input"
             type="text"
             placeholder={ !placeHolder ? 'Enter or copy and paste national classes' : ''}
             value={className || ''}
             onChange={(evt) =>
               saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, 'className', evt.target.value))}
             onPaste={ updatePastedValues(odp, index, saveDraft, countryIso, nationalClassCols, 0) }
      />
    </td>
    <td>
      <input type="text"
             value={definition || '' }
             onChange={(evt) =>
               saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, 'definition', evt.target.value))}
             onPaste={ updatePastedValues(odp, index, saveDraft, countryIso, nationalClassCols, 1) }
      />
    </td>
  </tr>

const extentOfForestCols = ['area', 'forestPercent', 'otherWoodedLandPercent', 'otherLandPercent']
const extentOfForestRows = (countryIso, odp, saveDraft) =>
  R.pipe(
    R.filter(nationalClass => !nationalClass.placeHolder),
    mapIndexed((nationalClass, index) => <ExtentOfForestRow
      key={index}
      index={index}
      odp={odp}
      saveDraft={saveDraft}
      countryIso={countryIso}
      {...nationalClass}/>)
  )(odp.nationalClasses)

const ExtentOfForestRow = ({
                             odp,
                             index,
                             saveDraft,
                             countryIso,
                             className,
                             area,
                             forestPercent,
                             otherWoodedLandPercent,
                             otherLandPercent,
                             ...props
                           }) => {

  const numberUpdated = (fieldName, currentValue) => evt =>
    saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, fieldName, acceptNextInteger(evt.target.value, currentValue)))

  return <tr>
    <td className="odp__eof-class-name"><span>{className}</span></td>
    <td className="odp__eof-area-cell odp__eof-divide-after-cell">
      <ThousandSeparatedIntegerInput integerValue={ area }
                                     onChange={ numberUpdated('area', area) }
                                     onPaste={ updatePastedValues(odp, index, saveDraft, countryIso, extentOfForestCols, 0, true) }/>
    </td>
    <td className="odp__eof-percent-cell">
      <input
        type="text"
        value={forestPercent || ''}
        onChange={ numberUpdated('forestPercent', forestPercent) }
        onPaste={ updatePastedValues(odp, index, saveDraft, countryIso, extentOfForestCols, 1, true) }
      />
      % &nbsp;
    </td>
    <td className="odp__eof-percent-cell">
      <input
        type="text"
        value={otherWoodedLandPercent || ''}
        onChange={ numberUpdated('otherWoodedLandPercent', otherWoodedLandPercent) }
        onPaste={ updatePastedValues(odp, index, saveDraft, countryIso, extentOfForestCols, 2, true) }
      />
      % &nbsp;
    </td>
    <td className="odp__eof-percent-cell">
      <input
        type="text"
        value={otherLandPercent || ''}
        onChange={ numberUpdated('otherLandPercent', otherLandPercent) }
        onPaste={ updatePastedValues(odp, index, saveDraft, countryIso, extentOfForestCols, 3, true) }
      />
      % &nbsp;
    </td>
  </tr>
}

class OriginalDataPointView extends React.Component {
  componentWillMount () {
    const odpId = this.props.match.params.odpId
    if (odpId) {
      this.props.fetch(odpId)
    } else {
      this.props.clearActive()
    }
  }

  render () {
    return <LoggedInPageTemplate>
      <div className="odp__container">
        <div className="odp_data-page-header">
          <h2 className="headline">Add national data point</h2>
        </div>
        <DataInput {...this.props}/>
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => {
  const odp = state.originalDataPoint
  const autoSaving = !!state.autoSave.status
  const active = odp.active || originalDataPoint.emptyDataPoint()
  return {...odp, active, autoSaving}
}

export default connect(mapStateToProps, {saveDraft, markAsActual, remove, fetch, clearActive})(OriginalDataPointView)
