<template>
  <header
    :class="['header', { scrolled: isScrolledProp || isScrolled }]"
    ref="headerElement"
  >
    <nav>
      <ul class="list">
        <li class="header-section" @click="$router.push({ name: 'HomePage' })">
          <div class="logo-container">
            <img src="@/assets/images/logo.png" class="logo" alt="logo" />
          </div>
        </li>
        <li class="header-section">
          <span class="platform">
            <v-icon
              icon="mdi-steam"
              size="large"
              color="light-blue-darken-4"
            ></v-icon>
            Steam
          </span>
          <span class="platform">
            <v-icon
              icon="mdi-origin"
              color="orange-darken-3"
              size="x-large"
            ></v-icon>
            Origin
          </span>
          <span class="platform">
            <v-icon size="x-large">
              <EpicGamesIcon />
            </v-icon>
            Epic Games
          </span>

          <span class="platform">
            <v-icon
              icon="mdi-ubisoft"
              size="large"
              color="light-blue-accent-4"
            ></v-icon>
            Uplay
          </span>
          <div
            :class="{ 'searching-state': searchingState }"
            class="search-container"
          >
            <input
              variant="plain"
              color="white"
              class="search-input"
              placeholder="Buckshot, Minecraft..."
              hide-details
              v-model.trim.lazy="searchValue"
            />

            <div class="close-search" @click="searchingState = false">
              <v-icon icon="mdi-close"></v-icon>
            </div>
            <span
              class="search-link"
              @click="$router.push({ name: 'GamesList' })"
            >
              <a>Advanced Search</a>
            </span>
            <div class="search-icon-container" @click="searchingState = true">
              <SearchIcon class="search-icon" />
            </div>
          </div>
        </li>
        <li class="header-section d-flex align-center ga-6">
          <CartIcon class="cart-icon" @click="onCart" />
          <div :class="['profile-icon-container', { auth: isAuthenticated }]">
            <ProfileIcon
              v-if="!isAuthenticated"
              class="profile-icon"
              @click="$router.push({ name: 'Login' })"
            />
            <v-menu
              v-else
              transition="slide-x-transition"
              location="bottom right"
              location-strategy="connected"
            >
              <template v-slot:activator="{ props: menu }">
                <div
                  class="d-flex justify-center align-center profile-icon-wrapper"
                  v-bind="menu"
                >
                  <ProfileAuthIcon class="profile-auth-icon" />
                </div>
              </template>
              <v-list
                class="mt-4 profile-menu rounded-lg"
                bg-color="grey-darken-4"
              >
                <v-list-item>
                  <span class="text-h6 pl-10">{{ fullName }}</span>
                </v-list-item>
                <v-divider
                  color="grey"
                  class="opacity-50 mx-8 mt-1 mb-2"
                ></v-divider>

                <v-list-item>
                  <div class="item-container" @click="onProfile">
                    <span class="text-h6 pl-10">My Profile</span>
                  </div>
                </v-list-item>
                <v-divider
                  color="grey"
                  class="opacity-50 mx-8 my-2"
                ></v-divider>
                <v-list-item>
                  <div
                    class="item-container d-flex align-center ga-3"
                    @click="onLogout"
                  >
                    <span class="text-h6 pl-10">Log out</span>
                    <v-icon
                      icon="mdi-logout"
                      color="error"
                      class="text-h4"
                    ></v-icon>
                  </div>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
//TODO: add search with header platforms
import EpicGamesIcon from "@/assets/icons/epic-games.svg"
import CartIcon from "@/assets/icons/cart.svg"
import ProfileIcon from "@/assets/icons/profile.svg"
import ProfileAuthIcon from "@/assets/icons/profile-auth.svg"
import SearchIcon from "@/assets/icons/search.svg"
import { mapGetters, mapActions } from "vuex"
export default {
  name: "Header",
  components: {
    EpicGamesIcon,
    CartIcon,
    ProfileIcon,
    ProfileAuthIcon,
    SearchIcon,
  },
  props: {
    isScrolledProp: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isScrolled: false,
      searchValue: this.$route.query.name,
      searchingState: false,
    }
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "fullName"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    handleScroll() {
      this.isScrolled = window.scrollY > 0
    },
    async onLogout() {
      await this.logout()
      this.$router.push({ name: "Login" })
    },
    onCart() {
      this.$router.push({ name: "Cart" })
    },
    onProfile() {
      this.$router.push({ name: "Profile" })
    },
  },
  watch: {
    searchValue(newValue) {
      console.log(1)
      let queryValue = newValue ? newValue : undefined
      this.$router.push({ name: "GamesList", query: { name: queryValue } })
    },
  },
  mounted() {
    document.addEventListener("scroll", this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  },
}
</script>

<style lang="css" scoped>
@import url("/styles/header.css");

.searching-state,
.header.scrolled .searching-state {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-inline: 2rem;
  cursor: auto;
}

.searching-state .search-input-container {
  display: flex;
  align-items: center;
}

.search-link {
  margin-right: 1rem;
  transition: opacity 0.2s;
  text-wrap: nowrap;
  opacity: 0;
}
.search-link:hover {
  text-decoration: underline;
  cursor: pointer;
}
.searching-state .search-link {
  opacity: 1;
}

.search-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: all 0.2s ease;
  opacity: 1;
  flex-shrink: 0;
  position: absolute;
  left: 50%;
  translate: -50%;
  z-index: 0;
}
.searching-state .search-icon-container {
  z-index: -1;
}
.search-icon {
  transition: 0.2s ease;
}
.search-icon:hover {
  transform: scale(1.3);
}
.header.scrolled .search-icon:hover {
  transform: scale(1.15);
}
.searching-state .search-icon-container {
  opacity: 0;
}
.close-search {
  position: absolute;
  cursor: pointer;
  transition: opacity 0.2s, color 0.1s;
  right: -40px;
  opacity: 0;
  &:hover {
    color: rgb(255, 106, 0);
  }
}
.searching-state .close-search {
  opacity: 1;
}

.search-input {
  font-size: 1.4rem;
  padding-top: 0;
  outline: none;
  width: 50%;
  opacity: 0;
  color: white;
  caret-color: rgba(255, 255, 255, 0.8);
}
.searching-state .search-input {
  opacity: 1;
}
.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
</style>
