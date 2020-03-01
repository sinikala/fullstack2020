const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTE':
      return action.data
    case 'HIDE':
      return ''
    default: return state
  }
}

export const setNotification = (content, timer) => {
  console.log('content', content)
  return async dispatch => {
    dispatch({
      type: 'SET_NOTE',
      data: content
    })

    await new Promise(resolve => setTimeout(resolve, timer * 1000))

    dispatch({
      type: 'HIDE'
    })
  }
}

export default reducer