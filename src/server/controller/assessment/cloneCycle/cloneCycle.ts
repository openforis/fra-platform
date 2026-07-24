import { Assessment } from 'meta/assessment/assessment'
import { Cycle, CycleName } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { CacheController } from 'server/cache/controller'
import { AssessmentRedisRepository } from 'server/cache/repository/assessment'
import { cloneAreas } from 'server/controller/assessment/cloneCycle/_cloneAreas'
import { cloneData } from 'server/controller/assessment/cloneCycle/_cloneData'
import { cloneMetadata } from 'server/controller/assessment/cloneCycle/_cloneMetadata'
import { cloneUserRoles } from 'server/controller/assessment/cloneCycle/_cloneUserRoles'
import { generateMaterializedViews } from 'server/controller/assessment/cloneCycle/_generateMaterializedViews'
import { CloneProps } from 'server/controller/assessment/cloneCycle/types'
import { createCycle } from 'server/controller/assessment/createCycle'
import { BaseProtocol, DB } from 'server/db/db'
import { CreateCycleOptions } from 'server/db/repository/assessmentCycle/cycle/create'
import { StaticFiles } from 'server/static/staticFiles'

type Props = {
  assessment: Assessment
  cycleSource: Cycle
  name: CycleName
  user: User
}

type Returned = {
  assessment: Assessment
  cycle: Cycle
}

export const cloneCycle = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment: _assessment, cycleSource, name, user } = props

  return client.tx(async (t) => {
    const cycleProps = Objects.pick(cycleSource.props, ['ndp'])
    const uuidSource = cycleSource.uuid
    const options: CreateCycleOptions = { name, props: cycleProps, uuidSource }
    const { assessment, cycle: cycleTarget } = await createCycle({ assessment: _assessment, options, user }, t)

    const cloneProps: CloneProps = { assessment, cycleSource, cycleTarget }

    // clone metadata and data
    await cloneMetadata(cloneProps, t)
    await cloneAreas(cloneProps, t)
    await cloneUserRoles(cloneProps, t)
    await generateMaterializedViews(cloneProps, t)
    await cloneData(cloneProps, t)
    // clone static files
    await StaticFiles.cloneCycle(cloneProps)

    // update cache
    await CacheController.generateMetaCache({}, t)
    await CacheController.generateMetadata({ assessment }, t)
    await CacheController.generateData({ assessment, cycle: cycleTarget }, t)

    const { name: assessmentName } = assessment.props
    return {
      assessment: await AssessmentRedisRepository.getOne({ assessmentName, force: true }, t),
      cycle: cycleTarget,
    }
  })
}
