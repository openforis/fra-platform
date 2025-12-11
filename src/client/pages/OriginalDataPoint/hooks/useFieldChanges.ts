import { useMemo } from 'react'
import { TFunction, useTranslation } from 'react-i18next'
import * as Diff from 'diff'
import { Change } from 'diff'

import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { useLastApprovedOriginalDataPoint } from 'client/store/data/history/hooks/lastApprovedOriginalDataPoint'
import { ODPDiffTextProps } from 'client/pages/OriginalDataPoint/components/ODPDiffText/types'
import { DOMs } from 'client/utils/doms'

type Returned = Array<Change>

type FormatFn = (value: string | null) => string

const pathsDiffWords = ['dataSourceReferences', 'dataSourceAdditionalComments', 'description']
const _formatDecimalFieldFn: FormatFn = (v) => (!Objects.isEmpty(v) ? Numbers.format(v, 2) : '')
const _formatPercentFieldFn: FormatFn = (v) => (!Objects.isEmpty(v) ? Numbers.format(v, 3) : '')

const formatFns: Record<ODPDiffTextProps['format'], FormatFn> = {
  decimal: _formatDecimalFieldFn,
  percent: _formatPercentFieldFn,
}

const _getSourceMethodText = (values: Array<string> | undefined, t: TFunction): string =>
  (values ?? [])?.map((value) => t(`nationalDataPoint.dataSourceMethodsOptions.${value}`)).join('\n\r')

export const useFieldChanges = (props: ODPDiffTextProps): Returned => {
  const { format, originalDataPoint, path } = props

  const { t } = useTranslation()
  const originalDataPointHistory = useLastApprovedOriginalDataPoint()

  return useMemo<Returned>(() => {
    const valuePrev = Objects.getInPath(originalDataPointHistory, path)
    const valueCurrent = Objects.getInPath(originalDataPoint, path)

    const isSourceMethods = path.includes('dataSourceMethods')
    if (isSourceMethods) {
      const multipleMethods = valueCurrent?.length > 0

      const methodsPrev = _getSourceMethodText(valuePrev, t)
      const methodsCurrent = _getSourceMethodText(valueCurrent, t)

      return multipleMethods ? Diff.diffLines(methodsPrev, methodsCurrent) : Diff.diffChars(methodsPrev, methodsCurrent)
    }
    let textPrev = DOMs.getHtmlTextContent(valuePrev ?? '')
    let textCurrent = DOMs.getHtmlTextContent(valueCurrent ?? '')

    const formatFn = formatFns[format]
    if (Objects.isFunction(formatFn)) {
      textPrev = formatFn(textPrev)
      textCurrent = formatFn(textCurrent)
    }

    if (pathsDiffWords.some((p) => path.includes(p))) {
      return Diff.diffWords(textPrev, textCurrent, { ignoreCase: false })
    }
    return Diff.diffLines(textPrev, textCurrent)
  }, [format, originalDataPoint, originalDataPointHistory, path, t])
}
