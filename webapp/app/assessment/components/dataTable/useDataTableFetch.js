import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { batchActions } from '@webapp/main/reduxBatch'

import * as R from 'ramda'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'
import * as SectionSpecs from '@webapp/app/assessment/components/section/sectionSpecs'

import { fetchTableData } from '@webapp/app/assessment/components/dataTable/actions'
import { fetchLastSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

const getTables = (assessmentType, sectionName, tableName) => {
  const tableSpec = SectionSpecs.getTableSpec(assessmentType, sectionName, tableName)
  const tableDataRequiredSpecs = tableSpec[SectionSpec.KEYS_TABLE.tableDataRequired]

  const table = {
    [SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType]: assessmentType,
    [SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName]: sectionName,
    [SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]: tableName,
  }

  if (R.isEmpty(tableDataRequiredSpecs)) {
    return [table]
  }

  const tables = tableDataRequiredSpecs
    .map(tableDataRequiredSpec =>
      getTables(
        tableDataRequiredSpec[SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType],
        tableDataRequiredSpec[SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName],
        tableDataRequiredSpec[SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]
      )
    )
    .flat()

  return R.uniq([...tables, table])
}

const useDataTableFetch = (assessmentType, sectionName, tableName) => {
  const tables = getTables(assessmentType, sectionName, tableName)

  const dispatch = useDispatch()
  const countryIso = useCountryIso()

  useEffect(() => {
    dispatch(
      batchActions([
        ...tables.map(table =>
          fetchTableData(
            table[SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType],
            table[SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName],
            table[SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]
          )
        ),
        fetchLastSectionUpdateTimestamp(countryIso, sectionName),
      ])
    )
  }, [])
}

export default useDataTableFetch
