import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import * as Diff from 'diff'
import { ChangeObject } from 'diff'

import { DataSourceDescription } from 'meta/assessment/description'
import { DataSource, DataSourceHistoryCompare } from 'meta/assessment/descriptionValue/dataSource'
import { DataSources } from 'meta/assessment/descriptionValue/dataSources'

import { PropsDataSources } from 'client/components/DataSources/types'

type Props = {
  columns?: PropsDataSources['columns']
  historyCompare: DataSourceHistoryCompare
  meta?: DataSourceDescription
}

type Returned = {
  comments: Array<ChangeObject<unknown>>
  reference: Array<ChangeObject<unknown>>
  type: Array<ChangeObject<unknown>>
  variables: Array<ChangeObject<unknown>>
  year: Array<ChangeObject<unknown>>
}

export const useChanges = (props: Props): Returned => {
  const { columns, historyCompare, meta } = props
  const { dataItem, historyItem } = historyCompare

  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const typeOfDataSourceText = meta?.table?.typeOfDataSourceText
    const typeOptions = columns.type.options
    const variablesMeta = meta?.table?.variables ?? []
    const variablesSelect = variablesMeta.length > 0

    // utility functions
    const _getHtmlTextContent = (string?: string): string =>
      new DOMParser().parseFromString(string ?? '', 'text/html')?.documentElement.textContent

    const _getVariables = (values?: Array<string>): Array<string> =>
      variablesMeta
        .filter(({ variableName }) => values && values.includes(variableName))
        .map((variable) => DataSources.getVariableLabel({ variable, t }))

    const _getType = (dataSource: DataSource): string | Array<string> => {
      if (typeOfDataSourceText) return dataSource?.type ?? ''

      const types = Array.isArray(dataSource?.type) ? dataSource.type : [dataSource?.type ?? '']

      return types.map((type) => {
        const label = typeOptions.find((o) => o.value === type)?.label
        return label ? String(label) : ''
      })
    }

    // comments
    const commentsData = dataItem?.comments ?? ''
    const commentsHistory = historyItem?.comments ?? ''
    const comments = Diff.diffChars(commentsHistory, commentsData)

    // reference
    const referenceData = _getHtmlTextContent(dataItem?.reference)
    const referenceHistory = _getHtmlTextContent(historyItem?.reference)
    const reference = Diff.diffChars(referenceHistory ?? '', referenceData ?? '')

    // type
    const typeData = _getType(dataItem)
    const typeHistory = _getType(historyItem)
    const type = typeOfDataSourceText
      ? Diff.diffChars((typeHistory as string) ?? '', (typeData as string) ?? '')
      : Diff.diffArrays((typeHistory as Array<string>) ?? [], (typeData as Array<string>) ?? [])

    // variables
    const variablesData = variablesSelect ? _getVariables(dataItem?.variables) : dataItem?.variables?.at(0)
    const variablesHistory = variablesSelect ? _getVariables(historyItem?.variables) : historyItem?.variables?.at(0)
    const variables = variablesSelect
      ? Diff.diffArrays((variablesHistory as Array<string>) ?? [], (variablesData as Array<string>) ?? [])
      : Diff.diffChars((variablesHistory as string) ?? '', (variablesData as string) ?? '')

    // year
    const yearData = dataItem?.year
    const yearHistory = Array.isArray(historyItem?.year) ? historyItem.year : [historyItem?.year]
    const year = Diff.diffArrays(yearHistory ?? [], yearData ?? [])

    return { comments, reference, type, variables, year }
  }, [columns, dataItem, historyItem, meta, t])
}
