import { BaseProtocol, Schemas } from 'server/db'

import { AssessmentCycleUtil } from 'test/migrations/steps/utils/getAssessmentCycle'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)
  const schemaName = Schemas.getName(assessment)
  const nativeRanks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
    (rank) => `"nativeRank${rank}": { "key": "fra.growingStockComposition.nativeTreeSpecies2025" }`
  )

  const introducedRanks = [1, 2, 3, 4, 5].map(
    (rank) => `"introducedRank${rank}": { "key": "fra.growingStockComposition.introducedTreeSpecies2025" }`
  )

  const ranks = [...nativeRanks, ...introducedRanks].join(',\n')

  const query = `
    update ${schemaName}.section s
    set props = jsonb_set(
        props::jsonb,
        '{descriptions,${cycle.uuid},nationalData,dataSources,table,dataSourceVariables,prefixes}',
        '{${ranks}}'
    )::jsonb
    where s.props ->> 'name' = 'growingStockComposition'
  `
  await client.query(query)
}
