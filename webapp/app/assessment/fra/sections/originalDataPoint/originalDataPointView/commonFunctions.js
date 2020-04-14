import * as R from 'ramda'

import { readPasteClipboard } from '@webapp/utils/copyPasteUtil'
import { acceptNextDecimal } from '@webapp/utils/numberInput'

import handlePaste from '../paste'
import * as ODP from '../originalDataPoint'

export const isCommentsOpen = (target, openThread = {}) =>
  R.equals('odp', openThread.section) && R.isEmpty(R.difference(openThread.target, target))

export const getValidationStatusRow = (odp, index) =>
  odp.validationStatus
    ? R.defaultTo({}, R.find(R.propEq('uuid', odp.nationalClasses[index].uuid), odp.validationStatus.nationalClasses))
    : {}

export const updatePastedValues = (props) => (evt) => {
  const {
    odp,
    countryIso,
    rowIndex,
    colIndex,
    columns,
    saveDraft,
    allowGrow = false,
    allowedClass = () => true,
  } = props

  const rawPastedData = readPasteClipboard(evt, 'string')
  const { updatedOdp, firstPastedCellData } = handlePaste(
    columns,
    allowedClass,
    odp,
    allowGrow,
    rawPastedData,
    rowIndex,
    colIndex
  )
  saveDraft(countryIso, updatedOdp)
  return firstPastedCellData
}

export const numberUpdateCreator = (saveDraft) => (countryIso, odp, index, fieldName, currentValue) => (evt) =>
  saveDraft(
    countryIso,
    ODP.updateNationalClass(odp, index, fieldName, acceptNextDecimal(evt.target.value, currentValue))
  )
