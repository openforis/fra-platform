import * as Queue from 'bull'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'

import { DB } from '@server/db'

import { calculateAndValidateDependentNodes } from './calculateAndValidateDependentNodes'
import { PersistNodeValuesProps } from './props'

type DependantsUpdateProps = PersistNodeValuesProps & { isODP?: boolean }

const queues: Record<string, Queue.Queue<DependantsUpdateProps>> = {}

export const getInstance = (props: {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}): Queue.Queue<DependantsUpdateProps> => {
  const { assessment, cycle, countryIso } = props
  const key = `persistNodeValue/dependenciesUpdate/${assessment.props.name}/${cycle.name}/${countryIso}`
  let queue = queues[key]

  if (queue) return queue

  queue = new Queue<DependantsUpdateProps>(key, {
    redis: 'redis://127.0.0.1:6379',
    settings: { maxStalledCount: 0, lockDuration: 60000 },
  })
  queue.process(1, async (job) => {
    // const time = new Date().getTime()
    // console.log(
    //   '====== processing  job for ',
    //   job.data,
    // )
    const { nodeUpdates, isODP, sectionName, user } = job.data
    const { assessment, cycle, countryIso, nodes } = nodeUpdates
    await Promise.all(
      nodes.map(async (node) => {
        await calculateAndValidateDependentNodes(
          {
            assessment,
            colName: node.colName,
            countryIso,
            cycle,
            isODP,
            sourceNode: node,
            sectionName,
            tableName: node.tableName,
            user,
            variableName: node.variableName,
          },
          DB
        )
      })
    )

    // console.log('====== END processing done ', (new Date().getTime() - time) / 1000,__dirname)
    // await job.moveToCompleted()
    return Promise.resolve()
    // done()
  })

  // queue.on('error', (error) => {
  // console.log('%%%%%%%%%%%% ERROR ', error)
  // })

  queues[key] = queue

  return queue
}

export const QueueFactory = {
  getInstance,
}
