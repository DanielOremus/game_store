<template>
  <header :class="['header', { scrolled: isScrolled }]" ref="headerElement">
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
          <div class="search-container">
            <SearchIcon class="search-icon" />
          </div>
        </li>
        <li class="header-section d-flex align-center ga-6">
          <CartIcon class="cart-icon" />
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
                  <div class="item-container">
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
  data() {
    return {
      isScrolled: false,
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
.header {
  transition: background-color 0.3s ease;
  height: 6rem;
  display: flex;
  align-items: center;
  nav {
    width: 100%;
  }
  .list {
    list-style: none;
    display: flex;
    justify-content: space-between;
    padding-inline: 2.5rem;
    align-items: center;
  }
}
.header-section:nth-child(2) {
  transition: transform ease 0.3s;
  transform: translateY(2rem);

  padding: 1.3rem 1rem;
  height: 5rem;
  border-radius: 9999px;
  font-size: 1.2rem;
  backdrop-filter: blur(20px);
  background-color: rgba(0, 0, 0, 0.25);
  text-align: center;
  padding-right: 5rem;

  .search-container {
    vertical-align: middle;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    height: 3rem;
    width: 3rem;
    position: absolute;
    transform: scale(1.65);
    transition: transform 0.3s ease;
    top: 50%;
    right: 0;
    translate: 0 -50%;
    background: rgb(255, 209, 76);
    background: linear-gradient(
      11deg,
      rgba(255, 209, 76, 1) 0%,
      rgba(255, 87, 0, 1) 100%
    );
    cursor: pointer;
    .search-icon {
      width: 15px;
      height: 15px;
      color: white;

      z-index: 1;
    }
  }
}
.platform {
  cursor: pointer;
  position: relative;
  padding: 1.05rem 1rem;
}
.platform::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: rgba(179, 179, 179, 0.332);
  transition: opacity ease 0.1s;
  opacity: 0;
  border-radius: 25px;
}
.platform:hover::after {
  opacity: 1;
}
.cart-icon,
.profile-icon,
.profile-auth-icon {
  width: 45px;
  height: 45px;
  transition: color ease 0.1s;
  cursor: pointer;
  z-index: 1;
}
.profile-auth-icon {
  width: 30px;
  height: 30px;
  color: rgb(0, 136, 255);
}
.profile-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  box-sizing: border-box;
}
.profile-icon-wrapper {
  width: inherit;
  height: inherit;
  box-sizing: border-box;
}
.profile-icon-container.auth {
  background-color: rgb(12, 12, 12);

  border-radius: 100%;
  box-sizing: border-box;
  width: 4rem;
  height: 4rem;
  border: 3px solid transparent;
  transition: border ease 0.1s;
}
.profile-icon-container.auth:hover {
  border: 3px solid rgb(255, 102, 0);
}

.cart-icon:hover,
.profile-icon:hover {
  color: rgb(255, 115, 0);
}

.header.scrolled {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  .header-section:nth-child(2) {
    transform: translateY(0);
    backdrop-filter: none;
    background: none;
  }
  .platform {
    padding-block: 0.7rem;
  }
  .search-container {
    transform: scale(1.2);
  }
}
.profile-menu {
  min-width: 300px;
  width: 300px;
}
.item-container {
  cursor: pointer;
}
.item-container > * {
  z-index: 2;
}
.item-container::after {
  content: "";
  position: absolute;
  transition: opacity ease 0.1s;
  z-index: 0;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border-radius: 1rem;
  width: 85%;
  height: 90%;
  background-color: rgba(173, 173, 173);
  opacity: 0;
}
.item-container:hover::after {
  opacity: 0.3;
}
.logo {
  width: 75%;
  cursor: pointer;
}
.logo-container {
  display: flex;

  justify-content: center;
  max-width: 150px;
}
</style>
