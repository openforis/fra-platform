import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { postEstimate } from 'client/store/data/actions/postEstimate'

import { initialState } from './state'

export const AssessmentSectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    reset: () => initialState,
    toggleEditDescription: (
      state,
      action: PayloadAction<{ sectionName: SectionName; name: CommentableDescriptionName }>
    ) => {
      const { sectionName, name } = action.payload

      const editable = state.descriptionsEditEnabled?.[sectionName]?.[name] ?? false
      const path = ['descriptionsEditEnabled', sectionName, name]
      Objects.setInPath({ obj: state, path, value: !editable })
    },
    toggleShowOriginalDataPoint: (state) => {
      state.showOriginalDataPoint = !state.showOriginalDataPoint
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postEstimate.pending, (state) => {
      state.estimationPending = true
    })

    builder.addCase(postEstimate.fulfilled, (state) => {
      state.estimationPending = false
    })
  },
})
