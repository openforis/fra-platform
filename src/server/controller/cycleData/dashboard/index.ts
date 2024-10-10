import { NodeExtRepository } from 'server/repository/assessmentCycle/nodeExt'

export const DashboardController = {
  getManyItems: NodeExtRepository.getManyDashboardItems,
}
