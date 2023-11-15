import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { CountryIso } from 'meta/area'
import { AssessmentNames } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { DataRedisRepository } from 'server/repository/redis/data'

const facilityCategory: Record<string, string> = {
  notSelected: '',
  accommodationFacilities: '1 Accommodation facilities (mountain hotels, cottages, apartments)',
  campingSites: '2 Camping sites',
  overnightShelters: '3 Overnight shelters',
  picnicSites: '4 Picnic sites',
  natureSchools: '5 Nature schools',
  sitesForNatureStudying:
    '6 Sites for nature studying (educational walkways, nature exhibitions, protected sites, geological localities, sites of cultural heritage, famous trees …)',
  birdAndWildlifeWatchingLocalities: '7 Bird and wildlife watching localities',
  cablewaysAndLifts: '8 Cableways and lifts',
  parkingLots: '9 Parking lots',
  otherFacilities: '10 Other facilities',
}
const facilityCategoryInverse: Record<string, string> = {
  ...Object.fromEntries(Object.entries(facilityCategory).map(([k, v]) => [v, k])),
  // custom fix
  '6 Sites for nature studying': 'sitesForNatureStudying',
}

const tableName = 'table_6_10d'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.panEuropean, cycleName: '2025' },
    client
  )
  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const nodes = await client.map<NodeUpdate & { countryIso: CountryIso; id: number }>(
    `
        select t.props ->> 'name'         as table_name,
               r.props ->> 'variableName' as variable_name,
               c.props ->> 'colName'      as col_name,
               n.id,
               n.country_iso,
               n.value
        from ${schemaCycle}.node n
                 left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
                 left join ${schemaAssessment}.row r on r.id = c.row_id
                 left join ${schemaAssessment}."table" t on t.id = r.table_id
        where t.props ->> 'name' = '${tableName}'
--   and r.props ->> 'variableName' is not null
          and c.props ->> 'colName' in ('facility_category')
          and n.value ->> 'raw' is not null
          and n.value ->> 'raw' not in (${Object.keys(facilityCategory)
            .map((n) => `'${n}'`)
            .join(', ')});
    `,
    [],
    (res) => Objects.camelize(res)
  )

  const nodesWrongValue = nodes.filter((node) => !facilityCategory[node.value.raw])

  await client.query(
    nodesWrongValue.map<string>(
      (node) => `
          update ${schemaCycle}.node n
          set value =  jsonb_build_object('raw', '${facilityCategoryInverse[node.value.raw]}')
          where n.id = ${node.id}
      `
    ).join(`;
  `)
  )

  const countryISOs = Array.from(new Set(nodesWrongValue.map((n) => n.countryIso)))
  await Promises.each(countryISOs, (countryIso) =>
    DataRedisRepository.cacheCountryTable({ assessment, cycle, countryIso, tableName, force: true })
  )
}
