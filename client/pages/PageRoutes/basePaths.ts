export const BasePaths = {
  Root: '/',
  Assessment: {
    root: () => '/:countryIso/:assessmentType',
    section: () => '/:countryIso/:assessmentType/:section',
  },
}
