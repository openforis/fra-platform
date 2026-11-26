import { MessageTopic } from 'meta/messageCenter/messageTopic'

import { useTopicKeys } from 'client/store/messageCenter/hooks/messagecenter'
import { useResizableLayout } from 'client/components/Resizable/hooks/useResizableLayout'

type Props = {
  topic: MessageTopic
}

// Topic width is topic size + margin on the right
const widthDocked = 300
const widthSlot = widthDocked + 32

// Topics are docked side by side at the right edge of the screen until the user moves or resizes them
export const useTopicLayout = (props: Props): ReturnType<typeof useResizableLayout> => {
  const { topic } = props
  // current topic slot
  const slot = useTopicKeys().indexOf(topic.key) + 1

  // position is topic width * slot - start calculation from the right side (-slot)
  const position = { x: -slot * widthSlot, y: 0 }
  const size = { height: '100%', width: widthDocked }

  return useResizableLayout({ position, size })
}
