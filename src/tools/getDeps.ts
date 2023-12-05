import 'tsconfig-paths/register'
import 'dotenv/config'

import { AssessmentMetaCaches } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { Logger } from 'server/utils/logger'

const exec = async () => {
  if (process.argv.length === 6) {
    const [assessmentName, cycleName, tableName, variableName] = process.argv.slice(2)

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName,
      cycleName,
      metaCache: true,
    })

    const dependants = AssessmentMetaCaches.getCalculationsDependants({ assessment, cycle, tableName, variableName })
    const dependencies = AssessmentMetaCaches.getCalculationsDependencies({
      assessment,
      cycle,
      tableName,
      variableName,
    })

    Logger.info('----------------------------------------')
    Logger.info(`Dependants of ${tableName}.${variableName}`)
    Logger.info('----------------------------------------')
    console.table(dependants)
    Logger.info('----------------------------------------')

    Logger.info('----------------------------------------')
    Logger.info(`Dependencies of ${tableName}.${variableName}`)
    Logger.info('----------------------------------------')
    console.table(JSON.stringify(dependencies, null, 2))
    Logger.info('----------------------------------------')
  }
  Logger.info(`
usage: ts-node getDeps.ts <assessment> <cycle> <tableName> <variableName>
Ex: ts-node fra 2025 forestCharacteristics primaryForest`)
}

exec().then()
