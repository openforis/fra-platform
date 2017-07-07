import {issueCloseCommentThread} from '../review/actions'
export const routerFollowLink = 'router/link/follow'

export const follow = to => dispatch => {
  dispatch({type: issueCloseCommentThread})
  dispatch({type: routerFollowLink, to})
}
