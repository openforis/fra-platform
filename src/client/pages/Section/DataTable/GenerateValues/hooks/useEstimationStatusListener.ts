import { useEffect, useState } from 'react'

import { isAnyOf, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

import { EstimationsActions } from 'client/store/data/tableData/estimations/actions'
import { useAppDispatch } from 'client/store/hooks'
import { addAppListener } from 'client/store/middleware/listener'

export const useEstimationStatusListener = (): boolean => {
  const dispatch = useAppDispatch()
  const [pending, setPending] = useState<boolean>(false)

  useEffect(() => {
    return dispatch(
      addAppListener({
        matcher: isAnyOf(
          isFulfilled(EstimationsActions.postEstimate),
          isPending(EstimationsActions.postEstimate),
          isRejected(EstimationsActions.postEstimate)
        ),
        effect: (action) => {
          if (isPending(action)) {
            setPending(true)
          } else {
            setPending(false)
          }
        },
      })
    )
  }, [dispatch])

  return pending
}
