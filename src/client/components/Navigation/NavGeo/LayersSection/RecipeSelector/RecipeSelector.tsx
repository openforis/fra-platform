import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { LayerSectionKey } from 'meta/geo'
import { Recipe } from 'meta/geo/layer'

import { GeoRecipesActions } from 'client/store/geo/recipes/actions'
import { useGeoSectionRecipe } from 'client/store/geo/recipes/hooks/recipes'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryIso } from 'client/hooks/country'
import SelectPrimary from 'client/components/Inputs/SelectPrimary'
import OptionLabel from 'client/components/Navigation/NavGeo/Grid/OptionLabel'
import OptionsGrid from 'client/components/Navigation/NavGeo/Grid/OptionsGrid'

import { useRecipeOptions } from './hooks/useRecipeOptions'

type Props = {
  recipes: Array<Recipe>
  sectionKey: LayerSectionKey
}

const RecipeSelector: React.FC<Props> = (props) => {
  const { recipes, sectionKey } = props

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const selectedRecipe = useGeoSectionRecipe(sectionKey)
  const options = useRecipeOptions({ recipes })
  const countryIso = useCountryIso()

  const handleRecipeChange = useCallback<(value: string) => void>(
    (value) => {
      const recipe = recipes.find((r) => r.forestAreaDataProperty === value)
      dispatch(GeoRecipesActions.setSectionRecipe({ countryIso, recipe, recipeName: value, sectionKey }))
    },
    [countryIso, dispatch, recipes, sectionKey]
  )

  return (
    <OptionsGrid>
      <OptionLabel>{t('geo.recipes.recipes')}</OptionLabel>
      <SelectPrimary
        isClearable={false}
        onChange={handleRecipeChange}
        options={options}
        placeholder={t('common.custom')}
        value={selectedRecipe}
      />
    </OptionsGrid>
  )
}

export default RecipeSelector
