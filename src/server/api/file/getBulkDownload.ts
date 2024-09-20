import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { Requests } from 'server/utils'
import { Responses } from 'server/utils/responses'

// Zip contents:
// FRA_Years_2022_09_07.csv
// Annual_2022_09_07.csv
// Intervals_2022_09_07.csv
// README.txt

const _README = (cycleName: string) => {
  const years = `1990, 2000, 2010, 2015${cycleName === '2020' ? ' and 2020' : ', 2020 and 2025'}`
  const yearRange = `1990-2000, 2000-2010, 2010-2015${
    cycleName === '2020' ? ' or 2015-2020' : ', 2015-2020 or 2020-2025'
  }`
  return `
  README

The bulk download zip archive contains three comma separated files (csv). They have been named as follows:
    1. FRA_Years_YYYY_MM_DD.csv (YYYY_MM_DD refers to the date of the download)
    2. Intervals_YYYY_MM_DD.csv
    2. Annual_YYYY_MM_DD.csv

1. Most of the reported data are found in the file “FRA_Years*”.  Typically the data are structured in records according to the FRA reporting years: ${years}.
2. The file “Intervals*” contains data on Forest expansion, afforestation, natural expansion, deforestation and reforestation and each data record contains information for one interval ${yearRange}.
3. The file “Annual*” contains data on forest disturbances and the data are structured as annual records for the period 2000-2017.

Required citation: FAO. ${cycleName}. Global Forest Resources Assessment ${cycleName}

Contact: fra@fao.org
`
}

export const getBulkDownload = async (req: CycleRequest, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const files = await CycleDataController.getBulkDownload({
      assessment,
      cycle,
    })

    const BOM = '\uFEFF' // Byte Order Mark for UTF-8
    const readmeContent = Buffer.from(BOM + _README(cycle.name), 'utf-8')
    const fileList = files.map(({ fileName, content }) => ({
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
