import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import { CommentableDescriptions } from '../description/commentableDescription'
import DefinitionLink from './../reusableUiComponents/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../audit/actions'

class BiomassStockView extends React.Component {

  constructor(props) {
    super(props)
    this.tableSpecInstance = tableSpec(this.props.i18n)
  }

  componentWillMount() {
    this.props.fetchLastSectionUpdateTimestamp(
      this.props.match.params.countryIso,
      this.tableSpecInstance.name
    )
  }

  render () {
    const {match, i18n} = this.props
    const countryIso = match.params.countryIso
    const lang = i18n.language
    const calculatorFilePath = `/api/biomassStock/${countryIso}/${lang}/download`

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <div className="fra-view__page-header">
          <h1 className="title">{i18n.t('biomassStock.biomassStock')}</h1>
          <DefinitionLink document="tad" anchor="2c" title={i18n.t('definition.definitionLabel')} lang={lang}/>
          <DefinitionLink document="faq" anchor="2c" title={i18n.t('definition.faqLabel')} lang={lang} className="align-left"/>
          <a className="btn btn-primary" href={calculatorFilePath}>
            <svg className="icon icon-sub icon-white"><use xlinkHref="img/icons.svg#hit-down"/></svg>
            {i18n.t('biomassStock.downloadExcel')}
          </a>
        </div>
        <TraditionalTable tableSpec={this.tableSpecInstance} countryIso={countryIso}/>
        <CommentableDescriptions
          section="biomassStock"
          name="biomassStock"
          countryIso={countryIso}
          i18n={i18n}
        />
      </div>
    </LoggedInPageTemplate>
  }
}
const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(BiomassStockView)
