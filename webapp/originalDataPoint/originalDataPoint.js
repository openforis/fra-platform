import R from 'ramda'

export const updateNationalClass = (odp, index, field, value) => {
  const updatedClasses = R.adjust(R.assoc(field, value), index, odp.nationalClasses)
  return {...odp, nationalClasses: updatedClasses}
}
