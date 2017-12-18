import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { CommentableDescriptions } from '../../description/commentableDescription'
import DefinitionLink from '../../reusableUiComponents/definitionLink'

import TableIndicator15_1_1 from './indicators/tableIndicator15_1_1'

import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import { fetch } from './actions'

class SustainableDevelopmentView extends React.Component {

  componentWillMount () {
    const countryIso = this.props.match.params.countryIso

    this.props.fetchLastSectionUpdateTimestamp(countryIso, 'sustainableDevelopment')
    this.props.fetch(countryIso)
  }

  render () {
    const {match, i18n, data} = this.props
    const countryIso = match.params.countryIso
    const lang = i18n.language

    return R.isEmpty(data)
      ? null
      : <LoggedInPageTemplate>
        <div className="fra-view__content">
          <div className="fra-view__page-header">
            <h1 className="title">{i18n.t('sustainableDevelopment.sustainableDevelopment')}</h1>
            <div className="fra-view__header-secondary-content">
              <DefinitionLink document="tad" anchor="8" title={i18n.t('definition.definitionLabel')} lang={lang}/>
              <DefinitionLink document="faq" anchor="8" title={i18n.t('definition.faqLabel')} lang={lang}/>
            </div>
          </div>
          <TableIndicator15_1_1
            i18n={i18n}
            countryIso={countryIso}
            data={data}/>
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
  data: state.sustainableDevelopment
})

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp, fetch})(SustainableDevelopmentView)
