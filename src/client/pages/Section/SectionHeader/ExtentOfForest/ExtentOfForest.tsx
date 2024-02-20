import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { CountryIso } from 'meta/area'
import { Routes } from 'meta/routes'

import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

import { Props } from '../props'

const sectionName = 'extentOfForest'

const ExtentOfForest: React.FC<Props> = (props) => {
  const { disabled } = props

  const { t } = useTranslation()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const user = useUser()
  const className = useButtonClassName({ disabled, iconName: 'small-add', size: ButtonSize.m })

  if (!user) return null

  return (
    <>
      <div className="justify_start">
        <Link
          className={className}
          to={Routes.OriginalDataPoint.generatePath({ assessmentName, cycleName, countryIso, sectionName, year: '-1' })}
        >
          <Icon className="icon-sub icon-white" name="small-add" />
          {t('nationalDataPoint.addNationalDataPoint')}
        </Link>
      </div>
      <hr className="no-print" />
    </>
  )
}

export default ExtentOfForest
