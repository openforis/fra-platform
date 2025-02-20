import * as Diff from 'diff'

export const getTextDiffNode = (currentValue: string, newValue: string): HTMLDivElement => {
  const changes = Diff.diffLines(currentValue.replaceAll('&nbsp;', '\u00A0'), newValue.replaceAll('&nbsp;', '\u00A0'))

  const newNode = document.createElement('div')

  changes.forEach((change, i) => {
    const { added, removed, value } = change

    value.split('\n\r').forEach((text) => {
      const span = document.createElement('span')
      if (added) span.classList.add('added')
      if (removed) span.classList.add('removed')
      span.textContent = text
      newNode.appendChild(span)

      if (i < changes.length - 1) {
        newNode.appendChild(document.createElement('br'))
      }
    })
  })

  return newNode
}
