import { LinkLocation } from 'meta/cycleData/links/link'
import { NationalDataPointLinkLocation } from 'meta/cycleData/links/nationalDataPointLink'

export const isNationalDataPointLocation = (location: LinkLocation): location is NationalDataPointLinkLocation => {
  return 'ndpSection' in location
}
