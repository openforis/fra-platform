import { CountryIso } from 'meta/area'

import { ODPDataSourceMethod } from './odpDataSource' // import { ODPEditStatus } from './odpEditStatus'
import { ODPNationalClass } from './odpNationalClass' // import { ODPValidation } from './odpValidation'
// import { ODPValidation } from './odpValidation'

export interface OriginalDataPoint {
  id: number
  countryIso: CountryIso
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
