import { NodeUpdate } from '@meta/data'

export const nodeExists = (node: NodeUpdate, nodeList: NodeUpdate[]) => {
  return nodeList.find(
    (mergedNode) =>
      mergedNode.tableName === node.tableName &&
      mergedNode.variableName === node.variableName &&
      mergedNode.colName === node.colName
  )
}
