import { UpdateDependenciesProps } from 'server/controller/cycleData/updateDependencies/props'

export type ContextBuilderProps = Omit<UpdateDependenciesProps, 'user'>
