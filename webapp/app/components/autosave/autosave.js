export const status = {
  saving: 'saving',
  complete: 'complete',
  lastSaveTimestampReceived: 'lastSaveTimestampReceived'
}

export const isStatusSaving = s => s === status.saving

export const isStatusComplete = s => s === status.complete
