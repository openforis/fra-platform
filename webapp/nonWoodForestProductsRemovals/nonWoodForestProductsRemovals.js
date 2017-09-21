import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import { CommentableDescriptions } from '../description/commentableDescription'

const NonWoodForestProductsRemovalsView = ({match, i18n}) => {
  const tableSpecInstance = tableSpec(i18n)

  return <LoggedInPageTemplate>
    <div className="tv__container growing-stock__container">
      <h1 className="title tv__page-header">{i18n.t('nonWoodForestProductsRemovals.nonWoodForestProductsRemovals')}</h1>
      <TraditionalTable tableSpec={tableSpecInstance} countryIso={match.params.countryIso}/>
      <CommentableDescriptions
        section={tableSpecInstance.name}
        name="nonWoodForestProductsRemovals"
        countryIso={match.params.countryIso}
        i18n={i18n}
      />
    </div>
  </LoggedInPageTemplate>
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps)(NonWoodForestProductsRemovalsView)
