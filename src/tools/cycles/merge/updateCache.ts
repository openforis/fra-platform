import { PropsMerge } from 'tools/cycles/merge/_types'

import { CacheController } from 'server/cache/controller'
import { BaseProtocol } from 'server/db/db'
import { RefreshMaterializedViews } from 'server/worker/cronJobs/refreshMaterializedViews'

export const updateCache = async (props: PropsMerge, client: BaseProtocol): Promise<void> => {
  const { cycleTo: cycle } = props

  const assessment = await CacheController.generateAssessment({ assessmentName: props.assessment.props.name }, client)
  await CacheController.generateMetaCache({ assessments: [assessment] }, client)
  await CacheController.generateMetadata({ assessment }, client)
  await CacheController.generateData({ assessment, cycle }, client)

  await Promise.all(
    assessment.cycles.map((assessmentCycle) =>
      CacheController.generateArea({ assessment, cycle: assessmentCycle }, client)
    )
  )

  await new RefreshMaterializedViews().run()
}
