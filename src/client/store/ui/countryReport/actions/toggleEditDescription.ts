import { createAction } from '@reduxjs/toolkit'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

export const toggleEditDescription = createAction<{ sectionName: SectionName; name: CommentableDescriptionName }>(
  'countryReport/descriptionsEditEnabled/toggle'
)
