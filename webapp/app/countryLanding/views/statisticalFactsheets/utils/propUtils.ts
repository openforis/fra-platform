const findPropFromArray = (data: any, propName: any) => data.find((entry: any) => entry.rowName === propName)

const safeProp = (propName: any, data: any, year: any) => {
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

const safePropAsNumber = (data: any, year: any, propName: any) => safeProp(propName, data, year)

export const getVariableValuesByYear = ({ data, variables, year }: any) => {
  return variables.map((variable: any) => safePropAsNumber(data, year, variable))
}
