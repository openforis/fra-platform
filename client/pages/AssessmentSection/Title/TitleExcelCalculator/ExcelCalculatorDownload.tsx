import React, { useState } from 'react'
import { useCountryIso } from '@client/hooks'
import { useTranslation } from 'react-i18next'
import { useUser } from '@client/store/user'
import { Objects } from '@core/utils'

const domains: Array<string> = ['boreal', 'temperate', 'subtropical', 'tropical']
const getDownloadPath = (countryIso: string, selectedDomain: string, language: string): string =>
  `/api/biomassStock/${countryIso}/${selectedDomain}/${language}/download`

const ExcelCalculatorDownload: React.FC = () => {
  const countryIso = useCountryIso()
  const { i18n } = useTranslation()
  const userInfo = useUser()
  const countryDomain = 'climaticDomain' // TODO useSelector(CountryState.getConfigDomain) as string
  const [selectedDomain, setSelectedDomain] = useState<string>(countryDomain)
  const calculatorFilePath = getDownloadPath(countryIso, selectedDomain, i18n.language)

  if (!userInfo) {
    return null
  }

  return (
    <div className="no-print">
      {!Objects.isEmpty(countryDomain) && (
        <select className="select-s" value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)}>
          {domains.map((domain) => (
            <option value={domain} key={domain}>
              {i18n.t(`climaticDomain.${domain}`)}
              {domain === countryDomain && ` (${i18n.t('climaticDomain.selectDefault')})`}
            </option>
          ))}
        </select>
      )}
      <a className="btn-s btn-primary" href={calculatorFilePath}>
        {i18n.t('biomassStock.downloadExcel')}
      </a>
    </div>
  )
}

export default ExcelCalculatorDownload
