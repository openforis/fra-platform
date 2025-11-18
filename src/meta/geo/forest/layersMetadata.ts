import { agreementPalette } from 'meta/geo/agreementPalette'
import { ForestKey } from 'meta/geo/forest/key'
import { LayerMetadata } from 'meta/geo/layer/metadata'

export const forestLayersMetadata: Record<ForestKey, LayerMetadata> = {
  [ForestKey.JAXA]: {
    titleKey: 'geo.sections.forest.layerTitles.jaxa2017',
    scale: 24.7376,
    palette: ['#940194'], // purple
    citation: 'https://doi.org/10.1016/j.rse.2014.04.014', // from gee asset
    forestAreaDataProperty: 'faJaxa',
  },
  [ForestKey.TandemX]: {
    titleKey: 'geo.sections.forest.layerTitles.tanDemX2019',
    scale: 55.6597,
    palette: ['#008000'], // green
    citation: 'https://geoservice.dlr.de/web/dataguide/fnf50/',
    forestAreaDataProperty: 'faTandemx',
  },
  [ForestKey.ESAGlobCover]: {
    titleKey: 'geo.sections.forest.layerTitles.esaGlobCover2009',
    scale: 309.2208,
    palette: ['#c53703'], // red
    citation: 'http://due.esrin.esa.int/page_globcover.php', // from gee asset
    forestAreaDataProperty: 'faEsa2009',
  },
  [ForestKey.GlobeLand]: {
    titleKey: 'geo.sections.forest.layerTitles.globeLand2020',
    scale: 30,
    palette: ['#0000FF'], // blue
    citation: 'http://www.globallandcover.com/home_en.html', // official web site
    forestAreaDataProperty: 'faGlobeland',
  },
  [ForestKey.Copernicus]: {
    titleKey: 'geo.sections.forest.layerTitles.copernicus2019',
    scale: 100,
    palette: ['#919134'], // yellow
    citation: ' https://doi.org/10.3390/rs12061044', // from gee asset
    forestAreaDataProperty: 'faCopernicus',
  },
  [ForestKey.ESRI]: {
    titleKey: 'geo.sections.forest.layerTitles.esri2020',
    scale: 10,
    palette: ['#f16b33'], // coral
    citation: ' https://www.arcgis.com/home/item.html?id=d6642f8a4f6d4685a24ae2dc0c73d4ac',
    forestAreaDataProperty: 'faEsri',
  },
  [ForestKey.ESAWorldCover]: {
    titleKey: 'geo.sections.forest.layerTitles.esa2020',
    scale: 10,
    palette: ['#13bebe'], // cyan
    citation: 'https://esa-worldcover.org/en', // on gee citation 'A publication is under preparation'
    forestAreaDataProperty: 'faEsa2020',
  },
  [ForestKey.Hansen]: {
    titleKey: 'geo.sections.forest.layerTitles.hansenGfc2020',
    scale: 30.92,
    palette: ['#61bd61'], // lime
    citation: 'https://doi.org/10.1126/science.1244693', // from gee asset
    forestAreaDataProperty: 'faHansen',
  },
  [ForestKey.JRC2020]: {
    titleKey: 'geo.sections.forest.layerTitles.jrc2020',
    scale: 10,
    palette: ['#93024c'], // magenta
    citation: 'http://data.europa.eu/89h/e554d6fb-6340-45d5-9309-332337e5bc26',
    forestAreaDataProperty: 'faJrc2020',
  },

  [ForestKey.MODIS]: {
    titleKey: 'geo.sections.forest.layerTitles.modis',
    scale: 231.6563,
    palette: ['#FFD700'], // gold
    citation: 'https://lpdaac.usgs.gov/products/mod44bv006/',
  },
  [ForestKey.CustomFnF]: {
    titleKey: 'geo.sections.forest.layerTitles.customFnf',
    palette: ['#A52A2A'],
    citation: '',
    scale: 0,
  },
  [ForestKey.Agreement]: {
    titleKey: 'geo.sections.forest.layerTitles.agreement',
    palette: agreementPalette,
    citation: '',
    scale: 0,
  },
}
