import { useSelector } from 'react-redux'
import * as R from 'ramda'

import { usePrintView } from '@webapp/components/hooks'

import * as OriginalDataPointState from '../../originalDataPointState'

export default (index) => {
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
