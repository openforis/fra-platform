import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as originalDataPoint from './originalDataPoint'
import {
  saveDraft,
  markAsActual,
  remove,
  fetch,
  clearActive,
  copyPreviousNationalClasses,
  cancelDraft
} from './actions'
import { fetchNavStatus } from '../navigation/actions'
import { acceptNextInteger } from '../utils/numberInput'
import { readPasteClipboard } from '../utils/copyPasteUtil'
import { separateThousandsWithSpaces } from '../utils/numberFormat'
import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import R from 'ramda'
import ckEditorConfig from '../ckEditor/ckEditorConfig'
import ReviewIndicator from '../review/reviewIndicator'

const years = ['', ...R.range(1990, 2021)]

const isCommentsOpen =  (target, openThread = {}) => R.equals('NDP', openThread.section) && R.isEmpty(R.difference(openThread.target, target))

const DataInput = ({match, saveDraft, markAsActual, remove, active, autoSaving, cancelDraft, copyPreviousNationalClasses, copyDisabled, openThread}) => {
  const countryIso = match.params.countryIso
  const saveControlsDisabled = () => !active.odpId || autoSaving
  const copyPreviousClassesDisabled = () => active.year && !autoSaving ? false : true
  const yearValidationStatusClass = () => active.validationStatus && !active.validationStatus.year.valid ? 'error' : ''
  const unselectable = R.defaultTo([], active.reservedYears)

  return <div className="odp__data-input-component form-group">
    <div className="odp_data-input-row">
      <div className={`${yearValidationStatusClass()}`}>
        <h3 className="subhead">Year</h3>
        <select
          className="select"
          value={active.year || ''}
          onChange={
            (e) => saveDraft(countryIso, R.assoc('year', R.isEmpty(e.target.value) ? null : Number(e.target.value), active)) }>
          {
            years.map(
              year =>
                <option key={year}
                        value={year}
                        disabled={R.contains(year, unselectable)}>
                  {year}</option>
            )
          }
        </select>
      </div>
    </div>
    <div>
      <h3 className="subhead odp__section">
        National classes
        <button disabled={copyDisabled || copyPreviousClassesDisabled()}
                className="btn btn-primary btn-copy-prev-values"
                onClick={() => copyPreviousNationalClasses(countryIso, active)}>
          Copy previous values
        </button>
      </h3>
      <table className="odp__input-table odp__national-class-table">
        <thead>
        <tr>
          <th className="odp__national-class-table-national-class-column">National class</th>
          <th>Definition</th>
        </tr>
        </thead>
        <tbody>
        {
          nationalClassRows(countryIso, active, saveDraft, openThread)
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
          extentOfForestRows(countryIso, active, saveDraft, openThread)
        }
        <tr>
          <td className="fra-table__header-cell">Total</td>
          <td className="odp__national-class-total-cell odp__eof-divide-after-cell"></td>
          <td
            className="odp__national-class-total-cell">{ separateThousandsWithSpaces(Number(originalDataPoint.totalForest(active, 'forestPercent'))) }</td>
          <td
            className="odp__national-class-total-cell">{ separateThousandsWithSpaces(Number(originalDataPoint.totalForest(active, 'otherWoodedLandPercent'))) }</td>
          <td
            className="odp__national-class-total-cell">{ separateThousandsWithSpaces(Number(originalDataPoint.totalForest(active, 'otherLandPercent'))) }</td>
        </tr>
        </tbody>
      </table>
    </div>

    <h3 className="subhead odp__section">Comments</h3>
    <div className="cke_wrapper">
      { active.odpId
        ? <ReviewIndicator section='NDP'
                           name="National data point"
                           target={[`${active.odpId}`, 'comments']}
                           countryIso={countryIso}/>
        : null}
      <CommentsEditor active={active} match={match} saveDraft={saveDraft}/>
    </div>

    <div className="odp__bottom-buttons">
      <span className={ saveControlsDisabled() ? 'btn btn-destructive disabled' : 'btn btn-destructive' }
            onClick={ () => saveControlsDisabled() ? null : remove(countryIso, active.odpId) }>
         Delete
      </span>
      <div>
        <a className="btn btn-secondary odp__cancel-button"
           onClick={() => cancelDraft(countryIso, active.odpId)}>
          Cancel
        </a>
        <button disabled={ saveControlsDisabled() }
                className="btn btn-primary"
                onClick={() => markAsActual(countryIso, active) }>
          Save data
        </button>
      </div>
    </div>
  </div>
}

const mapIndexed = R.addIndex(R.map)

const updatePastedValues = (odp, rowIndex, saveDraft, countryIso, dataCols, colIndex, type = 'integer') => evt => {

  const updateOdp = (rowNo, colNo, value) => {
    odp = originalDataPoint.updateNationalClass(odp, rowNo, dataCols[colNo], value)
  }

  mapIndexed((r, i) => {
    const row = rowIndex+ i
    mapIndexed((c, j) => {
      const col = colIndex + j
      updateOdp(row, col, c)
    }, r)
  }, readPasteClipboard(evt, type))

  saveDraft(countryIso, odp)
}

const getValidationStatusRow = (odp, index) => odp.validationStatus
  ? R.defaultTo({}, R.find(R.propEq('uuid', odp.nationalClasses[index].uuid), odp.validationStatus.nationalClasses))
  : {}

const nationalClassCols = ['className', 'definition']
const nationalClassRows = (countryIso, odp, saveDraft, openThread) => {
  return mapIndexed((nationalClass, index) => <NationalClassRow
    key={index}
    index={index}
    odp={odp}
    saveDraft={saveDraft}
    countryIso={countryIso}
    openThread={openThread}
    {...nationalClass}/>, odp.nationalClasses)
}

const NationalClassRow = ({odp, index, saveDraft, countryIso, className, definition, placeHolder, openThread}) =>
    <tr className={`${isCommentsOpen([odp.nationalClasses[index].uuid, 'class_definition'], openThread) ? 'fra-row-comments__open' : ''}`}>
    <td
      className={`odp__national-class-row-class-name ${getValidationStatusRow(odp, index).validClassName === false ? 'error' : ''}`}>
      { placeHolder
        ? null //placeHolder-rows can't be removed
        : <div
          className="odp__national-class-remove"
          onClick={(evt) => saveDraft(countryIso, originalDataPoint.removeNationalClass(odp, index))}>
          <svg className="icon">
            <use xlinkHref="img/icon.svg#icon-small-remove"/>
          </svg>
        </div>
      }
      <input className="odp__national-class-row-class-name-input"
             type="text"
             placeholder={ placeHolder && index === 0 ? 'Enter or copy and paste national classes' : ''}
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
    <td className="odp__col-review">
      {placeHolder
        ? null
        : <ReviewIndicator section='NDP'
                           name="National data point"
                           target={[`${odp.nationalClasses[index].uuid}`, 'class_definition']}
                           countryIso={countryIso}/>
      }
    </td>
  </tr>

const extentOfForestCols = ['area', 'forestPercent', 'otherWoodedLandPercent', 'otherLandPercent']
const extentOfForestRows = (countryIso, odp, saveDraft, openThread) =>
  R.pipe(
    R.filter(nationalClass => !nationalClass.placeHolder),
    mapIndexed((nationalClass, index) => <ExtentOfForestRow
      key={index}
      index={index}
      odp={odp}
      saveDraft={saveDraft}
      countryIso={countryIso}
      openThread={openThread}
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
                             openThread,
                             ...props
                           }) => {

  const numberUpdated = (fieldName, currentValue) => evt =>
    saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, fieldName, acceptNextInteger(evt.target.value, currentValue)))

  const validationStatus = getValidationStatusRow(odp, index)
  const validationStatusPercentage = () => validationStatus.validPercentage === false ? 'error' : ''

  return <tr className={isCommentsOpen([odp.nationalClasses[index].uuid, 'ndp_class_value'], openThread) ? 'fra-row-comments__open' : ''}>
    <td className="odp__eof-class-name"><span>{className}</span></td>
    <td
      className={`odp__eof-area-cell odp__eof-divide-after-cell ${validationStatus.validArea === false ? 'error' : ''}`}>
      <ThousandSeparatedIntegerInput integerValue={ area }
                                     onChange={ numberUpdated('area', area) }
                                     onPaste={ updatePastedValues(odp, index, saveDraft, countryIso, extentOfForestCols, 0, 'integer') }/>
    </td>
    <td className={`odp__eof-percent-cell ${validationStatusPercentage()}`}>
      <input
        type="text"
        value={forestPercent || ''}
        onChange={ numberUpdated('forestPercent', forestPercent) }
        onPaste={ updatePastedValues(odp, index, saveDraft, countryIso, extentOfForestCols, 1, 'integer') }
      />
      % &nbsp;
    </td>
    <td className={`odp__eof-percent-cell ${validationStatusPercentage()}`}>
      <input
        type="text"
        value={otherWoodedLandPercent || ''}
        onChange={ numberUpdated('otherWoodedLandPercent', otherWoodedLandPercent) }
        onPaste={ updatePastedValues(odp, index, saveDraft, countryIso, extentOfForestCols, 2, 'integer') }
      />
      % &nbsp;
    </td>
    <td className={`odp__eof-percent-cell ${validationStatusPercentage()}`}>
      <input
        type="text"
        value={otherLandPercent || ''}
        onChange={ numberUpdated('otherLandPercent', otherLandPercent) }
        onPaste={ updatePastedValues(odp, index, saveDraft, countryIso, extentOfForestCols, 3, 'integer') }
      />
      % &nbsp;
    </td>
    <td className="odp__col-review">
      <ReviewIndicator section='NDP'
                       name="National data point"
                       target={[`${odp.nationalClasses[index].uuid}`, 'ndp_class_value']}
                       countryIso={countryIso}/>

    </td>
  </tr>
}

class CommentsEditor extends React.Component {

  initCKeditor () {
    if (this.props.match.params.odpId)
      this.descriptionEditor.setData(
        this.props.active.description,
        {callback: () => this.initCkeditorChangeListener()})
    else
      this.initCkeditorChangeListener()
  }

  initCkeditorChangeListener () {
    this.descriptionEditor.on('change', (evt) => {
        this.props.saveDraft(
          this.props.match.params.countryIso,
          {...this.props.active, description: evt.editor.getData()})
      }
    )
  }

  componentWillUnmount () {
    this.descriptionEditor.destroy(false)
    this.descriptionEditor = null
  }

  componentDidMount () {
    this.descriptionEditor = CKEDITOR.replace(document.getElementById('originalDataPointDescription'), ckEditorConfig)
    // We need to fetch the data only after CKEDITOR instance is ready :(
    // Otherwise there is no guarantee that the setData()-method succeeds in
    // setting pre-existing html-content
    this.descriptionEditor.on('instanceReady', () => this.initCKeditor())
  }

  render () {
    return <textarea id="originalDataPointDescription"/>
  }

}

class OriginalDataPointView extends React.Component {

  componentDidMount () {
    const odpId = R.defaultTo(null, this.props.match.params.odpId)
    this.props.fetch(odpId, this.props.match.params.countryIso)
  }

  componentWillUnmount () {
    this.props.fetchNavStatus(this.props.match.params.countryIso)
    this.props.clearActive()
  }

  render () {
    return <LoggedInPageTemplate>
      <div className="odp__container">
        <div className="odp_data-page-header">
          <h2 className="headline">National data point</h2>
        </div>
        {
          this.props.active
          ? <DataInput years={years}
                       copyDisabled={R.not(R.isNil(R.path(['match','params','odpId'], this.props)))}
                       {...this.props}/>
            : null

        }
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => {
  const odp = state.originalDataPoint
  const autoSaving = !!state.autoSave.status
  const active = odp.active
  const openThread = R.defaultTo({target: [], section: ''}, R.path(['review', 'openThread'], state))
  return {...odp, active, autoSaving, openThread}
}

export default connect(mapStateToProps, {
  saveDraft,
  markAsActual,
  remove,
  fetch,
  clearActive,
  copyPreviousNationalClasses,
  cancelDraft,
  fetchNavStatus
})(OriginalDataPointView)
