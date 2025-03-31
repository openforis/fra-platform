// localhost:9000/api/cycle-data/print/report?assessmentName=fra&cycleName=2025&countryIso=FIN&lang=en
import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'fs/promises'
import * as path from 'path'
import { CSV } from 'tools/utils/CSV'
import { ToolsUtils } from 'tools/utils/toolsUtils'
import { Dates } from 'utils/dates'
import { Promises } from 'utils/promises'

import { Areas, CountryIso } from 'meta/area'
import { AssessmentNames } from 'meta/assessment/assessment'
import { Lang } from 'meta/lang'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { PdfReport } from 'server/service/pdfReport'
import { Logger } from 'server/utils/logger'

const appUri = 'http://localhost:9001'
const assessmentName = AssessmentNames.fra
const cycleName = '2025'
const skipAtlantis = true
const cookies = {
  'fra-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDkzLCJlbWFpbCI6IkNvc2ltby50b2duYUBmYW8ub3JnIiwicHJvcHMiOnsibGFuZyI6ImVuIiwibmFtZSI6IkNvc2ltbyIsInRpdGxlIjoibXIiLCJzdXJuYW1lIjoiVG9nbmEifSwic3RhdHVzIjoiYWN0aXZlIiwidXVpZCI6IjZjYmU4MDdjLTRhYWYtNGUxMi05ZWRjLWY3MTc0MmZkNGVlYyIsImlhdCI6MTczMjc5NTMwN30.nqJQ07xFgJ9S69og8CTPynapX7TfAEu-9UD1czrjooo`,
}

const generateCountryReport = async (props: {
  countryIso: CountryIso
  lang?: Lang
  outputDir: string
}): Promise<void> => {
  const { countryIso, lang = Lang.en, outputDir } = props

  const buffer = await PdfReport.generate({ appUri, assessmentName, cookies, countryIso, cycleName, lang })

  const fileName = path.resolve(outputDir, `${assessmentName}-${cycleName}-${countryIso}_${lang}.pdf`)
  await fs.writeFile(fileName, buffer)
}

ToolsUtils.exec(async () => {
  // get country languages from csv file
  const countryLangsList = await CSV.read<{ ISO3: CountryIso; Country: string; Language: string }>(
    path.resolve(__dirname, `ISO3_country_lan.csv`)
  )
  const countryLangs = countryLangsList.reduce<{ [key in CountryIso]?: Lang }>(
    (acc, row) => ({ ...acc, [row.ISO3]: row.Language.toLowerCase() }),
    {}
  )

  // reset output dir
  const outputDirName = 'output'
  const outputDir = path.resolve(__dirname, outputDirName)
  await fs.rm(outputDir, { recursive: true, force: true })
  // create reports dir
  const reportsDirName = `${assessmentName}-${cycleName}-reports_${Dates.format(new Date(), 'yyyy-MM-dd')}`
  const reportsDir = path.resolve(outputDir, reportsDirName)
  await fs.mkdir(reportsDir, { recursive: true })

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const countries = await AreaController.getCountries({ assessment, cycle })

  await Promises.each(countries, async (country, index) => {
    const { countryIso } = country
    if (!skipAtlantis || !Areas.isAtlantis(countryIso)) {
      const lang = countryLangs[countryIso]
      await generateCountryReport({ countryIso, lang, outputDir: reportsDir })
      Logger.info(`    ${countryIso} (${lang}) (${index + 1}/${countries.length}) generated`)
    } else {
      Logger.info(`    ${countryIso} (${index + 1}/${countries.length}) skipped`)
    }
  })
})
