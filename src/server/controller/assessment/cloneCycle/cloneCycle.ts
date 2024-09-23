import { Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { cloneAreas } from 'server/controller/assessment/cloneCycle/_cloneAreas'
import { cloneData } from 'server/controller/assessment/cloneCycle/_cloneData'
import { cloneMetadata } from 'server/controller/assessment/cloneCycle/_cloneMetadata'
import { generateMaterializedViews } from 'server/controller/assessment/cloneCycle/_generateMaterializedViews'
import { CloneProps } from 'server/controller/assessment/cloneCycle/types'
import { createCycle } from 'server/controller/assessment/createCycle'
import { generateDataCache } from 'server/controller/assessment/generateDataCache'
import { generateMetaCache } from 'server/controller/assessment/generateMetaCache'
import { generateMetadataCache } from 'server/controller/assessment/generateMetadataCache'
import { BaseProtocol, DB } from 'server/db'

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
    const { assessment, cycle: cycleTarget } = await createCycle(props, t)

    const cloneProps: CloneProps = { assessment, cycleSource, cycleTarget }

    await cloneMetadata(cloneProps, t)
    await cloneAreas(cloneProps, t)
    await generateMaterializedViews(cloneProps, t)
    await cloneData(cloneProps, t)

    // update cache
    await generateMetaCache(t)
    await generateMetadataCache({ assessment }, t)
    await generateDataCache({ assessment, cycle: cycleTarget }, t)

    return { assessment, cycle: cycleTarget }
  })
}
