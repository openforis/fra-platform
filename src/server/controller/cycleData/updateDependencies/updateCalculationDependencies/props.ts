import { PersistNodeValueProps } from 'server/controller/cycleData/persistNodeValues/props'

export type Props = Omit<PersistNodeValueProps, 'value'> & {
  /**
   * isODP is true when updating dependencies of an ODP (i.e. user has edited an ODP)
   */
  isODP?: boolean
}
