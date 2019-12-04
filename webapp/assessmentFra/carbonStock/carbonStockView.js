import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import TraditionalTable from '../../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '../../descriptionBundles/analysisDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import { isFRA2020SectionEditDisabled } from '../../utils/assessmentAccess'
import { isPrintingOnlyTables } from '../../printAssessment/printAssessment'
import FraUtils from '../../../common/fraUtils'
import * as table from '../../traditionalTable/table'
import { fetchTableData } from '../../traditionalTable/actions'

const sectionName = 'carbonStock'

const soilDepthTableSpec = i18n => ({
  name: 'carbonStockSoilDepth',
  header: <thead/>,
  disableReviewComments: true,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <td className="fra-secondary-table__heading-cell">
          {i18n.t('carbonStock.soilDepthHeading')}
        </td>
      },
      { type: 'decimalInput' }
    ]
  ],
  valueSlice: {
    columnStart: 1
  }
})

class CarbonStockView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    const countryIso = this.props.match.params.countryIso
    const tableSpec = this.props.tableSpecInstance

    this.props.fetchTableData(countryIso, tableSpec)
    this.props.fetchLastSectionUpdateTimestamp(countryIso, tableSpec.name)
  }

  render () {
    const { match, i18n, isEditDataDisabled, tableSpecInstance, tableData } = this.props
    const countryIso = match.params.countryIso
    const lang = i18n.language
    const countryDomain = this.state.selectedDomain || this.props.domain
    const calculatorFilePath = `/api/biomassStock/${countryIso}/${countryDomain}/${lang}/download`
    const climaticDomains = ['boreal', 'temperate', 'subtropical', 'tropical']

    const render = isPrintingOnlyTables() ? FraUtils.hasData(tableData) : true

    return render &&
      <>

        <h2 className="title only-print">
          {`${isPrintingOnlyTables() ? '' : '2d '}${i18n.t('carbonStock.carbonStock')}`}
        </h2>

        <div className="fra-view__content">
          <NationalDataDescriptions section={sectionName} countryIso={countryIso} disabled={isEditDataDisabled}/>
          <AnalysisDescriptions section={sectionName} countryIso={countryIso} disabled={isEditDataDisabled}/>
          <h2 className="headline no-print">
            {i18n.t('carbonStock.carbonStock')}
          </h2>
          <div className="fra-view__section-toolbar" style={{ marginTop: '4px' }}>
            <DefinitionLink className="margin-right-big" document="tad" anchor="2d"
                            title={i18n.t('definition.definitionLabel')} lang={lang}/>
            <DefinitionLink className="align-left" document="faq" anchor="2c" title={i18n.t('definition.faqLabel')}
                            lang={lang}/>
            <div className="no-print">
              {
                !R.isNil(this.props.domain)
                  ? <select
                    className="select-s margin-right"
                    value={countryDomain}
                    onChange={evt => this.setState({ selectedDomain: evt.target.value })}>
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
          <TraditionalTable tableSpec={tableSpecInstance} countryIso={countryIso} disabled={isEditDataDisabled}/>
          <div className="fra-secondary-table__wrapper">
            <TraditionalTable tableSpec={soilDepthTableSpec(i18n)} countryIso={match.params.countryIso}
                              disabled={isEditDataDisabled}/>
          </div>
          <GeneralComments
            section={sectionName}
            countryIso={countryIso}
            disabled={isEditDataDisabled}
          />
        </div>
      </>
  }
}

const mapStateToProps = state => {
  const i18n = state.user.i18n
  const tableSpecInstance = tableSpec(i18n)

  return {
    domain: R.path(['country', 'config', 'domain'], state),
    i18n,
    isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName),
    tableSpecInstance,
    tableData: R.path(['traditionalTable', tableSpecInstance.name, 'tableData'], state) || table.createTableData(tableSpecInstance),
  }
}

export default connect(mapStateToProps, { fetchLastSectionUpdateTimestamp, fetchTableData })(CarbonStockView)
