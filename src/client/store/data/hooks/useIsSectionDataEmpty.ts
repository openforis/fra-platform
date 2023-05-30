import { useEffect, useMemo, useState } from 'react'

import { TableSection } from '@meta/assessment'
import { RecordAssessmentDatas } from '@meta/data'

import { useAppSelector } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'

export const useIsSectionDataEmpty = (tableSections: TableSection[]) => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const data = useAppSelector((state) => state.data.tableData)

  const [sectionDataEmpty, setSectionDataEmpty] = useState(false)
  const sectionTableNames = useMemo(
    () => tableSections.flatMap((ts) => ts.tables.flatMap((t) => t.props.name)),
    [tableSections]
  )

  const dataLoaded = useMemo(
    () => Boolean(data?.[assessment.props.name]?.[cycle.name]?.[countryIso]),
    [assessment.props.name, countryIso, cycle.name, data]
  )

  const allTablesEmpty =
    dataLoaded &&
    sectionTableNames.every((tableName) =>
      RecordAssessmentDatas.isTableDataEmpty({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
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
