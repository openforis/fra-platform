import { useEffect, useRef, useState } from 'react'
import { isAnyOf, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

import { ContactsActions } from 'client/store/data/contacts/actions'
import { DescriptionsActions } from 'client/store/data/descriptions/actions'
import { OriginalDataPointActions } from 'client/store/data/originalDataPoint/actions'
import { EstimationsActions } from 'client/store/data/tableData/estimations/actions'
import { NodeValuesActions } from 'client/store/data/tableData/nodeValues/actions'
import { useAppDispatch } from 'client/store/hooks'
import { addAppListener } from 'client/store/middleware/listener'

// List of actions to show the loading indicator for
const ACTIONS = [
  // DataActions
  DescriptionsActions.updateDescription,
  DescriptionsActions.deleteDataSource,
  ContactsActions.updateContact,
  ContactsActions.createContact,
  ContactsActions.deleteContact,
  DescriptionsActions.copyPreviousDatasources,
  EstimationsActions.postEstimate,
  NodeValuesActions.clearTableData,
  NodeValuesActions.updateNodeValues,
  // OriginalDataPointActions
  OriginalDataPointActions.updateOriginalDataPointDescription,
  OriginalDataPointActions.updateOriginalDataPointDataSources,
  OriginalDataPointActions.updateOriginalDataPointNationalClasses,
  OriginalDataPointActions.updateOriginalDataPointOriginalData,
  OriginalDataPointActions.updateOriginalDataPointYear,
  OriginalDataPointActions.deleteOriginalDataPoint,
]

type Returned = {
  show: boolean
  showCheck: boolean
}

export const useLoadingIndicatorState = (): Returned => {
  const dispatch = useAppDispatch()
  const [show, setShow] = useState(false)
  const [showCheck, setShowCheck] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const unsubscribe = dispatch(
      addAppListener({
        matcher: isAnyOf(
          ...ACTIONS.map((action) => isPending(action)),
          ...ACTIONS.map((action) => isFulfilled(action)),
          ...ACTIONS.map((action) => isRejected(action))
        ),
        effect: (action) => {
          if (isPending(action)) {
            setShow(true)
            setShowCheck(false)
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current)
            }
          } else if (isFulfilled(action)) {
            setShowCheck(true)
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = setTimeout(() => {
              setShow(false)
              setShowCheck(false)
            }, 1200)
          } else if (isRejected(action)) {
            setShow(false)
            setShowCheck(false)
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current)
            }
          }
        },
      })
    )
    return (): void => {
      unsubscribe()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [dispatch])

  return { show, showCheck }
}
