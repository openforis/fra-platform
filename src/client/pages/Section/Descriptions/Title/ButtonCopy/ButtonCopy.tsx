import './ButtonCopy.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { DescriptionsActions } from 'client/store/data/descriptions/actions'
import { useCommentableDescriptionValue } from 'client/store/data/descriptions/hooks/descriptions'
import { useAppDispatch } from 'client/store/hooks'
import { usePreviousSection } from 'client/store/meta/hooks/sections'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonSize } from 'client/components/Buttons/Button'

interface Props {
  disabled: boolean
  sectionName: string
}

export const ButtonCopy: React.FC<Props> = (props: Props) => {
  const { disabled, sectionName } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const currentValue = useCommentableDescriptionValue({ sectionName, name: CommentableDescriptionName.dataSources })
  const previousSection = usePreviousSection(sectionName)
  const previousSectionName = previousSection?.props.name

  const onClick = useCallback(() => {
    const propsCopy = { assessmentName, cycleName, countryIso, sectionName, currentValue, previousSectionName }
    dispatch(DescriptionsActions.copyPreviousDatasources(propsCopy))
  }, [assessmentName, countryIso, currentValue, cycleName, dispatch, previousSectionName, sectionName])

  return (
    <Button
      className="data-sources__btn-copy"
      disabled={disabled || !previousSection}
      iconName="content_copy"
      label={t('nationalDataPoint.copyPreviousValues')}
      onClick={onClick}
      size={ButtonSize.xs}
    />
  )
}

export default ButtonCopy
