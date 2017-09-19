import './style.less'
import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import CommentableDescriptions from '../description/commentableDescription'

const GrowingStockCompositionView = ({match, i18n}) => {
  const tableProps = tableSpec(i18n)

  return <LoggedInPageTemplate>
    <div className="tv__container gsc__container">
      <h1 className="title tv__page-header">{i18n.t('growingStockComposition.growingStockComposition')}</h1>
      <TraditionalTable tableSpec={tableProps} countryIso={match.params.countryIso}/>
      <CommentableDescriptions
        section={tableProps.name}
        name="growingStockComposition"
        countryIso={match.params.countryIso}
        i18n={i18n}
      />
    </div>
  </LoggedInPageTemplate>
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps)(GrowingStockCompositionView)
