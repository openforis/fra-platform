// localhost:9000/api/cycle-data/print/report?assessmentName=fra&cycleName=2025&countryIso=FIN&lang=en
import '../scriptInit'

import fs from 'fs/promises'
import path from 'path'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { Lang } from 'meta/lang'
import { Dates } from 'utils/dates'
import { Promises } from 'utils/promises'
import { CSV } from 'tools/utils/CSV'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { PdfReport } from 'server/service/pdfReport'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

const { appUri: appUriEnv, fraAuthToken, fraReportAssessment, fraReportCycle, fraReportSkipAtlantis } = ProcessEnv
const assessmentName = fraReportAssessment
const cycleName = fraReportCycle
const cookies = { 'fra-auth-token': fraAuthToken }

// Parse --countryIsos from CLI args e.g. --countryIsos=FIN,GBR,DEU
const argCountryIsos = process.argv.find((arg) => arg.startsWith('--countryIsos='))
const countryIsosArg = argCountryIsos ? argCountryIsos.split('=')[1] : undefined
let countryIsos: Array<CountryIso> = []

// Parse --appUri from CLI args
const argAppUri = process.argv.find((arg) => arg.startsWith('--appUri='))
const appUriArg = argAppUri ? argAppUri.split('=')[1] : undefined

const appUri = appUriArg || appUriEnv

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

  if (countryIsosArg) {
    countryIsos = countryIsosArg.split(',') as Array<CountryIso>
  } else {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const countries = await AreaController.getCountries({ assessment, cycle })
    countryIsos = countries
      .map((country) => country.countryIso)
      .filter((countryIso) => !fraReportSkipAtlantis || !Areas.isAtlantis(countryIso))
  }

  await Promises.each(countryIsos, async (countryIso, index) => {
    const lang = countryLangs[countryIso]
    await generateCountryReport({ countryIso, lang, outputDir: reportsDir })
    Logger.info(`    ${countryIso} (${lang}) (${index + 1}/${countryIsos.length}) generated`)
  })
})
