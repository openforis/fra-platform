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

// This is used in Global => navigation => Bulk Download
const exportPublicData = async () => {
  const countriesAll = await CountryService.getAllCountriesList()
  const countries = R.reject(R.propEq('region', 'atlantis'), countriesAll)

  const fraYearsOutput = FRAYearsExporter.getCsvOutput(true)
  const intervalsOutput = IntervalYearsExporter.getCsvOutput()
  const annualOutput = AnnualYearsExporter.getCsvOutput(true)

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

  return {
    ...fraYearsOutput.output,
    ...intervalsOutput.output,
    ...annualOutput.output,
  }
}

const exportData = async (exportType = EXPORT_TYPE.JSON) => {
  const countriesAll = await CountryService.getAllCountriesList()
  const countries = R.reject(R.propEq('region', 'atlantis'), countriesAll)

  const isExportTypeJson = exportType === EXPORT_TYPE.JSON

  const fraYearsOutput = isExportTypeJson ? new JSONOutput('fraYears') : FRAYearsExporter.getCsvOutput()
  const intervalsOutput = isExportTypeJson ? new JSONOutput('intervals') : IntervalYearsExporter.getCsvOutput()
  const annualOutput = isExportTypeJson ? new JSONOutput('annual') : AnnualYearsExporter.getCsvOutput()
  const ndpOutput = isExportTypeJson ? new JSONOutput('ndp') : NdpExporter.getCsvOutput()
  const nwfpOutput = isExportTypeJson ? new JSONOutput('nwfp') : NwfpExporter.getCsvOutput()
  const gscompOutput = isExportTypeJson ? new JSONOutput('gscomp') : GSCompExporter.getCsvOutput()
  const sdgOutput = isExportTypeJson ? new JSONOutput('sdg') : SDGExporter.getCsvOutput()

  await Promise.each(
    countries.map(
      async (country) =>
        await Promise.all([
          FRAYearsExporter.getCountryData(country),
          IntervalYearsExporter.getCountryData(country),
          AnnualYearsExporter.getCountryData(country),
          NdpExporter.getCountryData(country),
          NwfpExporter.getCountryData(country),
          GSCompExporter.getCountryData(country),
          SDGExporter.getCountryData(country),
        ])
    ),

    ([fraYearsRes, intervalsRes, annualRes, ndps, nwfp, gsComp, sdg], idx) => {
      fraYearsOutput.pushContent(fraYearsRes, idx)
      intervalsOutput.pushContent(intervalsRes)
      annualOutput.pushContent(annualRes, idx)
      ndpOutput.pushContent(ndps)
      nwfpOutput.pushContent(nwfp)
      gscompOutput.pushContent(gsComp)
      sdgOutput.pushContent(sdg)
    }
  )

  fraYearsOutput.pushContentDone()
  intervalsOutput.pushContentDone()
  annualOutput.pushContentDone()
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

module.exports = {
  EXPORT_TYPE,

  exportData,
  exportPublicData,
}
