import './GeoMapMenuRecipes.scss'
import React from 'react'

import GeoMapMenuButton from '../GeoMapMenuButton'

// Placeholder for Recipe Layers menu

const GeoMapMenuRecipes: React.FC = () => {
  return (
    <div className="geo-map-menu-item">
      <GeoMapMenuButton panel="recipes" text="My Recipes" icon="bookmark" />
    </div>
  )
}

export default GeoMapMenuRecipes
