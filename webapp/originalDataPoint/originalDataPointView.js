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
import { fetchCountryOverviewStatus } from '../country/actions'
import { acceptNextDecimal } from '../utils/numberInput'
import { add, sub, greaterThan } from '../../common/bignumberUtils'
import { readPasteClipboard } from '../utils/copyPasteUtil'
import { formatDecimal } from '../utils/numberFormat'
import { ThousandSeparatedDecimalInput } from '../reusableUiComponents/thousandSeparatedDecimalInput'
import { PercentInput } from '../reusableUiComponents/percentInput'

import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import R from 'ramda'
import ckEditorConfig from '../ckEditor/ckEditorConfig'
import ReviewIndicator from '../review/reviewIndicator'
import DefinitionLink from '../reusableUiComponents/definitionLink'

import { fetchLastSectionUpdateTimestamp } from '../audit/actions'
import { Link } from '../reusableUiComponents/link'

import DataSources from './components/dataSources'
import NationalClasses from './components/nationalClasses'

const years = ['', ...R.pipe(R.range(1950), R.reverse)(2021)]

import { isCommentsOpen, getValidationStatusRow, updatePastedValues } from './components/commonFunctions'

const OdpViewContent = (props) => {

  const {
    match, saveDraft, markAsActual, remove,
    odp, autoSaving, cancelDraft, copyPreviousNationalClasses,
    copyDisabled, openThread, i18n, useOriginalDataPointsInFoc
  } = props

  const countryIso = match.params.countryIso
  const saveControlsDisabled = () => !odp.odpId || autoSaving

  const yearValidationStatusClass = () => odp.validationStatus && !odp.validationStatus.year.valid ? 'error' : ''
  const unselectable = R.defaultTo([], odp.reservedYears)
  const activeTab = match.params.tab

  return <div className="fra-view__content">
    <div className="fra-view__page-header">
      <h1 className="title align-left">{i18n.t('nationalDataPoint.nationalDataPoint')}</h1>
      {
        odp.editStatus && odp.editStatus !== 'newDraft'
          ? <button
            className="btn btn-secondary margin-right"
            disabled={saveControlsDisabled()}
            onClick={() => cancelDraft(countryIso, odp.odpId, activeTab)}>
            {i18n.t('nationalDataPoint.discardChanges')}
          </button>
          : null
      }
      <button
        className="btn btn-primary"
        disabled={saveControlsDisabled()}
        onClick={() => markAsActual(countryIso, odp, activeTab)}>
        {i18n.t('nationalDataPoint.doneEditing')}
      </button>
      <div className="odp-v-divider"></div>
      <button
        className="btn btn-destructive"
        disabled={saveControlsDisabled()}
        onClick={() => window.confirm(i18n.t('nationalDataPoint.confirmDelete'))
          ? remove(countryIso, odp.odpId, activeTab)
          : null
        }>
        {i18n.t('nationalDataPoint.delete')}
      </button>
    </div>

    <div className="odp__section">
      <h3 className="subhead">{i18n.t('nationalDataPoint.referenceYearData')}</h3>
      <div className={`odp__year-selection ${yearValidationStatusClass()}`}>
        <select
          className="select validation-error-sensitive-field"
          value={odp.year || ''}
          onChange={
            (e) => saveDraft(countryIso, R.assoc('year', R.isEmpty(e.target.value) ? null : Number(e.target.value), odp))}>
          {
            years.map(
              year =>
                <option key={year}
                        value={year}
                        disabled={R.contains(year.toString(), unselectable)}
                        hidden={year ? false : true}>
                  {year ? year : i18n.t('nationalDataPoint.selectYear')}</option>
            )
          }
        </select>
      </div>
    </div>

    <DataSources {...props}/>

    <NationalClasses {...props} />

    <h2 className="headline">{i18n.t('nationalDataPoint.reclassificationLabel')}</h2>

    <div className="odp__tab-controller">
      <Link
        className={`odp__tab-item ${activeTab === 'extentOfForest' ? 'active' : null}`}
        to={`/country/${countryIso}/odp/extentOfForest/${odp.odpId ? odp.odpId : null}`}>
        1a {i18n.t('nationalDataPoint.forestCategoriesLabel')}
      </Link>
      {
        useOriginalDataPointsInFoc
          ? <Link
            className={`odp__tab-item ${activeTab === 'forestCharacteristics' ? 'active' : null}`}
            to={`/country/${countryIso}/odp/forestCharacteristics/${odp.odpId ? odp.odpId : null}`}>
            1b {i18n.t('nationalDataPoint.forestCharacteristics')}
          </Link>
          : <span className="odp__tab-item">
            1b {i18n.t('nationalDataPoint.forestCharacteristics')}
            <span className="odp__tab-item-support">({i18n.t('nationalDataPoint.disabled')})</span>
          </span>
      }
    </div>

    {
      activeTab === 'extentOfForest'
        ? <ExtentOfForestSection
          odp={odp}
          countryIso={countryIso}
          saveDraft={saveDraft}
          openThread={openThread}
          i18n={i18n}/>
        : <ForestCharacteristicsSection
          odp={odp}
          countryIso={countryIso}
          saveDraft={saveDraft}
          openThread={openThread}
          i18n={i18n}/>
    }

    <div className="odp__section">
      <div className="fra-description">
        <div className={
          isCommentsOpen([`${odp.odpId}`, 'comments'], openThread)
            ? 'fra-description__wrapper fra-row-comments__open'
            : 'fra-description__wrapper'
        }>
          <CommentsEditor odp={odp} match={match} saveDraft={saveDraft} i18n={i18n} title={i18n.t('review.comments')}/>
        </div>
        <div className="fra-description__review-indicator-wrapper">
          {
            odp.odpId
              ? <ReviewIndicator
                section='odp'
                title={i18n.t('nationalDataPoint.nationalDataPoint')}
                target={[`${odp.odpId}`, 'comments']}
                countryIso={countryIso}/>
              : null
          }
        </div>
      </div>
    </div>

    <div className="odp__bottom-buttons">
      {
        odp.editStatus && odp.editStatus !== 'newDraft'
          ? <button
            className="btn btn-secondary"
            disabled={saveControlsDisabled()}
            onClick={() => cancelDraft(countryIso, odp.odpId, activeTab)}>
            {i18n.t('nationalDataPoint.discardChanges')}
          </button>
          : null
      }
      <button
        className="btn btn-primary"
        disabled={saveControlsDisabled()}
        onClick={() => markAsActual(countryIso, odp, activeTab)}>
        {i18n.t('nationalDataPoint.doneEditing')}
      </button>
      <div className="odp-v-divider"></div>
      <button
        className="btn btn-destructive"
        disabled={saveControlsDisabled()}
        onClick={() => window.confirm(i18n.t('nationalDataPoint.confirmDelete'))
          ? remove(countryIso, odp.odpId, activeTab)
          : null
        }>
        {i18n.t('nationalDataPoint.delete')}
      </button>
    </div>
  </div>
}

const ExtentOfForestSection = ({ odp, countryIso, saveDraft, openThread, i18n }) => {
  return <div className="odp__section">
    <div className="odp__section-header">
      <h3 className="subhead">{i18n.t('nationalDataPoint.forestCategoriesLabel')}</h3>
      <DefinitionLink document="tad" anchor="1a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
    </div>
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table">
          <thead>
          <tr>
            <th className="fra-table__header-cell fra-table__divider"
                colSpan="2">{i18n.t('nationalDataPoint.nationalClasses')}</th>
            <th className="fra-table__header-cell"
                colSpan="3">{i18n.t('nationalDataPoint.fraClasses')}</th>
          </tr>
          <tr>
            <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.class')}</th>
            <th className="fra-table__header-cell fra-table__divider">{i18n.t('nationalDataPoint.area')}</th>
            <th className="fra-table__header-cell">{i18n.t('fraClass.forest')}</th>
            <th className="fra-table__header-cell">{i18n.t('fraClass.otherWoodedLand')}</th>
            <th className="fra-table__header-cell">{i18n.t('fraClass.otherLand')}</th>
          </tr>
          </thead>
          <tbody>
          {
            extentOfForestRows(countryIso, odp, saveDraft, openThread, i18n)
          }
          <tr>
            <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.total')}</th>
            <td
              className="fra-table__calculated-cell fra-table__divider">{formatDecimal(originalDataPoint.totalArea(odp))}</td>
            <td
              className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.classTotalArea(odp, 'forestPercent'))}</td>
            <td
              className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.classTotalArea(odp, 'otherWoodedLandPercent'))}</td>
            <td className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.otherLandTotalArea(odp))}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
}

const ForestCharacteristicsSection = ({ odp, countryIso, saveDraft, openThread, i18n }) => {

  const plantationTotal = originalDataPoint.subClassTotalArea(odp, 'forestPercent', 'plantationPercent')
  const hasPlantation = plantationTotal && greaterThan(plantationTotal, 0)

  return <div className="odp__section">
    <div className="odp__section-header">
      <h3 className="subhead">{i18n.t('nationalDataPoint.forestCharacteristics')}</h3>
      <DefinitionLink document="tad" anchor="1b" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
    </div>
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table className="fra-table">
          <thead>
          <tr>
            <th className="fra-table__header-cell fra-table__divider"
                colSpan="2">{i18n.t('nationalDataPoint.nationalClasses')}</th>
            <th className="fra-table__header-cell"
                colSpan="3">{i18n.t('nationalDataPoint.fraClasses')}</th>
          </tr>
          <tr>
            <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.class')}</th>
            <th className="fra-table__header-cell fra-table__divider">{i18n.t('nationalDataPoint.area')}</th>
            <th
              className="fra-table__header-cell">{i18n.t('fraForestCharacteristicsClass.naturallyRegeneratingForest')}</th>
            <th className="fra-table__header-cell">{i18n.t('fraForestCharacteristicsClass.plantationForest')}</th>
            <th className="fra-table__header-cell">{i18n.t('fraForestCharacteristicsClass.otherPlantedForest')}</th>
          </tr>
          </thead>
          <tbody>
          {
            foresCharaceristicsRows(countryIso, odp, saveDraft, openThread, i18n)
          }
          <tr>
            <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.total')}</th>
            <th
              className="fra-table__calculated-cell fra-table__divider">{formatDecimal(originalDataPoint.classTotalArea(odp, 'forestPercent'))}</th>
            <td
              className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.subClassTotalArea(odp, 'forestPercent', 'naturalForestPercent'))}</td>
            <td
              className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.subClassTotalArea(odp, 'forestPercent', 'plantationPercent'))}</td>
            <td
              className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.subClassTotalArea(odp, 'forestPercent', 'otherPlantedPercent'))}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    {
      hasPlantation
        ? <div className="fra-table__container">
          <div className="fra-table__scroll-wrapper">
            <table className="fra-table odp__sub-table">
              <thead>
              <tr>
                <th
                  className="fra-table__header-cell-left">{i18n.t('fraForestCharacteristicsClass.plantationForest')}</th>
                <th className="fra-table__header-cell fra-table__divider">{i18n.t('nationalDataPoint.area')}</th>
                <th className="fra-table__header-cell">{i18n.t('fraForestCharacteristicsClass.ofWhichIntroduced')}</th>
              </tr>
              </thead>
              <SubcategoryTableBody
                odp={odp}
                countryIso={countryIso}
                saveDraft={saveDraft}
                openThread={openThread}
                parentCategory="plantationPercent"
                ancestorCategory="forestPercent"
                categoryColumns={[{ name: 'plantationIntroducedPercent', type: 'decimal' }]}
                targetSuffix="plantation_forest_introduced"
                validationResultField="validPlantationIntroducedPercentage"
                reviewTitleKey="plantationForest"
                i18n={i18n}/>
              <tfoot>
              <tr>
                <th className="fra-table__header-cell-left">{i18n.t('nationalDataPoint.total')}</th>
                <th
                  className="fra-table__calculated-cell fra-table__divider">{formatDecimal(originalDataPoint.subClassTotalArea(odp, 'forestPercent', 'plantationPercent'))}</th>
                <td
                  className="fra-table__calculated-cell">{formatDecimal(originalDataPoint.subSubClassTotalArea(odp, 'forestPercent', 'plantationPercent', 'plantationIntroducedPercent'))}</td>
              </tr>
              </tfoot>
            </table>
          </div>
        </div>
        : null
    }
  </div>
}

const mapIndexed = R.addIndex(R.map)

const extentOfForestCols = [
  { name: 'area', type: 'decimal' },
  { name: 'forestPercent', type: 'decimal' },
  { name: 'otherWoodedLandPercent', type: 'decimal' },
  { name: 'otherLandPercent', type: 'decimal' }]

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

const numberUpdateCreator = (saveDraft) => (countryIso, odp, index, fieldName, currentValue) => evt => {
  saveDraft(countryIso, originalDataPoint.updateNationalClass(odp, index, fieldName, acceptNextDecimal(evt.target.value, currentValue)))
}

const ExtentOfForestRow =
  ({
     odp,
     index,
     saveDraft,
     countryIso,
     className,
     area,
     forestPercent,
     otherWoodedLandPercent,
     openThread,
     i18n
   }) => {

    const validationStatus = getValidationStatusRow(odp, index)
    const eofStatusPercentage = () => validationStatus.validEofPercentage === false ? 'error' : ''
    const numberUpdated = numberUpdateCreator(saveDraft)

    return <tr
      className={isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'value'], openThread) ? 'fra-row-comments__open' : ''}>
      <th className="fra-table__category-cell">{className}</th>
      <td
        className={`fra-table__cell fra-table__divider ${validationStatus.validArea === false ? 'error' : ''}`}>
        <ThousandSeparatedDecimalInput
          numberValue={area}
          onChange={numberUpdated(countryIso, odp, index, 'area', area)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 0,
            columns: extentOfForestCols,
            saveDraft
          })}/>
      </td>
      <td className={`fra-table__cell ${eofStatusPercentage()}`}>
        <PercentInput
          numberValue={forestPercent}
          onChange={numberUpdated(countryIso, odp, index, 'forestPercent', forestPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 1,
            columns: extentOfForestCols,
            saveDraft
          })}
        />
      </td>
      <td className={`fra-table__cell ${eofStatusPercentage()}`}>
        <PercentInput
          numberValue={otherWoodedLandPercent}
          onChange={numberUpdated(countryIso, odp, index, 'otherWoodedLandPercent', otherWoodedLandPercent)}
          onPaste={updatePastedValues({
            odp,
            countryIso,
            rowIndex: index,
            colIndex: 2,
            columns: extentOfForestCols,
            saveDraft
          })}
        />
      </td>
      <td className="fra-table__calculated-cell">
        {formatDecimal(sub(100, add(forestPercent, otherWoodedLandPercent)))}
        <span style={{ marginLeft: '8px' }}>%</span>
      </td>
      <td className="fra-table__row-anchor-cell">
        {odp.odpId
          ? <div className="odp__review-indicator-row-anchor">
            <ReviewIndicator
              section='odp'
              title={i18n.t('nationalDataPoint.forestCategoriesLabel')}
              target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'value']}
              countryIso={countryIso}/>
          </div>
          : null}
      </td>
    </tr>
  }

const forestCharacteristicsCols = [
  { name: 'area', type: 'decimal' },
  { name: 'naturalForestPercent', type: 'decimal' },
  { name: 'plantationPercent', type: 'decimal' },
  { name: 'otherPlantedPercent', type: 'decimal' }
]

const foresCharaceristicsRows = (countryIso, odp, saveDraft, openThread, i18n) =>
  R.pipe(
    R.filter(nationalClass => !nationalClass.placeHolder),
    mapIndexed((nationalClass, index) => <ForestCharacteristicsRow
      key={index}
      index={index}
      odp={odp}
      saveDraft={saveDraft}
      countryIso={countryIso}
      openThread={openThread}
      i18n={i18n}
      {...nationalClass}/>)
  )(odp.nationalClasses)

const ForestCharacteristicsRow =
  ({
     odp,
     index,
     saveDraft,
     countryIso,
     className,
     area,
     naturalForestPercent,
     plantationPercent,
     otherPlantedPercent,
     openThread,
     i18n
   }) => {
    const numberUpdated = numberUpdateCreator(saveDraft)
    const validationStatus = getValidationStatusRow(odp, index)
    const focStatusPercentage = () => validationStatus.validFocPercentage === false ? 'error' : ''
    const nationalClass = odp.nationalClasses[index]
    const allowedClass = (nc) => nc.forestPercent > 0

    return !allowedClass(nationalClass)
      ? null
      : <tr
        className={isCommentsOpen([odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'forest_charasteristics'], openThread) ? 'fra-row-comments__open' : ''}>
        <th className="fra-table__category-cell">{className}</th>
        <th
          className={`fra-table__calculated-sub-cell fra-table__divider`}>{formatDecimal(area ? area * nationalClass.forestPercent / 100 : null)}</th>
        <td className={`fra-table__cell ${focStatusPercentage()}`}>
          <PercentInput
            numberValue={naturalForestPercent}
            onChange={numberUpdated(countryIso, odp, index, 'naturalForestPercent', naturalForestPercent)}
            onPaste={updatePastedValues({
              odp,
              countryIso,
              rowIndex: index,
              colIndex: 1,
              columns: forestCharacteristicsCols,
              saveDraft,
              allowedClass
            })}
          />
        </td>
        <td className={`fra-table__cell ${focStatusPercentage()}`}>
          <PercentInput
            numberValue={plantationPercent}
            onChange={numberUpdated(countryIso, odp, index, 'plantationPercent', plantationPercent)}
            onPaste={updatePastedValues({
              odp,
              countryIso,
              rowIndex: index,
              colIndex: 2,
              columns: forestCharacteristicsCols,
              saveDraft,
              allowedClass
            })}
          />
        </td>
        <td className={`fra-table__cell ${focStatusPercentage()}`}>
          <PercentInput
            numberValue={otherPlantedPercent}
            onChange={numberUpdated(countryIso, odp, index, 'otherPlantedPercent', otherPlantedPercent)}
            onPaste={updatePastedValues({
              odp,
              countryIso,
              rowIndex: index,
              colIndex: 3,
              columns: forestCharacteristicsCols,
              saveDraft,
              allowedClass
            })}
          />
        </td>
        <td className="fra-table__row-anchor-cell">
          {odp.odpId
            ? <div className="odp__review-indicator-row-anchor">
              <ReviewIndicator
                section='odp'
                title={i18n.t('nationalDataPoint.forestCharacteristics')}
                target={[odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, 'forest_charasteristics']}
                countryIso={countryIso}/>
            </div>
            : null}
        </td>
      </tr>
  }

const SubcategoryTableBody = props => <tbody>{
  R.pipe(
    R.filter(nationalClass => !nationalClass.placeHolder),
    mapIndexed((nationalClass, index) => <SubcategoryRow
      key={index}
      index={index}
      {...props}
      {...nationalClass}/>)
  )(props.odp.nationalClasses)
}</tbody>

const SubcategoryRow =
  ({
     odp,
     index,
     saveDraft,
     countryIso,
     className,
     area,
     openThread,
     parentCategory,
     ancestorCategory = null,
     categoryColumns,
     targetSuffix,
     validationResultField,
     reviewTitleKey,
     i18n
   }) => {
    const nationalClass = odp.nationalClasses[index]
    const numberUpdated = numberUpdateCreator(saveDraft)
    const validationStatus = getValidationStatusRow(odp, index)[validationResultField]
    const displayError = () => validationStatus === false ? 'error' : ''
    const commentTarget = [odp.odpId, 'class', `${odp.nationalClasses[index].uuid}`, targetSuffix]
    const areaMultiplier = ancestorCategory ? nationalClass[parentCategory] * nationalClass[ancestorCategory] / 10000 : nationalClass[parentCategory] / 100
    const categoryArea = area ? area * areaMultiplier : null
    const allowedClass = nc => ancestorCategory ? nc[parentCategory] > 0 && nc[ancestorCategory] > 0 : nc[parentCategory] > 0

    return !allowedClass(nationalClass)
      ? null
      : <tr className={isCommentsOpen(commentTarget, openThread) ? 'fra-row-comments__open' : ''}>
        <th className="fra-table__category-cell">{className}</th>
        <th className={`fra-table__calculated-sub-cell fra-table__divider`}>{formatDecimal(categoryArea)}</th>
        {
          mapIndexed((col, colIndex) => {
            const currentCol = categoryColumns[colIndex].name
            return <td key={colIndex} className={`fra-table__cell ${displayError()}`}>
              <PercentInput
                numberValue={nationalClass[currentCol]}
                onChange={numberUpdated(countryIso, odp, index, currentCol, nationalClass[currentCol])}
                onPaste={updatePastedValues({
                  odp,
                  countryIso,
                  rowIndex: index,
                  colIndex: colIndex,
                  columns: categoryColumns,
                  saveDraft,
                  allowedClass
                })}
              />
            </td>
          }, categoryColumns)
        }
        <td className="fra-table__row-anchor-cell">
          {odp.odpId
            ? <div className="odp__review-indicator-row-anchor">
              <ReviewIndicator
                section='odp'
                title={i18n.t('nationalDataPoint.' + reviewTitleKey)}
                target={commentTarget}
                countryIso={countryIso}/>
            </div>
            : null}
        </td>
      </tr>
  }

class CommentsEditor extends React.Component {

  constructor (props) {
    super(props)
    this.state = { open: false }
  }

  initCKeditor () {
    if (this.props.match.params.odpId) {
      this.descriptionEditor.setData(
        this.props.odp.description,
        { callback: () => this.initCkeditorChangeListener() })
    } else {
      this.initCkeditorChangeListener()
    }
  }

  initCkeditorChangeListener () {
    this.descriptionEditor.on('change', (evt) => {
        this.props.saveDraft(
          this.props.match.params.countryIso,
          { ...this.props.odp, description: evt.editor.getData() })
      }
    )
  }

  componentWillUnmount () {
    this.descriptionEditor.destroy(false)
    this.descriptionEditor = null
  }

  componentDidMount () {
    this.descriptionEditor = CKEDITOR.replace(this.refs.originalDataPointDescription, ckEditorConfig)
    // We need to fetch the data only after CKEDITOR instance is ready :(
    // Otherwise there is no guarantee that the setData()-method succeeds in
    // setting pre-existing html-content
    this.descriptionEditor.on('instanceReady', () => this.initCKeditor())
  }

  componentDidUpdate () {
    if (this.state.open && this.state.shouldStealFocus) {
      this.descriptionEditor.focus()
      this.setState({ ...this.state, shouldStealFocus: false })
    }
  }

  render () {
    return <div>
      <div className="fra-description__header-row">
        <h3 className="subhead fra-description__header">{this.props.title}</h3>
        <div className="fra-description__link" onClick={e => {
          this.state.open
            ? this.setState({ open: false })
            : this.setState({ open: true, shouldStealFocus: true })
          e.stopPropagation()
        }
        }>
          {this.state.open ? this.props.i18n.t('description.done') : this.props.i18n.t('description.edit')}
        </div>
      </div>
      <div className="cke_wrapper" style={{ display: this.state.open ? 'block' : 'none' }}>
        <textarea ref="originalDataPointDescription"/>
      </div>
      {
        this.props.odp.description
          ? <div className="fra-description__preview" style={{ display: this.state.open ? 'none' : 'block' }}
                 dangerouslySetInnerHTML={{ __html: this.props.odp.description }}/>
          : null
      }

    </div>
  }

}

class OriginalDataPointView extends React.Component {

  componentDidMount () {
    const odpId = R.defaultTo(null, this.props.match.params.odpId)
    this.props.fetch(odpId, this.props.match.params.countryIso)
    // TODO this requires passing in target array containing odpId as well
    // also requires server-side support in the API to handle the target-array
    // this.props.fetchLastSectionUpdateTimestamp(this.props.match.params.countryIso, 'odp')
  }

  componentWillUnmount () {
    this.props.fetchCountryOverviewStatus(this.props.match.params.countryIso)
    this.props.clearActive()
  }

  render () {
    return <LoggedInPageTemplate>

      {
        this.props.odp &&
        <OdpViewContent
          years={years}
          copyDisabled={R.or(
            R.not(originalDataPoint.allowCopyingOfPreviousValues(this.props.odp)),
            R.not(R.isNil(R.path(['match', 'params', 'odpId'], this.props))))}
          {...this.props}/>
      }

    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => {
  const autoSaving = state.autoSave.status === 'saving'
  const odp = state.originalDataPoint.active
  const openThread = R.defaultTo({ target: [], section: '' }, R.path(['review', 'openThread'], state))
  const useOriginalDataPointsInFoc = !!R.path(['country', 'config', 'useOriginalDataPointsInFoc'], state)
  return { ...state.originalDataPoint, odp, autoSaving, openThread, i18n: state.user.i18n, useOriginalDataPointsInFoc }
}

export default connect(mapStateToProps, {
  saveDraft,
  markAsActual,
  remove,
  fetch,
  clearActive,
  copyPreviousNationalClasses,
  cancelDraft,
  fetchCountryOverviewStatus,
  fetchLastSectionUpdateTimestamp
})(OriginalDataPointView)
