import './ButtonCopy.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { CommentableDescriptionName } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { DataActions, useCommentableDescriptionValue } from 'client/store/data'
import { usePreviousSection } from 'client/store/metadata'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

interface Props {
  disabled: boolean
  sectionName: string
}

export const ButtonCopy: React.FC<Props> = (props: Props) => {
  const { disabled, sectionName } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const currentValue = useCommentableDescriptionValue({ sectionName, name: CommentableDescriptionName.dataSources })
  const previousSection = usePreviousSection(sectionName)
  const previousSectionName = previousSection?.props.name

  const onCopyClick = useCallback(() => {
    const propsCopy = { assessmentName, cycleName, countryIso, sectionName, currentValue, previousSectionName }
    dispatch(DataActions.copyPreviousDatasources(propsCopy))
  }, [assessmentName, countryIso, currentValue, cycleName, dispatch, previousSectionName, sectionName])

  return (
    <button
      className="btn-s btn-primary data-sources__btn-copy"
      disabled={disabled || !previousSection}
      onClick={onCopyClick}
      type="button"
    >
      {t('nationalDataPoint.copyPreviousValues')}
    </button>
  )
}

export default ButtonCopy
