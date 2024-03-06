import * as pgPromise from 'pg-promise'
import { Promises } from 'utils/promises'

import { AssessmentNames } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'
import { LanguageCodes } from 'meta/lang'
import { Translation } from 'meta/translation'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'

// Don't use transaction when handling DDL
const client: BaseProtocol = DB

// Note: Translations removed from original translation files
const translations: Record<string, Record<string, string>> = {
  ar: {
    fraGeoSpatialTools: ' ادوات الاستشعار عن بعد المخصصة لتقييم الموارد الحرجية',
    reddPortal:
      'منظومات السواتل المخصصة لرصد الأراضي المعززة من قبل مبادرة الأمم المتحدة لخفض الانبعاثات الناجمة عن إزالة الغابات/منظمة الأغذية والزراعة',
    sdgFocalPoints: 'مسؤولو التواصل الوطنيون بخصوص أهداف التنمية المستدامة',
    unfcccFocalPoints: 'مسؤولو التواصل بخصوص اتفاقية الأمم المتحدة الإطارية بشأن تغير المناخ',
  },
  en: {
    fraGeoSpatialTools: 'FRA Geospatial tools',
    reddPortal: 'Satellite Land Monitoring Systems (SLMS), empowered by UN-REDD/FAO',
    sdgFocalPoints: 'National SDG focal points',
    unfcccFocalPoints: 'UNFCCC focal points',
  },
  es: {
    fraGeoSpatialTools: 'Herramientas geoespaciales del FRA',
    reddPortal: 'Sistemas satelitales de monitoreo terrestre habilitados por el Programa ONU-REDD y la FAO',
    sdgFocalPoints: 'Puntos de contacto nacionales para los ODS',
    unfcccFocalPoints: 'Puntos de contacto de la CMNUCC',
  },
  fr: {
    fraGeoSpatialTools: 'Outils géospatiaux de FRA',
    reddPortal: "Systèmes de surveillance des terres par satellite (SSTS), habilité par l'ONU-REDD/FAO",
    sdgFocalPoints: 'Points focaux nationaux pour les ODD',
    unfcccFocalPoints: 'Points focaux de la CCNUCC',
  },
  ru: {
    fraGeoSpatialTools: 'Геопространственные инструменты ОЛР',
    reddPortal: 'Спутниковые системы мониторинга земель (SLMS), предоставленные программой UN-REDD/ФАО',
    sdgFocalPoints: 'Список национальных координаторов ЦУР',
    unfcccFocalPoints: 'Список координаторов РКИКООН',
  },
  zh: {
    fraGeoSpatialTools: 'FRA地理空间工具',
    reddPortal: '卫星地面监测系统 (SLMS)，由UN-REDD/FAO授权',
    sdgFocalPoints: '国家可持续发展目标联络点（人）',
    unfcccFocalPoints: '《气候变化框架公约》联络点（人）',
  },
}

const migrateStaticLinks = async () => {
  const order = ['unfcccFocalPoints', 'sdgFocalPoints', 'reddPortal', 'fraGeoSpatialTools']

  const getLinks = (params: string) => {
    const links = [
      {
        href: 'https://unfccc.int/process/parties-non-party-stakeholders/parties/national-focal-point',
        key: 'unfcccFocalPoints',
      },
      {
        href: `/api/file/sdg-focal-points?${params}`,
        key: 'sdgFocalPoints',
      },
      { href: 'https://slms4redd.org/', key: 'reddPortal' },
      { href: 'https://geofra.users.earthengine.app/view/geofra-dev', key: 'fraGeoSpatialTools' },
    ]
    return links
  }

  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)

  await Promises.each(assessment.cycles, async (cycle) => {
    const assessmentName = assessment.props.name
    const cycleName = cycle.name

    const params = new URLSearchParams({ assessmentName, cycleName, countryIso: 'WO' }).toString()
    const links = getLinks(params)

    const repositoryItems: Array<RepositoryItem> = await Promise.all(
      links.map(async ({ key, href }) => {
        const repositoryItem: RepositoryItem = {
          link: href,
          props: {
            translation: {
              en: '',
            },
          },
        } as RepositoryItem

        const props = LanguageCodes.map((lang) => ({ [lang]: translations[lang][key] }))
        repositoryItem.props.translation = props.reduce<Translation>(
          (acc, val) => Object.assign(acc, val),
          {} as Translation
        )

        return repositoryItem
      })
    )

    repositoryItems.sort((a, b) => order.indexOf(a.link) - order.indexOf(b.link))

    const pgp = pgPromise()
    const schemaCycle = Schemas.getNameCycle(assessment, cycle)
    const columns = ['link', { name: 'props', cast: 'jsonb' }]
    const table = { table: 'repository', schema: schemaCycle }
    const cs = new pgp.helpers.ColumnSet(columns, { table })
    const query = pgp.helpers.insert(repositoryItems, cs)
    await client.query(query)
  })
}

export default async () => {
  // 1. Create new table public.file
  await client.query(`
        create table if not exists public.file
          (
            id         bigserial    not null,
            uuid       uuid         not null default uuid_generate_v4(),
            name       varchar(255) not null,
            file       bytea        not null,
            created_at timestamp    not null default now(),
            primary key (id),
            unique (uuid)
          );
  `)

  // 2. For each assessment/schema, create repository
  const assessments = await AssessmentRepository.getAll({}, client)

  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      await client.query(`
      create table if not exists ${schemaCycle}.repository
      (
          id          bigserial     not null,
          uuid        uuid          not null default uuid_generate_v4(),
          country_iso varchar(3) references public.country (country_iso) on update cascade on delete cascade,
          file_uuid   uuid references public.file (uuid) on update cascade on delete cascade,
          link        varchar(2048),
          props       jsonb         not null,
          primary key (id),
          unique (uuid)
      );
    `)
    })
  )

  // 2.5 migrate static links
  await migrateStaticLinks()

  // 3. Migrate all existing files to new file table
  await client.query(`
      insert into public.file (uuid, name, file)
      select f.uuid, f.file_name, f.file
      from assessment_fra.file f
      order by f.id;
  `)

  const assessmentFRA = assessments.find((assessment) => assessment.props.name === AssessmentNames.fra)
  const cycle2025 = assessmentFRA.cycles.find((cycle) => cycle.name === '2025')
  const cycle2020 = assessmentFRA.cycles.find((cycle) => cycle.name === '2020')

  // 4. Migrate metadata for 2025
  await client.query(`
      insert into ${Schemas.getNameCycle(assessmentFRA, cycle2025)}.repository (country_iso, file_uuid, props)
      select country_iso, uuid, props || jsonb_build_object('translation', jsonb_build_object('en', file_name))
      from assessment_fra.file
      order by id;
  `)

  // 5. Migrate metadata for 2020
  await client.query(`
      insert into ${Schemas.getNameCycle(assessmentFRA, cycle2020)}.repository (country_iso, file_uuid, props)
      select r.country_iso,
             f.uuid,
              props || jsonb_build_object('translation', jsonb_build_object('en', f.name))
      
      from _legacy.repository r
               inner join public.file f on r.file_name = f.name
               left join assessment_fra.file af using (uuid)
      order by r.id
  `)

  // 6. Drop unused tables
  await Promises.each(assessments, (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      await client.query(`
            drop table if exists ${schemaCycle}.file;
        `)
    })
  )
}
