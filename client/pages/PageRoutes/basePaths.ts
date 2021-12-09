export const BasePaths = {
  Root: () => '/',
  Assessment: {
    root: () => '/:countryIso/:assessmentType',
    section: () => '/:countryIso/:assessmentType/:section',
  },
  User: {
    root: (id: number | string = ':id') => `/user/${id}`,
  },
}
