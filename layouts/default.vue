<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      class="drawer"
      width="309"
    >
      <div class="drawer-container d-flex flex-row">
        <div
          class="drawer-icons d-flex flex-column justify-space-between primary-dark pt-3"
        >
          <div
            class="drawer-icons-top d-flex flex-column align-center justify-center"
          >
            <nuxt-link
              v-for="item in sidebarIcons.slice(0, 4)"
              :key="item.icon"
              :to="item.linkTo"
              replace
            >
              <v-icon
                size="26.67"
                color="text-light"
              >
                {{ item.icon }}
              </v-icon>
            </nuxt-link>
          </div>
          <div
            class="drawer-icons-bottom  d-flex flex-column align-center pb-3"
          >
            <v-btn
              v-for="item in sidebarIcons.slice(4)"
              :key="item.icon"
              icon
              height="52"
              width="52"
              color="text-light-middle"
              class="py-6 mx-2"
            >
              <v-icon size="26.7">
                {{ item.icon }}
              </v-icon>
            </v-btn>
            <v-menu
              top
              :offset-x="true"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="menu-user-avatar"
                  v-bind="attrs"
                  height="52"
                  width="52"
                  @click="userMenuVisible = !userMenuVisible"
                  v-on="on"
                >
                  <v-img
                    src="example-avatar.png"
                    max-width="24"
                    max-height="24"
                  />
                </v-btn>
              </template>
              <div
                class="user-menu d-flex flex-column align-start justify-start ml-7 mb-3"
              >
                <v-btn
                  depressed
                  block
                  tile
                  text
                  class="user-menu-item px-5 d-flex flex-row justify-start align-center text-light--text"
                >
                  <v-img
                    src="example-avatar.png"
                    max-width="24"
                    max-height="24"
                  />
                  <span class="user-menu-item-text pl-3 text-capitalize">
                    Lisa Schmitz
                  </span>
                </v-btn>
                <v-btn
                  v-for="item in userMenuItems"
                  :key="item.icon"
                  depressed
                  block
                  tile
                  text
                  class="user-menu-item px-5 py-0 d-flex flex-row justify-start align-center text-light--text"
                  @click="item.onClick()"
                >
                  <v-icon>{{ item.icon }}</v-icon>
                  <span class="user-menu-item-text pl-3 text-capitalize">
                    {{ item.title }}
                  </span>
                </v-btn>
                <v-btn
                  depressed
                  block
                  tile
                  text
                  class="user-menu-item  d-flex flex-row justify-start align-center text-light--text"
                  @click="logout"
                >
                  <span
                    class="user-menu-item-text text-light--text text-lowercase"
                  >
                    unlog
                  </span>
                </v-btn>
              </div>
            </v-menu>
          </div>
        </div>
        <div class="drawer-content primary pt-4">
          <div class="drawer-content-container">
            <div
              class="drawer-header-container d-flex flex-row align-center px-5"
              @click="
                !$route.path.includes('settings')
                  ? $router.push('/settings')
                  : $router.push('/')
              "
            >
              <div class="icon-container d-flex align-center">
                <v-btn
                  icon
                  color="text-light-middle"
                  class="settings-button"
                >
                  <v-icon
                    v-if="$route.path.includes('settings')"
                    size="35"
                  >
                    mdi-settings
                  </v-icon>
                  <v-img
                    v-else
                    src="logoHuawei.png"
                    width="35"
                  />
                </v-btn>
              </div>
              <span
                class="drawer-header-title px-4 align-self-center text-light--text"
              >
                {{ $route.path.includes('settings') ? `Settings` : 'Title' }}
              </span>
            </div>
            <!-- <v-divider class="text-light-middle mx-5 mt-5 mb-7" /> -->
            <div class="drawer-content-items-container">
              <nuxt-link
                v-for="item in activeArea.sidebar"
                :key="item.icon"
                height="52"
                :to="drawerContentLinks(item.linkTo)"
                class="drawer-content-item px-5 d-flex flex-row justify-start align-center text-light--text"
              >
                <v-icon
                  size="24"
                  color="text-light-middle"
                >
                  {{ item.icon }}
                </v-icon><span class="drawer-content-item-text pl-3 text-capitalize">
                  {{ item.title }}
                </span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </v-navigation-drawer>
    <v-app-bar

      app
      height="65"
      elevation="1"
      color="#FFFFFF"
      class="app-bar"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="activeArea.appBarTitle" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} - Mateusz</span>
    </v-footer>
  </v-app>
</template>

<script>
import sidebarMixin from '@/constants/mixins/sidebarMixin';

const Cookie = process.client ? require('js-cookie') : undefined;

export default {
  mixins: [sidebarMixin],
  data() {
    return {
      drawer: true,
      right: true,
      rightDrawer: false,
      title: 'Header bar title',
    };
  },
  methods: {
    async logout() {
      Cookie.remove('auth');
      this.$store.commit('setAuth', null);
      await this.$apolloHelpers.onLogout();
      // window.location.href = `${window.location.origin}/login`;
    },
  },
};
</script>
<style lang="scss" scoped>
.drawer {
  .drawer-container {
    height: 100%;
    .drawer-icons {
      width: 18%;
      height: 100%;
      a {
        height: 52px;
        text-decoration: none;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .drawer-content {
      width: 82%;
      height: 100%;
      .drawer-content-container {
        max-width: 100% !important;
        .settings-button {
          background: none;
        }
        .drawer-header-title {
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0.15px;
        }
        .icon-container {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: none;
        }
        .drawer-content-item {
          text-decoration: none;
          height: 52px;
          .drawer-content-item-text {
            font-weight: 400;
            font-size: 16px;
            line-height: 18.75px;
            letter-spacing: 0.15px;
          }
          &:before {
            opacity: 0;
          }
        }
      }
    }
  }
}
.app-bar {
  .app-bar-header {
    font-weight: 500;
    font-size: 26px;
    line-height: 30px;
    letter-spacing: 0.25px;
  }
}
.v-menu__content {
  box-shadow: none;
  .user-menu {
    width: 255px;
    height: 198px;
    background: #000028;
    box-shadow: 0px 6px 6px rgba(0, 109, 179, 0.25);
    border-radius: 5px;
    .user-menu-item {
      max-height: 50px;
      .user-menu-item-text {
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        display: flex;
        align-items: center;
        letter-spacing: 0.25px;
      }
    }
  }
}
a.nuxt-link-active {
  font-weight: bold;
  background: rgba(61, 79, 125, 0.3);
}
a.nuxt-link-exact-active {
  background: rgba(61, 79, 125, 0.3);
}
</style>
