import { Promises } from 'utils/promises'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'
import { Logger } from 'server/utils/logger'
import { Job } from 'server/worker/jobs/job'

const client: BaseProtocol = DB
const name = 'Scheduler-MaterializedViews'

export class RefreshMaterializedViews extends Job {
  constructor() {
    super(name)
  }

  protected async execute(): Promise<void> {
    const assessments = await AssessmentController.getAll({}, client)

    await Promises.each(assessments, (assessment) =>
      Promises.each(assessment.cycles, async (cycle) => {
        const countries = await AreaController.getCountries({ assessment, cycle })
        const countryISOs = await CountryActivityLogRepository.getCountryISOsOutOfSync({ assessment, countries, cycle })

        await Promises.each(countryISOs, async (countryIso) => {
          Logger.debug(`[${name}:CountryActivityLog] ${assessment.props.name} ${cycle.name} ${countryIso} refreshing`)
          await CountryActivityLogRepository.refreshMaterializedView({ assessment, cycle, countryIso })
          Logger.info(`[${name}:CountryActivityLog] ${assessment.props.name} ${cycle.name} ${countryIso} refreshed`)
        })
      })
    )
  }
}
