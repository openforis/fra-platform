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
import { fetchCountryOverviewStatus } from '../navigation/actions'
import { acceptNextInteger } from '../utils/numberInput'
import { readPasteClipboard } from '../utils/copyPasteUtil'
import { separateThousandsWithSpaces } from '../utils/numberFormat'
import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import { PercentInput } from '../reusableUiComponents/percentInput'
import VerticallyGrowingTextField from '../reusableUiComponents/verticallyGrowingTextField'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import R from 'ramda'
import ckEditorConfig from '../ckEditor/ckEditorConfig'
import ReviewIndicator from '../review/reviewIndicator'

const years = ['', ...R.range(1990, 2021)]

const isCommentsOpen = (target, openThread = {}) => R.equals('NDP', openThread.section) && R.isEmpty(R.difference(openThread.target, target))

const DataInput = ({match, saveDraft, markAsActual, remove, active, autoSaving, cancelDraft, copyPreviousNationalClasses, copyDisabled, openThread, i18n}) => {
  const countryIso = match.params.countryIso
  const saveControlsDisabled = () => !active.odpId || autoSaving
  const copyPreviousClassesDisabled = () => active.year && !autoSaving ? false : true
  const yearValidationStatusClass = () => active.validationStatus && !active.validationStatus.year.valid ? 'error' : ''
  const unselectable = R.defaultTo([], active.reservedYears)

  return <div className="odp__data-input-component odp_validate-form">
    <div className="odp_data-input-row">
      <div className={`${yearValidationStatusClass()}`}>
        <h3 className="subhead">{i18n.t('nationalDataPoint.year')}</h3>
        <select
          className="select validation-error-sensitive-field"
          value={active.year || ''}
          onChange={
            (e) => saveDraft(countryIso, R.assoc('year', R.isEmpty(e.target.value) ? null : Number(e.target.value), active))}>
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
        {i18n.t('nationalDataPoint.nationalClasses')}
        <button disabled={copyDisabled || copyPreviousClassesDisabled()}
                className="btn btn-primary btn-copy-prev-values"
                onClick={() => copyPreviousNationalClasses(countryIso, active)}>
          {i18n.t('nationalDataPoint.copyPreviousValues')}
        </button>
      </h3>
      <table className="odp__input-table odp__national-class-table">
        <thead>
        <tr>
          <th
            className="odp__national-class-table-national-class-column">{i18n.t('nationalDataPoint.nationalClass')}</th>
          <th>{i18n.t('nationalDataPoint.definition')}</th>
        </tr>
        </thead>
        <tbody>
        {
          nationalClassRows(countryIso, active, saveDraft, openThread, i18n)
        }
        </tbody>
      </table>
    </div>
    <div>
      <h3 className="subhead odp__section">{i18n.t('extentOfForest.extentOfForest')}</h3>
      <table className="odp__input-table odp__eof-table">
        <thead>
        <tr>
          <th className="odp__eof-header-left odp__eof-divide-after-cell"
              colSpan="2">{i18n.t('nationalDataPoint.nationalClasses')}</th>
          <th className="odp__eof-header-left" colSpan="3">{i18n.t('nationalDataPoint.fraClasses')}</th>
        </tr>
        <tr>
          <th className="odp__eof-header-left">{i18n.t('nationalDataPoint.class')}</th>
          <th className="odp__eof-divide-after-cell odp__eof-header-right">{i18n.t('nationalDataPoint.area')}</th>
          <th className="odp__eof-header-right">{i18n.t('fraClass.forest')}</th>
          <th className="odp__eof-header-right">{i18n.t('fraClass.otherWoodedLand')}</th>
          <th className="odp__eof-header-right">{i18n.t('fraClass.otherLand')}</th>
        </tr>
        </thead>
        <tbody>
        {
          extentOfForestRows(countryIso, active, saveDraft, openThread, i18n)
        }
        <tr>
          <td className="fra-table__header-cell">{i18n.t('nationalDataPoint.total')}</td>
          <td
            className="odp__national-class-total-cell odp__eof-divide-after-cell">{separateThousandsWithSpaces(Number(originalDataPoint.totalArea(active)))}</td>
          <td
            className="odp__national-class-total-cell">{separateThousandsWithSpaces(Number(originalDataPoint.totalForest(active, 'forestPercent')))}</td>
          <td
            className="odp__national-class-total-cell">{separateThousandsWithSpaces(Number(originalDataPoint.totalForest(active, 'otherWoodedLandPercent')))}</td>
          <td
            className="odp__national-class-total-cell">{separateThousandsWithSpaces(Number(originalDataPoint.totalForest(active, 'otherLandPercent')))}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <h3 className="subhead odp__section">{i18n.t('review.comments')}</h3>
    <div
      className={`odp__cke_wrapper ${isCommentsOpen([`${active.odpId}`, 'comments'], openThread) ? 'fra-row-comments__open' : '' }`}>
      <div className="cke_wrapper">
        <CommentsEditor active={active} match={match} saveDraft={saveDraft}/>
      </div>
      {active.odpId
        ? <ReviewIndicator section='NDP'
                           name={i18n.t('nationalDataPoint.nationalDataPoint')}
                           target={[`${active.odpId}`, 'comments']}
                           countryIso={countryIso}/>
        : null}
    </div>

    <div className="odp__bottom-buttons">
      <span className={saveControlsDisabled() ? 'btn btn-destructive disabled' : 'btn btn-destructive'}
            onClick={() => saveControlsDisabled() ? null : remove(countryIso, active.odpId)}>
         {i18n.t('nationalDataPoint.delete')}
      </span>
      <div>
        <a className="btn btn-secondary odp__cancel-button"
           onClick={() => cancelDraft(countryIso, active.odpId)}>
          {i18n.t('nationalDataPoint.cancel')}
        </a>
        <button disabled={saveControlsDisabled()}
                className="btn btn-primary"
                onClick={() => markAsActual(countryIso, active)}>
          {i18n.t('nationalDataPoint.saveData')}
        </button>
      </div>
    </div>
  </div>
}

const mapIndexed = R.addIndex(R.map)

const updatePastedValues = (odp, rowIndex, saveDraft, countryIso, dataCols, colIndex, type = 'integer', allowGrow = false) => evt => {
  const updateOdp = (rowNo, colNo, value) => {
    odp = originalDataPoint.updateNationalClass(odp, rowNo, dataCols[colNo], value)
  }
  const rowCount = R.filter(v => !v.placeHolder, odp.nationalClasses).length
  const pastedData = allowGrow ? readPasteClipboard(evt, type) : R.take(rowCount - rowIndex, readPasteClipboard(evt, type))

  mapIndexed((r, i) => {
    const row = rowIndex + i
    mapIndexed((c, j) => {
      const col = colIndex + j
      updateOdp(row, col, c)
    }, r)
  }, pastedData)
  saveDraft(countryIso, odp)
}

const getValidationStatusRow = (odp, index) => odp.validationStatus
  ? R.defaultTo({}, R.find(R.propEq('uuid', odp.nationalClasses[index].uuid), odp.validationStatus.nationalClasses))
  : {}

const nationalClassCols = ['className', 'definition']
const nationalClassRows = (countryIso, odp, saveDraft, openThread, i18n) => {
  return mapIndexed((nationalClass, index) => <NationalClassRow
    key={index}
    index={index}
    odp={odp}
    saveDraft={saveDraft}
    countryIso={countryIso}
    openThread={openThread}
    i18n={i18n}
    {...nationalClass}/>, odp.nationalClasses)
}

const NationalClassRow = ({odp, index, saveDraft, countryIso, className, definition, placeHolder, openThread, i18n}) =>
  <tr
    className={`${isCommentsOpen([odp.nationalClasses[index].uuid, 'class_definition'], openThread) ? 'fra-row-comments__open' : ''}`}>
    <td
      className={getValidationStatusRow(odp, index).validClassName === false ? 'error' : ''}>
      <div className="odp__national-class-remove-anchor">
        {placeHolder
          ? null //placeHolder-rows can't be removed
          : <div
            className="odp__national-class-remove"
            onClick={(evt) => saveDraft(countryIso, originalDataPoint.removeNationalClass(odp, index))}>
            <svg className="icon">
              <use xlinkHref="img/icon.svg#icon-small-remove"/>
            </svg>
          </div>
        }
        <input className="odp__national-class-row-class-name-input validation-error-sensitive-field"
               type="text"
               placeholder={placeHolder && index === 0 ? i18n.t('nationalDataPoint.enterOrCopyPasteNationalClasses') : ''}
               value={className || ''}
               onChange={(evt) =>
                 saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, 'className', evt.target.value))}
               onPaste={updatePastedValues(odp, index, saveDraft, countryIso, nationalClassCols, 0, 'text', true)}
        />
      </div>
    </td>
    <td>
      <VerticallyGrowingTextField
        id={`odp-description-field-${index}`}
        value={definition || ''}
        onChange={(evt) =>
          saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, 'definition', evt.target.value))}
        onPaste={updatePastedValues(odp, index, saveDraft, countryIso, nationalClassCols, 1, 'text', true)}
      />

    </td>
    <td className="odp__col-review">
      {placeHolder || !odp.odpId
        ? null
        : <ReviewIndicator section='NDP'
                           name={i18n.t('nationalDataPoint.nationalDataPoint')}
                           target={[odp.odpId, 'class_definition', `${odp.nationalClasses[index].uuid}`]}
                           countryIso={countryIso}/>
      }
    </td>
  </tr>

const extentOfForestCols = ['area', 'forestPercent', 'otherWoodedLandPercent', 'otherLandPercent']
const extentOfForestRows = (countryIso, odp, saveDraft, openThread, i18n) =>
  R.pipe(
    R.filter(nationalClass => !nationalClass.placeHolder),
    mapIndexed((nationalClass, index) => <ExtentOfForestRow
      key={index}
      index={index}
      odp={odp}
      saveDraft={saveDraft}
      countryIso={countryIso}
      openThread={openThread}
      i18n={i18n}
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
                             i18n,
                             ...props
                           }) => {

  const numberUpdated = (fieldName, currentValue) => evt =>
    saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, fieldName, acceptNextInteger(evt.target.value, currentValue)))

  const validationStatus = getValidationStatusRow(odp, index)
  const validationStatusPercentage = () => validationStatus.validPercentage === false ? 'error' : ''

  return <tr
    className={isCommentsOpen([odp.nationalClasses[index].uuid, 'ndp_class_value'], openThread) ? 'fra-row-comments__open' : ''}>
    <td className="odp__eof-class-name"><span>{className}</span></td>
    <td
      className={`odp__eof-area-cell odp__eof-divide-after-cell ${validationStatus.validArea === false ? 'error' : ''}`}>
      <ThousandSeparatedIntegerInput integerValue={area}
                                     onChange={numberUpdated('area', area)}
                                     onPaste={updatePastedValues(odp, index, saveDraft, countryIso, extentOfForestCols, 0, 'integer')}/>
    </td>
    <td className={`${validationStatusPercentage()}`}>
      <PercentInput
        value={forestPercent || ''}
        onChange={numberUpdated('forestPercent', forestPercent)}
        onPaste={updatePastedValues(odp, index, saveDraft, countryIso, extentOfForestCols, 1, 'integer')}
      />
    </td>
    <td className={`${validationStatusPercentage()}`}>
      <PercentInput
        value={otherWoodedLandPercent || ''}
        onChange={numberUpdated('otherWoodedLandPercent', otherWoodedLandPercent)}
        onPaste={updatePastedValues(odp, index, saveDraft, countryIso, extentOfForestCols, 3, 'integer')}
      />
    </td>
    <td className={`${validationStatusPercentage()}`}>
      <PercentInput
        value={otherLandPercent || ''}
        onChange={numberUpdated('otherLandPercent', otherLandPercent)}
        onPaste={updatePastedValues(odp, index, saveDraft, countryIso, extentOfForestCols, 3, 'integer')}
      />
    </td>
    <td className="odp__col-review">
      {odp.odpId
        ? <ReviewIndicator section='NDP'
                           name={i18n.t('nationalDataPoint.nationalDataPoint')}
                           target={[odp.odpId, 'class_value', `${odp.nationalClasses[index].uuid}`]}
                           countryIso={countryIso}/>
        : null}
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
    this.props.fetchCountryOverviewStatus(this.props.match.params.countryIso)
    this.props.clearActive()
  }

  render () {
    return <LoggedInPageTemplate>
      <div className="odp__container">
        <div className="odp_data-page-header">
          <h2 className="headline">{this.props.i18n.t('nationalDataPoint.nationalDataPoint')}</h2>
        </div>
        {
          this.props.active
            ? <DataInput years={years}
                         copyDisabled={R.not(R.isNil(R.path(['match', 'params', 'odpId'], this.props)))}
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
  return {...odp, active, autoSaving, openThread, i18n: state.user.i18n}
}

export default connect(mapStateToProps, {
  saveDraft,
  markAsActual,
  remove,
  fetch,
  clearActive,
  copyPreviousNationalClasses,
  cancelDraft,
  fetchCountryOverviewStatus
})(OriginalDataPointView)
