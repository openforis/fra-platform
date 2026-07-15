import { CycleNames } from 'meta/assessment/cycle/names'

import type { GetReadmeTemplate, ReadmeYearsByCycle } from '../types'

const readmeYearsByCycle: ReadmeYearsByCycle = {
  [CycleNames._2020]: {
    yearRange: '1990-2000, 2000-2010, 2010-2015 o 2015-2020',
    years: '1990, 2000, 2010, 2015 y 2020',
  },
  [CycleNames._2025]: {
    yearRange: '1990-2000, 2000-2010, 2010-2015, 2015-2020 o 2020-2025',
    years: '1990, 2000, 2010, 2015, 2020 y 2025',
  },
}

export const getReadmeEs: GetReadmeTemplate = (props) => {
  const { cycleName } = props
  const { yearRange, years } = readmeYearsByCycle[cycleName]

  return `README

El archivo ZIP de descarga masiva contiene tres carpetas:

“Annual_variables”, que contiene datos anuales sobre perturbaciones forestales por variable (enfermedades, insectos, condiciones meteorológicas, otras y fuego). Los datos están estructurados en columnas anuales y están disponibles para el período comprendido entre 2000 y el último año de reporte. Cada archivo se nombra según la estructura de los informes FRA: [Section][SubSection]_[variable]_[yyyy]-[mm]-[dd].csv. El componente de fecha se refiere a la fecha de descarga de los datos aquí y en el resto de este documento.

“FRA_Years_variables”, la mayoría de los datos reportados se encuentra en esta carpeta y, por lo general, los datos están estructurados en archivos separados para cada variable. Cada archivo suele tener columnas separadas para los años de reporte FRA: ${years}. Los archivos se nombran según la convención: [Section][SubSection]_[variable]_[yyyy]-[mm]-[dd].csv.

“Intervals_variables”, esta carpeta contiene archivos separados con datos de cambios medios anuales correspondientes a la expansión forestal, forestación, expansión natural, deforestación y reforestación. Cada registro de datos contiene información para un país y para los intervalos ${yearRange}. Cada archivo se nombra según la convención: [Section][SubSection]_[variable]_[yyyy]-[mm]-[dd].csv.

Además de las subcarpetas, la descarga masiva contiene varios archivos:

El archivo “Annual_[yyyy]-[mm]-[dd].csv” contiene datos en una sola hoja de Excel para todas las variables de la carpeta “Annual_variables”. Además, este archivo contiene códigos de estado de observaciones (“flags”) para cada punto de datos. Las descripciones de los flags se encuentran en la columna U.

El archivo “DegradedForest_[yyyy]-[mm]-[dd].csv” contiene datos descriptivos reportados sobre los bosques degradados.

El archivo “ForestPolicy_[yyyy]-[mm]-[dd].csv” contiene datos descriptivos reportados sobre la política forestal.

El archivo “ForestRestoration_[yyyy]-[mm]-[dd].csv” contiene datos descriptivos reportados sobre la restauración forestal.

El archivo “FRA_years_[yyyy]-[mm]-[dd].csv” contiene datos en una sola hoja de Excel para todas las variables de la carpeta “FRA_Years_variables”. Además, este archivo contiene “flags” para cada punto de datos; las descripciones de los flags se encuentran en la columna IA.

El archivo “Intervals_[yyyy]-[mm]-[dd].csv” contiene datos en una sola hoja de Excel para todas las variables de la carpeta “Intervals_variables”. Además, este archivo contiene “flags” para cada punto de datos; las descripciones de los flags se encuentran en la columna Q.

El archivo “NDPYear_[yyyy]-[mm]-[dd].csv” contiene datos sobre el año más temprano y el más reciente del “National Data Point” utilizado por los países/áreas que emplean el enfoque de puntos de datos nacionales para la presentación de informes sobre la superficie forestal.

El archivo “NWFP_[yyyy]-[mm]-[dd].csv” contiene datos sobre los 10 principales productos forestales no madereros (PFNM), incluyendo: nombre, valor en miles de moneda local y categorías de PFNM (para más información sobre las diferentes categorías, véase la plataforma FRA, tabla 7).

El archivo “Tiers_[yyyy]-[mm]-[dd].csv” contiene información sobre los niveles (“tiers”) reportados para la tabla 1a Área forestal (situación y tendencia), 2a Existencias en crecimiento (situación) y 2c Existencias de biomasa (situación). Para más información sobre los criterios de los distintos niveles, véanse las secciones correspondientes de la plataforma FRA para las tablas 1a, 2a y 2c.

Las unidades de reporte pueden encontrarse en cada uno de los archivos o en la plataforma FRA.

Cita requerida: [FAO. Año de la descarga. Evaluación de los recursos forestales mundiales. URL. Consultado el: fecha de la descarga]

Contacto: fra@fao.org`
}
