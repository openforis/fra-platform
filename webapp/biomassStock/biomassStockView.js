import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import totalTableSpec from './totalTableSpec'
import { CommentableDescriptions } from '../description/commentableDescription'

const BiomassStockView = ({match, i18n}) => {
  const totalTableProps = totalTableSpec(i18n)

  return <LoggedInPageTemplate>
    <div className="tv__container">
      <h1 className="title tv__page-header">{i18n.t('biomassStock.biomassStock')}</h1>
      <TraditionalTable tableSpec={totalTableProps} countryIso={match.params.countryIso}/>
      <CommentableDescriptions
        section={totalTableProps.name}
        name="biomassStock"
        countryIso={match.params.countryIso}
        i18n={i18n}
      />
    </div>
  </LoggedInPageTemplate>
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps)(BiomassStockView)
