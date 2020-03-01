const reducer = (state = '', action) => {
  switch (action.type) {
    case 'VOTENOTE':
      return `you voted ${action.data}`
    case 'HIDE':
      return ''
    case 'NEWNOTE':
      return `you added new note ${action.data}`
    default: return state
  }
}

export const notifyVote = (content) => {
  return {
    type: 'VOTENOTE',
    data: content
  }
}

export const notifyNew = (content) => {
  return {
    type: 'NEWNOTE',
    data: content
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE'
  }
}
export default reducer