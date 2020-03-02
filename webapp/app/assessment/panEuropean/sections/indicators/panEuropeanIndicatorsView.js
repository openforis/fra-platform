import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as R from 'ramda'

import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import Icon from '@webapp/components/icon'

import { fetchLastSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'
import { uploadQuestionnaire, getUploadedQuestionareInfo, deleteQuestionare } from './actions'

import * as AppState from '@webapp/app/appState'
import * as UserState from '@webapp/user/userState'
import * as CountryState from '@webapp/app/country/countryState'
import * as AutosaveState from '@webapp/app/components/autosave/autosaveState'

class PanEuropeanIndicatorsView extends React.Component {

  componentDidMount () {
    this.props.fetchLastSectionUpdateTimestamp(this.props.countryIso, 'panEuropean')
    this.props.getUploadedQuestionareInfo(this.props.countryIso)
  }

  componentDidUpdate(prevProps, prevState) {
    const currentStatus = this.props.status
    const previousStatus = prevProps.status
    if (!R.equals(currentStatus, previousStatus) && R.equals('complete', currentStatus)) {
      this.refs.inputFile.value = ''
    }
  }

  onFileSelected () {
    this.props.uploadQuestionnaire(this.props.countryIso, this.refs.inputFile.files[0])
  }

  render () {
    const { i18n, countryIso, userInfo, status, questionnaireFileName, panEuropean = {} } = this.props
    const { language } = i18n

    return <>
      <div className="app-view__content">
        <div className="app-view__page-header">
          <h2 className="headline">{i18n.t('panEuropeanIndicators.panEuropeanIndicators')}</h2>
          <a className="btn-s btn-primary" href={`/api/panEuropean/${countryIso}/downloadEmpty/${language}`} target="_blank">
            <Icon className="icon-sub icon-white" name="hit-down"/>
            {i18n.t('panEuropeanIndicators.downloadQuestionnaire')}
          </a>
        </div>
        <hr/>
        <h3 className="subhead">{i18n.t('panEuropeanIndicators.uploadQuestionnaire')}</h3>
        <div className="pan-european__container">
          <div className="pan-european__file-input">
            <div className="pan-european__file">
              <Icon name="single-folded-content" className="icon-24 icon-middle icon-margin-right"/>
              {
                R.isNil(questionnaireFileName)
                  ? (
                    <span className="pan-european__file-name pan-european__file-placeholder">
                      {i18n.t('panEuropeanIndicators.noQuestionnaire')}
                    </span>
                  ) : (
                    <>
                      <span className="pan-european__file-name">{questionnaireFileName}</span>
                      <a className="btn btn-link" href={`/api/panEuropean/${countryIso}/download`} target="_blank">
                        {i18n.t('panEuropeanIndicators.download')}
                      </a>,
                      <button className="btn btn-link-destructive"
                              onClick={() => this.props.deleteQuestionare(countryIso)}>
                        {i18n.t('panEuropeanIndicators.remove')}
                      </button>
                    </>
                  )
              }
            </div>
            <input
              ref="inputFile"
              type="file"
              style={{display: 'none'}}
              onChange={() => this.onFileSelected()}
              accept=".xls,.xlsx"
            />
            <button
              className="btn btn-primary"
              onClick={() => this.refs.inputFile.dispatchEvent(new MouseEvent('click'))}
              disabled={R.equals('saving', status)}>
              {i18n.t('panEuropeanIndicators.chooseFile')}
            </button>
          </div>

          {
            userInfo &&
            <ReviewIndicator
              section={'panEuropeanIndicators'}
              title={i18n.t('panEuropeanIndicators.panEuropeanIndicators')}
              target={['uploadQuestionnaire']}
              countryIso={countryIso}
            />
          }
        </div>

        <div className="pan-european__qualitative-questionnaire-container">
          <div className="app-view__page-header">
            <h2 className="headline">{i18n.t('panEuropeanIndicators.panEuropeanQualitativeIndicators')}</h2>
          </div>
          <hr/>
          <a className="btn btn-primary" href={panEuropean.qualitativeQuestionnaireUrl} target="_blank">
            {i18n.t('panEuropeanIndicators.accessReportingPage')}
          </a>
        </div>

      </div>
    </>
  }

}

const mapStateToProps = (state) => ({
  i18n: AppState.getI18n(state),
  userInfo: UserState.getUserInfo(state),
  countryIso: AppState.getCountryIso(state),
  status: AutosaveState.getStatus(state),
  questionnaireFileName: state.panEuropeanIndicators.questionnaireFileName,
  panEuropean: CountryState.getConfigpanEuropean(state),
})

export default withRouter(connect(mapStateToProps, {
  fetchLastSectionUpdateTimestamp,
  uploadQuestionnaire,
  getUploadedQuestionareInfo,
  deleteQuestionare
})(PanEuropeanIndicatorsView))
