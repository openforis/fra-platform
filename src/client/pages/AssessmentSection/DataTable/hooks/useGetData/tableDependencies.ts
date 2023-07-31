import { Assessment, AssessmentName, Cycle, CycleName, TableName } from 'meta/assessment'

export type TableDependency = {
  assessmentName?: AssessmentName
  cycleName?: CycleName
  tableName: TableName
}

export class TableDependencies {
  private readonly assessment: Assessment
  private readonly cycle: Cycle
  private readonly _map: Map<string, TableDependency>

  constructor(props: { assessment: Assessment; cycle: Cycle }) {
    this.assessment = props.assessment
    this.cycle = props.cycle
    this._map = new Map()
  }

  private getDependency(item: TableDependency): TableDependency {
    return {
      assessmentName: item.assessmentName ?? this.assessment.props.name,
      cycleName: item.cycleName ?? this.cycle.name,
      tableName: item.tableName,
    }
  }

  private static getDependencyKey(item: TableDependency): string {
    const { assessmentName, cycleName, tableName } = item
    return `${assessmentName}-${cycleName}-${tableName}`
  }

  get map(): Map<string, TableDependency> {
    return this._map
  }

  add(item: TableDependency) {
    const dependency: TableDependency = this.getDependency(item)
    this._map.set(TableDependencies.getDependencyKey(dependency), dependency)
    return this
  }
}
