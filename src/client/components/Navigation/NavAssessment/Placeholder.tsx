// NOTE: This file is a placeholder and will be removed in next PR.
// Purpose of this file is to show some content in UI for discussion.

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ActivityLog, ActivityLogMessage } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { useHistory } from 'client/store/data/hooks/useHistory'
import { TablePaginatedActions, useTablePaginatedData } from 'client/store/ui/tablePaginated'
import { useCountryRouteParams, useSectionRouteParams } from 'client/hooks/useRouteParams'
import { useMaxHeight } from 'client/components/Navigation/NavAssessment/hooks/useMaxHeight'
import RecentActivityItem from 'client/pages/CountryHome/FraHome/RecentActivity/RecentActivityItem'

const path = ApiEndPoint.CycleData.activities()
const useGetData = () => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  useEffect(() => {
    const params = { assessmentName, cycleName, countryIso, path, page: 0, limit: 20 }
    dispatch(TablePaginatedActions.getData(params))
  }, [assessmentName, countryIso, cycleName, dispatch])
}

const useData = () => {
  const { sectionName } = useSectionRouteParams()
  const data = useTablePaginatedData<ActivityLog<never>>(path)
  return data?.filter((d) => d.message === ActivityLogMessage.descriptionUpdate && d.section === sectionName)
}

const Placeholder: React.FC = () => {
  const { t } = useTranslation()
  const maxHeight = useMaxHeight()

  const history = useHistory()

  useGetData()
  const data = useData()

  return (
    <div className="nav-assessment" style={{ maxHeight }}>
      <div className="nav-section__header" role="button" tabIndex={0}>
        {Object.values(history?.items).map((h) => {
          return <div key={h.sectionKey}> {t(h.sectionLabelKey)} </div>
        })}
      </div>
      <div>
        {data?.map((d, i) => (
          <div key={d.time} className="nav-section__item">
            <RecentActivityItem datum={d} rowIndex={i} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Placeholder
