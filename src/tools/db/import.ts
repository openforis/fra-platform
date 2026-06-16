import '../scriptInit'

import path from 'path'

import { AssessmentNames } from 'meta/assessment/assessment'
import { EXPORT_ASSESSMENTS, EXPORT_ASSESSMENTS_CYCLES, EXPORT_TABLES } from 'tools/db/config/EXPORT_TABLES'
import { readTableFromFile } from 'tools/db/io/readTableFromFile'
import { DBService } from 'tools/db/service'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { AssessmentController } from 'server/controller/assessment'
import { TableDataController } from 'server/controller/cycleData/tableData'
import { DB } from 'server/db/db'
import { AssessmentRepository } from 'server/db/repository/assessment/assessment'
import { getCreateOrReplaceViewCountryUserSummary } from 'server/db/repository/assessment/assessment/getCreateSchemaDDL'
import { Schemas } from 'server/db/schemas'

const INPUT_DIR = path.join(__dirname, 'fixtures')

const exec = async (): Promise<void> => {
  // Create assessment schemas
  await Promise.all(
    EXPORT_ASSESSMENTS.map((assessmentName) => {
      return AssessmentRepository.createAssessmentSchema({ assessmentName })
    })
  )

  // Create assessment cycle schemas
  await Promise.all(
    EXPORT_ASSESSMENTS.flatMap((assessmentName) =>
      EXPORT_ASSESSMENTS_CYCLES[assessmentName].map(async (cycleName) => {
        const schemaAssessment = Schemas.getSchemaAssessment({ assessmentName })
        const schemaCycle = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName })
        await DB.query(AssessmentRepository.getCreateSchemaCycleDDL(schemaAssessment, schemaCycle))

        // create odp data tables for fra
        if ([AssessmentNames.fra, AssessmentNames.fraTest].includes(assessmentName)) {
          await DB.query(AssessmentRepository.getCreateSchemaCycleOriginalDataPointViewDDL(schemaCycle))
        }
      })
    )
  )

  await DB.tx(async (t) => {
    // Use EXPORT_TABLES order to respect foreign key dependencies
    const tables = EXPORT_TABLES.map((tableConfig) => {
      const { schema, table } = tableConfig
      return readTableFromFile(schema, table, INPUT_DIR)
    })

    await DBService.importTables({ tables }, t)

    // create views
    const assessments = await AssessmentController.getAll({}, t)
    await Promise.all(
      assessments.flatMap((assessment) =>
        assessment.cycles.map(async (cycle) => {
          await TableDataController.refreshViews({ assessment, cycle }, t)
          await t.query(getCreateOrReplaceViewCountryUserSummary({ assessment, cycle }))
        })
      )
    )
  })
}

ToolsUtils.exec(exec)
