const R = require('ramda')
const Promise = require('bluebird')

const CountryService = require('../../country/countryService')

const FRAYearsExporter = require('./fraYears/fraYearsExporter')
const IntervalYearsExporter = require('./intervals/intervalYearsExporter')
const AnnualYearsExporter = require('./annual/annualYearsExporter')
const NdpExporter = require('./ndp/ndpExporter')
const NwfpExporter = require('./nwfpAndGSComp/nwfpExporter')
const GSCompExporter = require('./nwfpAndGSComp/gscompExporter')
const SDGExporter = require('./sdg/sdgExporter')

const JSONOutput = require('./jsonOutput')

const EXPORT_TYPE = {
  JSON: 'json',
  CSV: 'csv',
}

// if excludeSubFolders flag is true, only return fra years, intervals and annualoutput without subfolders
const exportData = async (exportType = EXPORT_TYPE.JSON, includeVariableFolders = true) => {
  const countriesAll = await CountryService.getAllCountriesList()
  const countries = R.reject(R.propEq('region', 'atlantis'), countriesAll)

  const isExportTypeJson = exportType === EXPORT_TYPE.JSON

  const fraYearsOutput = isExportTypeJson
    ? new JSONOutput('fraYears')
    : FRAYearsExporter.getCsvOutput(includeVariableFolders)
  const intervalsOutput = isExportTypeJson ? new JSONOutput('intervals') : IntervalYearsExporter.getCsvOutput()
  const annualOutput = isExportTypeJson
    ? new JSONOutput('annual')
    : AnnualYearsExporter.getCsvOutput(includeVariableFolders)

  let ndpOutput
  let nwfpOutput
  let gscompOutput
  let sdgOutput

  if (includeVariableFolders) {
    ndpOutput = isExportTypeJson ? new JSONOutput('ndp') : NdpExporter.getCsvOutput()
    nwfpOutput = isExportTypeJson ? new JSONOutput('nwfp') : NwfpExporter.getCsvOutput()
    gscompOutput = isExportTypeJson ? new JSONOutput('gscomp') : GSCompExporter.getCsvOutput()
    sdgOutput = isExportTypeJson ? new JSONOutput('sdg') : SDGExporter.getCsvOutput()
  }

  await Promise.each(
    countries.map(
      async (country) =>
        await Promise.all([
          FRAYearsExporter.getCountryData(country),
          IntervalYearsExporter.getCountryData(country),
          AnnualYearsExporter.getCountryData(country),
        ])
    ),

    ([fraYearsRes, intervalsRes, annualRes], idx) => {
      fraYearsOutput.pushContent(fraYearsRes, idx)
      intervalsOutput.pushContent(intervalsRes)
      annualOutput.pushContent(annualRes, idx)
    }
  )

  fraYearsOutput.pushContentDone()
  intervalsOutput.pushContentDone()
  annualOutput.pushContentDone()

  if (includeVariableFolders) {
    await Promise.each(
      countries.map(
        async (country) =>
          await Promise.all([
            NdpExporter.getCountryData(country),
            NwfpExporter.getCountryData(country),
            GSCompExporter.getCountryData(country),
            SDGExporter.getCountryData(country),
          ])
      ),

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
