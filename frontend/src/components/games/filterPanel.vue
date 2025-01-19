<template>
  <v-card theme="dark" elevation="0">
    <v-container class="px-0" fluid>
      <v-row>
        <v-col>
          <v-select
            label="Sort by:"
            variant="outlined"
            color="orange-darken-4"
            hide-details
            :items="sortOptions"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            label="Platform"
            variant="outlined"
            color="orange-darken-4"
            hide-details
            clearable
            :items="platforms"
            item-title="name"
            item-value="_id"
            v-model="selectedPlatform"
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mt-0">
          <v-select
            class="genre-selector"
            label="Genres"
            variant="outlined"
            color="orange-darken-4"
            multiple
            chips
            clearable
            :items="genres"
            item-title="name"
            item-value="_id"
            v-model="selectedGenres"
            hide-details
          ></v-select>
        </v-col>
        <v-col>
          <v-btn
            block
            color="orange-darken-4"
            class="h-100"
            @click="onApplyFilters"
            >Apply</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "FilterPanel",
  props: {
    genres: {
      type: Array,
      default: [],
    },
    platforms: {
      type: Array,
      default: [],
    },
    sortOptions: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      selectedPlatform: null,
      selectedGenres: [],
    }
  },
  methods: {
    // setQuery(name, values) {
    //   const queryValue = values.length > 0 ? values.join(",") : undefined
    //   console.log(this.currentRouteQueries)
    //   const newQuery = { ...this.$route.query, [name]: queryValue }
    //   console.log(newQuery)

    //   this.$router.replace({
    //     name: this.$route.name,
    //     query: newQuery,
    //   })
    // },
    async setQuery(name, values = []) {
      const newQuery = { ...this.currentRouteQueries }
      if (!values.length) {
        delete newQuery[name]
      } else {
        newQuery[name] = values.join(",")
      }

      await this.$router.push({
        path: this.$route.path,
        query: newQuery,
      })
    },

    setInitValuesFromQuery() {
      this.setSelectedPlatformFromQuery()
      this.setSelectedGenresFromQuery()
    },
    setSelectedPlatformFromQuery() {
      const queryPlatformId = this.$route.query.platform
      const isValid = this.platforms.find((el) => el._id === queryPlatformId)
      console.log(isValid)
      if (isValid) {
        this.selectedPlatform = queryPlatformId
      }
    },
    setSelectedGenresFromQuery() {
      let queryGenreIds = this.$route.query.genre ?? []
      queryGenreIds = Array.isArray(queryGenreIds)
        ? queryGenreIds
        : queryGenreIds.split(",")
      const resultQuery = []

      queryGenreIds.forEach((genreId) => {
        if (this.allowedGenreIds.includes(genreId)) resultQuery.push(genreId)
      })
      this.selectedGenres.push(...resultQuery)
    },
    getValidSelectedGenres() {
      const selectedGenresSet = new Set(this.selectedGenres)
      const allowedGenresSet = new Set(this.allowedGenreIds)
      const validGenreIds = Array.from(
        allowedGenresSet.intersection(selectedGenresSet)
      )
      return validGenreIds
    },
    setSelectedPlatformQuery() {
      const isValid =
        this.selectedPlatform &&
        this.allowedPlatformIds.includes(this.selectedPlatform)
      const validPlatformId = []
      if (isValid) {
        validPlatformId.push(this.selectedPlatform)
      }
      this.setQuery("platform", validPlatformId)
    },
    async onApplyFilters() {
      await this.setQuery("genre", this.selectedGenres)
      await this.setQuery(
        "platform",
        this.selectedPlatform ? [this.selectedPlatform] : []
      )
      this.$emit("filters-apply")
    },
  },
  computed: {
    currentRouteQueries() {
      return this.$route.query
    },
    allowedGenreIds() {
      return this.genres.map((el) => el._id)
    },
    allowedPlatformIds() {
      return this.platforms.map((el) => el._id)
    },
  },
  watch: {
    // selectedGenres(newValue) {
    //   if (newValue.length > 0) {
    //     this.addQuery("genre", newValue)
    //   } else {
    //     this.removeQuery("genre")
    //   }
    // },
    // selectedPlatform(newValue) {
    //   if (newValue) {
    //     this.addQuery("platform", [newValue])
    //   } else {
    //     this.removeQuery("platform")
    //   }
    // },
  },
  mounted() {
    this.setInitValuesFromQuery()
  },
}
</script>

<style lang="css" scoped>
:deep(.genre-selector .v-chip),
:deep(.platform-selector .v-chip) {
  font-size: 0.85rem;
}
</style>
