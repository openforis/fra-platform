import { OriginalDataPointRepository } from '@server/repository/originalDataPoint'

export const create = async (props: { countryIso: string }): Promise<string> => {
  const { countryIso } = props
  const odpId = await OriginalDataPointRepository.create({ countryIso })
  return odpId
}
