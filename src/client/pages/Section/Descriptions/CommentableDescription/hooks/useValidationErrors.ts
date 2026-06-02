import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { MessageParser } from 'meta/validations/messageParser'
import { Objects } from 'utils/objects'

import { useDescriptionValidation } from 'client/store/data/tableData/validations/hooks/descriptions'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useIsPrintRoute } from 'client/hooks/routes'

type Props = {
  name: CommentableDescriptionName
  sectionName: SectionName
}

type Returned = Array<string>

export const useValidationErrors = (props: Props): Returned => {
  const { name, sectionName } = props

  const { t } = useTranslation()
  const canEditCycleData = useCanEditCycleData()
  const { print } = useIsPrintRoute()
  const descriptionValidation = useDescriptionValidation({ name, sectionName })

  return useMemo<Returned>(() => {
    if (!canEditCycleData || print) return []

    const { messages = [], valid } = descriptionValidation
    if (valid || Objects.isEmpty(messages)) return []

    return messages.map((message) => MessageParser.getMessage(t, message))
  }, [canEditCycleData, descriptionValidation, print, t])
}
