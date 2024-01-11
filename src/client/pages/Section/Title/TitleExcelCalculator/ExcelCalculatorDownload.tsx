import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Authorizer } from 'meta/user'

import { useCountry } from 'client/store/area'
import { useAssessment, useCycle } from 'client/store/assessment'
import { useSection } from 'client/store/metadata'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'

import { useSortedDomains } from './hooks/useSortedDomains'

const ExcelCalculatorDownload: React.FC = () => {
  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const section = useSection()
  const country = useCountry(countryIso)

  const { i18n, t } = useTranslation()
  const userInfo = useUser()
  const countryDomain = country?.props?.domain

  const { domains, defaultSelectedDomain } = useSortedDomains()

  const [selectedDomain, setSelectedDomain] = useState<string>(defaultSelectedDomain)

  useEffect(() => {
    setSelectedDomain(defaultSelectedDomain)
  }, [defaultSelectedDomain])

  const calculatorFilePath = ApiEndPoint.File.biomassStock({
    assessmentName: assessment?.props?.name,
    countryIso,
    cycleName: cycle?.name,
    sectionName: section?.props?.name,
    selectedDomain,
    language: i18n.resolvedLanguage,
  })

  if (!Authorizer.canEditData({ country, cycle, section, user: userInfo })) return null

  return (
    <div className="no-print">
      <select className="select-s" value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)}>
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
