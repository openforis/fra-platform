import * as fs from 'fs'
import * as path from 'path'
import * as util from 'util'
import { createI18nPromise } from '@i18n/i18nFactory'
import { Response } from 'express'
import * as JSZip from 'jszip'

import { CycleRequest } from '@meta/api/request'
import { Areas, CountryIso, RegionCode } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'

import { AssessmentController } from '@server/controller/assessment'
import { BaseProtocol, DB, Schemas } from '@server/db'
import { Requests } from '@server/utils'

const convertToCSV = (arr: string[]): string => {
  return [Object.keys(arr[0])]
    .concat(arr)
    .map((it) => Object.values(it).toString())
    .join('\n')
}

// Zip contents:
// FRA_Years_2022_09_07.csv
// Annual_2022_09_07.csv
// Intervals_2022_09_07.csv
// README.md
const getAnnualData = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<any> => {
  const { assessment, cycle } = props
  const i18n = await createI18nPromise('en')
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const _translate = (key: string) => i18n.t<string>(Areas.getTranslationKey(key as RegionCode | CountryIso))
  const _handleRegions = (regions: string): string => {
    return regions.split(';').map(_translate).join(', ')
  }

  return client.map<any>(
    `
        with disturbances as (select country_iso,
                                     col_name                                                                        as year,
            max(case when variable_name = 'insects' then value ->> 'raw' end)               as "insects",
            max(case when variable_name = 'diseases' then value ->> 'raw' end)              as "diseases",
            max(case when variable_name = 'other' then value ->> 'raw' end)                 as "other",
            max(case when variable_name = 'severe_weather_events' then value ->> 'raw' end) as "severe_weather_events"
        from ${schemaCycle}.disturbances
        where variable_name in ('diseases', 'insects', 'other', 'severe_weather_events')
        group by 1, 2),
            fire as (select country_iso,
            col_name                                                                                   as year,
            max(case when variable_name = 'of_which_on_forest' then value ->> 'raw' end)               as "of_which_on_forest",
            max(case
            when variable_name = 'total_land_area_affected_by_fire'
            then value ->> 'raw' end)                                                      as "total_land_area_affected_by_fire"
        from ${schemaCycle}.areaaffectedbyfire
        where variable_name in ('total_land_area_affected_by_fire', 'of_which_on_forest')
        group by 1, 2),
            climaticdomain as (select country_iso,
            max(case when variable_name = 'boreal' then value ->> 'raw' end)       as "boreal",
            max(case when variable_name = 'sub_tropical' then value ->> 'raw' end) as "sub_tropical",
            max(case when variable_name = 'temperate' then value ->> 'raw' end)    as "temperate",
            max(case when variable_name = 'tropical' then value ->> 'raw' end)     as "tropical"
        from ${schemaCycle}.climaticdomain
        group by country_iso),
            _regions as (select cr.country_iso, array_to_string(ARRAY_AGG(distinct cr.region_code), ';') as regions
        from ${schemaCycle}.country_region cr
        group by cr.country_iso),
            _years as (
        select t1.*, t2.*
        from
            (
            select d.year from disturbances d
            union
            select f.year from fire f
            order by 1
            ) as t1
            full join
            (select c.* from country as c) as t2
        on true
        order by 2, 1
            )
        select r.regions,
               cc.country_iso,
               y.year,
               boreal,
               temperate,
               tropical,
               sub_tropical,
               insects                          as "5a_insect",
               diseases                         as "5a_diseases",
               severe_weather_events            as "5a_weather",
               other                            as "5a_other",
               total_land_area_affected_by_fire as "5b_fire_land",
               of_which_on_forest               as "5b_fire_forest"
        from ${schemaCycle}.country cc
                 join _regions r using (country_iso)
                 join _years y using (country_iso)
                 join climaticdomain c using (country_iso)
                 left join disturbances d using (country_iso, year)
                 left join fire f using (country_iso, year)


    `,
    [],
    // eslint-disable-next-line camelcase
    ({ regions, country_iso, ...row }) => ({
      regions: _handleRegions(regions),
      // eslint-disable-next-line camelcase
      iso3: country_iso,
      name: _translate(country_iso),
      ...row,
    })
  )
}

const getIntervalData = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<any> => {
  const { assessment, cycle } = props
  const i18n = await createI18nPromise('en')
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const _translate = (key: string) => i18n.t<string>(Areas.getTranslationKey(key as RegionCode | CountryIso))
  const _handleRegions = (regions: string): string => {
    return `"${regions.split(';').map(_translate).join(', ')}"`
  }

  return client.map<any>(
    `
    with annualreforestation as (select country_iso,
                             col_name                                                                        as year,
                             max(case when variable_name = 'reforestation' then value ->> 'raw' end)               as "reforestation"
                      from ${schemaCycle}.annualreforestation
                      where variable_name in ('reforestation')
                      group by 1, 2),
     forestareachange as (select country_iso,
                     col_name                                                                                   as year,
                     max(case when variable_name = 'forest_expansion' then value ->> 'raw' end)               as "forest_expansion",
                     max(case when variable_name = 'afforestation' then value ->> 'raw' end)               as "afforestation",
                     max(case when variable_name = 'natural_expansion' then value ->> 'raw' end)               as "natural_expansion",
                     max(case when variable_name = 'deforestation' then value ->> 'raw' end)               as "deforestation"
              from ${schemaCycle}.areaaffectedbyfire
              where variable_name in ('afforestation', 'deforestation', 'forest_expansion', 'natural_expansion')
              group by 1, 2),
     climaticdomain as (select country_iso,
                               max(case when variable_name = 'boreal' then value ->> 'raw' end)       as "boreal",
                               max(case when variable_name = 'sub_tropical' then value ->> 'raw' end) as "sub_tropical",
                               max(case when variable_name = 'temperate' then value ->> 'raw' end)    as "temperate",
                               max(case when variable_name = 'tropical' then value ->> 'raw' end)     as "tropical"
                        from ${schemaCycle}.climaticdomain
                        group by country_iso),
     _regions as (select cr.country_iso, array_to_string(ARRAY_AGG(distinct cr.region_code), ';') as regions
                  from ${schemaCycle}.country_region cr
                  group by cr.country_iso),
     _years as (
         select t1.*, t2.*
         from
             (
                 select fac.year from forestareachange fac
                 union
                 select ar.year from annualreforestation ar
                 order by 1
             ) as t1
                 full join
             (select c.* from country as c) as t2
             on true
         order by 2, 1
     )
select r.regions,
       cc.country_iso,
       y.year,
       boreal,
       temperate,
       tropical,
       sub_tropical,
       forest_expansion as "1d_expansion",
       afforestation as "1d_afforestation",
       natural_expansion as "1d_nat_exp",
       deforestation as "1d_deforestation",
        reforestation as "1e_reforestation"
from ${schemaCycle}.country cc
         join _regions r using (country_iso)
         join _years y using (country_iso)
         join climaticdomain c using (country_iso)
         left join annualreforestation ar using (country_iso, year)
         left join forestareachange fac using (country_iso, year)
    `,
    [],
    // eslint-disable-next-line camelcase
    ({ regions, country_iso, ...row }) => ({
      regions: _handleRegions(regions),
      // eslint-disable-next-line camelcase
      iso3: country_iso,
      name: _translate(country_iso),
      ...row,
    })
  )
}

const getFraYearsData = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<any> => {
  const { assessment, cycle } = props
  const i18n = await createI18nPromise('en')
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const _translate = (key: string) => i18n.t<string>(Areas.getTranslationKey(key as RegionCode | CountryIso))
  const _handleRegions = (regions: string): string => {
    return `"${regions.split(';').map(_translate).join(', ')}"`
  }

  return client.map<any>(
    `
with extentofforest as (select country_iso,
                                    col_name                                                                        as year,
                                    max(case when variable_name = 'forestArea' then value ->> 'raw' end)               as forestArea,
                                    max(case when variable_name = 'otherWoodedLand' then value ->> 'raw' end)               as otherWoodedLand,
                                    max(case when variable_name = 'totalLandArea' then value ->> 'raw' end)               as totalLandArea
                             from ${schemaCycle}.extentofforest
                             where variable_name in ('forestArea', 'otherWoodedLand', 'totalLandArea' )
                             group by 1, 2),
     forestcharacteristics as (select country_iso,
                                 col_name                                                                                   as year,
                                 max(case when variable_name = 'naturalForestArea' then value ->> 'raw' end)               as naturalForestArea,
                                 max(case when variable_name = 'plantedForest' then value ->> 'raw' end)               as plantedForest,
                                 max(case when variable_name = 'plantationForestArea' then value ->> 'raw' end)               as plantationForestArea
                          from ${schemaCycle}.forestcharacteristics
                          where variable_name in ('naturalForestArea', 'plantedForest', 'plantationForestArea' )
                          group by 1, 2),
     climaticdomain as (select country_iso,
                               max(case when variable_name = 'boreal' then value ->> 'raw' end)       as "boreal",
                               max(case when variable_name = 'sub_tropical' then value ->> 'raw' end) as "sub_tropical",
                               max(case when variable_name = 'temperate' then value ->> 'raw' end)    as "temperate",
                               max(case when variable_name = 'tropical' then value ->> 'raw' end)     as "tropical"
                        from ${schemaCycle}.climaticdomain
                        group by country_iso),
     _regions as (select cr.country_iso, array_to_string(ARRAY_AGG(distinct cr.region_code), ';') as regions
                  from ${schemaCycle}.country_region cr
                  group by cr.country_iso),
     _years as (
         select t1.*, t2.*
         from
             (
                 select fc.year from forestcharacteristics fc
                 union
                 select eof.year from extentofforest eof
                 order by 1
             ) as t1
                 full join
             (select c.* from country as c) as t2
             on true
         where year in ('1990', '2000', '2010', '2015', '2020')
         order by 2, 1
     )
select r.regions,
       cc.country_iso,
       y.year,
       boreal,
       temperate,
       tropical,
       sub_tropical,
       forestArea as "1a_forestArea",
       otherWoodedLand as "1a_otherWoodedLand",
       totalLandArea as "1a_landArea",
       naturalForestArea as "1b_naturallyRegeneratingForest",
       plantedForest as "1b_plantedForest",
    plantationForestArea as "1b_plantationForest"
from ${schemaCycle}.country cc
         join _regions r using (country_iso)
         join _years y using (country_iso)
         join climaticdomain c using (country_iso)
         left join extentofforest eof using (country_iso, year)
         left join forestcharacteristics fc using (country_iso, year)


    `,
    [],
    // eslint-disable-next-line camelcase
    ({ regions, country_iso, ...row }) => ({
      regions: _handleRegions(regions),
      // eslint-disable-next-line camelcase
      iso3: country_iso,
      name: _translate(country_iso),
      ...row,
    })
  )
}

type ContentType = {
  fileName: string
  content: string
}

const getFileName = (name: string): string => {
  const date = new Date()

  const timestamp = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`

  return `${name}_${timestamp}.csv`
}

const getAnnualContent = async (props: { assessment: Assessment; cycle: Cycle }): Promise<ContentType> => {
  const content = await getAnnualData(props)

  return {
    fileName: getFileName('Annual'),
    content: convertToCSV(content),
  }
}

const getIntervalContent = async (props: { assessment: Assessment; cycle: Cycle }): Promise<ContentType> => {
  const content = await getIntervalData(props)

  return {
    fileName: getFileName('Interval'),
    content: convertToCSV(content),
  }
}

const getFraYearsContent = async (props: { assessment: Assessment; cycle: Cycle }): Promise<ContentType> => {
  const content = await getFraYearsData(props)

  return {
    fileName: getFileName('FRA_Years'),
    content: convertToCSV(content),
  }
}

export const getBulkDownload = async (req: CycleRequest, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    if (!cycle.published) {
      Requests.sendErr(res)
    }

    const files = await Promise.all([
      getAnnualContent({
        assessment,
        cycle,
      }),
      getIntervalContent({
        assessment,
        cycle,
      }),
      getFraYearsContent({
        assessment,
        cycle,
      }),
    ])

    const zip = new JSZip()
    // Include README.txt in the zipfile
    const readFile = util.promisify(fs.readFile)
    const readmeFileName = 'README.txt'
    const readmeContent = await readFile(
      path.resolve(__dirname, '..', '..', 'static', 'dataExport', `./${readmeFileName}`)
    )
    zip.file(readmeFileName, readmeContent)
    files.forEach(({ fileName, content }) => zip.file(fileName, content))
    zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true }).pipe(res).on('finish', res.end)
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
