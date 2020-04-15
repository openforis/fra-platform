import { useSelector } from 'react-redux'

import * as AutoSaveState from '@webapp/app/components/autosave/autosaveState'

const useIsAutoSave = (status) => useSelector((state) => AutoSaveState.getStatus(state) === status)

export const useIsAutoSaveSaving = () => useIsAutoSave(AutoSaveState.status.saving)

export const useIsAutoSaveComplete = () => useIsAutoSave(AutoSaveState.status.complete)
