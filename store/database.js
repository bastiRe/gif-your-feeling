import { fireDb } from '~/plugins/firebase.js'

export const state = () => ({
  loading: false,
  feelings: []
})

export const actions = {
  async saveGif({ state, commit, rootState }, gifUrl) {
    try {
      const ref = await fireDb.collection('feelings').add({
        gifUrl,
        userId: rootState.user.id,
        userName: rootState.user.name
      })
    } catch (e) {
      console.log(e)
    }
  },
  async downloadFeelings({ commit }) {
    commit('setLoading', true)
    try {
      const querySnapshot = await fireDb.collection('feelings').get()
      const feelings = querySnapshot.docs.map(doc => doc.data())
      commit('setFeelings', feelings)
    } catch (e) {
      console.log(e)
    }
    commit('setLoading', false)
  }
}

export const mutations = {
  setLoading(state, value) {
    state.loading = value
  },
  setFeelings(state, feelings) {
    state.feelings = feelings
  }
}