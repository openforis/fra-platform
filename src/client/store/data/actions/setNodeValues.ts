import { createAction } from '@reduxjs/toolkit'

import { NodeUpdates } from 'meta/data'

type Payload = { nodeUpdates: NodeUpdates }

export const setNodeValues = createAction<Payload>('data/nodeValues/set')
