import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import { CommentableDescriptions } from '../description/commentableDescription'
import DefinitionLink from './../reusableUiComponents/definitionLink'

const BiomassStockView = ({match, i18n}) => {
  const tableProps = tableSpec(i18n)
  const countryIso = match.params.countryIso
  const lang = i18n.language
  const calculatorFilePath = `/api/biomassStock/${countryIso}/${lang}/download`

  return <LoggedInPageTemplate>
    <div className="fra-view__content">
      <div className="tv__page-header">
        <h1 className="title">{i18n.t('biomassStock.biomassStock')}</h1>
        <DefinitionLink document="tad" anchor="3c" title={i18n.t('definition.definitionLabel')} lang={lang}/>
        <DefinitionLink document="faq" anchor="3c" title={i18n.t('definition.faqLabel')} lang={lang} className="align-left"/>
        <a className="btn btn-primary" href={calculatorFilePath}>
          <svg className="icon icon-sub icon-white"><use xlinkHref="img/icons.svg#hit-down"/></svg>
          {i18n.t('biomassStock.downloadExcel')}
        </a>
      </div>

      <div className="traditional-table-outer-container">
        <TraditionalTable tableSpec={tableProps} countryIso={countryIso}/>
      </div>

      <CommentableDescriptions
        section="biomassStock"
        name="biomassStock"
        countryIso={countryIso}
        i18n={i18n}
      />
    </div>
  </LoggedInPageTemplate>
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps)(BiomassStockView)
