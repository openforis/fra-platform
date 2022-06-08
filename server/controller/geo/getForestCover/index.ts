import { CountryIso } from '@meta/area'

type Props = {
  countryIso: CountryIso
  // TODO: add needed parameters
}

export const getForestCover = async (props: Props): Promise<{ mapId: string }> => {
  const { countryIso } = props

  return { mapId: countryIso }
}
