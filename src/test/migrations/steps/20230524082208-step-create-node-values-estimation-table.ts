import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)

  const schemaAssessment = Schemas.getName(assessment)
  await Promise.all(
    assessment.cycles.map((cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)

      return DB.query(`
          create table ${schemaCycle}.node_values_estimation
          (
              id          bigserial                       not null
                  constraint node_values_estimation_pk
                      primary key,
              uuid        uuid default uuid_generate_v4() not null,
              country_iso varchar(3)                      not null
                  constraint node_values_estimation_country_fk
                      references country (country_iso)
                      on update cascade on delete cascade,
              table_uuid  uuid                            not null
                  constraint node_values_estimation_table_fk
                      references ${schemaAssessment}."table" (uuid)
                      on update cascade on delete cascade,
              method      varchar(255)                    not null,
              variables   jsonb                           not null,
              unique (uuid)
          );
      `)
    })
  )
}
