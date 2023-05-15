import { NodeUpdate } from '@meta/data'

import { useAppSelector } from '@client/store'

export { useIsEstimationPending } from './useIsEstimatePending'

export const useShowOriginalDatapoints = () =>
  useAppSelector((state) => state.ui.assessmentSection.showOriginalDataPoint)

export const useNodeValueValidation = (props: { tableName: string }): NodeUpdate | undefined => {
  return useAppSelector((state) => state.ui.assessmentSection.nodeValueValidation[props.tableName])
}
