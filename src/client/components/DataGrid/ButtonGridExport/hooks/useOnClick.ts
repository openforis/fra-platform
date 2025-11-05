import { MutableRefObject } from 'react'
import type { AsyncClickHandler } from 'react-csv/components/CommonPropTypes'
import { flushSync } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { Dates } from 'utils/dates'

import { Areas } from 'meta/area/areas'
import { Assessments } from 'meta/assessment/assessments'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useLastPublishedCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { getDataGridData } from 'client/components/DataGrid/utils'

type Props = {
  gridRef: MutableRefObject<HTMLDivElement>
  setData: (data: Array<object>) => void
}

export const useOnClick = (props: Props): AsyncClickHandler => {
  const { gridRef, setData } = props

  const { t } = useTranslation()
  const user = useUser()
  const { assessmentName } = useCountryRouteParams()
  const country = useAssessmentCountry()
  const lastPublishedCycle = useLastPublishedCycle()

  return (_, done): void => {
    flushSync(() => {
      let csvData = getDataGridData(gridRef.current)

      // Add disclaimer rows when in public view and the country has voluntary updates
      const showDisclaimer = !user && Areas.hasVoluntaryUpdates({ country, cycle: lastPublishedCycle })

      if (showDisclaimer) {
        const publishedDate = Dates.parseISO(country.lastPublishedInfo.lastPublished)
        const month = Dates.format(publishedDate, 'MM')
        const year = Dates.format(publishedDate, 'yyyy')

        const _assessmentName = t(Assessments.getShortLabel(assessmentName))
        const cycleName = lastPublishedCycle.name

        const params = { assessmentName: _assessmentName, cycleName, month, year }

        const disclaimerRows = [[t('common.csvDisclaimer')], [t('common.csvDisclaimerText', params)], [], [], []]
        csvData = [...disclaimerRows, ...csvData]
      }

      setData(csvData)
    })
    done()
  }
}
