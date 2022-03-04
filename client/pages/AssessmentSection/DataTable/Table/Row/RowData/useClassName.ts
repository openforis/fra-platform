export default (target: Array<string>): string => {
  const commentsOpen = target[0] // TODO
  // const commentsOpen = useSelector((state) => {
  //   const openThreadTarget: Array<string> = [] // ReviewState.getOpenThreadTarget(state) as Array<string>
  //   return !Objects.isEmpty(openThreadTarget) && Objects.isEmpty(Arrays.difference(openThreadTarget, target))
  // })

  return commentsOpen ? 'fra-row-comments__open' : ''
}
