export interface AutosaveState {
  status?: string | 'saving' | 'complete' | 'lastSaveTimestampReceived'
  lastSaveTimeStamp?: string
}
