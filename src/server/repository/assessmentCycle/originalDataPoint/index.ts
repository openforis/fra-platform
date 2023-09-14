import { create } from './create'
import { getMany } from './getMany'
import { getOne } from './getOne'
import { getReservedYears } from './getReservedYears'
import { remove } from './remove'
import { update } from './update'
import { updateDataSources } from './updateDataSources'
import { updateNationalClasses } from './updateNationalClasses'

export const OriginalDataPointRepository = {
  create,
  getOne,
  getMany,
  getReservedYears,
  remove,
  update,
  updateDataSources,
  updateNationalClasses,
}
