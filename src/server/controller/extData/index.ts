import { TaxonRepository } from 'server/repository/extData'

export const ExtDataController = {
  searchTaxa: TaxonRepository.search,
}
