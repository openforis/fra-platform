import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { Routes } from 'meta/routes'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import Icon from 'client/components/Icon'

import { Props } from '../props'

const ExtentOfForest: React.FC<Props> = (props) => {
  const { disabled } = props

  const { t } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const user = useUser()

  if (!user) return null

  return (
    <>
      <Link
        className={classNames('btn btn-primary no-print', { disabled })}
        to={Routes.OriginalDataPoint.generatePath({
          countryIso,
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          year: '-1',
          sectionName: 'extentOfForest',
        })}
      >
        <Icon className="icon-sub icon-white" name="small-add" />
        {t('nationalDataPoint.addNationalDataPoint')}
      </Link>
      <hr className="no-print" />
    </>
  )
}

export default ExtentOfForest
