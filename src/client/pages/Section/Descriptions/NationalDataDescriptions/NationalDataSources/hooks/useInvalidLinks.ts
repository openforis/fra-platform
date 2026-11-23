import { useMemo } from 'react'

import { SectionName } from 'meta/assessment/section'
import { Validations } from 'meta/assessment/validation/validations/validations'

import { useDataSourceValidations } from 'client/store/data/validations/descriptions/hooks/descriptions'
import { useCanEditCycleData } from 'client/store/user/hooks/auth'
import { useIsPrintRoute } from 'client/hooks/routes'
import { DataSourcesInvalidLinks } from 'client/components/DataSources/types'

type Props = {
  sectionName: SectionName
}

type Returned = DataSourcesInvalidLinks

export const useInvalidLinks = (props: Props): Returned => {
  const { sectionName } = props

  const canEditCycleData = useCanEditCycleData()
  const { print } = useIsPrintRoute()
  const dataSourceValidations = useDataSourceValidations({ sectionName })

  return useMemo<Returned>(() => {
    if (!canEditCycleData || print) return {}

    const invalidLinks: Returned = {}
    Object.entries(dataSourceValidations).forEach(([uuid, dataSourceValidation]) => {
      invalidLinks[uuid] = Validations.getInvalidLinks(dataSourceValidation.reference)
    })

    return invalidLinks
  }, [canEditCycleData, dataSourceValidations, print])
}
