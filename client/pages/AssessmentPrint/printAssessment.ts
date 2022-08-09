import { getRequestParam } from '@webapp/utils/urlUtils'

const printMode = 'print-mode'

/**
 * @deprecated
 */
export const setPrintingMode = () => document.body.classList.add(printMode)

/**
 * @deprecated
 */
export const isPrintingMode = () => document.body.classList.contains(printMode)

/**
 * @deprecated
 */
export const isPrintingOnlyTables = () => isPrintingMode() && getRequestParam('onlyTables') === 'true'
