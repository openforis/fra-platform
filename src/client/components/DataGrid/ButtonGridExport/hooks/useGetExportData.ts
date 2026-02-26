import { RefObject, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area/areas'
import { Assessments } from 'meta/assessment/assessments'
import { Dates } from 'utils/dates'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useLastPublishedCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { getDataGridData } from 'client/components/DataGrid/utils'

type ExportData = {
  data: Array<Array<string>>
  prependedRowsCount: number
}

type Props = {
  gridRef: RefObject<HTMLDivElement>
}

export const useGetExportData = (props: Props): (() => ExportData) => {
  const { gridRef } = props

  const { t } = useTranslation()
  const user = useUser()
  const { assessmentName } = useCountryRouteParams()
  const assessment = useAssessment()
  const country = useAssessmentCountry()
  const lastPublishedCycle = useLastPublishedCycle()

  return useCallback((): ExportData => {
    let data = getDataGridData(gridRef.current)
    let prependedRowsCount = 0

    // Add disclaimer rows when in public view and the country has voluntary updates.
    const showDisclaimer = !user && Areas.hasVoluntaryUpdates({ assessment, country })

    if (showDisclaimer) {
      const publishedDate = Dates.parseISO(country.lastPublishedInfo.lastPublished)
      const month = Dates.format(publishedDate, 'MM')
      const year = Dates.format(publishedDate, 'yyyy')

      const _assessmentName = t(Assessments.getShortLabel(assessmentName))
      const cycleName = lastPublishedCycle.name

      const params = { assessmentName: _assessmentName, cycleName, month, year }

      const disclaimerRows: Array<Array<string>> = [
        [t('common.csvDisclaimer')],
        [t('common.csvDisclaimerText', params)],
        [],
        [],
        [],
      ]
      prependedRowsCount = disclaimerRows.length
      data = [...disclaimerRows, ...data]
    }

    return { data, prependedRowsCount }
  }, [assessment, assessmentName, country, gridRef, lastPublishedCycle.name, t, user])
}
