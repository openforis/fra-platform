import '../scriptInit'

import * as path from 'path'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { DB } from 'server/db/db'
import { AssessmentRepository } from 'server/db/repository/assessment/assessment'
import { Schemas } from 'server/db/schemas'
import { DatabaseService } from 'server/service/databaseService'
import {
  EXPORT_ASSESSMENTS,
  EXPORT_ASSESSMENTS_CYCLES,
  EXPORT_TABLES,
} from 'server/service/databaseService/EXPORT_TABLES'

import { _readTableFromFile } from './_readTableFromFile'

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
        const schemaAssessment = Schemas.getSchemaAssessment(assessmentName)
        const schemaCycle = Schemas.getSchemaAssessmentCycle(assessmentName, cycleName)
        await DB.query(AssessmentRepository.getCreateSchemaCycleDDL(schemaAssessment, schemaCycle))
      })
    )
  )

  await DB.tx(async (t) => {
    // Use EXPORT_TABLES order to respect foreign key dependencies
    const allData = EXPORT_TABLES.map((tableConfig) => {
      const { schema, table } = tableConfig
      return _readTableFromFile(schema, table, INPUT_DIR)
    })

    await DatabaseService.importTables(allData, t)
  })
}

ToolsUtils.exec(exec)
