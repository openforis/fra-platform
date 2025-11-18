import { createAction } from '@reduxjs/toolkit'

import { NodeUpdates } from 'meta/data/nodeUpdates'

type Payload = { nodeUpdates: NodeUpdates }

export const setNodeValues = createAction<Payload>('data/tableData/nodeValues/set')
