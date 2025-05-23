import { ExplorerRedisRepository } from 'server/repository/redis/explorer'

export const ExplorerController = {
  getMetadata: ExplorerRedisRepository.getManyMetadata,
}
