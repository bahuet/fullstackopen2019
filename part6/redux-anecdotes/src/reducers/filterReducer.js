const initialFilter = ''

const filter = (state = initialFilter, action) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return action.data


    default: return state
  }
}

export const updateFilter = txt => ({ type: 'UPDATE_FILTER', data: txt })



export default filter