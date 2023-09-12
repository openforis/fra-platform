import { useEffect, useState } from 'react'

import { getRecipeAgreementAreaProperty } from 'meta/geo/forest'

import { useForestSourceOptions } from 'client/store/ui/geo'

export const useRecipeLayerPropertyName = () => {
  const [recipeLayerPropertyName, setRecipeLayerPropertyName] = useState(null)
  const forestOptions = useForestSourceOptions()

  useEffect(() => {
    setRecipeLayerPropertyName(
      getRecipeAgreementAreaProperty(
        forestOptions.selected,
        forestOptions.agreementLevel,
        forestOptions.hansenPercentage
      )
    )
  }, [forestOptions.selected, forestOptions.agreementLevel, forestOptions.hansenPercentage])

  return recipeLayerPropertyName
}

export default useRecipeLayerPropertyName
