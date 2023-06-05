import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

const base = {
  comments: true,
  analysisAndProcessing: {
    reclassification: true,
    estimationAndForecasting: true,
  },
}

const description2020 = {
  ...base,

  nationalData: {
    dataSources: {
      text: {
        readOnly: false,
      },
    },
    originalData: true,
    nationalClassification: true,
  },
}
const variables: Record<string, any> = {
  extentOfForest: [
    {
      label: {
        key: 'extentOfForest.forestArea',
      },
      variableName: 'forestArea',
    },
    {
      label: {
        key: 'fraClass.otherWoodedLand',
      },
      variableName: 'otherWoodedLand',
    },
  ],
  forestCharacteristics: [
    {
      label: {
        key: 'fra.forestCharacteristics.naturalForestArea2025',
      },
      variableName: 'naturalForestArea',
    },
    {
      label: {
        key: 'fra.forestCharacteristics.primaryForest',
      },
      variableName: 'primaryForest',
    },
    {
      label: {
        key: 'fra.forestCharacteristics.ofWhichPlantationForest',
      },
      variableName: 'plantationForestArea',
    },
    {
      label: {
        key: 'forestCharacteristics.plantationForestIntroducedArea',
      },
      variableName: 'plantationForestIntroducedArea',
    },
    {
      label: {
        key: 'fra.forestCharacteristics.ofWhichOtherPlantedForest',
      },
      variableName: 'otherPlantedForestArea',
    },
  ],
}

const description2025 = (sectionName: string) => ({
  ...base,
  nationalData: {
    dataSources: {
      table: {
        variables: variables[sectionName],
      },
      text: {
        readOnly: true,
      },
    },
    originalData: true,
    nationalClassification: true,
  },
})

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)
  const schemaName = Schemas.getName(assessment)

  // extent of forest
  const extentOfForestSection = await client.one(
    `select *
     from ${schemaName}.section s
     where s.props ->> 'name' = 'extentOfForest'`
  )

  extentOfForestSection.props.descriptions = assessment.cycles.reduce((acc, cycle) => {
    if (cycle.name === '2020') {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      acc[cycle.uuid] = description2020
    } else if (cycle.name === '2025') {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      acc[cycle.uuid] = description2025('extentOfForest')
    }
    return acc
  }, {})

  // forest characteristics
  const forestCharacteristicsSection = await client.one(
    `select *
     from ${schemaName}.section s
     where s.props ->> 'name' = 'forestCharacteristics'`
  )

  forestCharacteristicsSection.props.descriptions = assessment.cycles.reduce((acc, cycle) => {
    if (cycle.name === '2020') {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      acc[cycle.uuid] = description2020
    } else if (cycle.name === '2025') {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      acc[cycle.uuid] = description2025('forestCharacteristics')
    }
    return acc
  }, {})

  const queryEOF = `update ${schemaName}.section set props = props || '{"descriptions": ${JSON.stringify(
    extentOfForestSection.props.descriptions
  )}}' where id = ${extentOfForestSection.id}`
  const queryFOC = `update ${schemaName}.section set props = props || '{"descriptions": ${JSON.stringify(
    forestCharacteristicsSection.props.descriptions
  )}}' where id = ${forestCharacteristicsSection.id}`

  await client.query(queryEOF)
  await client.query(queryFOC)
}
