import '../scriptInit'

import { CountryIso } from 'meta/area/countryIso'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { AssessmentController } from 'server/controller/assessment'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'
import { Logger } from 'server/utils/logger'

const usage =
  'Usage:\tts-node src/tools/countrySummary/refresh.ts <assessmentName> <cycleName> <countryIso>\n' +
  'Example:\tts-node src/tools/countrySummary/refresh.ts fra latest FIN'

const [, , assessmentName, cycleName, countryIso] = process.argv

if (!assessmentName || !cycleName || !countryIso) {
  Logger.error(usage)
  process.exit(1)
}

// Refresh given country activity log
// Used for instantly refreshing Recent Activity - scheduler runs once per hour
const refresh = async (): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  await CountryActivityLogRepository.refreshMaterializedView({
    assessment,
    countryIso: countryIso as CountryIso,
    cycle,
  })

  Logger.info(`Refreshed country activity log view: ${assessmentName}/${cycle.name}/${countryIso}`)
}

ToolsUtils.exec(refresh)
