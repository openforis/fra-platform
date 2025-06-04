import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { Files } from 'meta/file/files'
import { Authorizer } from 'meta/user'

import { useCountry } from 'client/store/area/hooks/country'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSection } from 'client/store/meta/hooks/sections'
import { useUser } from 'client/store/user'
import { useLanguage } from 'client/hooks/useLanguage'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { useSortedDomains } from './hooks/useSortedDomains'

const ExcelCalculatorDownload: React.FC = () => {
  const cycle = useCycle()
  const section = useSection()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const country = useCountry(countryIso)

  const { t } = useTranslation()
  const userInfo = useUser()
  const countryDomain = country?.props?.domain

  const { defaultSelectedDomain, domains } = useSortedDomains()

  const [selectedDomain, setSelectedDomain] = useState<string>(defaultSelectedDomain)

  const language = useLanguage()

  useEffect(() => {
    setSelectedDomain(defaultSelectedDomain)
  }, [defaultSelectedDomain])

  const calculatorFilePath = Files.Static.getBiomassCalculator({
    assessmentName,
    cycleName,
    countryIso,
    domain: selectedDomain,
    language,
  })

  if (!Authorizer.canEditData({ country, cycle, section, user: userInfo })) return null

  return (
    <div className="no-print">
      <select className="select-s" onChange={(e) => setSelectedDomain(e.target.value)} value={selectedDomain}>
        {domains.map((domain) => (
          <option key={domain} value={domain}>
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
