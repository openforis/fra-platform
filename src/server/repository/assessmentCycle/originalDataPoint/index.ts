import { create } from './create'
import { deleteNationalClass } from './deleteNationalClass'
import { getMany } from './getMany'
import { getManyWithDescriptionLinks } from './getManyWithDescriptionLinks'
import { getManyWithReferenceLinks } from './getManyWithReferenceLinks'
import { getOne } from './getOne'
import { getReservedYears } from './getReservedYears'
import { remove } from './remove'
import { updateDataSources } from './updateDataSources'
import { updateDescription } from './updateDescription'
import { updateNationalClasses } from './updateNationalClasses'
import { updateOriginalData } from './updateOriginalData'
import { updateYear } from './updateYear'

export const OriginalDataPointRepository = {
  create,
  deleteNationalClass,
  getMany,
  getManyWithDescriptionLinks,
  getManyWithReferenceLinks,
  getOne,
  getReservedYears,
  remove,
  updateDataSources,
  updateDescription,
  updateNationalClasses,
  updateOriginalData,
  updateYear,
}
