import { OriginalDataPointRepository } from '@server/repository/originalDataPoint'
import { CountryIso } from '@core/country'

export const getReservedYears = async (props: { countryIso: CountryIso }): Promise<Array<number>> => {
  const { countryIso } = props
  const years = await OriginalDataPointRepository.getReservedYears({ countryIso })
  return years
}
