import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import * as R from 'ramda'
import useI18n from '@webapp/components/hooks/useI18n'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import * as CountryState from '@webapp/app/country/countryState'

const domains = ['boreal', 'temperate', 'subtropical', 'tropical']
const downloadPath = (countryIso: any, selectedDomain: any, language: any) =>
  `/api/biomassStock/${countryIso}/${selectedDomain}/${language}/download`
const ExcelCalculatorDownload = () => {
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const userInfo = useUserInfo()
  const countryDomain = useSelector(CountryState.getConfigDomain)
  const [selectedDomain, setSelectedDomain]: any = useState(countryDomain)
  const calculatorFilePath = downloadPath(countryIso, selectedDomain, (i18n as any).language)
  if (!userInfo) {
    return null
  }
  return (
    <div className="no-print">
      {!R.isNil(countryDomain) && (
        <select className="select-s" value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)}>
          {domains.map((domain) => (
            <option value={domain} key={domain}>
              {(i18n as any).t(`climaticDomain.${domain}`)}
              {domain === countryDomain && ` (${(i18n as any).t('climaticDomain.selectDefault')})`}
            </option>
          ))}
        </select>
      )}
      <a className="btn-s btn-primary" href={calculatorFilePath}>
        {(i18n as any).t('biomassStock.downloadExcel')}
      </a>
    </div>
  )
}
export default ExcelCalculatorDownload
