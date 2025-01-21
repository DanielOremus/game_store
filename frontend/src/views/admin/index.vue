<template>
  <MainMasterPage :is-header-scrolled="true">
    <v-container fluid class="flex-grow-1 d-flex align-center px-15">
      <v-row>
        <v-col
          v-for="(card, i) in cards"
          cols="6"
          md="4"
          lg="4"
          xl="4"
          :key="i"
        >
          <SectionCard :card-data="card" @click="onCardClick(card)" />
        </v-col>
      </v-row>
    </v-container>
  </MainMasterPage>
</template>

<script>
const cardsData = [
  {
    title: "Roles",
    targetRoute: {
      name: "RolesPanel",
      params: {},
    },
    requiredPermissions: {
      roles: {
        read: true,
      },
    },
  },
  {
    title: "Game Creation",
    targetRoute: {
      name: "CreateGame",
      params: {},
    },
    requiredPermissions: {
      games: {
        create: true,
      },
    },
  },
  {
    title: "Users",
    targetRoute: {
      name: "CreateUsers",
      params: {},
    },
    requiredPermissions: {
      users: {
        read: true,
      },
    },
  },
]
import MainMasterPage from "@/layouts/MainMasterPage.vue"
import SectionCard from "./sectionCard.vue"
import { mapGetters } from "vuex"
export default {
  name: "AdminPage",
  components: {
    MainMasterPage,
    SectionCard,
  },
  methods: {
    onCardClick(card) {
      this.$router.push({
        name: card.targetRoute.name,
        params: card.targetRoute.params,
      })
    },
  },
  computed: {
    ...mapGetters("permissions", ["pagesPermissions"]),
    cards() {
      return cardsData.filter((card) => {
        for (const model in card.requiredPermissions) {
          for (const permission in card.requiredPermissions[model]) {
            if (this.pagesPermissions[model][permission]) return true
          }
        }
      })
    },
  },
}
</script>

<style lang="css" scoped></style>
