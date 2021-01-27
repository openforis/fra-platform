import { useSelector } from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

import { usePrintView } from '@webapp/components/hooks'

import * as OriginalDataPointState from '../../originalDataPointState'

export default (index: any) => {
  const [printView] = usePrintView()
  if (printView) {
    return {}
  }

  return useSelector((state) => {
    const odp = OriginalDataPointState.getActive(state)

    let validationResult = null
    if (odp.validationStatus) {
      const { uuid } = odp.nationalClasses[index]

      validationResult = odp.validationStatus.nationalClasses.find(R.propEq('uuid', uuid))
    }

    return validationResult || {}
  })
}
