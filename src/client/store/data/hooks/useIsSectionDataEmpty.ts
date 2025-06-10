import { useEffect, useMemo, useState } from 'react'

import { TableSection } from 'meta/assessment/tableSection'
import { RecordAssessmentDatas } from 'meta/data'

import { useRecordAssessmentData } from 'client/store/data/tableData/nodeValues/hooks/data'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryIso } from 'client/hooks'

export const useIsSectionDataEmpty = (tableSections: Array<TableSection>) => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const data = useRecordAssessmentData()

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
