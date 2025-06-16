import { createAction } from '@reduxjs/toolkit'

import { RepositoryItem } from 'meta/cycleData'

export const setRepositoryItemProps = createAction<Partial<RepositoryItem>>('repository/repositoryItem/props/set')
