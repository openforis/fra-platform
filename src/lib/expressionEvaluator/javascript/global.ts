const globalObjects: { [key: string]: any } = {
  Array,
  Boolean,
  Date,
  Math,
  Number,
  String,
}

export const getGlobalObjectProperty = (name: string, object: any): any => {
  if (name in globalObjects) {
    return globalObjects[name]
  }

  if (Object.values(globalObjects).includes(object)) {
    const property = object[name]

    if (!property) {
      throw new Error(`undefinedFunction ${name}`)
    }
    return property
  }

  return null
}
