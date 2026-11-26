import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { DataSourceNotApplicable } from 'meta/assessment/descriptionValue/dataSource'

import { useUser } from 'client/store/user/hooks/user'
import { useIsPrintRoute } from 'client/hooks/routes'
import { Option } from 'client/components/Inputs/Select'

// Public users and the print view have no option, so a not applicable value is shown empty
export const useNotApplicableOption = (): Option | undefined => {
  const { t } = useTranslation()
  const user = useUser()
  const { print } = useIsPrintRoute()

  return useMemo<Option | undefined>(() => {
    if (!user || print) return undefined
    return { label: t('dataSource.notApplicable'), value: DataSourceNotApplicable }
  }, [print, t, user])
}
