<template>
  <v-container class="form-container" fluid>
    <v-form class="form" @submit.prevent="onSubmit">
      <v-row>
        <v-col>
          <v-text-field
            label="Name"
            variant="outlined"
            v-model="name.value"
            theme="dark"
            :error-messages="name.errorMessages"
            @input="clearErrorMessages(['name'])"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="3" lg="2" xl="2">
          <v-number-input
            theme="dark"
            label="Price"
            :min="1"
            variant="outlined"
            inset
            v-model="price.value"
            :error-messages="price.errorMessages"
            @update:modelValue="clearErrorMessages(['price'])"
          >
          </v-number-input>
        </v-col>
        <v-col cols="12" md="3" lg="2" xl="2">
          <v-number-input
            theme="dark"
            label="Sale"
            :min="0"
            :max="1"
            variant="outlined"
            :step="0.1"
            inset
            v-model="sale.value"
            :error-messages="sale.errorMessages"
            @update:modelValue="clearErrorMessages(['sale'])"
          >
          </v-number-input>
        </v-col>
        <v-col cols="12" md="3" lg="3" xl="3">
          <v-date-input
            clearable
            prepend-icon=""
            theme="dark"
            prepend-inner-icon="$calendar"
            label="Release Date"
            variant="outlined"
            v-model="releaseDate.value"
            @click:clear="setReleaseDate(null)"
            :error-messages="releaseDate.errorMessages"
            @update:modelValue="clearErrorMessages(['releaseDate'])"
          ></v-date-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0" cols="12" lg="7" xl="7">
          <v-select
            theme="dark"
            class="genre-selector"
            label="Genre"
            chips
            multiple
            clearable
            variant="outlined"
            :items="genres"
            item-title="name"
            item-value="_id"
            v-model="genre.value"
            :error-messages="genre.errorMessages"
            @update:modelValue="clearErrorMessages(['genre'])"
          ></v-select>
        </v-col>
        <v-col class="pt-0" cols="12" lg="5" xl="5">
          <v-select
            theme="dark"
            class="platform-selector"
            label="Platform"
            chips
            multiple
            clearable
            variant="outlined"
            :items="platforms"
            item-title="name"
            item-value="_id"
            v-model="platform.value"
            :error-messages="platform.errorMessages"
            @update:modelValue="clearErrorMessages(['platform'])"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0" cols="12">
          <v-textarea
            label="Description"
            variant="outlined"
            theme="dark"
            auto-grow
            rows="3"
            v-model="description.value"
            :error-messages="description.errorMessages"
            @input="clearErrorMessages(['description'])"
          >
          </v-textarea>
        </v-col>
        <v-col class="pt-0" cols="12">
          <v-file-input
            clearable
            variant="outlined"
            label="Main Image"
            theme="dark"
            accept="image/*"
            prepend-icon=""
            prepend-inner-icon="mdi-paperclip"
            @change="onFileChange"
            @click:clear="setImagePreviewURL(null)"
            v-model="mainImg.value"
            :error-messages="mainImg.errorMessages"
            @update:modelValue="clearErrorMessages(['mainImg'])"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0" cols="12" md="6" lg="6" xl="6">
          <v-btn
            color="orange-darken-4"
            size="large"
            block
            @click="
              $router.push({
                name: 'SpecificGame',
                params: { id: currentGame.id },
              })
            "
            >Back</v-btn
          >
        </v-col>
        <v-col class="pt-0" cols="12" md="6" lg="6" xl="6">
          <v-btn type="submit" block size="large" :color="submitBtnColor">
            {{ submitBtnText }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="preview-image-container" cols="12">
          <img
            class="preview-image"
            v-if="previewImgURL.value"
            :src="previewImgURL.value"
            alt="preview-image"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import GameValidator from "@/validators/GameValidator"
import MainMasterPage from "@/layouts/MainMasterPage.vue"
import { mapGetters, mapActions } from "vuex"
import config from "../../../config/default"
export default {
  name: "GameForm",
  components: {
    MainMasterPage,
  },

  data() {
    return {
      name: {
        value: "",
        errorMessages: [],
      },
      price: {
        value: null,
        errorMessages: [],
      },
      sale: {
        value: 0,
        errorMessages: [],
      },
      releaseDate: {
        value: null,
        errorMessages: [],
      },
      genre: {
        value: [],
        errorMessages: [],
      },
      platform: {
        value: [],
        errorMessages: [],
      },
      description: {
        value: "",
        errorMessages: [],
      },
      mainImg: {
        value: null,
        errorMessages: [],
      },
      previewImgURL: {
        value: null,
      },
    }
  },
  computed: {
    ...mapGetters("game", ["currentGame"]),
    ...mapGetters("platform", ["platforms"]),
    ...mapGetters("genre", ["genres"]),

    submitBtnText() {
      return this.currentGame?.id ? "Update" : "Create"
    },
    submitBtnColor() {
      return this.currentGame?.id ? "primary" : "green-darken-3"
    },
  },
  methods: {
    ...mapActions("platform", ["fetchAllPlatforms"]),
    ...mapActions("genre", ["fetchAllGenres"]),
    ...mapActions("game", ["updateGameById", "createGame"]),
    onFileChange(e) {
      const file = e.target.files[0]
      if (file) {
        this.setImagePreviewURL(URL.createObjectURL(file))
        URL.revokeObjectURL(file)
      } else {
        this.setImagePreviewURL(null)
      }
    },
    setImagePreviewURL(value) {
      this.previewImgURL.value = value
    },
    setReleaseDate(value) {
      this.releaseDate.value = value
    },
    setInitData() {
      const { mainImgSrc, releaseDate, ...gameObj } = this.currentGame
      this.setImagePreviewURL(`${config.API_BASE}/${mainImgSrc}`)
      this.setReleaseDate(new Date(releaseDate))
      for (const key in gameObj) {
        if (gameObj[key] && this[key]) {
          this[key].value = gameObj[key]
        }
      }
    },
    validateForm() {
      const type = this.currentGame?.id ? 2 : 1
      const validateData = {
        type,
        name: this.name.value,
        price: this.price.value,
        sale: this.sale.value,
        releaseDate: this.releaseDate.value,
        genre: this.genre.value,
        platform: this.platform.value,
        description: this.description.value,
        mainImg: this.mainImg.value,
      }
      const result = GameValidator.mainSchema.validate(validateData, {
        abortEarly: false,
      })
      console.log(result)

      return result
    },
    clearErrorMessages(fields) {
      fields.forEach((field) => {
        this[field].errorMessages = []
      })
    },
    setErrorMessages(joiError) {
      joiError.details.forEach(({ path, message }) => {
        this[path[0]].errorMessages = [message]
      })
    },
    async onSubmit() {
      const result = this.validateForm()
      if (result.error) {
        this.setErrorMessages(result.error)
        return
      }

      const fields = [
        "name",
        "price",
        "sale",
        "releaseDate",
        "genre",
        "platform",
        "description",
        "mainImg",
      ]

      if (!this.sale.value) this.sale.value = 0
      const payload = {}
      fields.forEach((field) => {
        payload[field] = this[field].value
      })
      let createdGame
      try {
        if (this.currentGame?.id)
          await this.updateGameById({
            gameId: this.currentGame.id,
            gameObj: payload,
          })
        else {
          createdGame = await this.createGame(payload)
        }

        this.$emit("submit-event", {
          success: true,
          id: this.currentGame?.id ?? createdGame.id,
        })
      } catch (error) {
        console.log(error)

        const response = error.response
        switch (response?.statusCode) {
        }
        this.$emit("submit", { success: false })
      }
    },
  },
  async mounted() {
    try {
      await this.fetchAllPlatforms()
      await this.fetchAllGenres()
      if (this.currentGame?.id) {
        this.setInitData()
      }
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style lang="css" scoped>
.form-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.preview-image-container {
  height: 300px;
}
.preview-image {
  height: 100%;
  aspect-ratio: 16/9;
}

:deep(.genre-selector .v-chip),
:deep(.platform-selector .v-chip) {
  font-size: 0.9rem;
}
</style>
