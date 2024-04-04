import { CommentableDescriptionName } from 'meta/assessment'

// Utility functions to get the path to the state that needs to be updated

export const getStatePath: { [key in CommentableDescriptionName]?: (pathParts: Array<string>) => Array<string> } = {
  dataSources: (pathParts: Array<string>) => {
    return ['descriptions', ...pathParts, 'dataSources']
  },
}
