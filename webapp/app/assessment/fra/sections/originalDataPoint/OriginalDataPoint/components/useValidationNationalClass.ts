import { useSelector } from 'react-redux'
import * as R from 'ramda'

import { usePrintView } from '@webapp/components/hooks'

import * as OriginalDataPointState from '../../originalDataPointState'

export default (index: any) => {
  const [printView] = usePrintView()
  if (printView) {
    return {}
  }

  return useSelector((state) => {
    const odp: any = OriginalDataPointState.getActive(state)

    let validationResult: any = null
    if (odp.validationStatus) {
      const { uuid } = odp.nationalClasses[index]

      validationResult = odp.validationStatus.nationalClasses.find(R.propEq('uuid', uuid))
    }

    return validationResult || {}
  })
}
