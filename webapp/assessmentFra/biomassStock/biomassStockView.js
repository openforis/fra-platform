import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import TraditionalTable from '../../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import DefinitionLink from '@webapp/components/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '../../descriptionBundles/analysisDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'
import { isFRA2020SectionEditDisabled } from '@webapp/utils/assessmentAccess'
import * as table from '../../traditionalTable/table'
import { isPrintingOnlyTables } from '@webapp/loggedin/printAssessment/printAssessment'
import FraUtils from '@common/fraUtils'
import { fetchTableData } from '../../traditionalTable/actions'
import * as AppState from '@webapp/app/appState'

const sectionName = 'biomassStock'
const domains = ['boreal', 'temperate', 'subtropical', 'tropical']
const downloadPath = (countryIso, selectedDomain, language) =>
  `/api/biomassStock/${countryIso}/${selectedDomain}/${language}/download`

const Select = ({ i18n, selectedDomain, setSelectedDomain, ...props }) =>
  <select
    className="select-s margin-right"
    value={selectedDomain}
    onChange={({ target: { value } }) => setSelectedDomain(value)}>
    {
      domains.map(domain =>
        <option value={domain} key={domain}>
          {i18n.t(`climaticDomain.${domain}`)}
          {domain === props.domain && ` (${i18n.t('climaticDomain.selectDefault')})`}
        </option>
      )
    }
  </select>

const BiomassStockView = props => {
  const {
    i18n,
    i18n: { language },
    domain,
    disabled,
    tableSpecInstance,
    tableData,
    fetchTableData,
    fetchLastSectionUpdateTimestamp
  } = props
  const countryIso = useSelector(AppState.getCountryIso)
  const [selectedDomain, setSelectedDomain] = useState(domain)
  const calculatorFilePath = downloadPath()

  useEffect(() => {
    fetchTableData(countryIso, tableSpecInstance)
    fetchLastSectionUpdateTimestamp(countryIso, tableSpecInstance.name)
  }, [])

  const render = isPrintingOnlyTables() ? FraUtils.hasData(tableData) : true
  if (!render) return null
  return <div className="fra-view__content">

    <h2 className="title only-print">
      {`${isPrintingOnlyTables() ? '' : '2c '}${i18n.t('biomassStock.biomassStock')}`}
    </h2>

    <NationalDataDescriptions section={sectionName} countryIso={countryIso} disabled={disabled}/>
    <AnalysisDescriptions section={sectionName} countryIso={countryIso} disabled={disabled}/>

    <h2 className="headline no-print">
      {i18n.t('biomassStock.biomassStock')}
    </h2>

    <div className="fra-view__section-toolbar" style={{ marginTop: '4px' }}>
      <DefinitionLink className="margin-right-big" document="tad" anchor="2c"
                      title={i18n.t('definition.definitionLabel')} lang={language}/>
      <DefinitionLink className="align-left" document="faq" anchor="2c" title={i18n.t('definition.faqLabel')}
                      lang={language}/>

      <div className="no-print">
        {
          !R.isNil(domain) &&
          <Select i18n={i18n} domain={domain} selectedDomain={selectedDomain} setSelectedDomain={setSelectedDomain}/>
        }
        <a className="btn-s btn-primary" href={calculatorFilePath}>
          {i18n.t('biomassStock.downloadExcel')}
        </a>
      </div>
    </div>

    <TraditionalTable tableSpec={tableSpecInstance} countryIso={countryIso} disabled={disabled}/>
    <GeneralComments
      section={sectionName}
      countryIso={countryIso}
      disabled={disabled}
    />
  </div>
}

const mapStateToProps = state => {
  const i18n = state.user.i18n
  const tableSpecInstance = tableSpec(i18n)

  return {
    domain: R.path(['country', 'config', 'domain'], state),
    i18n,
    disabled: isFRA2020SectionEditDisabled(state, sectionName),
    tableSpecInstance,
    tableData: R.path(['traditionalTable', tableSpecInstance.name, 'tableData'], state) || table.createTableData(tableSpecInstance),
  }
}

export default connect(mapStateToProps, { fetchLastSectionUpdateTimestamp, fetchTableData })(BiomassStockView)
