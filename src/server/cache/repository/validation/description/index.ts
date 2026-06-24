import { getValidations } from 'server/cache/repository/validation/description/getValidations'
import { setValidations } from 'server/cache/repository/validation/description/setValidations'
import { updateDescriptionLinkValidations } from 'server/cache/repository/validation/description/updateDescriptionLinkValidations'

export const DescriptionValidationRedisRepository = {
  getValidations,
  setValidations,
  updateDescriptionLinkValidations,
}
