import { CountryIso } from 'meta/area/countryIso'
import { CommentableDescriptionValue, DescriptionIdentifier } from 'meta/assessment/descriptionValue'

export type DescriptionLinkSource = DescriptionIdentifier & {
  countryIso: CountryIso
  value: CommentableDescriptionValue
}
