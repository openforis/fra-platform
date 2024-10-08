import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { CountryIso } from 'meta/area'
import { Routes } from 'meta/routes'

import { useAppDispatch } from 'client/store'
import {
  OriginalDataPointActions,
  useIsOriginalDataPointUpdating,
  useOriginalDataPoint,
} from 'client/store/ui/originalDataPoint'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonSize, ButtonType, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'
import { useIsEditODPEnabled } from 'client/pages/OriginalDataPoint/hooks/useIsEditODPEnabled'

const ButtonBar: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams<CountryIso>()
  const originalDataPoint = useOriginalDataPoint()
  const isOriginalDataPointUpdating = useIsOriginalDataPointUpdating()
  const canEdit = useIsEditODPEnabled()

  const sectionLink = Routes.Section.generatePath({ countryIso, assessmentName, cycleName, sectionName })
  const disabled = isOriginalDataPointUpdating
  const doneClassName = useButtonClassName({ disabled, size: ButtonSize.m })

  if (!canEdit) {
    return null
  }

  const handleDelete = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t('nationalDataPoint.confirmDelete'))) {
      dispatch(
        OriginalDataPointActions.deleteOriginalDataPoint({ countryIso, assessmentName, cycleName, originalDataPoint })
      )
      navigate(sectionLink)
    }
  }
  return (
    <>
      <Link className={doneClassName} to={sectionLink}>
        <Icon name="checkbox" />
        {t('nationalDataPoint.doneEditing')}
      </Link>

      <div className="odp-v-divider" />

      <Button
        disabled={disabled}
        iconName="trash-simple"
        label={t('common.delete')}
        onClick={handleDelete}
        size={ButtonSize.m}
        type={ButtonType.danger}
      />
    </>
  )
}

export default ButtonBar
