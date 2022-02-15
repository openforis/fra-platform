import { Arrays } from '@core/utils'

import { ODPDataSourceMethod } from './odpDataSource'
// import { ODPEditStatus } from './odpEditStatus'
import { ODPNationalClass } from './odpNationalClass'
// import { ODPValidation } from './odpValidation'

export const ODPYears: Array<number> = Arrays.reverse(Arrays.range(1950, 2021))

export interface OriginalDataPoint {
  id: number
  countryIso: string
  year?: number
  dataSourceAdditionalComments?: string
  dataSourceMethods?: Array<ODPDataSourceMethod>
  dataSourceReferences?: string
  description?: string
  nationalClasses?: Array<ODPNationalClass>
  // editStatus?: ODPEditStatus
  // reservedYears?: Array<number>
  // validationStatus?: ODPValidation
}
