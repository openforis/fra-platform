import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { initialState } from './state'

export const AssessmentSectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    toggleEditDescription: (
      state,
      action: PayloadAction<{ sectionName: SectionName; name: CommentableDescriptionName }>
    ) => {
      const { name, sectionName } = action.payload

      const editable = state.descriptionsEditEnabled?.[sectionName]?.[name] ?? false
      const path = ['descriptionsEditEnabled', sectionName, name]
      Objects.setInPath({ obj: state, path, value: !editable })
    },
    toggleShowOriginalDataPoint: (state) => {
      state.showOriginalDataPoint = !state.showOriginalDataPoint
    },
  },
})
