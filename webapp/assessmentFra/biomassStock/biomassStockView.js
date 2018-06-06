import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import TraditionalTable from '../../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '../../descriptionBundles/analysisDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'
import { isFRA2020SectionEditDisabled } from '../../utils/assessmentAccess'

const sectionName = "biomassStock"

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
    const {match, i18n, isEditDataDisabled} = this.props
    const countryIso = match.params.countryIso
    const lang = i18n.language
    const countryDomain = this.state.selectedDomain || this.props.domain
    const calculatorFilePath = `/api/biomassStock/${countryIso}/${countryDomain}/${lang}/download`
    const climaticDomains = ['boreal', 'temperate', 'subtropical', 'tropical']

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <NationalDataDescriptions section={sectionName} countryIso={countryIso} disabled={isEditDataDisabled}/>
        <AnalysisDescriptions section={sectionName} countryIso={countryIso} disabled={isEditDataDisabled}/>
        <h2 className="headline">
          <span className="only-print">2c </span>{i18n.t('biomassStock.biomassStock')}
        </h2>
        <div className="fra-view__section-toolbar" style={{marginTop: '4px'}}>
          <DefinitionLink className="margin-right-big" document="tad" anchor="2c" title={i18n.t('definition.definitionLabel')} lang={lang}/>
          <DefinitionLink className="align-left" document="faq" anchor="2c" title={i18n.t('definition.faqLabel')} lang={lang}/>
          <div className="no-print">
            {
              !R.isNil(this.props.domain)
              ? <select
                  className="select-s margin-right"
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
        </div>
        <TraditionalTable tableSpec={this.tableSpecInstance} countryIso={countryIso} disabled={isEditDataDisabled}/>
        <GeneralComments
          section={sectionName}
          countryIso={countryIso}
          disabled={isEditDataDisabled}
        />
      </div>
    </LoggedInPageTemplate>
  }
}
const mapStateToProps = state =>
  ({
    domain: R.path(['country', 'config', 'domain'], state),
    i18n: state.user.i18n,
    isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName)
  })

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(BiomassStockView)
