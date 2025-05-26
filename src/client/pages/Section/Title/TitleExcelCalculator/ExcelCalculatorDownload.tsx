import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Files } from 'meta/file/files'
import { Authorizer } from 'meta/user'

import { useCountry } from 'client/store/area'
import { useAssessment, useCycle } from 'client/store/assessment'
import { useSection } from 'client/store/metadata'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { useLanguage } from 'client/hooks/useLanguage'

import { useSortedDomains } from './hooks/useSortedDomains'

const ExcelCalculatorDownload: React.FC = () => {
  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const section = useSection()
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
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
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
