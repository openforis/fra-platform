import './scriptInit'

import { ToolsUtils } from 'tools/utils/toolsUtils'

import { DBService } from 'server/db/service/dbService'

const exec = async (): Promise<void> => {
  await DBService.initSchemas()
}

ToolsUtils.exec(exec)
