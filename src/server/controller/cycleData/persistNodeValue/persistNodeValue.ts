import * as Queue from 'bull'

import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle, Node } from '@meta/assessment'
/**
 * Different approaches
 * a) On demand:
 *    1. client side data fetching dependant tables / calculation and validations
 *    2. data export
 *    3. print view
 *    4. buld download
 *
 * b) Redis queue (more consistent) (sudo docker run --name fra-redis -p 6379:6379 -d redis)
 *    1. optimize calculateAndValidateDependentNodes
 *
 */
import { NodeUpdates } from '@meta/data'

import { BaseProtocol, DB } from '@server/db'

// import { DB } from '@server/db'
import { persistNode } from './persistNode/persistNode'
import { calculateAndValidateDependentNodes } from './calculateAndValidateDependentNodes'
import { Props } from './props'

type DependantsUpdateProps = Omit<Props, 'value'> & { nodeUpdates: NodeUpdates; isODP?: boolean }

const queue: Queue.Queue<DependantsUpdateProps> = new Queue<DependantsUpdateProps>(
  'persistNodeValue/calculateAndValidateDependentNodes',
  { redis: 'redis://127.0.0.1:6379' }
)

// console.log(')))))))) queue ',queue)

queue.process(async (job) => {
  // const time = new Date().getTime()
  // console.log(
  //   '====== processing  job for ',
  //   job.data.countryIso,
  //   job.data.assessment.props.name,
  //   job.data.cycle.name,
  //   job.data.tableName,
  //   job.data.variableName,
  //   job.data.colName
  // )
  await calculateAndValidateDependentNodes(job.data, DB)
  // console.log('====== END processing done ', (new Date().getTime() - time) / 1000)
  await job.moveToCompleted()
  return Promise.resolve()
  // done()
})

const queues: Record<string, Queue.Queue<DependantsUpdateProps>> = {}

export const getQueue = (props: {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}): Queue.Queue<DependantsUpdateProps> => {
  const { assessment, cycle, countryIso } = props
  const key = `persistNodeValue/calculateAndValidateDependentNodes/${assessment.props.name}/${cycle.name}/${countryIso}`
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
    //   job.data.countryIso,
    //   job.data.assessment.props.name,
    //   job.data.cycle.name,
    //   job.data.tableName,
    //   job.data.variableName,
    //   job.data.colName
    // )
    await calculateAndValidateDependentNodes(job.data, DB)
    // console.log('====== END processing done ', (new Date().getTime() - time) / 1000)
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

export const persistNodeValue = async (
  props: Props & { activityLogMessage?: ActivityLogMessage },
  client: BaseProtocol
): Promise<Node> => {
  const { assessment, colName, countryIso, cycle, tableName, variableName } = props

  // return DB.tx(async (client) => {
  // try {
  // await client.func('pg_advisory_xact_lock', [1])

  const node = await persistNode(props, client)

  const nodeUpdates: NodeUpdates = {
    assessment,
    countryIso,
    cycle,
    nodes: [{ tableName, variableName, colName, value: node.value }],
  }
  // console.log('====== adding to queue')
  // try {
  await getQueue({ assessment, cycle, countryIso })?.add(
    { ...props, nodeUpdates },
    {
      // jobId: `${assessment.props.name}/${cycle.name}/${countryIso}/${tableName}/${variableName}/${colName}`,
      removeOnComplete: true,
    }
  )
  // } catch (e) {
  // console.log('&&&&& error ', e)
  // }
  return node
  // await calculateAndValidateDependentNodes({ ...props, nodeUpdates }, client)
  // } finally {
  // await client.func('pg_advisory_xact_lock', [1])
  // }
  // })
}
