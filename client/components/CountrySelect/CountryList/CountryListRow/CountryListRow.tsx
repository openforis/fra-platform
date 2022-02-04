import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { noRole } from '@common/countryRole'
import { useCountryIso, useIsHome } from '@client/hooks'
import { useTranslation } from 'react-i18next'
import { BasePaths } from '@client/basePaths'
import { Dates } from '@client/utils'
import { CountryIso, Global, RegionCode } from '@meta/area'
import { useAssessment } from '@client/store/assessment'
import { useCycle } from '@client/hooks/useCycleName'

type Props = {
  country: { countryIso: CountryIso | Global | RegionCode }
  role: string
}

const CountryListRow: React.FC<Props> = (props: Props) => {
  const { role, country } = props

  const assessment = useAssessment()
  const cycle = useCycle()

  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const isHome = useIsHome()
  const countryNameRef = useRef(null)
  const fra2020Assessment = '' // Country.getFra2020Assessment(country) // TODO
  const selected = country.countryIso === countryIso && !isHome
  const hasRole = role !== noRole.role

  useEffect(() => {
    if (selected) {
      countryNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }
  }, [])

  return (
    <Link
      to={BasePaths.Assessment.root(country.countryIso, assessment.props.name, cycle?.name)}
      className={`country-selection-list__row${selected ? ' selected' : ''}`}
    >
      <span className="country-selection-list__primary-col" ref={countryNameRef}>
        {i18n.t(`area.${country.countryIso}.listName`)}
      </span>

      {hasRole && fra2020Assessment && (
        <span className="country-selection-list__secondary-col">
          <div className={`status-${fra2020Assessment}`} />
          {i18n.t(`assessment.status.${fra2020Assessment}.label`)}
        </span>
      )}

      {hasRole && (
        <span className="country-selection-list__secondary-col">
          {/* TODO */}
          {Dates.getRelativeDate(country.lastEdit, i18n) || i18n.t('audit.notStarted')}
        </span>
      )}
    </Link>
  )
}

export default CountryListRow
