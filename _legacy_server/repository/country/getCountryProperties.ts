export const getCountryProperties = (country: any) => ({
  countryIso: country.countryIso,
  regionCodes: country.regionCodes,
  lastEdit: country.lastEdited,
})
