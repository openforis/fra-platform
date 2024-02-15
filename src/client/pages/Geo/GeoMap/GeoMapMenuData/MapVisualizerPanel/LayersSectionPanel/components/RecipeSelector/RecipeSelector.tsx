import './RecipeSelector.scss'
import React from 'react'

import { LayerSectionKey } from 'meta/geo'
import { Recipe } from 'meta/geo/layer'

import { useAppDispatch } from 'client/store'
import { GeoActions, useGeoLayerSectionRecipeName } from 'client/store/ui/geo'
import { useCountryIso } from 'client/hooks'

interface Props {
  recipes: Array<Recipe>
  sectionKey: LayerSectionKey
}
const RecipeSelector: React.FC<Props> = ({ recipes, sectionKey }) => {
  const dispatch = useAppDispatch()
  const sectionRecipe = useGeoLayerSectionRecipeName(sectionKey)
  const countryIso = useCountryIso()
  return (
    <div>
      <p className="geo-map-menu-data-recipe-selector-title">Recipes</p>
      <select
        value={sectionRecipe}
        onChange={(e) => {
          const newRecipeForestAreaDataProperty = e.target.value
          const newRecipe = recipes.find(
            ({ forestAreaDataProperty }) => forestAreaDataProperty === newRecipeForestAreaDataProperty
          )
          dispatch(
            GeoActions.setLayerSectionRecipe({
              countryIso,
              recipe: newRecipe,
              recipeName: newRecipeForestAreaDataProperty,
              sectionKey,
            })
          )
        }}
      >
        <option value="custom">custom</option>
        {recipes.map((recipe) => (
          <option key={recipe.forestAreaDataProperty} value={recipe.forestAreaDataProperty}>
            {recipe.recipeLabel}
          </option>
        ))}
      </select>
    </div>
  )
}

export default RecipeSelector
