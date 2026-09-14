import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'

import { CacheController } from 'server/cache/controller'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'

const assessmentName = AssessmentNames.fra
const explorerCycleNames = [CycleNames._2025, CycleNames.latest]

// 2b rows that become subcategories of their tree species heading
const variableNames = [
  'nativeRank1',
  'nativeRank2',
  'nativeRank3',
  'nativeRank4',
  'nativeRank5',
  'nativeRank6',
  'nativeRank7',
  'nativeRank8',
  'nativeRank9',
  'nativeRank10',
  'remainingNative',
  'introducedRank1',
  'introducedRank2',
  'introducedRank3',
  'introducedRank4',
  'introducedRank5',
  'remainingIntroduced',
]

export default async (client: BaseProtocol): Promise<void> => {
  await client.query(
    `
      update assessment_fra.row r
      set props = jsonb_set(r.props, '{categoryLevel}', '1')
      from assessment_fra."table" t
      where t.uuid = r.table_uuid
        and t.props ->> 'name' = 'growingStockComposition2025'
        and r.props ->> 'variableName' in ($(variableNames:csv))
        and coalesce((r.props ->> 'categoryLevel')::int, 0) = 0
    `,
    { variableNames }
  )

  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  await CacheController.generateMetadata({ assessment }, client)

  const explorerCycles = assessment.cycles.filter((cycle) => explorerCycleNames.includes(cycle.name as CycleNames))
  await Promise.all(
    explorerCycles.map((cycle) => CacheController.generateExplorerMetadata({ assessment, cycle }, client))
  )
}
