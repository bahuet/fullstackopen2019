

const initialMessage = 'welcome'

const notification = (state = initialMessage, action) => {
  switch (action.type) {



    case 'SET_NOTIF':
      return action.data

    case 'HIDE_NOTIF':
      return ''

    default:
      return state
  }
}

export const setNotif = (message, time) => {
  console.log(`set notif for ${time} seconds`)
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIF',
      data: message
    })

    setTimeout(() =>
      dispatch(
        {
          type: 'HIDE_NOTIF'
        }
      )
      , time * 1000)
  }
}

export default notification
