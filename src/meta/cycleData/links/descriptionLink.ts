import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { LinkLocationBase } from 'meta/cycleData/links/linkLocationBase'

export const DescriptionLinkLocationPath = {
  dataSourceReference: ['dataSources', 'reference'],
  text: ['text'],
}

export type DescriptionLinkLocation = LinkLocationBase & {
  colName: string
  descriptionName: CommentableDescriptionName
  path: Array<string>
  sectionName: string
  uuid?: string
}
