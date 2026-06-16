import { ContextBuilderProps } from 'server/controller/cycleData/tableData/updateDependencies/context/contextBuilderProps'

export abstract class BaseContextBuilder {
  protected readonly props: ContextBuilderProps

  protected constructor(props: ContextBuilderProps) {
    this.props = props
  }
}
