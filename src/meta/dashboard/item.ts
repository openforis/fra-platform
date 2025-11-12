import { Label } from 'meta/assessment/label'
import { VariableCache } from 'meta/assessment/metaCache'
import { Table } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'

export enum DashboardItemType {
  table = 'table',
  pieChart = 'pieChart',
  barChart = 'barChart',
}

export type DashboardItem<Type = DashboardItemType> = {
  type: Type
  title: Label
  table: Table & { calculationDependencies: Record<VariableName, Array<VariableCache>> }
}
