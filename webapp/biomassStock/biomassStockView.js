import './style.less'
import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import { avgTableSpec, totalTableSpec } from './tablesSpec'
import { CommentableDescriptions } from '../description/commentableDescription'

const BiomassStockView = ({match, i18n}) => {
  const avgTableProps = avgTableSpec(i18n)
  const totalTableProps = totalTableSpec(i18n)

  return <LoggedInPageTemplate>
    <div className="tv__container">
      <h1 className="title tv__page-header">{i18n.t('biomassStock.biomassStock')}</h1>
      <div className="biomass-stock__data-table-container">
        <TraditionalTable tableSpec={avgTableProps} countryIso={match.params.countryIso}/>
      </div>
      <div className="biomass-stock__data-table-container">
        <TraditionalTable tableSpec={totalTableProps} countryIso={match.params.countryIso}/>
      </div>
      <CommentableDescriptions
        section="biomassStock"
        name="biomassStock"
        countryIso={match.params.countryIso}
        i18n={i18n}
      />
    </div>
  </LoggedInPageTemplate>
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps)(BiomassStockView)
