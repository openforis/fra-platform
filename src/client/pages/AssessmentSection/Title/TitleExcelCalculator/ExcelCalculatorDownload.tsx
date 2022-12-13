import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from '@meta/api/endpoint'
import { Authorizer } from '@meta/user'

import { useAssessmentSection, useCountry, useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'

const domains: Array<string> = ['boreal', 'temperate', 'tropical', 'subtropical']

const ExcelCalculatorDownload: React.FC = () => {
  const section = useAssessmentSection()

  const countryIso = useCountryIso()
  const country = useCountry(countryIso)
  const cycle = useCycle()
  const { i18n, t } = useTranslation()
  const userInfo = useUser()
  const countryDomain = country?.props?.domain

  const [selectedDomain, setSelectedDomain] = useState<string>(
    domains.includes(countryDomain) ? countryDomain : 'boreal'
  )

  const calculatorFilePath = `${ApiEndPoint.File.biomassStock()}?
  }&countryIso=${countryIso}&cycleName=${cycle?.name}&sectionName=${section?.props?.name}language=${
    i18n.language
  }&selectedDomain=${selectedDomain}`

  if (!Authorizer.canEdit({ user: userInfo, countryIso, cycle, country, section })) return null

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
