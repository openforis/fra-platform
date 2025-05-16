// localhost:9000/api/cycle-data/print/report?assessmentName=fra&cycleName=2025&countryIso=FIN&lang=en
import '../scriptInit'

import * as fs from 'fs/promises'
import * as path from 'path'
import { CSV } from 'tools/utils/CSV'
import { ToolsUtils } from 'tools/utils/toolsUtils'
import { Dates } from 'utils/dates'
import { Promises } from 'utils/promises'

import { Areas, CountryIso } from 'meta/area'
import { Lang } from 'meta/lang'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { PdfReport } from 'server/service/pdfReport'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

const { appUri: appUriEnv, fraAuthToken, fraReportAssessment, fraReportCycle, fraReportSkipAtlantis } = ProcessEnv
const assessmentName = fraReportAssessment
const cycleName = fraReportCycle
const cookies = { 'fra-auth-token': fraAuthToken }

// Parse --countryIso from CLI args
const argCountryIso = process.argv.find((arg) => arg.startsWith('--countryIso='))
const countryIsoArg = argCountryIso ? argCountryIso.split('=')[1] : undefined

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

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

  if (countryIsoArg) {
    const lang = countryLangs[countryIsoArg as CountryIso]
    Logger.info(`Generating report for countryIso: ${countryIsoArg}, lang: ${lang}`)
    await generateCountryReport({ countryIso: countryIsoArg as CountryIso, lang, outputDir: reportsDir })
    Logger.info(`    ${countryIsoArg} (${lang}) generated`)
  } else {
    const countries = await AreaController.getCountries({ assessment, cycle })
    await Promises.each(countries, async (country, index) => {
      const { countryIso } = country
      if (!fraReportSkipAtlantis || !Areas.isAtlantis(countryIso)) {
        const lang = countryLangs[countryIso]
        await generateCountryReport({ countryIso, lang, outputDir: reportsDir })
        Logger.info(`    ${countryIso} (${lang}) (${index + 1}/${countries.length}) generated`)
      } else {
        Logger.info(`    ${countryIso} (${index + 1}/${countries.length}) skipped`)
      }
    })
  }
})
