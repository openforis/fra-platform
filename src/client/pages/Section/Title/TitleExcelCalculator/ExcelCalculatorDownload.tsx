import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
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

  const s3path = `${assessment.props.name}/${cycle.name}/biomassStock/calculator_${selectedDomain}_${language}.xlsx`
  const calculatorFilePath = ApiEndPoint.Static.file(s3path)

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
