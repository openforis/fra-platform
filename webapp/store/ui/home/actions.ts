export const uiHomeUpdateSelectedCountries = 'ui/home/update/selectedCountries'

export const updateSelectedCountries = (countries: any = []) => (dispatch: any) => {
  dispatch({
    type: uiHomeUpdateSelectedCountries,
    countries,
  })
}
