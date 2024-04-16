import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Diff from 'diff'
import { Change } from 'diff'

import { DataSourceDescription, Labels } from 'meta/assessment'

import { DataSourceHistoryCompare } from '../../hooks/useDataSourcesHistory'

type Props = {
  historyCompare: DataSourceHistoryCompare
  meta: DataSourceDescription
}

type Returned = {
  comments: Array<Change>
  reference: Array<Change>
  type: Array<Change>
  variables: Array<Change>
  year: Array<Change>
}

export const useChanges = (props: Props): Returned => {
  const { historyCompare, meta } = props
  const { dataItem, historyItem } = historyCompare

  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const typeOfDataSourceText = meta.table?.typeOfDataSourceText
    const variablesMeta = meta.table?.variables ?? []
    const variablesSelect = variablesMeta.length > 0

    // utility functions
    const _getHtmlTextContent = (string?: string): string =>
      new DOMParser().parseFromString(string ?? '', 'text/html')?.documentElement.textContent

    const _getVariablesText = (values: Array<string>): string =>
      variablesMeta
        .filter(({ variableName }) => values.includes(variableName))
        .map(({ label }) => Labels.getLabel({ label, t }))
        .join('\n\r')

    // comments
    const commentsData = _getHtmlTextContent(dataItem?.comments)
    const commentsHistory = _getHtmlTextContent(historyItem?.comments)
    const comments = Diff.diffChars(commentsHistory, commentsData)

    // reference
    const referenceData = _getHtmlTextContent(dataItem?.reference)
    const referenceHistory = _getHtmlTextContent(historyItem?.reference)
    const reference = Diff.diffChars(referenceHistory, referenceData)

    // type

    const typeData = typeOfDataSourceText ? dataItem?.type : t(`dataSource.${dataItem?.type}`)
    const typeHistory = typeOfDataSourceText ? historyItem?.type : t(`dataSource.${historyItem?.type}`)
    const type = typeOfDataSourceText ? Diff.diffChars(typeHistory, typeData) : Diff.diffLines(typeHistory, typeData)

    // variables
    const variablesData = variablesSelect ? _getVariablesText(dataItem?.variables ?? []) : dataItem?.variables?.at(0)
    const variablesHistory = variablesSelect
      ? _getVariablesText(historyItem?.variables ?? [])
      : historyItem?.variables?.at(0)
    const variables = variablesSelect
      ? Diff.diffLines(variablesHistory ?? '', variablesData ?? '')
      : Diff.diffChars(variablesHistory ?? '', variablesData ?? '')

    // year
    const year = Diff.diffChars(historyItem?.year ?? '', dataItem?.year ?? '')

    return { comments, reference, type, variables, year }
  }, [dataItem, historyItem, meta, t])
}
