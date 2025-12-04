import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTable } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

export const getOtherLandWithTreeCover: BulkDownloadTableFactory = (props): BulkDownloadTable => {
  const { cycle } = props

  const anchor = cycle.name === CycleNames._2020 ? '1f' : '1e'

  return {
    tableName: TableNames.otherLandWithTreeCover,
    variables: [
      {
        variableName: 'palms',
        csvColumn: `${anchor}_palms`,
      },
      {
        variableName: 'tree_orchards',
        csvColumn: `${anchor}_treeOrchards`,
      },
      {
        variableName: 'agroforestry',
        csvColumn: `${anchor}_agroforestry`,
      },
      {
        variableName: 'trees_in_urban_settings',
        csvColumn: `${anchor}_treesUrbanSettings`,
      },
      {
        variableName: 'other',
        csvColumn: `${anchor}_other`,
      },
    ],
  }
}
