import * as R from 'ramda'

import * as FRAUtils from '@common/fraUtils'
import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { updateTableData } from '@webapp/app/assessment/components/dataTable/actions'
import * as ODP from '@webapp/app/assessment/fra/sections/originalDataPoint/originalDataPoint'

const getUpdateSectionTable = (state, sectionName, tableName, odp, odpFields, draft) => {
  const assessmentType = FRA.type

  if (AssessmentState.isSectionDataLoaded(assessmentType, sectionName, tableName)(state)) {
    const { odpId, year } = odp
    const odpUpdate = {
      odpId,
      name: year,
      type: 'odp',
      draft,
      year: Number(year),
    }
    Object.entries(odpFields).forEach(([name, value]) => {
      odpUpdate[name] = value && value.toString()
    })
    const fra = R.pipe(
      AssessmentState.getFra(assessmentType, sectionName, tableName),
      FRAUtils.updateTableWithOdpDatumOdp(odpUpdate)
    )(state)
    const fraNoNDPs = AssessmentState.getFraNoNDPs(assessmentType, sectionName, tableName)(state)
    const data = {
      [AssessmentState.keysDataTableWithOdp.fra]: fra,
      [AssessmentState.keysDataTableWithOdp.fraNoNDPs]: fraNoNDPs,
    }

    return updateTableData({ assessmentType, sectionName, tableName, data })
  }
  return null
}

const getUpdateExtentOfForest = (state, odp, draft) => {
  const section = FRA.sections['1'].children.a
  const sectionName = section.name
  const tableName = section.tables.extentOfForest
  if (AssessmentState.isSectionDataLoaded(FRA.type, sectionName, tableName)(state)) {
    const forestArea = ODP.classTotalArea(odp, 'forestPercent')
    const otherWoodedLand = ODP.classTotalArea(odp, 'otherWoodedLandPercent')
    const odpFields = { forestArea, otherWoodedLand }

    return getUpdateSectionTable(state, sectionName, tableName, odp, odpFields, draft)
  }
  return null
}

const getUpdateForestCharacteristics = (state, odp, draft) => {
  const section = FRA.sections['1'].children.b
  const sectionName = section.name
  const tableName = section.tables.forestCharacteristics
  if (AssessmentState.isSectionDataLoaded(FRA.type, sectionName, tableName)(state)) {
    const naturalForestArea = ODP.subClassTotalArea(odp, 'forestPercent', 'naturalForestPercent')
    const plantationForestArea = ODP.subClassTotalArea(odp, 'forestPercent', 'plantationPercent')
    const plantationForestIntroducedArea = ODP.subSubClassTotalArea(
      odp,
      'forestPercent',
      'plantationPercent',
      'plantationIntroducedPercent'
    )
    const otherPlantedForestArea = ODP.subClassTotalArea(odp, 'forestPercent', 'otherPlantedPercent')
    const odpFields = {
      naturalForestArea,
      plantationForestArea,
      plantationForestIntroducedArea,
      otherPlantedForestArea,
    }
    return getUpdateSectionTable(state, sectionName, tableName, odp, odpFields, draft)
  }
  return null
}

export const getUpdateTablesWithOdp = (state, odp, draft = true) => {
  const actions = []

  const updateExtentOfForest = getUpdateExtentOfForest(state, odp, draft)
  if (updateExtentOfForest) actions.push(updateExtentOfForest)

  const updateForestCharacteristics = getUpdateForestCharacteristics(state, odp, draft)
  if (updateForestCharacteristics) actions.push(updateForestCharacteristics)

  return actions
}
