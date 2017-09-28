import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import { avgTableSpec, totalTableSpec } from './tablesSpec'
import { CommentableDescriptions } from '../description/commentableDescription'
import DefinitionLink from './../reusableUiComponents/definitionLink'

const CarbonStockView = ({match, i18n}) => {
  const countryIso = match.params.countryIso
  const lang = i18n.language

  const avgTableProps = avgTableSpec(i18n)
  const totalTableProps = totalTableSpec(i18n)

  return <LoggedInPageTemplate>
    <div className="tv__container">
      <div className="tv__page-header">
        <h1 className="title">{i18n.t('carbonStock.carbonStock')}</h1>
        <DefinitionLink document="tad" section="3d" title={i18n.t('definition.definitionLabel')} lang={lang}/>
        <DefinitionLink document="faq" section="3d" title={i18n.t('definition.faqLabel')} lang={lang} className="align-left"/>
      </div>

      <div className="traditional-table-outer-container">
        <TraditionalTable tableSpec={avgTableProps} countryIso={countryIso}/>
      </div>
      <div className="traditional-table-outer-container">
        <TraditionalTable tableSpec={totalTableProps} countryIso={countryIso}/>
      </div>

      <CommentableDescriptions
        section="carbonStock"
        name="carbonStock"
        countryIso={countryIso}
        i18n={i18n}
      />
    </div>
  </LoggedInPageTemplate>
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps)(CarbonStockView)
