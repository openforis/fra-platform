import R from 'ramda'

export const updateNationalClass = (odp, index, field, value) => {
  const updatedClasses = R.adjust(R.assoc(field, value), index, odp.nationalClasses)
  return {...odp, nationalClasses: updatedClasses}
}

export const removeClassPlaceholder = (odp) => {
  const updatedClasses = R.filter(nClass => !nClass.placeHolder, odp.nationalClasses)
  return {...odp, nationalClasses: updatedClasses}
}

export const emptyNationalClass = () => ({
  className: '',
  definition: '',
  value: null,
  forestPercent: null,
  otherWoodedLandPercent: null,
  otherLandPercent: null
})

export const nationalClassPlaceHolder = () => ({...emptyNationalClass(), placeHolder: true})

export const emptyDataPoint = () => ({
  year: null,
  forestArea: null,
  nationalClasses: [emptyNationalClass(), nationalClassPlaceHolder()]
})

export const addNationalClassPlaceHolder = (odp) => ({...odp, nationalClasses: [...odp.nationalClasses, nationalClassPlaceHolder()]})
