import { useEffect, useMemo, useState } from 'react'

import { TableSection } from '@meta/assessment'
import { TableDatas } from '@meta/data'

import { useAppSelector } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'

export const useIsSectionDataEmpty = (tableSections: TableSection[]) => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const data = useAppSelector((state) => state.data.tableData[assessment.props.name][cycle.name])

  const [sectionDataEmpty, setSectionDataEmpty] = useState(false)
  const sectionTableNames = useMemo(
    () => tableSections.flatMap((ts) => ts.tables.flatMap((t) => t.props.name)),
    [tableSections]
  )

  const dataLoaded = useMemo(() => Boolean(data?.[countryIso]), [countryIso, data])

  const allTablesEmpty =
    dataLoaded &&
    sectionTableNames.every((tableName) =>
      TableDatas.isTableDataEmpty({
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
