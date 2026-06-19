import {
  getDataSourceValidations,
  getDescriptionValidation,
} from 'client/store/data/tableData/validations/selectors/descriptions'
import {
  getSummary,
  getSummaryHasErrors,
  getSummarySectionHasErrors,
  getSummarySubSectionHasErrors,
} from 'client/store/data/tableData/validations/selectors/summary'
import { getNodeValidation, getTableValidations } from 'client/store/data/tableData/validations/selectors/tables'

export const ValidationsSelectors = {
  getDataSourceValidations,
  getDescriptionValidation,
  getNodeValidation,
  getSummary,
  getSummaryHasErrors,
  getSummarySectionHasErrors,
  getSummarySubSectionHasErrors,
  getTableValidations,
}
