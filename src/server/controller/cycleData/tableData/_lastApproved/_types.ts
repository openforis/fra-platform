import { HistoryLastApprovedInfo } from 'meta/cycleData/historyLastApproved'

import { PropsGetTableData } from 'server/controller/cycleData/tableData/props'

export type PropsGetLastApproved = Omit<PropsGetTableData, 'mergeOdp'> & {
  info: HistoryLastApprovedInfo
}
