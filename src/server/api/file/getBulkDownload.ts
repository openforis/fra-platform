import { Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'
import { Users } from 'meta/user/users'

import { CycleDataController } from 'server/controller/cycleData'
import { Requests } from 'server/utils'
import { Responses } from 'server/utils/responses'

// Zip contents:
// FRA_Years_2022-09-07.csv
// Annual_2022-09-07.csv
// Intervals_2022-09-07.csv
// README.txt

const _README = (cycleName: string): string => {
  const years = `1990, 2000, 2010, 2015${cycleName === '2020' ? ' and 2020' : ', 2020 and 2025'}`
  const yearRange = `1990-2000, 2000-2010, 2010-2015${
    cycleName === '2020' ? ' or 2015-2020' : ', 2015-2020 or 2020-2025'
  }`
  return `
  README

The bulk download zip archive contains three comma separated files (csv). They have been named as follows:
    1. FRA_Years_YYYY-MM-DD.csv (YYYY-MM-DD refers to the date of the download)
    2. Intervals_YYYY-MM-DD.csv
    2. Annual_YYYY-MM-DD.csv

1. Most of the reported data are found in the file “FRA_Years*”.  Typically the data are structured in records according to the FRA reporting years: ${years}.
2. The file “Intervals*” contains data on Forest expansion, afforestation, natural expansion, deforestation and reforestation and each data record contains information for one interval ${yearRange}.
3. The file “Annual*” contains data on forest disturbances and the data are structured as annual records for the period 2000-2017.

Required citation: FAO. ${cycleName}. Global Forest Resources Assessment ${cycleName}

Contact: fra@fao.org
`
}

type Request = CountryRequest<{ includeClimaticDomain: string }>

export const getBulkDownload = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assessmentName, cycleName } = req.query
    const { assessment, cycle } = req.context
    const { user } = req
    const includeClimaticDomain = Users.isAdministrator(user) ? req.query.includeClimaticDomain === 'true' : false

    const files = await CycleDataController.getBulkDownload({ assessment, cycle, includeClimaticDomain })

    const BOM = '\uFEFF' // Byte Order Mark for UTF-8
    const readmeContent = Buffer.from(BOM + _README(cycle.name), 'utf-8')
    const fileList = files.map(({ content, fileName }) => ({
      fileName,
      file: Buffer.from(BOM + content, 'utf-8'),
    }))
    fileList.push({ fileName: 'README.txt', file: readmeContent })

    const fileName = `bulk-download_${assessmentName}_${cycleName}`
    await Responses.sendZip(res, fileList, fileName)
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
