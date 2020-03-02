
const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTE':
      return action.data
    case 'HIDE':
      return ''
    default: return state
  }
}

//let timerStore

export const setNotification = (content, timer) => {
  //window.clearTimeout(timerStore)
  return async dispatch => {
    dispatch({
      type: 'SET_NOTE',
      data: content
    })

    //timerStore = await new Promise(resolve => window.setTimeout(resolve, timer * 1000))
    await new Promise(resolve => window.setTimeout(resolve, timer * 1000))
    // console.log('timer', timerStore)

    dispatch({
      type: 'HIDE'
    })
  }
}

export default reducer