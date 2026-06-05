import { getDescriptionValidations } from 'server/cache/repository/validation/description/getDescriptionValidations'
import { setDescriptionValidations } from 'server/cache/repository/validation/description/setDescriptionValidations'
import { updateDescriptionLinkValidations } from 'server/cache/repository/validation/description/updateDescriptionLinkValidations'

export const DescriptionValidationRedisRepository = {
  getDescriptionValidations,
  setDescriptionValidations,
  updateDescriptionLinkValidations,
}
