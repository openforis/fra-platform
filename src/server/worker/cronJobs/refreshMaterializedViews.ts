import { Promises } from 'utils/promises'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'
import { Job } from 'server/worker/job/job'

const name = 'Scheduler-MaterializedViews'

export class RefreshMaterializedViews extends Job {
  constructor() {
    super(name)
  }

  protected async execute(): Promise<void> {
    const assessments = await AssessmentController.getAll({})

    await Promises.each(assessments, (assessment) =>
      Promises.each(assessment.cycles, async (cycle) => {
        const countries = await AreaController.getCountries({ assessment, cycle })
        const countryISOs = await CountryActivityLogRepository.getCountryISOsOutOfSync({ assessment, countries, cycle })

        await Promises.each(countryISOs, async (countryIso) => {
          this.logDebug(`${assessment.props.name} ${cycle.name} ${countryIso} refreshing`)
          await CountryActivityLogRepository.refreshMaterializedView({ assessment, cycle, countryIso })
          this.logInfo(`${assessment.props.name} ${cycle.name} ${countryIso} refreshed`)
        })
      })
    )
  }
}
