import '../scriptInit'

import { DBService } from 'tools/db/service'
import { ToolsUtils } from 'tools/utils/toolsUtils'

const exec = async (): Promise<void> => {
  await DBService.initSchemas()
}

ToolsUtils.exec(exec)
