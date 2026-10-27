import React from 'react'

import Alert from 'client/components/Icon/icons/alert.svg?react'
import ArrowBack from 'client/components/Icon/icons/arrow-back.svg?react'
import ArrowDownRight2 from 'client/components/Icon/icons/arrow-down-right2.svg?react'
import BarChart from 'client/components/Icon/icons/bar-chart.svg?react'
import Chat46 from 'client/components/Icon/icons/chat-46.svg?react'
import CheckCircle08 from 'client/components/Icon/icons/check-circle-08.svg?react'
import Checkbox from 'client/components/Icon/icons/checkbox.svg?react'
import ChevronsIn from 'client/components/Icon/icons/chevrons-in.svg?react'
import ChevronsOut from 'client/components/Icon/icons/chevrons-out.svg?react'
import Circle from 'client/components/Icon/icons/circle.svg?react'
import CompareArrows from 'client/components/Icon/icons/compare_arrows.svg?react'
import ContentCopy from 'client/components/Icon/icons/content_copy.svg?react'
import Earth from 'client/components/Icon/icons/earth.svg?react'
import Equalizer from 'client/components/Icon/icons/equalizer.svg?react'
import ExternalLink from 'client/components/Icon/icons/external-link.svg?react'
import Eye from 'client/components/Icon/icons/eye.svg?react'
import Files from 'client/components/Icon/icons/files.svg?react'
import Filter from 'client/components/Icon/icons/filter.svg?react'
import Folder from 'client/components/Icon/icons/folder.svg?react'
import Github from 'client/components/Icon/icons/github.svg?react'
import GpsNotFixed from 'client/components/Icon/icons/gps-not-fixed.svg?react'
import History from 'client/components/Icon/icons/history.svg?react'
import HitDown from 'client/components/Icon/icons/hit-down.svg?react'
import Home from 'client/components/Icon/icons/home.svg?react'
import Layers from 'client/components/Icon/icons/layers.svg?react'
import LockCircle from 'client/components/Icon/icons/lock-circle.svg?react'
import LockCircleOpen from 'client/components/Icon/icons/lock-circle-open.svg?react'
import MenuLeft from 'client/components/Icon/icons/menu-left.svg?react'
import MinusDashed from 'client/components/Icon/icons/minus-dashed.svg?react'
import PaperPlane from 'client/components/Icon/icons/paper-plane.svg?react'
import Pencil from 'client/components/Icon/icons/pencil.svg?react'
import PlusDashed from 'client/components/Icon/icons/plus-dashed.svg?react'
import Radar from 'client/components/Icon/icons/radar.svg?react'
import Remove from 'client/components/Icon/icons/remove.svg?react'
import Rotate from 'client/components/Icon/icons/rotate.svg?react'
import RoundEInfo from 'client/components/Icon/icons/round-e-info.svg?react'
import SelectArrows from 'client/components/Icon/icons/select-arrows.svg?react'
import SmallAdd from 'client/components/Icon/icons/small-add.svg?react'
import SmallDown from 'client/components/Icon/icons/small-down.svg?react'
import SmallPrint from 'client/components/Icon/icons/small-print.svg?react'
import SortAmountAsc from 'client/components/Icon/icons/sort-amount-asc.svg?react'
import SortAmountDesc from 'client/components/Icon/icons/sort-amount-desc.svg?react'
import Table from 'client/components/Icon/icons/table.svg?react'
import TrashSimple from 'client/components/Icon/icons/trash-simple.svg?react'
import Undo from 'client/components/Icon/icons/undo.svg?react'
import Unfold from 'client/components/Icon/icons/unfold.svg?react'
import Video from 'client/components/Icon/icons/video.svg?react'
import { IconName } from 'client/components/Icon/types'

export const iconComponents: Record<IconName, React.FC<React.ComponentProps<'svg'>>> = {
  [IconName.alert]: Alert,
  [IconName.arrowBack]: ArrowBack,
  [IconName.arrowDownRight2]: ArrowDownRight2,
  [IconName.barChart]: BarChart,
  [IconName.chat46]: Chat46,
  [IconName.checkCircle08]: CheckCircle08,
  [IconName.checkbox]: Checkbox,
  [IconName.chevronsIn]: ChevronsIn,
  [IconName.chevronsOut]: ChevronsOut,
  [IconName.circle]: Circle,
  [IconName.compareArrows]: CompareArrows,
  [IconName.contentCopy]: ContentCopy,
  [IconName.earth]: Earth,
  [IconName.equalizer]: Equalizer,
  [IconName.externalLink]: ExternalLink,
  [IconName.eye]: Eye,
  [IconName.files]: Files,
  [IconName.filter]: Filter,
  [IconName.folder]: Folder,
  [IconName.github]: Github,
  [IconName.gpsNotFixed]: GpsNotFixed,
  [IconName.history]: History,
  [IconName.hitDown]: HitDown,
  [IconName.home]: Home,
  [IconName.layers]: Layers,
  [IconName.lockCircle]: LockCircle,
  [IconName.lockCircleOpen]: LockCircleOpen,
  [IconName.menuLeft]: MenuLeft,
  [IconName.minusDashed]: MinusDashed,
  [IconName.paperPlane]: PaperPlane,
  [IconName.pencil]: Pencil,
  [IconName.plusDashed]: PlusDashed,
  [IconName.radar]: Radar,
  [IconName.remove]: Remove,
  [IconName.rotate]: Rotate,
  [IconName.roundEInfo]: RoundEInfo,
  [IconName.selectArrows]: SelectArrows,
  [IconName.smallAdd]: SmallAdd,
  [IconName.smallDown]: SmallDown,
  [IconName.smallPrint]: SmallPrint,
  [IconName.sortAmountAsc]: SortAmountAsc,
  [IconName.sortAmountDesc]: SortAmountDesc,
  [IconName.table]: Table,
  [IconName.trashSimple]: TrashSimple,
  [IconName.undo]: Undo,
  [IconName.unfold]: Unfold,
  [IconName.video]: Video,
}
