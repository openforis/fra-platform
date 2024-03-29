import React, { useCallback, useEffect, useRef } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { ActivityLog, ActivityLogMessage, CommentableDescriptionValue } from 'meta/assessment'
import { Histories, HistoryItemSectionKey } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useHistory } from 'client/store/data/hooks/useHistory'
import { TablePaginatedActions, useTablePaginatedData } from 'client/store/ui/tablePaginated'
import { useCountryRouteParams, useSectionRouteParams } from 'client/hooks/useRouteParams'
import Items from 'client/components/Navigation/History/Items'
import Title from 'client/components/Navigation/History/Title'
import { useDataSourcesData } from 'client/pages/Section/Descriptions/NationalDataDescriptions/DataSources/hooks/useDataSourcesData'

// TODO:
// 1. Clean up
// 2. Separate concerns
// 3. Extract hooks

const useOnClick = () => {
  const { assessmentName, cycleName, countryIso } = useSectionRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  const onClick = (
    sectionKey: HistoryItemSectionKey,
    activity: ActivityLog<{ description: { value: CommentableDescriptionValue } }>
  ) => {
    const { sectionName, subSection, name } = Histories.getHistoryItemKeyParts(sectionKey)

    const {
      description: { value },
    } = activity.target

    dispatch(
      DataActions.setValue({
        assessmentName,
        cycleName,
        countryIso,
        subSection,
        name,
        sectionName,
        value,
      })
    )
  }

  return useCallback(onClick, [assessmentName, countryIso, cycleName, dispatch])
}

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
  const ref = useRef(undefined)

  const commentableDescription = useDataSourcesData({ sectionName })

  if (ref.current === undefined) {
    ref.current = commentableDescription
  }

  const curr = [
    {
      time: new Date().toISOString(),
      user: undefined,
      target: {
        name: 'dataSources',
        description: {
          value: ref.current,
        },
      } as unknown as ActivityLog<{ name: string; description: { value: string } }>,
    } as ActivityLog<never>,
  ]

  const d = data?.filter((d) => d.message === ActivityLogMessage.descriptionUpdate && d.section === sectionName)

  const ret = d ? [...curr, ...d] : curr
  return ret
}

const History: React.FC = () => {
  const history = useHistory()

  useGetData()
  const values = useData()
  const onClick = useOnClick()

  return (
    <div className="nav no-print">
      {Object.entries(history.items).map(([key, value]) => (
        <div key={key}>
          <Title value={value} />
          <Items onClick={onClick} sectionItemKey={value.sectionKey} values={values} />
        </div>
      ))}
    </div>
  )
}

export default History
