import React from 'react'
import { useTranslation } from 'react-i18next'

import { LayerSectionKey } from 'meta/geo'
import { CUSTOM_RECIPE_KEY, Recipe } from 'meta/geo/layer'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoLayerSectionRecipeName } from 'client/store/ui/geo'
import { useCountryIso } from 'client/hooks'
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
  const countryIso = useCountryIso()

  const selectedRecipe = useGeoLayerSectionRecipeName(sectionKey)
  const options = useRecipeOptions({ recipes })

  const handleRecipeChange = (value: string) => {
    const newRecipe = recipes.find(({ forestAreaDataProperty }) => forestAreaDataProperty === value)
    dispatch(
      GeoActions.setLayerSectionRecipe({
        countryIso,
        recipe: newRecipe,
        recipeName: value,
        sectionKey,
      })
    )
  }

  return (
    <OptionsGrid>
      <OptionLabel>{t('geo.recipes.recipes')}</OptionLabel>
      <SelectPrimary
        isClearable={false}
        onChange={handleRecipeChange}
        options={options}
        value={selectedRecipe ?? CUSTOM_RECIPE_KEY}
      />
    </OptionsGrid>
  )
}

export default RecipeSelector
