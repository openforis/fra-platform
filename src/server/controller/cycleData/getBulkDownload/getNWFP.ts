import { RecordAssessmentDatas } from 'meta/data'

import { getData } from 'server/controller/cycleData/getBulkDownload/getData'

import { Props } from './props'

const toTitleCase = (str: string) => {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const getCSVColName = (variableName: string, colName: string): string => {
  const prefix = `NWFP  ${variableName.split('_')[1]}`
  if (colName === 'product_name') {
    return `${prefix} Name`
  }

  if (variableName.includes('product_') && colName === 'value') {
    return `${prefix} Value`
  }

  if (colName === 'category') {
    return `${prefix} Category`
  }

  return `${toTitleCase(variableName)} ${toTitleCase(colName)}`
}

export const getNWFP = async (props: Props) => {
  const { assessment, cycle, countries } = props

  const tableNames = ['nonwoodforestproductsremovals', 'nonwoodforestproductsremovalscurrency']

  const tableData = await getData({
    assessment,
    cycle,
    countries,
    tableNames,
  })

  return countries.map(({ countryIso, regionCodes }) => {
    const base: Record<string, string> = {
      regions: regionCodes.join(';'),
      iso3: countryIso,
      name: countryIso,
    }

    const variableSet1 = Array.from({ length: 10 }, (_, i) => `product_${i + 1}`)
    const colSet1 = ['product_name', 'value', 'category']

    variableSet1.forEach((variableName) => {
      colSet1.forEach((colName) => {
        base[getCSVColName(variableName, colName)] = RecordAssessmentDatas.getDatum({
          assessmentName: assessment.props.name,
          colName,
          countryIso,
          cycleName: cycle.name,
          data: tableData,
          tableName: 'nonwoodforestproductsremovals',
          variableName,
        })
      })
    })

    const variableSet2 = ['all_other_plant_products', 'all_other_animal_products']
    const colSet2 = ['value']

    variableSet2.forEach((variableName) => {
      colSet2.forEach((colName) => {
        base[getCSVColName(variableName, colName)] = RecordAssessmentDatas.getDatum({
          assessmentName: assessment.props.name,
          colName,
          countryIso,
          cycleName: cycle.name,
          data: tableData,
          tableName: 'nonwoodforestproductsremovals',
          variableName,
        })
      })
    })

    base['Name of currency'] = RecordAssessmentDatas.getDatum({
      assessmentName: assessment.props.name,
      colName: 'currency',
      countryIso,
      cycleName: cycle.name,
      data: tableData,
      tableName: 'nonwoodforestproductsremovalscurrency',
      variableName: 'currency',
    })

    return base
  })
}
