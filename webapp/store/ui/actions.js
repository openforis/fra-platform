export const uiHomeUpdateSelectedCountries = 'ui/home/update/selectedCountries'

export const updateSelectedCountries = (countries = []) => (dispatch) => {
  dispatch({
    type: uiHomeUpdateSelectedCountries,
    countries,
  })
}
