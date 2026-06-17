import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'
import { CycleName } from 'meta/assessment/cycle'
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

const getReadmeProps = (cycleName: CycleName): { cycleName: CycleName; yearRange: string; years: string } => {
  const years = `1990, 2000, 2010, 2015${cycleName === '2020' ? ' and 2020' : ', 2020 and 2025'}`
  const yearRange = `1990-2000, 2000-2010, 2010-2015${
    cycleName === '2020' ? ' or 2015-2020' : ', 2015-2020 or 2020-2025'
  }`
  return { cycleName, yearRange, years }
}

const BOM = '\uFEFF' // Byte Order Mark for UTF-8
const getUTF8Buffer = (content: string): Buffer => Buffer.from(BOM + content, 'utf-8')

type Request = CountryRequest<{ includeClimaticDomain: string }>

export const getBulkDownload = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessmentName, cycleName } = req.query
    const { assessment, cycle } = req.context
    const { user } = req

    const lang = user?.props?.lang ?? Lang.en
    const includeClimaticDomain = Users.isAdministrator(user) ? req.query.includeClimaticDomain === 'true' : false

    const i18n = await I18n.getInstance({})
    const files = await BulkDownloadController.get({ assessment, cycle, includeClimaticDomain, i18n })
    const fileList = files.map(({ content, fileName }) => ({ fileName, file: getUTF8Buffer(content) }))

    const readmeProps = getReadmeProps(cycle.name)
    const readmeRecord = getReadme(readmeProps)
    const readme = readmeRecord[lang] ?? readmeRecord[Lang.en]
    fileList.push({ fileName: 'README.txt', file: getUTF8Buffer(readme) })

    const fileName = `bulk-download_${assessmentName}_${cycleName}`
    await Responses.sendZip(res, fileList, fileName)
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
