import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { LinkLocationBase } from 'meta/cycleData/links/linkLocationBase'

export const DescriptionLinkLocationPath = {
  dataSourceReference: ['dataSources', 'reference'],
  text: ['text'],
}

export type DescriptionLinkLocation = LinkLocationBase & {
  colName: string
  descriptionName: CommentableDescriptionName
  path: Array<string>
  sectionName: SectionName
  uuid?: string
}

// The fields used to match stored locations.
export type DescriptionLinkLocationKey = Pick<DescriptionLinkLocation, 'descriptionName' | 'path' | 'sectionName'>
