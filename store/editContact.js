export const state = () => ({
  id: '',
})

// change state from here

export const mutations = {
  setId(state, inputId) {
    return (state.id = inputId)
  },
}

// get data about my state
export const getters = {
  getId(state) {
    return state.id
  },
}
