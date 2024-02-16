import { AssessmentNames, TableNames } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'

import { updateDependencies } from 'test/migrations/steps/utils/updateDependencies'

const tableName = TableNames.extentOfForest
const variableName = 'totalLandArea'
const years = [2010, 2015, 2020, 2025]

const nodes: Array<NodeUpdate> = years.map<NodeUpdate>((year) => ({
  tableName,
  variableName,
  colName: `${year}`,
  value: undefined,
}))

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2025', metaCache: true },
    client
  )
  const countryNodes = { NOR: nodes, SJM: nodes }
  await updateDependencies({ assessment, cycle, countryNodes }, client)
}
