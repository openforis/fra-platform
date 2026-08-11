import { PropsMerge } from 'tools/cycles/merge/_types'

import { DescriptionValidationRedisRepository } from 'server/cache/repository/validation/description'
import { NationalDataPointValidationRedisRepository } from 'server/cache/repository/validation/nationalDataPoint'
import { TableValidationRedisRepository } from 'server/cache/repository/validation/table'

export const mergeValidations = async (props: PropsMerge): Promise<void> => {
  const { assessment, countryISOs, cycleFrom, cycleTo } = props

  await Promise.all(
    countryISOs.map(async (countryIso) => {
      const propsCopy = { assessment, countryIso, cycleSource: cycleFrom, cycleTarget: cycleTo }
      await TableValidationRedisRepository.copyValidations(propsCopy)
      await DescriptionValidationRedisRepository.copyValidations(propsCopy)
      await NationalDataPointValidationRedisRepository.copyValidations(propsCopy)
    })
  )
}
