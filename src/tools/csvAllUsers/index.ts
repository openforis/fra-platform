import '../scriptInit'

import { AssessmentNames } from 'meta/assessment/assessment'
import { Lang } from 'meta/lang'
import { RoleName } from 'meta/user/role/name'
import { CSV } from 'tools/utils/CSV'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { BaseProtocol, DB } from 'server/db/db'

const client: BaseProtocol = DB

const assessmentName = AssessmentNames.fra
const cycleName = '2025'

const roles = [RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT]

const main = async (): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)

  const { query, queryParams, rowTransformer } = await UserController.getManyExport({
    assessment,
    cycle,
    filters: { roles },
    lang: Lang.en,
  })

  const rawRows = await client.any(query, queryParams)
  const fixQuotes = ([k, v]: [string, string]): Array<string> => {
    const containsSpecialChars = v.includes(',') || v.includes('"')
    const fixedV = containsSpecialChars ? `"${v.replace(/"/g, '""')}"` : v
    return [k, fixedV]
  }

  const rows = rawRows.map(rowTransformer).map((row) => Object.fromEntries(Object.entries(row).map(fixQuotes)))

  await CSV.write(rows, 'all-users-nc-anc')
}

ToolsUtils.exec(main)
