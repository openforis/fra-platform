// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
const Promise = require('bluebird')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'createI18n... Remove this comment to see the full error message
const { createI18nPromise } = require('../../../common/i18n/i18nFactory')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'CountrySer... Remove this comment to see the full error message
const CountryService = require('../../country/countryService')
const FRAYearsExporter = require('./fraYears/fraYearsExporter')
const IntervalYearsExporter = require('./intervals/intervalYearsExporter')
const AnnualYearsExporter = require('./annual/annualYearsExporter')
const NdpExporter = require('./ndp/ndpExporter')
const NwfpExporter = require('./nwfpAndGSComp/nwfpExporter')
const GSCompExporter = require('./nwfpAndGSComp/gscompExporter')
const SDGExporter = require('./sdg/sdgExporter')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'JSONOutput... Remove this comment to see the full error message
const JSONOutput = require('./jsonOutput')

const EXPORT_TYPE = {
  JSON: 'json',
  CSV: 'csv',
}
// if excludeSubFolders flag is true, only return fra years, intervals and annualoutput without subfolders
const exportData = async (exportType = EXPORT_TYPE.JSON, includeVariableFolders = true) => {
  const i18n = await createI18nPromise('en')
  const countriesAll = await CountryService.getAllCountriesList()
  const countriesFiltered = R.reject(R.propEq('region', 'atlantis'), countriesAll)
  // list_name_en has been removed from database country table but it is still used in exports/csv
  const countries = countriesFiltered.map((country: any) => ({
    ...country,
    listNameEn: (i18n as any).t(`area.${country.countryIso}.listName`),
    regionCodes: country.regionCodes.map((region: any) => (i18n as any).t(`area.${region}.listName`)).join(', '),
  }))
  const isExportTypeJson = exportType === EXPORT_TYPE.JSON
  const fraYearsOutput = isExportTypeJson
    ? new JSONOutput('fraYears')
    : FRAYearsExporter.getCsvOutput(includeVariableFolders)
  const intervalsOutput = isExportTypeJson ? new JSONOutput('intervals') : IntervalYearsExporter.getCsvOutput()
  const annualOutput = isExportTypeJson
    ? new JSONOutput('annual')
    : AnnualYearsExporter.getCsvOutput(includeVariableFolders)
  let ndpOutput: any
  let nwfpOutput: any
  let gscompOutput: any
  let sdgOutput: any
  if (includeVariableFolders) {
    ndpOutput = isExportTypeJson ? new JSONOutput('ndp') : NdpExporter.getCsvOutput()
    nwfpOutput = isExportTypeJson ? new JSONOutput('nwfp') : NwfpExporter.getCsvOutput()
    gscompOutput = isExportTypeJson ? new JSONOutput('gscomp') : GSCompExporter.getCsvOutput()
    sdgOutput = isExportTypeJson ? new JSONOutput('sdg') : SDGExporter.getCsvOutput()
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
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'fraYearsRes' implicitly has an 'a... Remove this comment to see the full error message
    ([fraYearsRes, intervalsRes, annualRes], idx: any) => {
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
      // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'ndps' implicitly has an 'any' typ... Remove this comment to see the full error message
      ([ndps, nwfp, gsComp, sdg]) => {
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
module.exports = {
  EXPORT_TYPE,
  exportData,
}
