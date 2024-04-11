import React, { useEffect, useMemo, useState } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { NodeCalculations, RowCache, Table as TableType, TableName, VariableCache } from 'meta/assessment'
import { DashboardTable } from 'meta/dashboard'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { useAppDispatch, useAppSelector } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { DataActions } from 'client/store/data'
import { useCountryIso } from 'client/hooks'
import { useCountryRouteParams, useSectionRouteParams } from 'client/hooks/useRouteParams'
import { useRowsData } from 'client/pages/Section/DataTable/hooks/useRowsData'
import TableComponent from 'client/pages/Section/DataTable/Table'

type Props = {
  item: DashboardTable
}

type InternalDependencies = Set<TableName>

export const useDependencies = (table: TableType): InternalDependencies => {
  return useMemo<InternalDependencies>(() => {
    const tableNames: InternalDependencies = new Set<TableName>()

    const addDependencies = (variables: Array<Array<VariableCache>>): void => {
      variables.flat(1).forEach((variable) => {
        tableNames.add(variable.tableName)
      })
    }

    // throw error if calculationDependencies is undefined
    if (!table.calculationDependencies) {
      throw new Error('calculationDependencies is not defined')
    }

    addDependencies(Object.values(table.calculationDependencies))
    return tableNames
  }, [table.calculationDependencies])
}

export const useGetTableData = (table: TableType) => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dependencies = useDependencies(table)

  useEffect(() => {
    if (dependencies.size > 0) {
      const propsFetch = { assessmentName, cycleName, countryIso, mergeOdp: true }
      dispatch(DataActions.getTableData({ ...propsFetch, tableNames: Array.from(dependencies) }))
    }
  }, [assessmentName, countryIso, cycleName, dependencies, dispatch])
}

const useData = (table: TableType) => {
  const tableName = table.props.name
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const dataStore = useAppSelector((state) => state.data.tableData)
  const [dataState, setDataState] = useState<RecordAssessmentData>(dataStore)
  const rowsData = useRowsData({ table })

  useEffect(() => {
    const assessmentName = assessment.props.name
    const cycleName = cycle.name

    const propsData = { assessmentName, cycleName, countryIso, data: dataStore }
    const countryData = RecordAssessmentDatas.getCountryData(propsData)

    if (Objects.isEmpty(countryData)) {
      setDataState(dataStore)
      return
    }

    const data = Objects.cloneDeep(dataStore)

    rowsData.forEach((row) => {
      const { variableName } = row.props

      row.cols.forEach((col) => {
        const { colName } = col.props

        if (colName) {
          const propsCalculate = {
            assessments: { [assessment.props.name]: assessment },
            assessment,
            cycle,
            countryIso,
            tableName,
            row: row as RowCache,
            col,
            data,
          }
          const valueCalc = NodeCalculations.calculate(propsCalculate)
          if (valueCalc) {
            const propsUpdate = { assessmentName, cycleName, countryIso, tableName, variableName, colName, data }
            RecordAssessmentDatas.updateDatum({ ...propsUpdate, value: valueCalc })
          }
        }
      })
    })
    setDataState(data)
  }, [assessment, countryIso, cycle, dataStore, rowsData, tableName])

  return dataState
}

const Table: React.FC<Props> = (props: Props) => {
  const { assessmentName, sectionName } = useSectionRouteParams()
  const {
    item: { table },
  } = props

  const data = useData(table)
  const disabled = true

  useGetTableData(table)

  return (
    <TableComponent
      assessmentName={assessmentName}
      data={data}
      disabled={disabled}
      sectionName={sectionName}
      table={table}
    />
  )
}

export default Table
