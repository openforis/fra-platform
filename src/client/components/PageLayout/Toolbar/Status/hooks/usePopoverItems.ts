import { Dispatch, SetStateAction, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas, CountryStatus } from 'meta/area'
import { CountryStatuses } from 'meta/area/countryStatuses'

import { useAssessmentCountry } from 'client/store/area'
import { useCycle } from 'client/store/meta/assessment/hooks/cycles'
import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useUser } from 'client/store/user'
import { StatusTransition } from 'client/components/PageLayout/Toolbar/Status/types'
import { PopoverItem } from 'client/components/PopoverControl'

import { useAdminPopoverItems } from './useAdminPopoverItems'

type Props = {
  setTargetStatus: Dispatch<SetStateAction<StatusTransition>>
}

export const usePopoverItems = (props: Props): Array<PopoverItem> => {
  const { setTargetStatus } = props
  const { t } = useTranslation()
  const user = useUser()
  const country = useAssessmentCountry()
  const cycle = useCycle()
  const dataLocked = useIsDataLocked()

  const adminPopoverItems = useAdminPopoverItems()
  const status = Areas.getStatus(country)

  return useMemo(() => {
    if ([CountryStatus.notStarted].includes(status) || dataLocked) return []
    const items: Array<PopoverItem> = []
    const { next, previous } = CountryStatuses.getAllowedTransition({ country, user, cycle })

    if (next) {
      items.push({
        content: t(`assessment.status.${next}.next`),
        onClick: () => setTargetStatus({ status: next, direction: 'next' }),
      })
    }
    if (previous) {
      items.push({
        content: t(`assessment.status.${previous}.previous`),
        onClick: () => setTargetStatus({ status: previous, direction: 'previous' }),
      })
    }
    items.push(...adminPopoverItems)

    return items
  }, [adminPopoverItems, country, cycle, dataLocked, setTargetStatus, status, t, user])
}
