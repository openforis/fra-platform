import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CUSTOM_RECIPE_KEY, Recipe } from 'meta/geo/layer'

import { Option } from 'client/components/Inputs/Select'

type Props = {
  recipes: Array<Recipe>
}

type Returned = Array<Option>

export const useRecipeOptions = (props: Props): Returned => {
  const { recipes } = props
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const options = recipes.map((recipe) => ({
      label: t(recipe.labelKey),
      value: recipe.forestAreaDataProperty,
    }))
    const optionCustom: Option = {
      label: t('common.custom'),
      value: CUSTOM_RECIPE_KEY,
    }

    return [optionCustom, ...options]
  }, [recipes, t])
}
