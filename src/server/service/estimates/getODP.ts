/**
 * @deprecated
 */
// TODO: why does otherWoodedLand have a default value of 20? does this make sense?
const _defaultOtherWoodedLand = '20.00'

// Helper function to create ODP from values for forestArea and otherWoodedLand
export const getODP = (forestArea: string, otherWoodedLand: string = _defaultOtherWoodedLand) => ({
  forestArea: {
    odp: true,
    raw: forestArea,
  },
  otherWoodedLand: {
    odp: true,
    raw: otherWoodedLand,
  },
})
