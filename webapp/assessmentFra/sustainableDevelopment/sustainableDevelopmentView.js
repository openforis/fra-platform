import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import DefinitionLink from '../../reusableUiComponents/definitionLink'

import Indicator from './indicators/indicator'
import SubIndicators from './indicators/subIndicators'

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
          <h2 className="headline">{i18n.t('sustainableDevelopment.sustainableDevelopment')}</h2>
          <div className="fra-view__section-toolbar">
            <DefinitionLink className="margin-right-big" document="tad" anchor="8" title={i18n.t('definition.definitionLabel')} lang={lang}/>
            <DefinitionLink className="align-left" document="faq" anchor="8" title={i18n.t('definition.faqLabel')} lang={lang}/>
          </div>
          <Indicator
            i18n={i18n}
            countryIso={countryIso}
            data={data}
            years={years}/>
          <SubIndicators
            i18n={i18n}
            countryIso={countryIso}
            data={data}
            years={years}
            countryConfig={countryConfig}/>
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
