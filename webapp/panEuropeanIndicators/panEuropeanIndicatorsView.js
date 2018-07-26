import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import ReviewIndicator from '../review/reviewIndicator'
import Icon from '../reusableUiComponents/icon'

import { fetchLastSectionUpdateTimestamp } from '../audit/actions'
import { uploadQuestionnaire, getUploadedQuestionareInfo, deleteQuestionare } from './actions'

class PanEuropeanIndicatorsView extends React.Component {

  componentWillMount () {
    this.props.fetchLastSectionUpdateTimestamp(this.props.countryIso, 'panEuropean')
    this.props.getUploadedQuestionareInfo(this.props.countryIso)
  }

  componentWillReceiveProps (nextProps) {
    const status = this.props.status
    const nextStatus = nextProps.status
    if (!R.equals(status, nextStatus) && R.equals('complete', nextStatus)) {
      this.refs.inputFile.value = ''
    }
  }

  onFileSelected () {
    this.props.uploadQuestionnaire(this.props.countryIso, this.refs.inputFile.files[0])
  }

  render () {
    const {i18n, countryIso, status, questionnaireFileName, userInfo, panEuropean = {}} = this.props
    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <div className="fra-view__page-header">
          <h2 className="headline">{i18n.t('panEuropeanIndicators.panEuropeanIndicators')}</h2>
          <a className="btn-s btn-primary" href={`/api/panEuropean/${countryIso}/downloadEmpty/${userInfo.lang}`} target="_blank">
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
                  ? <span
                    className="pan-european__file-name pan-european__file-placeholder">{i18n.t('panEuropeanIndicators.noQuestionnaire')}</span>
                  : [
                    <span className="pan-european__file-name">{questionnaireFileName}</span>,
                    <a className="btn btn-link" href={`/api/panEuropean/${countryIso}/download`} target="_blank">
                      {i18n.t('panEuropeanIndicators.download')}
                    </a>,
                    <button className="btn btn-link-destructive" onClick={() => this.props.deleteQuestionare(countryIso)}>
                      {i18n.t('panEuropeanIndicators.remove')}
                    </button>
                  ]
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

          <ReviewIndicator
            section={'panEuropeanIndicators'}
            title={i18n.t('panEuropeanIndicators.panEuropeanIndicators')}
            target={['uploadQuestionnaire']}
            countryIso={countryIso}
          />
        </div>

        <div className="pan-european__qualitative-questionnaire-container">
          <div className="fra-view__page-header">
            <h2 className="headline">{i18n.t('panEuropeanIndicators.panEuropeanQualitativeIndicators')}</h2>
          </div>
          <hr/>
          <a className="btn btn-primary" href={panEuropean.qualitativeQuestionnaireUrl} target="_blank">
            {i18n.t('panEuropeanIndicators.accessReportingPage')}
          </a>
        </div>

      </div>
    </LoggedInPageTemplate>
  }

}

const mapStateToProps = (state, props) => ({
  i18n: state.user.i18n,
  userInfo: state.user.userInfo,
  countryIso: props.match.params.countryIso,
  status: state.autoSave.status,
  questionnaireFileName: state.panEuropeanIndicators.questionnaireFileName,
  panEuropean: R.path(['country', 'config', 'panEuropean'], state)
})

export default connect(mapStateToProps, {
  fetchLastSectionUpdateTimestamp,
  uploadQuestionnaire,
  getUploadedQuestionareInfo,
  deleteQuestionare
})(PanEuropeanIndicatorsView)
