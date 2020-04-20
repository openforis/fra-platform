import * as R from 'ramda'

import * as FRAUtils from '@common/fraUtils'
import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { updateTableData } from '@webapp/app/assessment/components/dataTable/actions'

import * as ODP from '../originalDataPoint'
import * as OriginalDataPointStateState from '../originalDataPointState'

const getDatumOdp = (state, odp, datumFields, draft) => {
  const odpOriginal = OriginalDataPointStateState.getActive(state)
  const { odpId, year } = odp
  const { year: yearPrev } = odpOriginal

  const datumOdp = {
    odpId,
    type: 'odp',
    draft,
    name: String(year),
    namePrev: String(yearPrev),
    year: Number(year),
  }
  Object.entries(datumFields).forEach(([name, value]) => {
    datumOdp[name] = value && value.toString()
  })

  return datumOdp
}

const getUpdateSectionTable = (state, sectionName, tableName, odp, datumFields, draft) => {
  const assessmentType = FRA.type

  if (AssessmentState.isSectionDataLoaded(assessmentType, sectionName, tableName)(state)) {
    const datumOdp = getDatumOdp(state, odp, datumFields, draft)
    // const isNotDatumFraYear = FRA.years.indexOf(Number(year)) < 0
    const fraNoNDPs = AssessmentState.getFraNoNDPs(assessmentType, sectionName, tableName)(state)
    // const datumNoFraYear =
    const fra = R.pipe(
      AssessmentState.getFra(assessmentType, sectionName, tableName),
      FRAUtils.updateTableWithOdpDatumOdp(datumOdp, fraNoNDPs)
    )(state)
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

  const forestArea = ODP.classTotalArea(odp, 'forestPercent')
  const otherWoodedLand = ODP.classTotalArea(odp, 'otherWoodedLandPercent')
  const datumFields = { forestArea, otherWoodedLand }

  return getUpdateSectionTable(state, section.name, section.tables.extentOfForest, odp, datumFields, draft)
}

const getUpdateForestCharacteristics = (state, odp, draft) => {
  const section = FRA.sections['1'].children.b

  const naturalForestArea = ODP.subClassTotalArea(odp, 'forestPercent', 'naturalForestPercent')
  const plantationForestArea = ODP.subClassTotalArea(odp, 'forestPercent', 'plantationPercent')
  const plantationForestIntroducedArea = ODP.subSubClassTotalArea(
    odp,
    'forestPercent',
    'plantationPercent',
    'plantationIntroducedPercent'
  )
  const otherPlantedForestArea = ODP.subClassTotalArea(odp, 'forestPercent', 'otherPlantedPercent')
  const datumFields = {
    naturalForestArea,
    plantationForestArea,
    plantationForestIntroducedArea,
    otherPlantedForestArea,
  }
  return getUpdateSectionTable(state, section.name, section.tables.forestCharacteristics, odp, datumFields, draft)
}

export const getUpdateTablesWithOdp = (state, odp, draft = true) => {
  const actions = []
  actions.push(getUpdateExtentOfForest(state, odp, draft))
  actions.push(getUpdateForestCharacteristics(state, odp, draft))
  return actions.filter((action) => !!action)
}

const getUpdateSectionTableNoNDP = (state, sectionName, tableName, year) => {
  const assessmentType = FRA.type

  if (!AssessmentState.isSectionDataLoaded(assessmentType, sectionName, tableName)(state)) {
    return null
  }

  const fraNoNDPs = AssessmentState.getFraNoNDPs(assessmentType, sectionName, tableName)(state)
  const fraObject = R.find(R.propEq('year', year))(fraNoNDPs)

  const fra = R.pipe(
    AssessmentState.getFra(assessmentType, sectionName, tableName),
    FRAUtils.updateTableWithOdpDatumOdp(fraObject, fraNoNDPs)
  )(state)

  const data = {
    [AssessmentState.keysDataTableWithOdp.fra]: fra,
    [AssessmentState.keysDataTableWithOdp.fraNoNDPs]: fraNoNDPs,
  }

  return updateTableData({ assessmentType, sectionName, tableName, data })
}

const _isFraYear = (year) => FRA.years.includes(year)

const extentOfForestOdpToNoOdp = (state, year) => {
  const section = FRA.sections['1'].children.b
  const sectionName = section.name
  const tableName = section.tables.forestCharacteristics

  return getUpdateSectionTableNoNDP(state, sectionName, tableName, year)
}

const forestCharacteristicsOdpToNoOdp = (state, year) => {
  const section = FRA.sections['1'].children.a
  const sectionName = section.name
  const tableName = section.tables.extentOfForest

  return getUpdateSectionTableNoNDP(state, sectionName, tableName, year)
}

export const getUpdateTablesWithNotOdp = (state, year) => {
  if (!_isFraYear(year)) {
    return null
  }
  const actions = []
  actions.push(extentOfForestOdpToNoOdp(state, year))
  actions.push(forestCharacteristicsOdpToNoOdp(state, year))
  return actions.filter((action) => !!action)
}
