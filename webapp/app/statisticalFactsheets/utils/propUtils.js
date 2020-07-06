const findPropFromArray = (data, propName) => data.find((entry) => entry.rowName === propName)

const safeProp = (propName, data, year) => {
  let found
  if (Array.isArray(data)) {
    found = findPropFromArray(data, propName)
  } else {
    found = data && data[propName]
  }
  if (year) {
    found = found && found[year]
  }
  return found
}

const safePropAsNumber = (data, year, propName) => Number(safeProp(propName, data, year)) || undefined

export const getPropsForYearAsNumbers = (data, year, propNames) => {
  return propNames.map((propName) => safePropAsNumber(data, year, propName))
}
