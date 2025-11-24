import '../scriptInit'

import { ToolsUtils } from 'tools/utils/toolsUtils'

import { DBService } from './utils/dbService/dbService'

const exec = async (): Promise<void> => {
  await DBService.initSchemas()
}

ToolsUtils.exec(exec)
