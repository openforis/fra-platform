import { CacheController } from 'server/cache/controller'
import { BaseProtocol } from 'server/db/db'

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await CacheController.generateAssessments(client)

  await Promise.all(
    Object.values(assessments).map(async (assessment) => {
      await Promise.all(
        assessment.cycles.map(async (cycle) => {
          await CacheController.generateArea({ assessment, cycle }, client)
        })
      )
    })
  )
}
