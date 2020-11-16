<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      left
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>
        <nuxt-link class="hide-text-decoration" to="/">
          {{ $store.state.info.sitename }}
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon @click.stop="toggle()">
        <v-icon>{{ $vuetify.icons.values.mdiBrightness4 }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :class="{ 'footer-right': drawer }">
      <v-card
        flat
        tile
        max-width="760"
        class="transparent text-center mx-auto"
      >
        <v-card-text>
          <v-btn
            v-for="item in $store.state.info.menu"
            :key="item.name"
            class="mx-4"
            :href="item.link"
            text
          >
            {{ item.name }}
          </v-btn>
        </v-card-text>

        <v-card-text class="pt-0">
          {{ $store.state.info.sitedescription }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          @{{ new Date().getFullYear() }} — <strong>{{ $store.state.info.sitename }}</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      email: { 
        email: "" 
      },
      items: [
        {
          icon: this.$vuetify.icons.values.mdiHome,
          title: '首页',
          to: '/'
        },
        {
          icon: this.$vuetify.icons.values.mdiPostOutline,
          title: '文章',
          to: '/blog'
        },
        {
          icon: this.$vuetify.icons.values.mdiFormatListBulletedType,
          title: '分类',
          to: '/category'
        },
        {
          icon: this.$vuetify.icons.values.mdiInformationOutline,
          title: '关于我们',
          to: '/about'
        }
      ]
    }
  },

  async middleware({ store, $content }) {
    await store.dispatch("fetchInfo", $content);
  },

  methods: {
    toggle() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
}
</script>

<style lang="scss" scoped>
a.hide-text-decoration {
  color: inherit;
}
.v-footer {
  transition: 0.2s;
  @media screen and (min-width: 1264px) {
    &.footer-right {
      margin-right: 256px;
    }
  }
}
</style>
