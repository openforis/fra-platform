import { createI18nPromise } from '@common/i18n/i18nFactory'
import * as Promise from 'bluebird'
import { CountryService } from '@server/service'
import * as FRAYearsExporter from './fraYears/fraYearsExporter'
import * as IntervalYearsExporter from './intervals/intervalYearsExporter'
import * as AnnualYearsExporter from './annual/annualYearsExporter'
import * as NdpExporter from './ndp/ndpExporter'
import * as NwfpExporter from './nwfpAndGSComp/nwfpExporter'
import * as GSCompExporter from './nwfpAndGSComp/gscompExporter'
import * as SDGExporter from './sdg/sdgExporter'

// if excludeSubFolders flag is true, only return fra years, intervals and annualoutput without subfolders
export const exportData = async (includeVariableFolders = true) => {
  const i18n = await createI18nPromise('en')
  const countriesAll = await CountryService.getAllCountriesList()
  const countriesFiltered = countriesAll.filter(({ countryIso }: any) => !countryIso.match(/X\d\d/))
  // list_name_en has been removed from database country table but it is still used in exports/csv
  const countries = countriesFiltered.map((country: any) => ({
    ...country,
    listNameEn: (i18n as any).t(`area.${country.countryIso}.listName`),
    regionCodes: country.regionCodes.map((region: any) => (i18n as any).t(`area.${region}.listName`)).join(', '),
  }))

  const fraYearsOutput = FRAYearsExporter.getCsvOutput(includeVariableFolders)
  const intervalsOutput = IntervalYearsExporter.getCsvOutput()
  const annualOutput = AnnualYearsExporter.getCsvOutput(includeVariableFolders)
  let ndpOutput: any
  let nwfpOutput: any
  let gscompOutput: any
  let sdgOutput: any
  if (includeVariableFolders) {
    ndpOutput = NdpExporter.getCsvOutput()
    nwfpOutput = NwfpExporter.getCsvOutput()
    gscompOutput = GSCompExporter.getCsvOutput()
    sdgOutput = SDGExporter.getCsvOutput()
  }
  await (Promise as any).each(
    countries.map(
      async (country: any) =>
        await Promise.all([
          FRAYearsExporter.getCountryData(country),
          IntervalYearsExporter.getCountryData(country),
          AnnualYearsExporter.getCountryData(country),
        ])
    ),
    ([fraYearsRes, intervalsRes, annualRes]: any[], idx: any) => {
      fraYearsOutput.pushContent(fraYearsRes, idx)
      intervalsOutput.pushContent(intervalsRes)
      annualOutput.pushContent(annualRes, idx)
    }
  )
  fraYearsOutput.pushContentDone()
  intervalsOutput.pushContentDone()
  annualOutput.pushContentDone()
  if (includeVariableFolders) {
    await (Promise as any).each(
      countries.map(
        async (country: any) =>
          await Promise.all([
            NdpExporter.getCountryData(country),
            NwfpExporter.getCountryData(country),
            GSCompExporter.getCountryData(country),
            SDGExporter.getCountryData(country),
          ])
      ),
      ([ndps, nwfp, gsComp, sdg]: any[]) => {
        ndpOutput.pushContent(ndps)
        nwfpOutput.pushContent(nwfp)
        gscompOutput.pushContent(gsComp)
        sdgOutput.pushContent(sdg)
      }
    )
    ndpOutput.pushContentDone()
    nwfpOutput.pushContentDone()
    gscompOutput.pushContentDone()
    sdgOutput.pushContentDone()
    return {
      ...fraYearsOutput.output,
      ...intervalsOutput.output,
      ...annualOutput.output,
      ...ndpOutput.output,
      ...nwfpOutput.output,
      ...gscompOutput.output,
      ...sdgOutput.output,
    }
  }
  return {
    ...fraYearsOutput.output,
    ...intervalsOutput.output,
    ...annualOutput.output,
  }
}
export default {
  exportData,
}
