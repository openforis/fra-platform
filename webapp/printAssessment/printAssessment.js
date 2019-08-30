import { getRequestParam } from '../utils/urlUtils'

const printMode = 'print-mode'

export const setPrintingMode = () =>
  document.body.classList.add(printMode)

export const isPrintingMode = () =>
  document.body.classList.contains(printMode)

export const isPrintingOnlyTables = () =>
  isPrintingMode() && getRequestParam('onlyTables') === 'true'
