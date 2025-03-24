// localhost:9000/api/cycle-data/print/report?assessmentName=fra&cycleName=2025&countryIso=FIN&lang=en
import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'fs/promises'
import * as path from 'path'
import { CSV } from 'tools/utils/CSV'
import { ToolsUtils } from 'tools/utils/toolsUtils'
import { Dates } from 'utils/dates'
import { Promises } from 'utils/promises'

import { CountryIso } from 'meta/area'
import { AssessmentNames } from 'meta/assessment'
import { Lang } from 'meta/lang'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { PdfReport } from 'server/service/pdfReport'
import { Logger } from 'server/utils/logger'

const appUri = 'http://localhost:9001'
const assessmentName = AssessmentNames.fra
const cookies = {
  'fra-auth-token': ``,
}
const cycleName = '2025'

const generateCountryReport = async (props: {
  countryIso: CountryIso
  lang: Lang
  outputDir: string
}): Promise<void> => {
  const { countryIso, lang, outputDir } = props

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
  const dirName = `${assessmentName}-${cycleName}__${Dates.format(new Date(), 'yyyy-MM-dd')}`
  const outputDir = path.resolve(__dirname, dirName)
  await fs.rm(outputDir, { recursive: true, force: true })
  await fs.mkdir(outputDir)

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const countries = await AreaController.getCountries({ assessment, cycle })

  await Promises.each(countries, async (country, index) => {
    const { countryIso } = country
    const lang = countryLangs[countryIso]
    await generateCountryReport({ countryIso, lang, outputDir })
    Logger.info(`    ${countryIso} (${lang}) (${index + 1}/${countries.length}) generated`)
  })
})
