<template>
  <div class="w-full h-full">
    <div class="mx-auto w-64 my-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="search">Search</label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
        id="search"
        type="text"
        placeholder="Search Gifs..."
        v-model="query"
      >
    </div>
    <div class="flex mx-auto w-full flex-wrap justify-around p-2">
      <div
        v-for="(image, index) in gifs"
        :key="index"
        v-on:click="saveGif(image)"
        class="p-2 w-48 h-48 cursor-pointer"
      >
        <img :src="image" class="w-full h-full">
      </div>
    </div>
    <div class="p-2 mx-auto">
      <div v-if="loading" class="text-center">Loading...</div>
      <button
        v-if="!loading && gifs.length > 0"
        v-on:click="loadMore()"
        class="block mx-auto bg-indigo hover:bg-indigo-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >Load more</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: function() {
    return {
      query: ''
    }
  },
  computed: mapState({
    gifs: state => state.gifs.searchResult,
    loading: state => state.gifs.loading
  }),
  watch: {
    query() {
      this.$store.dispatch('gifs/search', this.query)
    }
  },
  methods: {
    saveGif(image) {
      this.$store.dispatch('database/saveGif', image)
      this.$router.push('/')
    },
    loadMore() {
      this.$store.dispatch('gifs/loadMore')
    }
  },
  head() {
    return {
      title: 'Add your feeling'
    }
  }
}
</script>
