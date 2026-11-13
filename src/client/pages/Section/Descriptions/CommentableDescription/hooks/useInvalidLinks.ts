import { useMemo } from 'react'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Links } from 'meta/cycleData/links/links'

import { useDescriptionValidation } from 'client/store/data/validations/descriptions/hooks/descriptions'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useIsPrintRoute } from 'client/hooks/routes'

type Props = {
  name: CommentableDescriptionName
  sectionName: SectionName
}

type Returned = Array<string>

export const useInvalidLinks = (props: Props): Returned => {
  const { name, sectionName } = props

  const canEditCycleData = useCanEditCycleData()
  const { print } = useIsPrintRoute()
  const descriptionValidation = useDescriptionValidation({ name, sectionName })

  return useMemo<Returned>(() => {
    if (!canEditCycleData || print) return []

    return Links.getInvalidLinks(descriptionValidation)
  }, [canEditCycleData, descriptionValidation, print])
}
