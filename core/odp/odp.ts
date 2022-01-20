import { Arrays } from '@core/utils'

import { ODPDataSourceMethod } from './odpDataSource'
import { ODPEditStatus } from './odpEditStatus'
import { ODPNationalClass } from './odpNationalClass'
import { ODPValidation } from './odpValidation'

export const ODPYears: Array<number> = Arrays.reverse(Arrays.range(1950, 2021))

export interface ODP {
  countryIso?: string
  dataSourceAdditionalComments?: string
  dataSourceMethods?: Array<ODPDataSourceMethod>
  dataSourceReferences?: string
  description?: string
  editStatus?: ODPEditStatus
  id?: string
  nationalClasses?: Array<ODPNationalClass>
  odpId?: string
  reservedYears?: Array<number>
  validationStatus?: ODPValidation
  year?: string
}
