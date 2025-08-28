import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getMetaCache } from 'client/store/meta/actions/getMetaCache'
import { MetaState } from 'client/store/meta/state'

export const getMetaCacheReducer = (builder: ActionReducerMapBuilder<MetaState>): void => {
  builder.addCase(getMetaCache.fulfilled, (state, action) => {
    const metaCache = action.payload
    if (metaCache) {
      const { assessmentName, cycleName } = action.meta.arg

      const assessmentIndex = state.assessments.findIndex((assessment) => assessment.props.name === assessmentName)
      const assessment = state.assessments[assessmentIndex]
      const cycle = assessment.cycles.find((cycle) => cycle.name === cycleName)

      state.assessments[assessmentIndex] = Objects.setInPath({
        obj: assessment,
        path: ['metaCache', cycle.uuid],
        value: metaCache,
      })
    }
  })
}
