import { Queue, Worker } from 'bullmq'
import IORedis from 'ioredis'
import { Dates } from 'utils/dates'
import { Promises } from 'utils/promises'

import { Areas, AssessmentStatus } from 'meta/area'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db'
import { MailService } from 'server/service'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

export const initRemindReviewers = (connection: IORedis): Worker => {
  const name = 'Scheduler-RemindReviewers'
  const queue = new Queue<void>(name, { connection, streams: { events: { maxLen: 1 } } })

  const worker = new Worker(
    name,
    async () => {
      Logger.info(`[${name}] ** started`)

      await client.tx(async (tx) => {
        const assessments = await AssessmentController.getAll({}, tx)

        await Promises.each(assessments, async (assessment) => {
          await Promises.each(assessment.cycles, async (cycle) => {
            const countries = await AreaController.getCountries({ assessment, cycle }, tx)
            const inReview = countries.filter((country) => {
              const diffInDays = Dates.differenceInDays(new Date(), new Date(country.lastInReview))
              return (
                country.props.status === AssessmentStatus.review &&
                diffInDays % 7 === 0 &&
                !Areas.isAtlantis(country.countryIso)
              )
            })

            await Promises.each(inReview, async (country) => {
              await MailService.remindReviewers({
                assessment,
                cycle,
                country,
              })
            })
          })
        })
      })
    },
    { concurrency: 1, connection, lockDuration: 10_000, maxStalledCount: 0 }
  )

  queue.add(`${name}-scheduler`, undefined, {
    // once a day, one minute past midnight
    repeat: { pattern: '1 0 * * *' },
    removeOnComplete: true,
    removeOnFail: false,
  })

  return worker
}
