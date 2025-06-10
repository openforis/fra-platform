import { useEffect, useRef, useState } from 'react'

import { isAnyOf, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

import { DataActions } from 'client/store/data'
import { ContactsActions } from 'client/store/data/contacts/actions'
import { DescriptionsActions } from 'client/store/data/descriptions/actions'
import { OriginalDataPointActions } from 'client/store/data/originalDataPoint/actions'
import { EstimationsActions } from 'client/store/data/tableData/estimations/actions'
import { useAppDispatch } from 'client/store/hooks'
import { addAppListener } from 'client/store/middleware/listener'
import { UserManagementActions } from 'client/store/ui/userManagement'

// List of actions to show the loading indicator for
const ACTIONS = [
  // DataActions
  DataActions.updateNodeValues,
  DescriptionsActions.updateDescription,
  DescriptionsActions.deleteDataSource,
  ContactsActions.updateContact,
  ContactsActions.createContact,
  ContactsActions.deleteContact,
  DataActions.clearTableData,
  EstimationsActions.postEstimate,
  DescriptionsActions.copyPreviousDatasources,
  // OriginalDataPointActions
  OriginalDataPointActions.updateOriginalDataPointDescription,
  OriginalDataPointActions.updateOriginalDataPointDataSources,
  OriginalDataPointActions.updateOriginalDataPointNationalClasses,
  OriginalDataPointActions.updateOriginalDataPointOriginalData,
  OriginalDataPointActions.updateOriginalDataPointYear,
  OriginalDataPointActions.deleteOriginalDataPoint,
  // UserManagementActions
  UserManagementActions.updateUser,
  UserManagementActions.updateUserAdminRole,
  UserManagementActions.updateUserRoles,
  UserManagementActions.updateRoleProps,
  UserManagementActions.updateSectionAuth,
]

export const useLoadingIndicatorState = () => {
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
          // If an action is dispatch with showIndicator: false, we hide the indicator
          // Defaults to true, showing the indicator
          const showIndicator = action?.payload?.showIndicator ?? action?.meta?.arg?.showIndicator ?? true

          if (isPending(action) && showIndicator) {
            setShow(true)
            setShowCheck(false)
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current)
            }
          } else if (isFulfilled(action) && showIndicator) {
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
    return () => {
      unsubscribe()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [dispatch])

  return { show, showCheck }
}
