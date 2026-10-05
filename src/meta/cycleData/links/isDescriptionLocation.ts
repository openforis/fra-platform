import { DescriptionLinkLocation } from 'meta/cycleData/links/descriptionLink'
import { LinkLocation } from 'meta/cycleData/links/link'

export const isDescriptionLocation = (location: LinkLocation): location is DescriptionLinkLocation => {
  return 'descriptionName' in location
}
