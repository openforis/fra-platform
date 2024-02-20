import { Objects } from 'utils/objects'

import { AssessmentName, Cycle, CycleName, CycleUuid, SectionName, SubSectionHints } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

const hints: Record<AssessmentName, Record<CycleName, Record<SectionName, Array<keyof SubSectionHints>>>> = {
  fra: {
    '2020': {
      extentOfForest: ['definitions', 'faqs'],
      forestCharacteristics: ['definitions', 'faqs'],
      specificForestCategories: ['definitions', 'faqs'],
    },
    '2025': {
      extentOfForest: ['definitions', 'faqs'],
      forestCharacteristics: ['definitions', 'faqs'],
      specificForestCategories: ['definitions', 'faqs'],
    },
  },
}

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promise.all(
    assessments.map(async (assessment) => {
      const schemaAssessment = Schemas.getName(assessment)
      const cycles = assessment.cycles.reduce<Record<CycleUuid, Cycle>>(
        (acc, cycle) => ({ ...acc, [cycle.uuid]: cycle }),
        {}
      )

      // 1. select all sub sections
      const sections = await client.map<{ id: number; cycles: Array<string>; name: string }>(
        `
            select s.id, s.props ->> 'name' as name, s.props -> 'cycles' as cycles
            from ${schemaAssessment}.section s
            where s.parent_id is not null
        `,
        [],
        (r) => Objects.camelize(r)
      )

      await Promise.all(
        sections.map(async (section) => {
          // build the hints if available
          const cycleHints = section.cycles
            .map<string | undefined>((cycleUuid) => {
              const cycle = cycles[cycleUuid]
              const sectionHints = hints[assessment.props.name]?.[cycle.name]?.[section.name]
              if (sectionHints) {
                return `'${cycleUuid}',
                   jsonb_build_object(${sectionHints.map((s) => `'${s}', true`).join(', ')})`
              }
              return undefined
            })
            .filter((s) => !!s)

          // push the update query if hints are available
          if (cycleHints.length) {
            const query = `
            update ${schemaAssessment}.section s
            set props = props
                || jsonb_build_object(
                                'hints',
                                jsonb_build_object(${cycleHints.join(`,
                                `)})
                   )
            where s.id = ${section.id}
        `
            await client.query(query)
          }
        }, [])
      )

      // update metadata cache
      await AssessmentController.generateMetadataCache({ assessment }, client)
    })
  )
}
