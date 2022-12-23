import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from '@meta/api/endpoint'
import { Authorizer } from '@meta/user'

import { useAssessment, useAssessmentSection, useCountry, useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'

const domains: Array<string> = ['boreal', 'temperate', 'tropical', 'subtropical']

const ExcelCalculatorDownload: React.FC = () => {
  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const section = useAssessmentSection()
  const country = useCountry(countryIso)

  const { i18n, t } = useTranslation()
  const userInfo = useUser()
  const countryDomain = country?.props?.domain

  const [selectedDomain, setSelectedDomain] = useState<string>(
    domains.includes(countryDomain) ? countryDomain : 'boreal'
  )

  const calculatorFilePath = `${ApiEndPoint.File.biomassStock()}?assessmentName=${
    assessment?.props?.name
  }&countryIso=${countryIso}&cycleName=${cycle?.name}&sectionName=${section?.props?.name}&language=${
    i18n.language
  }&selectedDomain=${selectedDomain}`

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
