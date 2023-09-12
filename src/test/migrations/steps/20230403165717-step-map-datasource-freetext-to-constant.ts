import { createI18nPromise } from 'i18n/i18nFactory'
import { i18n as i18nType } from 'i18next'
import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { Cols, ColType, CommentableDescription, DataSource, Row, RowType, Table } from 'meta/assessment'

import { MetadataController } from 'server/controller/metadata'
import { BaseProtocol, Schemas } from 'server/db'

import { AssessmentCycleUtil } from 'test/migrations/steps/utils/getAssessmentCycle'

import * as dataSourceTypeTranslations from '../../../i18n/resources/en/dataSource'

export interface DataSourceValueDeprecated {
  uuid?: string
  reference: {
    text: string
    link?: string
  }
  type: string
  fraVariables?: string[]
  variable?: string
  year: string
  comments: string
}

const dataSourceTypeTranslationsReversed: Record<string, string> = Object.entries(dataSourceTypeTranslations).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [value]: key,
  }),
  {}
)

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentCycleUtil.getFra2025(client)

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const i18n = (await createI18nPromise('en')) as i18nType

  const _getRowOptions = (table: Table) => {
    const _filterRow = (row: Row) =>
      row.props.variableName &&
      row.props.type === RowType.data &&
      !row.cols.every((col) => [ColType.header, ColType.calculated].includes(col.props.colType))

    return table.rows.filter(_filterRow).reduce<Record<string, string>>((acc, row) => {
      const key = i18n.t(Cols.getLabel({ cycle, col: row.cols[0], t: i18n.t }))

      if (row.props.variableName.includes('introducedRank')) {
        return acc
      }

      return {
        ...acc,
        [key]: row.props.variableName,
      }
    }, {})
  }

  const descriptions = await client.map<CommentableDescription>(
    `
    select *  from assessment_fra_2025.descriptions  where name = 'dataSources' and jsonb_array_length(value -> 'dataSources') > 0;`,
    [],
    (row) => Objects.camelize(row)
  )

  if (descriptions.length < 1) return

  const sectionNames = [...new Set(descriptions.map((d) => d.sectionName))]

  const sections = await MetadataController.getSectionsMetadata({
    assessment,
    cycle,
    sectionNames,
  })

  // Duplicate keys only in growingStockComposition (and other, other2025, common.otherSpecifyInComments)
  const variableMap: Record<string, Record<string, string>> = sectionNames.reduce<Record<string, any>>(
    (acc, sectionName) => {
      const section = sections[sectionName]
      return {
        ...acc,
        [sectionName]: _getRowOptions(section[0].tables[0]),
      }
    },
    {}
  )

  const _fixType = (dataSource: DataSource) => {
    if (!dataSource.type) return
    if (Object.keys(dataSourceTypeTranslations).includes(dataSource.type)) return
    // eslint-disable-next-line no-param-reassign
    dataSource.type = dataSourceTypeTranslationsReversed[dataSource.type] ?? ''
  }

  const _fixFraVariables = (dataSource: DataSourceValueDeprecated, sectionName: string) => {
    if (!dataSource.fraVariables) {
      // eslint-disable-next-line no-param-reassign
      dataSource.fraVariables = []
      return
    }
    if (dataSource.fraVariables.length < 1) return

    const sectionVariables = variableMap[sectionName]

    // eslint-disable-next-line no-param-reassign
    dataSource.fraVariables = dataSource.fraVariables.reduce<Array<string>>((acc, fraVariable) => {
      const skip =
        // other gives false positive
        fraVariable === 'other' ||
        // Total removed from FRA Variables (=calculated row from 1a)
        (fraVariable === 'Total' && sectionName === 'forestOwnership')

      // if fraVariable is already a fixed variable, keep it
      const fixed = Object.values(sectionVariables).includes(fraVariable) ? fraVariable : sectionVariables[fraVariable]
      if (skip || !fixed) return acc

      return acc.concat(fixed)
    }, [])
  }

  const _updateDescription = (description: CommentableDescription) => {
    const { sectionName, value } = description
    const { dataSources } = value

    dataSources.forEach((dataSource: DataSource) => {
      _fixType(dataSource)
      _fixFraVariables(dataSource, sectionName)
    })
  }

  descriptions.forEach(_updateDescription)

  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet<CommentableDescription>(
    [
      {
        name: 'value',
        cast: 'jsonb',
      },
      {
        name: 'id',
        cast: 'bigint',
        cnd: true,
      },
    ],
    {
      table: { table: 'descriptions', schema: schemaCycle },
    }
  )

  const query = `${pgp.helpers.update(descriptions, cs)} where v.id = t.id;`
  await client.query(query)
}
