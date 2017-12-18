import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { CommentableDescriptions } from '../../description/commentableDescription'
import DefinitionLink from '../../reusableUiComponents/definitionLink'

import Indicator15_1_1 from './indicators/indicator15_1_1'
import Indicator15_2_1 from './indicators/indicator15_2_1'

import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import { fetch } from './actions'

class SustainableDevelopmentView extends React.Component {

  componentWillMount () {
    const countryIso = this.props.match.params.countryIso

    this.props.fetchLastSectionUpdateTimestamp(countryIso, 'sustainableDevelopment')
    this.props.fetch(countryIso)
  }

  componentWillReceiveProps (nextProps) {
    const nextCountryIso = nextProps.match.params.countryIso
    if (nextCountryIso !== this.props.match.params.countryIso)
      this.props.fetch(nextCountryIso)
  }

  render () {
    const {match, i18n, data, countryConfig} = this.props
    const countryIso = match.params.countryIso
    const lang = i18n.language

    const years = R.pipe(
      R.filter(v => v.type !== 'odp'),
      R.map(v => v.name)
    )(R.values(data.extentOfForest))

    return R.isEmpty(data)
      ? null
      : <LoggedInPageTemplate>
        <div className="fra-view__content fra-sustainable-dev__content">
          <div className="fra-view__page-header">
            <h1 className="title">{i18n.t('sustainableDevelopment.sustainableDevelopment')}</h1>
            <div className="fra-view__header-secondary-content">
              <DefinitionLink document="tad" anchor="8" title={i18n.t('definition.definitionLabel')} lang={lang}/>
              <DefinitionLink document="faq" anchor="8" title={i18n.t('definition.faqLabel')} lang={lang}/>
            </div>
          </div>
          <Indicator15_1_1
            i18n={i18n}
            countryIso={countryIso}
            data={data}
            years={years}/>
          <Indicator15_2_1
            i18n={i18n}
            countryIso={countryIso}
            data={data}
            years={years}
            countryConfig={countryConfig}/>
          <CommentableDescriptions
            section="sustainableDevelopment"
            name="sustainableDevelopment"
            countryIso={countryIso}
            i18n={i18n}
          />
        </div>
      </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  data: state.sustainableDevelopment,
  countryConfig: R.path(['country', 'config'], state)
})

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp, fetch})(SustainableDevelopmentView)
