import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'

import { Objects } from 'utils/objects'

import { EditorValidators } from 'client/components/EditorWYSIWYG/validators'

type Props = {
  enabled: boolean
  value: string
}

type PropsGetLinkValidationError = Props & {
  t: TFunction
}

type Returned = Array<string>

export const getLinkValidationError = (props: PropsGetLinkValidationError): string => {
  const { enabled, t, value } = props

  if (enabled && !EditorValidators.links(value)) {
    return t('generalValidation.invalidLink')
  }

  return ''
}

export const useLinkValidationErrors = (props: Props): Returned => {
  const { enabled, value } = props
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const validationError = getLinkValidationError({ enabled, t, value })

    if (Objects.isEmpty(validationError)) {
      return []
    }

    return [validationError]
  }, [enabled, t, value])
}
