import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { CountryIso } from 'meta/area/countryIso'
import { Routes } from 'meta/routes/routes'

import { useIsEditTableDataEnabled } from 'client/store/user/hooks/auth'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'
import { useSectionContext } from 'client/pages/Section/context'

const ExtentOfForest: React.FC = () => {
  const { t } = useTranslation()
  const { sectionName } = useSectionContext()
  const editEnabled = useIsEditTableDataEnabled(sectionName)
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const user = useUser()
  const disabled = !editEnabled
  const className = useButtonClassName({ disabled, size: ButtonSize.m })

  if (!user) return null

  return (
    <>
      <div className="justify_start">
        <Link
          className={className}
          to={Routes.OriginalDataPoint.generatePath({ assessmentName, cycleName, countryIso, sectionName, year: '-1' })}
        >
          <Icon name="small-add" />
          {t('nationalDataPoint.addNationalDataPoint')}
        </Link>
      </div>
      <hr className="no-print" />
    </>
  )
}

export default ExtentOfForest
