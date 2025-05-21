import { useEffect, useRef, useState } from 'react'

import { isAnyOf, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

import { addAppListener, useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { OriginalDataPointActions } from 'client/store/ui/originalDataPoint'
import { UserManagementActions } from 'client/store/ui/userManagement'

// List of actions to show the loading indicator for
const ACTIONS = [
  // DataActions
  DataActions.updateNodeValues,
  DataActions.updateDescription,
  DataActions.deleteDataSource,
  DataActions.updateContact,
  DataActions.createContact,
  DataActions.deleteContact,
  DataActions.clearTableData,
  DataActions.postEstimate,
  DataActions.copyPreviousDatasources,
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
    return () => {
      unsubscribe()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [dispatch])

  return { show, showCheck }
}
