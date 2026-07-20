import { CycleNames } from 'meta/assessment/cycle/names'

import type { GetReadmeTemplate, ReadmeYearsByCycle } from '../types'

const readmeYearsByCycle: ReadmeYearsByCycle = {
  [CycleNames._2020]: {
    yearRange: '1990-2000, 2000-2010, 2010-2015 ou 2015-2020',
    years: '1990, 2000, 2010, 2015 et 2020',
  },
  [CycleNames._2025]: {
    yearRange: '1990-2000, 2000-2010, 2010-2015, 2015-2020 ou 2020-2025',
    years: '1990, 2000, 2010, 2015, 2020 et 2025',
  },
}

export const getReadmeFr: GetReadmeTemplate = (props) => {
  const { cycleName } = props
  const { yearRange, years } = readmeYearsByCycle[cycleName]

  return `README

L’archive ZIP de téléchargement en masse contient trois dossiers:

«Annual_variables», contient les données annuelles sur les perturbations forestières par variable (maladies, insectes, conditions météorologiques, autres et incendies). Les données sont structurées sous forme de colonnes annuelles et sont disponibles pour la période allant de 2000 jusqu’à la dernière année de rapport. Chaque fichier est nommé conformément à la structure des rapports FRA: [Section][Sous-Section]_[variable]_[aaaa]-[mm]-[jj].csv. Le composant de date fait référence à la date de téléchargement des données ici et ailleurs dans ce document.

«FRA_Years_variables», la majorité des données rapportées se trouve dans ce dossier et, en règle générale, les données sont structurées sous forme de fichiers distincts pour chaque variable. Chaque fichier comporte généralement des colonnes séparées pour les années de rapport FRA: ${years}. Les fichiers sont nommés selon la convention suivante: [Section][Sous-Section]_[variable]_[aaaa]-[mm]-[jj].csv.

«Intervals_variables», ce dossier contient des fichiers distincts avec les données de changement annuel moyen relatives à l’expansion de la forêt, au boisement, à l’expansion naturelle de la forêt, à la déforestation et au reboisement. Chaque enregistrement de données contient des informations pour un pays et une des périodes suivantes: ${yearRange}. Chaque fichier est nommé selon la convention: [Section][Sous-Section]_[variable]_[aaaa]-[mm]-[jj].csv.

En plus de ces sous-dossiers, le téléchargement en masse contient les fichiers suivants:

Le fichier «Annual_[aaaa]-[mm]-[jj].csv» regroupe l’ensemble des données des variables du dossier «Annual_variables» dans une unique feuille Excel. En outre, ce fichier contient les codes indiquant l’état d’observation («flags») pour chaque point de données. Les descriptions des flags se trouvent dans la colonne U.

Le fichier «DegradedForest_[aaaa]-[mm]-[jj].csv» contient les données descriptives rapportées sur les forêts dégradées.

Le fichier «ForestPolicy_[aaaa]-[mm]-[jj].csv» contient les données descriptives rapportées sur les politiques forestières.

Le fichier «ForestRestoration_[aaaa]-[mm]-[jj].csv» contient des données descriptives rapportées sur la restauration des forêts.

Le fichier “FRA_years_[aaaa]-[mm]-[jj].csv» regroupe l’ensemble des données des variables du dossier “FRA_Years_variables » dans une unique feuille Excel. En outre, ce fichier contient les codes indiquant le statut d’observation (“flags ») pour chaque point de données; les descriptions des flags se trouvent dans la colonne IA.

Le fichier “Intervals_[aaaa]-[mm]-[jj].csv» regroupe l’ensemble des données des variables du dossier «Intervals_variables» dans une unique feuille Excel. En outre, ce fichier contient les codes indiquant le statut d’observation («flags») pour chaque point de données; les descriptions des flags se trouvent dans la colonne Q.

Le fichier «NDPYear_[aaaa]-[mm]-[jj].csv » contient des données sur l’année la plus ancienne et la plus récente des «Point de données national» utilisés par les pays/territoires appliquant l’approche par points de données nationaux pour leur rapport sur la superficie de forêt.

Le fichier «NWFP_[aaaa]-[mm]-[jj].csv» contient des données sur les 10 principaux produits forestiers non ligneux (PFNL), y compris: le nom, la valeur en milliers de monnaie locale et les catégories de PFNL (pour plus d’informations sur les différentes catégories, veuillez consulter la plateforme de FRA, tableau 7).

Le fichier «Tiers_[aaaa]-[mm]-[jj].csv» contient des informations sur les niveaux des données («tiers ») indiqués pour le tableau 1a Superficie de forêt (état et évolution), 2a Matériel sur pied (état) et 2c Biomasse (état). Pour plus d’informations sur les critères des différents niveaux des données, veuillez consulter les sections correspondantes de la plateforme de FRA pour les tableaux 1a, 2a et 2c.

Les unités utilisées pour les rapports sont incluses dans chacun des fichiers ou sur la plateforme de FRA.

Citation requise : [FAO. Année du téléchargement. Évaluation des ressources forestières mondiales. URL. Consulté le : date-du-téléchargement]

Contact: fra@fao.org`
}
