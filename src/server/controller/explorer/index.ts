import { ExplorerRedisRepository } from 'server/cache/repository/explorer'

export const ExplorerController = {
  getMetadata: ExplorerRedisRepository.getManyMetadata,
}
