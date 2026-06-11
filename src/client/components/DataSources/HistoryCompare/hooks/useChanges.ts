import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import * as Diff from 'diff'
import { Change } from 'diff'

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
  comments: Array<Change>
  reference: Array<Change>
  type: Array<Change>
  variables: Array<Change>
  year: Array<Change>
}

export const useChanges = (props: Props): Returned => {
  const { columns, historyCompare, meta } = props
  const { dataItem, historyItem } = historyCompare

  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const typeOfDataSourceText = meta?.table?.typeOfDataSourceText
    const typeOptions = columns?.type?.options ?? []
    const variablesMeta = meta?.table?.variables ?? []
    const variablesSelect = variablesMeta.length > 0

    // utility functions
    const _getHtmlTextContent = (string?: string): string =>
      new DOMParser().parseFromString(string ?? '', 'text/html')?.documentElement.textContent

    const _getVariablesText = (values?: Array<string>): string =>
      variablesMeta
        .filter(({ variableName }) => values && values.includes(variableName))
        .map((variable) => DataSources.getVariableLabel({ variable, t }))
        .join('\n\r')

    const _getType = (dataSource: DataSource): string => {
      if (typeOfDataSourceText) return dataSource?.type as string
      if (!dataSource?.type) return ''
      const types = Array.isArray(dataSource.type) ? dataSource.type : [dataSource.type as string]
      // consistent diff lines
      return (
        types.map((type) => typeOptions.find((o) => o.value === type)?.label ?? t(`dataSource.${type}`)).join('\n') +
        '\n'
      )
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
      ? Diff.diffChars(typeHistory ?? '', typeData ?? '')
      : Diff.diffLines(typeHistory ?? '', typeData ?? '')

    // variables
    const variablesData = variablesSelect ? _getVariablesText(dataItem?.variables) : dataItem?.variables?.at(0)
    const variablesHistory = variablesSelect ? _getVariablesText(historyItem?.variables) : historyItem?.variables?.at(0)
    const variables = variablesSelect
      ? Diff.diffLines(variablesHistory ?? '', variablesData ?? '')
      : Diff.diffChars(variablesHistory ?? '', variablesData ?? '')

    // year
    const yearData = dataItem?.year?.join('\n\r') ?? ''
    const yearHistory = Array.isArray(historyItem?.year) ? historyItem.year.join(', ') : (historyItem?.year ?? '')
    const year = Diff.diffChars(yearHistory, yearData)

    return { comments, reference, type, variables, year }
  }, [columns, dataItem, historyItem, meta, t])
}
