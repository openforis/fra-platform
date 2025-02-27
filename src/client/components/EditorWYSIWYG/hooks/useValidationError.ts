import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useCanEditCycleData } from 'client/store/user'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { EditorValidators } from 'client/components/EditorWYSIWYG'

type Returned = string

type Props = {
  value: string
}

export const useValidationError = (props: Props): Returned => {
  const { value } = props
  const { t } = useTranslation()
  const editor = useCanEditCycleData()

  const { print } = useIsPrintRoute()

  const validationError = useMemo<Returned>(() => {
    if (!print && editor && !EditorValidators.links(value)) return t('generalValidation.invalidLink')

    return ''
  }, [editor, print, t, value])

  return validationError
}
