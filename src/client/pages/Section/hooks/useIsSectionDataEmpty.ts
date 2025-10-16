import { useEffect, useMemo, useState } from 'react'

import { CountryIso } from 'meta/area'
import { TableSection } from 'meta/assessment/tableSection'
import { RecordAssessmentDatas } from 'meta/data'

import { useRecordAssessmentData } from 'client/store/data/tableData/nodeValues/hooks/data'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useIsSectionDataEmpty = (tableSections: Array<TableSection>) => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  const data = useRecordAssessmentData()

  const [sectionDataEmpty, setSectionDataEmpty] = useState(false)
  const sectionTableNames = useMemo(
    () => tableSections.flatMap((ts) => ts.tables.flatMap((t) => t.props.name)),
    [tableSections]
  )

  const dataLoaded = useMemo(
    () => Boolean(data?.[assessmentName]?.[cycleName]?.[countryIso]),
    [assessmentName, countryIso, cycleName, data]
  )

  const allTablesEmpty =
    dataLoaded &&
    sectionTableNames.every((tableName) =>
      RecordAssessmentDatas.isTableDataEmpty({
        assessmentName,
        cycleName,
        data,
        tableName,
        countryIso,
      })
    )

  useEffect(() => {
    if (dataLoaded) {
      setSectionDataEmpty(allTablesEmpty)
    }
  }, [allTablesEmpty, dataLoaded])

  if (!dataLoaded) return false

  return sectionDataEmpty
}
