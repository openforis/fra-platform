/**
 * @deprecated
 */
export const status = {
  saving: 'saving',
  complete: 'complete',
  lastSaveTimestampReceived: 'lastSaveTimestampReceived',
}

/**
 * @deprecated
 */
export const isStatusSaving = (s: any) => s === status.saving

/**
 * @deprecated
 */
export const isStatusComplete = (s: any) => s === status.complete
