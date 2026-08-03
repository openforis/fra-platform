import '../../scriptInit'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { PropsMerge } from 'tools/cycles/merge/_types'
import { deprecateCycleFrom } from 'tools/cycles/merge/deprecateCycleFrom'
import { mergeActivityLog } from 'tools/cycles/merge/mergeActivityLog'
import { mergeCountries } from 'tools/cycles/merge/mergeCountries'
import { mergeData } from 'tools/cycles/merge/mergeData'
import { mergeMessageTopics } from 'tools/cycles/merge/mergeMessageTopics'
import { mergeUserRoles } from 'tools/cycles/merge/mergeUserRoles'
import { updateCache } from 'tools/cycles/merge/updateCache'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db/db'

const client = DB
const assessmentName = AssessmentNames.fra
const cycleNameFrom = 'latest2'
const cycleNameTo = 'latest'
const countryISOs: Array<CountryIso> = ['ARG', 'EST', 'TUR', 'URY']

const merge = async (): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const cycleFrom = Assessments.getCycle({ assessment, cycleName: cycleNameFrom })
  const cycleTo = Assessments.getCycle({ assessment, cycleName: cycleNameTo })

  if (cycleFrom.cycleUuidSource !== cycleTo.uuid) {
    const msg = `Can't merge ${assessmentName} ${cycleNameFrom} into ${cycleNameTo} because ${cycleNameTo} is not the source of ${cycleNameFrom}.`
    throw new Error(msg)
  }

  const propsMerge: PropsMerge = { assessment, countryISOs, cycleFrom, cycleTo }

  // 1. merge data
  await mergeUserRoles(propsMerge, client)
  await mergeCountries(propsMerge, client)
  await mergeData(propsMerge, client)
  await mergeMessageTopics(propsMerge, client)
  await mergeActivityLog(propsMerge, client)

  // 2. deprecate cycle from
  await deprecateCycleFrom(propsMerge, client)

  //3. update cache
  await updateCache(propsMerge, client)
}

ToolsUtils.exec(merge)
