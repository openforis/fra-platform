import { TaxonRepository } from 'server/db/repository/extData'

export const ExtDataController = {
  searchTaxa: TaxonRepository.search,
}
