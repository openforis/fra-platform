import { Promises } from 'utils/promises'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'
import { Job } from 'server/worker/job/job'

const name = 'Scheduler-MaterializedViews'

export class RefreshMaterializedViews extends Job {
  #client: BaseProtocol

  constructor(client: BaseProtocol = DB) {
    super(name)
    this.#client = client
  }

  protected async execute(): Promise<void> {
    const assessments = await AssessmentController.getAll({})

    await Promises.each(assessments, (assessment) =>
      Promises.each(assessment.cycles, async (cycle) => {
        const countries = await AreaController.getCountries({ assessment, cycle }, this.#client)
        const countryISOs = await CountryActivityLogRepository.getCountryISOsOutOfSync(
          { assessment, countries, cycle },
          this.#client
        )

        await Promises.each(countryISOs, async (countryIso) => {
          this.logDebug(`${assessment.props.name} ${cycle.name} ${countryIso} refreshing`)
          await CountryActivityLogRepository.refreshMaterializedView({ assessment, cycle, countryIso }, this.#client)
          this.logInfo(`${assessment.props.name} ${cycle.name} ${countryIso} refreshed`)
        })
      })
    )
  }
}
