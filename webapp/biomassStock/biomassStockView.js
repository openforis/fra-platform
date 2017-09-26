import './style.less'
import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import { avgTableSpec, totalTableSpec } from './tablesSpec'
import { CommentableDescriptions } from '../description/commentableDescription'
import DefinitionLink from './../reusableUiComponents/definitionLink'

const BiomassStockView = ({match, i18n}) => {
  const avgTableProps = avgTableSpec(i18n)
  const totalTableProps = totalTableSpec(i18n)

  return <LoggedInPageTemplate>
    <div className="tv__container">
      <div className="tv__page-header">
        <h1 className="title">{i18n.t('biomassStock.biomassStock')}</h1>
        <DefinitionLink document="tad" section="3c" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
        <DefinitionLink document="faq" section="3c" title={i18n.t('definition.faqLabel')} lang={i18n.language} className="align-left"/>
      </div>
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
