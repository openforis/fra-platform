import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import TraditionalTable from '@webapp/traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import DefinitionLink from '@webapp/components/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '@webapp/audit/actions'
import NationalDataDescriptions from '@webapp/descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/descriptionBundles/analysisDescriptions'
import GeneralComments from '@webapp/descriptionBundles/generalComments'
import { isFRA2020SectionEditDisabled } from '@webapp/utils/assessmentAccess'
import * as table from '@webapp/traditionalTable/table'
import { isPrintingOnlyTables } from '@webapp/loggedin/printAssessment/printAssessment'
import FraUtils from '@common/fraUtils'
import { fetchTableData } from '@webapp/traditionalTable/actions'
import * as AppState from '@webapp/app/appState'
import * as CountryState from '@webapp/country/countryState'
import * as UserState from '@webapp/user/userState'

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
    domain,
    disabled,
    tableSpecInstance,
    tableData,
    fetchTableData,
    fetchLastSectionUpdateTimestamp
  } = props

  const { language } = i18n
  const countryIso = useSelector(AppState.getCountryIso)
  const [selectedDomain, setSelectedDomain] = useState(domain)
  const calculatorFilePath = downloadPath(countryIso, selectedDomain, language)

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
  const i18n = UserState.getI18n(state)
  const tableSpecInstance = tableSpec(i18n)

  return {
    domain: CountryState.getConfigDomain(state),
    i18n,
    disabled: isFRA2020SectionEditDisabled(state, sectionName),
    tableSpecInstance,
    tableData: R.path(['traditionalTable', tableSpecInstance.name, 'tableData'], state) || table.createTableData(tableSpecInstance),
  }
}

export default connect(mapStateToProps, { fetchLastSectionUpdateTimestamp, fetchTableData })(BiomassStockView)
