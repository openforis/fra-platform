// localhost:9000/api/cycle-data/print/report?assessmentName=fra&cycleName=2025&countryIso=FIN&lang=en
import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'fs/promises'
import * as path from 'path'
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
const lang = Lang.en

const generateCountryReport = async (props: { countryIso: CountryIso; outputDir: string }): Promise<void> => {
  const { countryIso, outputDir } = props

  const buffer = await PdfReport.generate({ appUri, assessmentName, cookies, countryIso, cycleName, lang })

  const fileName = path.resolve(outputDir, `${assessmentName}-${cycleName}-${countryIso}.pdf`)
  await fs.writeFile(fileName, buffer)
}

ToolsUtils.exec(async () => {
  const outputDir = path.resolve(__dirname, `output-${Dates.format(new Date(), 'yyyy-MM-dd')}`)
  await fs.rm(outputDir, { recursive: true, force: true })
  await fs.mkdir(outputDir)

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
  const countries = await AreaController.getCountries({ assessment, cycle })

  await Promises.each(countries, async (country, index) => {
    const { countryIso } = country
    await generateCountryReport({ countryIso, outputDir })
    Logger.info(`    ${countryIso} (${index + 1}/${countries.length}) generated`)
  })
})
