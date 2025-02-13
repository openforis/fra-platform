import { PropsGetTableData } from 'server/controller/cycleData/tableData/props'

export type PropsGetLastApproved = Omit<PropsGetTableData, 'mergeOdp'>
