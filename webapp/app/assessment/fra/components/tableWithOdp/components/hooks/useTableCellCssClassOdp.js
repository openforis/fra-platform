import { isPrintingMode } from '@webapp/app/assessment/components/print/printAssessment'

export default datum => {
  const { type } = datum
  const cssClass = type === 'odp' && !isPrintingMode()
    ? 'odp-value-cell-total'
    : 'fra-table__calculated-cell'

  return cssClass
}
