import { useAppSelector } from '@webapp/store'

export const useIsAutoSaveSaving = () => useAppSelector((state) => state.autosave.status === 'saving')
export const useIsAutoSaveComplete = () => useAppSelector((state) => state.autosave.status === 'complete')
