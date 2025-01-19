<template>
  <v-card theme="dark" elevation="0">
    <v-container class="px-0" fluid>
      <v-row>
        <v-col cols="12" md="4" lg="4" xl="4">
          <v-select
            label="Sort by"
            variant="outlined"
            color="orange-darken-4"
            hide-details
            :items="sortOptions"
            item-title="title"
            item-value="value"
            v-model="selectedSortOption"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4" lg="4" xl="4">
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
        <v-col cols="12" md="4" lg="4" xl="4">
          <v-select
            class="genre-selector"
            label="Genres"
            variant="outlined"
            color="orange-darken-4"
            multiple
            clearable
            :items="genres"
            item-title="name"
            item-value="_id"
            v-model="selectedGenres"
            hide-details
          >
            <template v-slot:selection="{ item, index }">
              <v-chip class="genre-chip" v-if="index < 3">
                <span>{{ item.title }}</span>
              </v-chip>
              <span
                v-if="index === 3"
                class="text-grey text-caption align-self-center"
              >
                (+{{ selectedGenres.length - 4 }} others)
              </span>
            </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="8" xl="6">
          <v-range-slider
            :min="minPrice"
            :max="maxPrice"
            color="orange-darken-4"
            step="1"
            strict
            hide-details
            v-model="priceRange"
          >
            <template v-slot:prepend>
              <v-number-input
                class="range-input"
                control-variant="stacked"
                variant="outlined"
                density="compact"
                color="orange-darken-4"
                single-line
                reverse
                hide-details
                :min="minPrice"
                :max="rangeMaxPrice"
                v-model="priceRange[0]"
              ></v-number-input>
            </template>
            <template v-slot:append>
              <v-number-input
                class="range-input"
                control-variant="stacked"
                variant="outlined"
                density="compact"
                color="orange-darken-4"
                single-line
                hide-details
                v-model="priceRange[1]"
                :min="rangeMinPrice"
                :max="maxPrice"
              ></v-number-input>
            </template>
          </v-range-slider>
        </v-col>
        <v-col>
          <v-btn
            block
            color="red-darken-2"
            class="action-btn"
            @click="onResetFilters"
            >Reset Filters</v-btn
          >
        </v-col>
        <v-col>
          <v-btn
            block
            color="orange-darken-2"
            class="action-btn"
            @click="onApplyFilters"
            >Apply Filters</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
const initMinPrice = 0
const minPrice = 0
const initMaxPrice = 200
const maxPrice = 500

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
      priceRange: [initMinPrice, initMaxPrice],
      selectedSortOption: null,
    }
  },
  methods: {
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
      this.setPriceRangeFromQuery()
      this.setPriceRangeFromQuery()
    },
    setSelectedPlatformFromQuery() {
      const queryPlatformId = this.$route.query.platform
      const isValid = this.platforms.some((el) => el._id === queryPlatformId)
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
    setPriceRangeFromQuery() {
      const queryPriceRange = this.$route.query.price
      let gte, lte
      if (queryPriceRange.includes("-")) {
        ;[gte, lte] = queryPriceRange.split("-").map((el) => parseFloat(el))
      } else {
        queryPriceRange.forEach((el) => {
          if (el.startsWith("gte:")) gte = parseFloat(el.slice(4))
          if (el.startsWith("lte:")) lte = parseFloat(el.slice(4))
        })
      }
      const range = []
      if (gte && gte <= lte && gte >= this.minPrice) {
        range.push(gte)
      } else {
        range.push(this.rangeMinPrice)
      }

      if (lte && lte >= gte && lte <= this.maxPrice) {
        range.push(lte)
      } else {
        range.push(this.rangeMaxPrice)
      }
      this.priceRange = range
    },
    async addPriceQueryToUrl() {
      let resultRange = []
      const [gte, lte] = this.priceRange

      if (isFinite(gte)) {
        resultRange.push(`gte:${gte}`)
      }
      if (isFinite(lte)) {
        resultRange.push(`lte:${lte}`)
      }

      if (resultRange.length === 2) {
        resultRange.forEach((price, i, arr) => (arr[i] = price.slice(4)))
      }
      await this.setQuery("price", [resultRange.join("-")])
    },
    async addPlatformQueryToUrl() {
      await this.setQuery(
        "platform",
        this.selectedPlatform ? [this.selectedPlatform] : []
      )
    },
    async addGenreQueryToUrl() {
      await this.setQuery("genre", this.selectedGenres)
    },
    async onApplyFilters() {
      await this.addPlatformQueryToUrl()
      await this.addPriceQueryToUrl()
      await this.addGenreQueryToUrl()
      this.$emit("filters-apply")
    },
    async onResetFilters() {
      await this.$router.push({ path: this.$route.path })
      this.selectedGenres = []
      this.selectedPlatform = null
      this.priceRange = [initMinPrice, initMaxPrice]
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
    minPrice() {
      return minPrice
    },
    maxPrice() {
      return maxPrice
    },
    rangeMaxPrice() {
      return Math.min(this.maxPrice, this.priceRange[1])
    },
    rangeMinPrice() {
      return Math.max(this.minPrice, this.priceRange[0])
    },
  },
  mounted() {
    this.setInitValuesFromQuery()
  },
}
</script>

<style lang="css" scoped>
.genre-chip {
  height: 24px;
}
:deep(.genre-chip span) {
  font-size: 0.9rem;
}
.action-btn {
  height: 40px;
  font-size: 1rem;
  text-transform: capitalize;
}
</style>
