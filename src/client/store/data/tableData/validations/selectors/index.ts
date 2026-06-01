import {
  getSummary,
  getSummaryHasErrors,
  getSummarySectionHasErrors,
  getSummarySubSectionHasErrors,
} from 'client/store/data/tableData/validations/selectors/summary'
import { getNodeValidation, getTableValidations } from 'client/store/data/tableData/validations/selectors/tables'

export const ValidationsSelectors = {
  getNodeValidation,
  getSummary,
  getSummaryHasErrors,
  getSummarySectionHasErrors,
  getSummarySubSectionHasErrors,
  getTableValidations,
}
