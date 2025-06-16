import { createAction } from '@reduxjs/toolkit'

import { RepositoryItem } from 'meta/cycleData'

export const setRepositoryItem = createAction<Partial<RepositoryItem>>('repository/repositoryItem/set')
