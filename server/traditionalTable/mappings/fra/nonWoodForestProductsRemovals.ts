module.exports = {
  tableName: 'non_wood_forest_products_removals',
  rows: {
    names: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'all_other_plant_products', 'all_other_animal_products'],
  },
  columns: [
    { name: 'product_name', type: 'text' },
    { name: 'key_species', type: 'text' },
    { name: 'quantity', type: 'numeric' },
    { name: 'unit', type: 'text' },
    { name: 'value', type: 'numeric' },
    { name: 'category', type: 'text' },
  ],
}
