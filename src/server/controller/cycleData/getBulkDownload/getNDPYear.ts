import { createI18nPromise } from 'i18n/i18nFactory'
import { TFunction } from 'i18next'
import { Promises } from 'utils/promises'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { ODPDataSourceMethod } from 'meta/assessment/originalDataPoint'
import { RecordAssessmentDatas } from 'meta/data'

import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'

import { climaticDomain } from './climaticDomain'
import { getClimaticValue } from './getClimaticValue'
import { getData } from './getData'
import { Props } from './props'

const METHODS = Object.values(ODPDataSourceMethod)

const getMethodKey = (method: ODPDataSourceMethod, t: TFunction) =>
  method === ODPDataSourceMethod.other ? t('common.other') : t(`nationalDataPoint.dataSourceMethodsOptions.${method}`)

const getValue = async (props: {
  base: Record<string, string>
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  t: TFunction
}): Promise<Record<string, string>> => {
  const { base, assessment, cycle, countryIso, t } = props
  const years = await OriginalDataPointRepository.getReservedYears({ assessment, cycle, countryIso })

  const yearKey = t('bulkDownload.NDPYear.year')
  const year = years.length ? Math.max(...years.map(({ year }) => year)) : null
  base[yearKey] = year ? String(year) : null

  const originalDataPoint = year
    ? await OriginalDataPointRepository.getOne({ assessment, cycle, countryIso, year: String(year) })
    : null

  METHODS.forEach((method) => {
    const key = getMethodKey(method, t)
    base[key] = originalDataPoint
      ? t(`yesNoTextSelect.${originalDataPoint.dataSourceMethods?.includes(method) ? 'yes' : 'no'}`)
      : null
  })

  return base
}

export const getNDPYear = async (props: Props) => {
  const { assessment, cycle, countries } = props
  const { t } = await createI18nPromise('en')

  const climaticData = RecordAssessmentDatas.getCycleData({
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
    data: await climaticDomain(props),
  })

  const tableData = await getData({
    assessment,
    cycle,
    countries,
    tableNames: ['extentOfForest'],
  })
  const result: Array<Record<string, string>> = []

  await Promises.each(countries, async ({ countryIso, regionCodes }) => {
    const base: Record<string, string> = {
      regions: regionCodes.join(';'),
      iso3: countryIso,
      name: countryIso,
      boreal: getClimaticValue('boreal', countryIso, climaticData),
      temperate: getClimaticValue('temperate', countryIso, climaticData),
      tropical: getClimaticValue('tropical', countryIso, climaticData),
      subtropical: getClimaticValue('sub_tropical', countryIso, climaticData),
      [`forest area ${cycle.name}`]: RecordAssessmentDatas.getDatum({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        data: tableData,
        countryIso,
        tableName: 'extentOfForest',
        variableName: 'forestArea',
        colName: cycle.name,
      }),
    }

    const value = await getValue({ base, assessment, cycle, countryIso, t })
    result.push(value)
  })

  return result
}
