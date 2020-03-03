import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as R from 'ramda'

import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import DataSources from '@webapp/app/assessment/fra/sections/originalDataPoint/components/dataSources'
import NationalClasses from '@webapp/app/assessment/fra/sections/originalDataPoint/components/nationalClasses'
import OriginalData from '@webapp/app/assessment/fra/sections/originalDataPoint/components/originalData/originalData'
import CommentsEditor from '@webapp/app/assessment/fra/sections/originalDataPoint/components/commentsEditor'

import * as originalDataPoint from './originalDataPoint'
import { isCommentsOpen } from '@webapp/app/assessment/fra/sections/originalDataPoint/components/commonFunctions'

import {
  saveDraft,
  markAsActual,
  remove,
  fetch,
  clearActive,
  copyPreviousNationalClasses,
  cancelDraft
} from './actions'
import { fetchCountryOverviewStatus } from '@webapp/app/country/actions'
import { fetchLastSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'
import { isAssessmentLocked } from '@webapp/utils/assessmentAccess'

import * as AppState from '@webapp/app/appState'
import * as OriginalDataPointState from '@webapp/app/assessment/fra/sections/originalDataPoint/originalDataPointState'
import * as AutosaveState from '@webapp/app/components/autosave/autosaveState'
import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'
import * as CountryState from '@webapp/app/country/countryState'

const years = ['', ...R.pipe(R.range(1950), R.reverse)(2021)]

const OriginalDataPoint = (props) => {

  const {
    match, i18n, odp,
    saveDraft, markAsActual, remove, cancelDraft, openThread,
    autoSaving, canEditData
  } = props
  const { countryIso, tab } = match.params
  const history = useHistory()
  const saveControlsDisabled = () => !odp.odpId || autoSaving
  const yearValidationStatusClass = () => odp.validationStatus && !odp.validationStatus.year.valid ? 'error' : ''
  const unselectable = R.defaultTo([], odp.reservedYears)

  const handleSave = () => {
    markAsActual(countryIso, odp, history)
  }

  return (
    <div className="app-view__content">
      <div className="app-view__page-header">
        <h1 className="title align-left">{i18n.t('nationalDataPoint.nationalDataPoint')}</h1>
        {
          canEditData && odp.editStatus && odp.editStatus !== 'newDraft'
            ? <button
              className="btn btn-secondary margin-right"
              disabled={saveControlsDisabled()}
              onClick={() => cancelDraft(countryIso, odp.odpId, tab)}>
              {i18n.t('nationalDataPoint.discardChanges')}
            </button>
            : null
        }
        {
          canEditData &&
          <button
            className="btn btn-primary"
            disabled={saveControlsDisabled()}
            onClick={handleSave}>
            {i18n.t('nationalDataPoint.doneEditing')}
          </button>
        }
        {
          canEditData &&
          <div className="odp-v-divider"></div>
        }
        {
          canEditData &&
          <button
            className="btn btn-destructive"
            disabled={saveControlsDisabled()}
            onClick={() => window.confirm(i18n.t('nationalDataPoint.confirmDelete'))
              ? remove(countryIso, odp.odpId, tab)
              : null
            }>
            {i18n.t('nationalDataPoint.delete')}
          </button>
        }
      </div>

      <div className="odp__section">
        <h3 className="subhead">{i18n.t('nationalDataPoint.referenceYearData')}</h3>
        <div className={`odp__year-selection ${yearValidationStatusClass()}`}>
          <select
            disabled={!canEditData}
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

      <OriginalData {...props} />

      <div className="odp__section">
        <div className="fra-description">
          <div className={
            isCommentsOpen([`${odp.odpId}`, 'comments'], openThread)
              ? 'fra-description__wrapper fra-row-comments__open'
              : 'fra-description__wrapper'
          }>
            <CommentsEditor
              canEditData={canEditData}
              odp={odp}
              title={i18n.t('review.comments')}/>
          </div>
          <div className="fra-description__review-indicator-wrapper">
            {
              odp.odpId && canEditData
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

      {
        canEditData &&
        <div className="odp__bottom-buttons">
          {
            odp.editStatus && odp.editStatus !== 'newDraft'
              ? <button
                className="btn btn-secondary"
                disabled={saveControlsDisabled()}
                onClick={() => cancelDraft(countryIso, odp.odpId, tab)}>
                {i18n.t('nationalDataPoint.discardChanges')}
              </button>
              : null
          }
          <button
            className="btn btn-primary"
            disabled={saveControlsDisabled()}
            onClick={handleSave}>
            {i18n.t('nationalDataPoint.doneEditing')}
          </button>
          <div className="odp-v-divider"></div>
          <button
            className="btn btn-destructive"
            disabled={saveControlsDisabled()}
            onClick={() => window.confirm(i18n.t('nationalDataPoint.confirmDelete'))
              ? remove(countryIso, odp.odpId, tab)
              : null
            }>
            {i18n.t('nationalDataPoint.delete')}
          </button>
        </div>
      }
    </div>
  )
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
    return <>
      {
        this.props.odp &&
        <OriginalDataPoint
          years={years}
          copyDisabled={R.or(
            R.not(originalDataPoint.allowCopyingOfPreviousValues(this.props.odp)),
            R.not(R.isNil(R.path(['match', 'params', 'odpId'], this.props))))}
          {...this.props}/>
      }
    </>
  }
}

const mapStateToProps = state => {
  const autoSaving = AutosaveState.getStatus()
  const odp = OriginalDataPointState.getActiveOriginalDataPoint(state)
  const openThread = ReviewState.getOpenThread(state)
  const countryConfig = CountryState.getConfig(state)

  const useOriginalDataPointsInFoc = !!countryConfig.useOriginalDataPointsInFoc

  const locked = isAssessmentLocked(state, 'fra2020')
  const canEditData = CountryState.getCanEditData(state) && !locked

  return {
    ...state.originalDataPoint,
    canEditData,
    odp,
    autoSaving,
    openThread,
    i18n: AppState.getI18n(state),
    useOriginalDataPointsInFoc
  }
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
