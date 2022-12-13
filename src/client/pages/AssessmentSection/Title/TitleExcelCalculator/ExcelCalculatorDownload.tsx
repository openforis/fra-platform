import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from '@meta/api/endpoint'

import { useCountry } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'

const domains: Array<string> = ['boreal', 'temperate', 'tropical', 'subtropical']

const getDownloadPath = (language: string, selectedDomain: string): string =>
  `${ApiEndPoint.File.biomassStock()}?&language=${language}&selectedDomain=${selectedDomain}`

const ExcelCalculatorDownload: React.FC = () => {
  const countryIso = useCountryIso()
  const { i18n, t } = useTranslation()
  const userInfo = useUser()
  const countryDomain = useCountry(countryIso)?.props?.domain ?? 'boreal'

  const [selectedDomain, setSelectedDomain] = useState<string>(countryDomain)
  const calculatorFilePath = getDownloadPath(i18n.language, selectedDomain)

  if (!userInfo) return null

  return (
    <div className="no-print">
      <select
        className="select-s"
        defaultValue={countryDomain}
        value={selectedDomain}
        onChange={(e) => setSelectedDomain(e.target.value)}
      >
        {domains.map((domain) => (
          <option value={domain} key={domain}>
            {t(`climaticDomain.${domain}`)}
            {domain === countryDomain && ` (${t('climaticDomain.selectDefault')})`}
          </option>
        ))}
      </select>
      <a className="btn-s btn-primary" href={calculatorFilePath}>
        {t('biomassStock.downloadExcel')}
      </a>
    </div>
  )
}

export default ExcelCalculatorDownload
