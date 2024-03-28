import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Recipe } from 'meta/geo/layer'

import { Option } from 'client/components/Inputs/Select'

type Props = {
  recipes: Array<Recipe>
}

type Returned = Array<Option>

export const useRecipeOptions = (props: Props): Returned => {
  const { recipes } = props
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    return recipes.map<Option>((recipe) => ({
      label: t(recipe.labelKey),
      value: recipe.forestAreaDataProperty,
    }))
  }, [recipes, t])
}
