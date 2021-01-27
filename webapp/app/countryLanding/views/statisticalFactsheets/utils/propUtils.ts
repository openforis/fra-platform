const findPropFromArray = (data, propName) => data.find((entry) => entry.rowName === propName)

const safeProp = (propName, data, year) => {
  let value
  if (Array.isArray(data)) {
    value = findPropFromArray(data, propName)
  } else {
    value = data && data[propName]
  }
  if (year) {
    value = value && value[year]
  }
  return value
}

const safePropAsNumber = (data, year, propName) => safeProp(propName, data, year)

export const getVariableValuesByYear = ({ data, variables, year }) => {
  return variables.map((variable) => safePropAsNumber(data, year, variable))
}
