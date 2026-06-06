import { DescriptionsLocation, LinkLocation } from 'meta/cycleData/links/link'

export const isDescriptionLocation = (location: LinkLocation): location is DescriptionsLocation => {
  return 'descriptionName' in location
}
