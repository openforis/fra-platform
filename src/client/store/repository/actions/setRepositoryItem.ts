import { createAction } from '@reduxjs/toolkit'

import { RepositoryItem } from 'meta/cycleData/repository/item'

export const setRepositoryItem = createAction<Partial<RepositoryItem>>('repository/repositoryItem/set')
