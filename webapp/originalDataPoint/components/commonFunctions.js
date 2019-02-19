import * as R from 'ramda'
import { readPasteClipboard } from '../../utils/copyPasteUtil'
import handlePaste from '../paste'

export const isCommentsOpen = (target, openThread = {}) =>
  R.equals('odp', openThread.section) && R.isEmpty(R.difference(openThread.target, target))

export const getValidationStatusRow = (odp, index) => odp.validationStatus
  ? R.defaultTo(
    {},
    R.find(
      R.propEq('uuid', odp.nationalClasses[index].uuid), odp.validationStatus.nationalClasses)
  ) : {}

export const updatePastedValues = (props) => evt => {
  const {
    odp,
    countryIso,
    rowIndex,
    colIndex,
    columns,
    saveDraft,
    allowGrow = false,
    allowedClass = (nc) => true
  } = props

  const rawPastedData = readPasteClipboard(evt, 'string')
  const { updatedOdp, firstPastedCellData } = handlePaste(
    columns, allowedClass, odp, allowGrow, rawPastedData, rowIndex, colIndex
  )
  saveDraft(countryIso, updatedOdp)
  return firstPastedCellData
}
