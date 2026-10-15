import { CountryIso } from 'meta/area/countryIso'
import { UUID } from 'meta/uuid/uuid'

type Props = {
  assessmentName: string
  countryIso: CountryIso
  cycleName: string
}

export const getODPDeleteEvent = (props: Props): string => {
  const { assessmentName, countryIso, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-odpDelete`
}

export const getODPReservedYearsEvent = (props: Props): string => {
  const { assessmentName, countryIso, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-odpReservedYears`
}

export const getNationalDataPointUpdateEvent = (props: { uuid: UUID }): string => {
  const { uuid } = props
  return `nationalDataPoint-${uuid}-update`
}

export const getNationalDataPointValidationsUpdateEvent = (props: Props): string => {
  const { assessmentName, countryIso, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-nationalDataPointValidationsUpdate`
}

export const getNationalDataPointValidationDeleteEvent = (props: Props): string => {
  const { assessmentName, countryIso, cycleName } = props
  return `${countryIso}-${assessmentName}-${cycleName}-nationalDataPointValidationDelete`
}
