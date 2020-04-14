import { useSelector } from 'react-redux'
import * as R from 'ramda'

import * as OriginalDataPointState from '../../originalDataPointState'

export default (index) =>
  useSelector((state) => {
    const odp = OriginalDataPointState.getActiveOriginalDataPoint(state)

    let validationResult = null
    if (odp.validationStatus) {
      const { uuid } = odp.nationalClasses[index]

      validationResult = odp.validationStatus.nationalClasses.find(R.propEq('uuid', uuid))
    }

    return validationResult || {}
  })
