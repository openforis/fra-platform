import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import TraditionalTable from '../../traditionalTable/traditionalTable'
import { CommentableDescriptions } from '../../description/commentableDescription'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'

class SustainableDevelopmentView extends React.Component {

  componentWillMount () {
    this.props.fetchLastSectionUpdateTimestamp(
      this.props.match.params.countryIso,
      'sustainableDevelopment'
    )
  }

  render () {
    const {match, i18n} = this.props
    const countryIso = match.params.countryIso
    const lang = i18n.language

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <div className="fra-view__page-header">
          <h1 className="title">{i18n.t('sustainableDevelopment.sustainableDevelopment')}</h1>

          <div className="fra-view__header-secondary-content">
            <DefinitionLink document="tad" anchor="8" title={i18n.t('definition.definitionLabel')} lang={lang}/>
            <DefinitionLink document="faq" anchor="8" title={i18n.t('definition.faqLabel')} lang={lang}/>
          </div>
        </div>
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
  i18n: state.user.i18n
})

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(SustainableDevelopmentView)
