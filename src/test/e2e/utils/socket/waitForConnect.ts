import { expect } from '@playwright/test'

import { Objects } from 'utils/objects'

import { Timeouts } from 'test/e2e/config/timeouts'

import { type ReceivedSocketPackets } from './recordPackets'

export const waitForConnect = async (packets: ReceivedSocketPackets): Promise<void> => {
  await expect.poll(() => Objects.isEmpty(packets.connects), { timeout: Timeouts.medium }).toBe(false)
}
