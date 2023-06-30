import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)

  await Promise.all(
    assessment.cycles.map((cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)

      return DB.query(`
          alter table ${schemaCycle}.node_values_estimation
              add created_at timestamp with time zone default now() not null;

          update ${schemaCycle}.node_values_estimation e
          set created_at = a.time
          from (select e.id, al.time
                from ${schemaCycle}.node_values_estimation e
                         left join activity_log al
                                   on al.message = 'nodeValuesEstimationCreate'
                                       and e.country_iso = al.country_iso
                                       and (al.target ->> 'uuid')::uuid = e.uuid) a
          where e.id = a.id
          ;
      `)
    })
  )
}
