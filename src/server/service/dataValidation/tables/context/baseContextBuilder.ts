import { ContextBuilderProps } from './contextBuilderProps'

export abstract class BaseContextBuilder {
  protected readonly props: ContextBuilderProps

  protected constructor(props: ContextBuilderProps) {
    this.props = props
  }
}
