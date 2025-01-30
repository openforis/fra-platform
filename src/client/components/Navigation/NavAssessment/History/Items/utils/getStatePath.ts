import { HistoryTarget } from 'meta/cycleData/historyActivities'

// Utility functions to get the path to the state that needs to be updated

export const getStatePath: Record<HistoryTarget, (pathParts: Array<string>) => Array<string>> = {
  dataSources: (pathParts: Array<string>) => {
    return ['descriptions', ...pathParts, 'dataSources']
  },
}
