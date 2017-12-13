import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import TraditionalTable from '../../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import { CommentableDescriptions } from '../../description/commentableDescription'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'

class BiomassStockView extends React.Component {

  constructor(props) {
    super(props)
    this.tableSpecInstance = tableSpec(this.props.i18n)
    this.state = {}
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
    const countryDomain = this.state.selectedDomain || this.props.domain
    const calculatorFilePath = `/api/biomassStock/${countryIso}/${countryDomain}/${lang}/download`
    const climaticDomains = ['boreal', 'temperate', 'subtropical', 'tropical']

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <div className="fra-view__page-header">
          <h1 className="title">{i18n.t('biomassStock.biomassStock')}</h1>
          <div className="fra-view__page-header-controls">
            {
              !R.isNil(this.props.domain)
              ? <select
                  className="select-s"
                  value={countryDomain}
                  onChange={evt => this.setState({selectedDomain: evt.target.value})}>
                  {
                    R.map(domain =>
                      <option value={domain} key={domain}>
                        {i18n.t(`climaticDomain.${domain}`)}
                        {domain === this.props.domain ? ` (${i18n.t('climaticDomain.selectDefault')})` : null}
                      </option>
                    , climaticDomains)
                  }
                </select>
              : null
            }
            <a className="btn-s btn-primary" href={calculatorFilePath}>
              {i18n.t('biomassStock.downloadExcel')}
            </a>
          </div>
          <div className="fra-view__header-secondary-content">
            <DefinitionLink document="tad" anchor="2c" title={i18n.t('definition.definitionLabel')} lang={lang}/>
            <DefinitionLink document="faq" anchor="2c" title={i18n.t('definition.faqLabel')} lang={lang}/>
          </div>
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
const mapStateToProps = state =>
  ({
    domain: R.path(['country', 'config', 'domain'], state),
    i18n: state.user.i18n
  })

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(BiomassStockView)
