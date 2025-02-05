import { useMemo } from 'react'
import { TFunction, useTranslation } from 'react-i18next'

import * as Diff from 'diff'
import { Change } from 'diff'
import { Objects } from 'utils/objects'

import { useLastApprovedOriginalDataPoint } from 'client/store/data/hooks/useLastApprovedOriginalDataPoint'
import { ODPDiffTextProps } from 'client/pages/OriginalDataPoint/components/ODPDiffText/types'
import { DOMs } from 'client/utils/dom'

type Returned = Array<Change>

const _getSourceMethodText = (values: Array<string> | undefined, t: TFunction): string =>
  (values ?? [])?.map((value) => t(`nationalDataPoint.dataSourceMethodsOptions.${value}`)).join('\n\r')

export const useFieldChanges = (props: ODPDiffTextProps): Returned => {
  const { originalDataPoint, path } = props

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

    const textPrev = DOMs.getHtmlTextContent(valuePrev ?? '')
    const textCurrent = DOMs.getHtmlTextContent(valueCurrent ?? '')
    return Diff.diffChars(textPrev, textCurrent, {
      ignoreCase: false,
    })
  }, [originalDataPoint, originalDataPointHistory, path, t])
}
