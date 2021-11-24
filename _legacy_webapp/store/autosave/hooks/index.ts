import { useAppSelector } from '../../../store'

export const useIsAutoSaveSaving = (): boolean => useAppSelector((state) => state?.autosave?.status === 'saving')
export const useIsAutoSaveComplete = (): boolean => useAppSelector((state) => state?.autosave?.status === 'complete')
