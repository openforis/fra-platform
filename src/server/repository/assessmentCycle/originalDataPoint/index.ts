import { create } from './create'
import { deleteNationalClass } from './deleteNationalClass'
import { getMany } from './getMany'
import { getOne } from './getOne'
import { getReservedYears } from './getReservedYears'
import { remove } from './remove'
import { update } from './update'
import { updateDataSources } from './updateDataSources'
import { updateNationalClasses } from './updateNationalClasses'
import { updateOriginalData } from './updateOriginalData'

export const OriginalDataPointRepository = {
  create,
  getOne,
  getMany,
  getReservedYears,
  remove,
  update,
  updateOriginalData,
  updateDataSources,
  deleteNationalClass,
  updateNationalClasses,
}
