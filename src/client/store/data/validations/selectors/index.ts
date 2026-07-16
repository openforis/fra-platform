import {
  getDataSourceValidations,
  getDescriptionValidation,
} from 'client/store/data/validations/selectors/descriptions'
import {
  getNationalClassValidation,
  getNationalDataPointValidation,
  getNationalDataPointValidationByOdpId,
  getNationalDataPointValidations,
  nationalDataPointValidationsFetched,
} from 'client/store/data/validations/selectors/nationalDataPoints'
import {
  getSummary,
  getSummaryHasErrors,
  getSummarySectionHasErrors,
  getSummarySubSectionHasErrors,
} from 'client/store/data/validations/selectors/summary'
import { getNodeValidation, getTableValidations } from 'client/store/data/validations/selectors/tables'

export const ValidationsSelectors = {
  getDataSourceValidations,
  getDescriptionValidation,
  getNationalClassValidation,
  getNationalDataPointValidation,
  getNationalDataPointValidationByOdpId,
  getNationalDataPointValidations,
  getNodeValidation,
  getSummary,
  getSummaryHasErrors,
  getSummarySectionHasErrors,
  getSummarySubSectionHasErrors,
  getTableValidations,
  nationalDataPointValidationsFetched,
}
