import { createAction } from '@reduxjs/toolkit'

import { CycleDataParams } from 'meta/api/request/cycleData/cycleData'
import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment/descriptionValue'

type Payload = CycleDataParams & { name: CommentableDescriptionName; value: CommentableDescriptionValue }

export const setDescription = createAction<Payload>('data/descriptions/set')
