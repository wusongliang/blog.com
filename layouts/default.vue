<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" left app>
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

      <v-toolbar-title class="pl-2 pl-sm-5">
        <nuxt-link class="hide-text-decoration" to="/">
          {{ $store.state.info.sitename }}
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer />

      <v-autocomplete
        v-model="model"
        class="search"
        :class="{ active: searchShow }"
        :items="blogs"
        :loading="isLoading"
        :search-input.sync="search"
        chips
        clearable
        hide-details
        hide-selected
        hide-no-data
        item-text="title"
        item-value="item.path"
        label="Search..."
        autofocus
        solo
      >
        <template v-slot:item="{ item }">
          <v-list-item :to="item.path">
            {{ item.title }}
          </v-list-item>
        </template>
      </v-autocomplete>

      <v-btn v-show="!searchShow" icon @click.stop="searchShow = true">
        <v-icon>{{ $vuetify.icons.values.mdiMagnify }}</v-icon>
      </v-btn>

      <v-btn icon @click.stop="toggle()">
        <v-icon>{{ $vuetify.icons.values.mdiBrightness4 }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :class="{ 'footer-left': drawer }">
      <v-card flat tile max-width="760" class="transparent text-center mx-auto">
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
          @{{ new Date().getFullYear() }} —
          <strong>{{ $store.state.info.sitename }}</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      model: null,
      search: null,
      blogs: [],
      isLoading: false,
      searchShow: false,
      email: {
        email: "",
      },
      items: [
        {
          icon: this.$vuetify.icons.values.mdiHome,
          title: "首页",
          to: "/",
        },
        {
          icon: this.$vuetify.icons.values.mdiPostOutline,
          title: "文章",
          to: "/blog",
        },
        {
          icon: this.$vuetify.icons.values.mdiFormatListBulletedType,
          title: "分类",
          to: "/category",
        },
        {
          icon: this.$vuetify.icons.values.mdiInformationOutline,
          title: "关于我们",
          to: "/about",
        },
      ],
    };
  },

  async middleware({ store, $content }) {
    await store.dispatch("fetchInfo", $content);
  },

  watch: {
    async search(val) {
      if (!val) {
        this.blogs = [];
        return;
      }

      if (!this.isLoading) {
        this.isLoading = true;

        this.blogs = await this.$content("blog", { deep: true })
          .sortBy("date", "desc")
          .only(["title", "path"])
          .search("title", val)
          .limit(5)
          .fetch();

        this.isLoading = false;
      }
    },
  },

  methods: {
    toggle() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style lang="scss" scoped>
a.hide-text-decoration {
  color: inherit;
}
.search {
  max-width: 0;
  transition: 0.5s;
  overflow: hidden;
  &.active {
    max-width: 400px;
  }
}
.v-footer {
  transition: 0.2s;
  @media screen and (min-width: 1264px) {
    &.footer-left {
      margin-left: 256px;
    }
  }
}
</style>
