export const state = () => ({
  popupShown: false,
  signInShown: true,
  signUpShown: false,
  successShown: false,
})

// change state from here

export const mutations = {
  togglePopUp(state) {
    return (state.popupShown = !state.popupShown)
  },
  toggleSignUp(state) {
    return (state.signUpShown = !state.signUpShown)
  },
  toggleSignIn(state) {
    return (state.signInShown = !state.signInShown)
  },
  toggleSuccess(state) {
    // return (state.successShown = !state.successShown)
    state.signInShown = false
    state.signUpShown = false
    state.successShown = true
  },
  signin(state) {
    state.signInShown = true
    state.signUpShown = false
    state.successShown = false
  },
}

// get data about my state
export const getters = {
  getPopupShown(state) {
    return state.popupShown
  },
  getSignInShown(state) {
    return state.signInShown
  },
  getSignUpShown(state) {
    return state.signUpShown
  },
  getSuccessShown(state) {
    return state.successShown
  },
}
