import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import * as Diff from 'diff'
import { ChangeObject } from 'diff'
import type { TFunction } from 'i18next'

import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { useLastApprovedOriginalDataPoint } from 'client/store/data/history/hooks/lastApprovedOriginalDataPoint'
import { ODPDiffTextProps } from 'client/pages/OriginalDataPoint/components/ODPDiffText/types'
import { DOMs } from 'client/utils/doms'

type Returned = Array<ChangeObject<unknown>>

type FormatFn = (value: string | null) => string

const pathsDiffWords = [/^dataSources,\d+,reference$/, /^dataSources,\d+,comments$/, /^description$/]

const _formatDecimalFieldFn: FormatFn = (v) => (!Objects.isEmpty(v) ? Numbers.format(v, 2) : '')
const _formatPercentFieldFn: FormatFn = (v) => (!Objects.isEmpty(v) ? Numbers.format(v, 3) : '')

const formatFns: Record<ODPDiffTextProps['format'], FormatFn> = {
  decimal: _formatDecimalFieldFn,
  percent: _formatPercentFieldFn,
}

const _getSourceMethodText = (values: Array<string> | undefined, t: TFunction): Array<string> =>
  (values ?? [])?.map((value) => t(`nationalDataPoint.dataSourceMethodsOptions.${value}`))

export const useFieldChanges = (props: ODPDiffTextProps): Returned => {
  const { format, originalDataPoint, path } = props

  const { t } = useTranslation()
  const originalDataPointHistory = useLastApprovedOriginalDataPoint()

  return useMemo<Returned>(() => {
    const valuePrev = Objects.getInPath(originalDataPointHistory, path)
    const valueCurrent = Objects.getInPath(originalDataPoint, path)

    const pathString = path.join(',')

    const isSourceMethods = /^dataSources,\d+,type$/.test(pathString)
    if (isSourceMethods) {
      const methodsPrev = _getSourceMethodText(valuePrev, t)
      const methodsCurrent = _getSourceMethodText(valueCurrent, t)

      return Diff.diffArrays(methodsPrev, methodsCurrent)
    }

    let textPrev = DOMs.getHtmlTextContent(valuePrev ?? '')
    let textCurrent = DOMs.getHtmlTextContent(valueCurrent ?? '')

    const formatFn = formatFns[format]
    if (Objects.isFunction(formatFn)) {
      textPrev = formatFn(textPrev)
      textCurrent = formatFn(textCurrent)
    }

    if (pathsDiffWords.some((p) => p.test(pathString))) {
      return Diff.diffWords(textPrev, textCurrent, { ignoreCase: false })
    }
    return Diff.diffLines(textPrev, textCurrent)
  }, [format, originalDataPoint, originalDataPointHistory, path, t])
}
