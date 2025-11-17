import '../scriptInit'

import * as path from 'path'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { AssessmentNames } from 'meta/assessment/assessment'

import { DB } from 'server/db/db'
import { AssessmentRepository } from 'server/db/repository/assessment/assessment'
import { DatabaseService } from 'server/service/databaseService'
import { EXPORT_TABLES } from 'server/service/databaseService/EXPORT_TABLES'

import { _readTableFromFile } from './_readTableFromFile'

const INPUT_DIR = path.join(__dirname, 'fixtures')

const exec = async (): Promise<void> => {
  // Create assessment schemas
  await Promise.all(
    [AssessmentNames.fra, AssessmentNames.panEuropean].map((assessmentName) => {
      return AssessmentRepository.createAssessmentSchema({ assessmentName })
    })
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
