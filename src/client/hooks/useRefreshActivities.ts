import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import { useToaster } from 'client/hooks/toaster'

type Props = {
  countryIso: CountryIso
}

type Returned = {
  isRefreshing: boolean
  refreshActivities: (props: Props) => Promise<void>
}

export const useRefreshActivities = (): Returned => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  const { t } = useTranslation()
  const { toaster } = useToaster()
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const refreshActivities = useCallback(
    async (props: Props) => {
      const { countryIso } = props
      const params = { assessmentName, countryIso, cycleName }
      setIsRefreshing(true)
      try {
        await axios.post(ApiEndPoint.CycleData.activitiesRefresh(), {}, { params })
        toaster.success(t('landing.recentActivity.refreshed'))
      } finally {
        setIsRefreshing(false)
      }
    },
    [assessmentName, cycleName, t, toaster]
  )

  return { isRefreshing, refreshActivities }
}
