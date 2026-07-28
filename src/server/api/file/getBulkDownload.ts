import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'
import { Lang } from 'meta/lang'
import { Users } from 'meta/user/users'

import { getReadme } from 'server/api/file/bulkDownload/getReadme'
import { BulkDownloadController } from 'server/controller/cycleData/bulkDownload'
import { Requests } from 'server/utils'
import { I18n } from 'server/utils/i18n'
import { Responses } from 'server/utils/responses'

// Zip contents:
// FRA_Years_2022-09-07.csv
// Annual_2022-09-07.csv
// Intervals_2022-09-07.csv
// README.txt

const BOM = '\uFEFF' // Byte Order Mark for UTF-8
const getUTF8Buffer = (content: string): Buffer => Buffer.from(BOM + content, 'utf-8')

type Request = CountryRequest<{ includeClimaticDomain: string; includeVoluntaryUpdates: string; lang: Lang }>

export const getBulkDownload = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessmentName, cycleName, lang: langQuery } = req.query
    const { assessment, cycle } = req.context
    const { user } = req

    const lang = langQuery ?? user?.props?.lang ?? Lang.en
    const includeClimaticDomain = Users.isAdministrator(user) ? req.query.includeClimaticDomain === 'true' : false
    // Voluntary updates are included by default, when the query param is not specified
    const includeVoluntaryUpdates = req.query.includeVoluntaryUpdates !== 'false'

    const i18n = await I18n.getInstance({})
    const props = { assessment, cycle, i18n, includeClimaticDomain, includeVoluntaryUpdates }
    const files = await BulkDownloadController.get(props)
    const fileList = files.map(({ content, fileName }) => ({ fileName, file: getUTF8Buffer(content) }))

    const readme = getReadme({ cycleName: cycle.name, lang })
    fileList.push({ fileName: 'README.txt', file: getUTF8Buffer(readme) })

    const fileName = `bulk-download_${assessmentName}_${cycleName}`
    await Responses.sendZip(res, fileList, fileName)
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
