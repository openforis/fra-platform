export const routerFollowLink = 'router/link/follow'

export const follow = to => dispatch => {
  dispatch({type: routerFollowLink, to})
}
