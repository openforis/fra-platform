import { ODPDataSourceMethod } from './odpDataSource'
import { ODPEditStatus } from './odpEditStatus'
import { ODPNationalClass } from './odpNationalClass'
import { ODPValidation } from './odpValidation'

export interface ODP {
  countryIso?: string
  dataSourceAdditionalComments?: string
  dataSourceMethods?: Array<ODPDataSourceMethod>
  dataSourceReferences?: string
  description?: string
  editStatus?: ODPEditStatus
  nationalClasses?: Array<ODPNationalClass>
  odpId?: string
  reservedYears?: Array<number>
  validationStatus?: ODPValidation
}
