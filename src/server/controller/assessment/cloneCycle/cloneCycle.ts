import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user'

import { cloneAreas } from 'server/controller/assessment/cloneCycle/_cloneAreas'
import { cloneData } from 'server/controller/assessment/cloneCycle/_cloneData'
import { cloneMetadata } from 'server/controller/assessment/cloneCycle/_cloneMetadata'
import { cloneUserRoles } from 'server/controller/assessment/cloneCycle/_cloneUserRoles'
import { generateMaterializedViews } from 'server/controller/assessment/cloneCycle/_generateMaterializedViews'
import { CloneProps } from 'server/controller/assessment/cloneCycle/types'
import { createCycle } from 'server/controller/assessment/createCycle'
import { CacheController } from 'server/controller/cache'
import { BaseProtocol, DB } from 'server/db'
import { StaticFiles } from 'server/static/staticFiles'

type Props = {
  assessment: Assessment
  cycle: Cycle
  name: string
  user: User
}

type Returned = {
  assessment: Assessment
  cycle: Cycle
}

export const cloneCycle = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { cycle: cycleSource } = props

  return client.tx(async (t) => {
    const { assessment, cycle: cycleTarget } = await createCycle({ ...props, cycleSource }, t)

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
    await CacheController.generateMetaCache(t)
    await CacheController.generateMetadata({ assessment }, t)
    await CacheController.generateData({ assessment, cycle: cycleTarget }, t)

    return { assessment, cycle: cycleTarget }
  })
}
