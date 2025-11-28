import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'
import { Authorizer } from 'meta/auth/authorizer'
import { Files } from 'meta/file/files'

import { useCountry } from 'client/store/area/hooks/country'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSection } from 'client/store/meta/hooks/sections'
import { useUser } from 'client/store/user/hooks/user'
import { useLanguage } from 'client/hooks/language'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useButtonClassName } from 'client/components/Buttons/Button'
import Select, { Option, SelectSize } from 'client/components/Inputs/Select'
import Flex from 'client/components/Layout/Flex'

import { useSortedDomains } from './hooks/useSortedDomains'

const ExcelCalculatorDownload: React.FC = () => {
  const { t } = useTranslation()
  const cycle = useCycle()
  const section = useSection()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const country = useCountry(countryIso)
  const userInfo = useUser()
  const language = useLanguage()
  const { defaultSelectedDomain, domains } = useSortedDomains()
  const [domain, setDomain] = useState<string>(defaultSelectedDomain)
  const linkClassName = useButtonClassName({})

  const propsPath = { assessmentName, cycleName, countryIso, domain, language }
  const calculatorFilePath = Files.Static.getBiomassCalculator(propsPath)
  const countryDomain = country?.props?.domain

  const options = domains.map<Option>((value) => {
    let label = `${t(`climaticDomain.${value}`)}`
    if (value === countryDomain) label += ` (${t('climaticDomain.selectDefault')})`
    return { label, value }
  })

  useEffect(() => {
    setDomain(defaultSelectedDomain)
  }, [defaultSelectedDomain])

  if (!Authorizer.canEditSectionData({ country, cycle, section, user: userInfo })) return null

  return (
    <Flex alignContent={'stretch'} className="no-print" gap={'8'}>
      <Select
        bordered
        isClearable={false}
        onChange={(value: string) => setDomain(value)}
        options={options}
        size={SelectSize.s}
        value={domain}
      />
      <a className={linkClassName} href={calculatorFilePath}>
        {t('biomassStock.downloadExcel')}
      </a>
    </Flex>
  )
}

export default ExcelCalculatorDownload
