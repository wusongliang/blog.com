<template>
  <v-card class="home mx-auto transparent py-6 px-sm-3" max-width="960" elevation="0">
    <v-row class="home-top">
      <v-col align-self="center" cols="12" sm="6">
        <nuxt-content :document="home" />
      </v-col>

      <v-col cols="12" sm="6">
        <v-img class="grey" :src="home.thumbnail" width="100%" aspect-ratio="1.66">
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular indeterminate color="grey lighten-2"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
    
    <h2 class="mt-8 mb-2 title">文章分类</h2>

    <v-row class="home-category">
      <v-col v-for="category in categories" :key="category.title">
        <v-card class="px-3 py-1">
          <nuxt-link class="title" :to="category.path">
            {{ category.title }}
          </nuxt-link>
        </v-card>
      </v-col>
    </v-row>

    <h2 class="mt-8 mb-2 title">最近更新</h2>

    <v-row class="home-blogs">
      <v-col v-for="blog in posts" :key="blog.slug" align-self="center" cols="12" sm="6">
        <v-card
          class="d-flex flex-no-wrap mb-4"
          outlined
          @click="$router.push({ path: blog.path })"
        >
          <v-img
            v-if="blog.thumbnail"
            class="d-inline-block"
            :src="blog.thumbnail"
            :alt="blog.title"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular indeterminate color="grey lighten-2"></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-img v-else src="/images/placeholder.jpg"></v-img>

          <div class="d-flex flex-column justify-space-between px-3 py-4">
            <nuxt-link 
              :to="blog.path" 
              class="d-block font-weight-regular"
            >
              {{ blog.title }}
            </nuxt-link>

            <span class="grey--text text--darken-1 body-2">{{ $formatDate(blog.date) }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  async asyncData({ $content, params, store, error }) {
    const home = await $content("page/home").fetch();
    const categories = await $content("category").fetch();
    const posts = await $content("blog")
      .sortBy("createdAt", "desc")
      .only(["title", "path", "date", "thumbnail"])
      .limit(6)
      .fetch();

    return {
      home,
      categories,
      posts
    }
  }
}
</script>

<style lang="scss" scoped>
.home-category {
  .v-image {
    cursor: pointer;
  }
  .lightbox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.home-blogs {
  a {
    font-size: 1.025rem;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .v-image {
    max-width: 150px;
    height: 120px;
    border-radius: 0 !important;
  }
}
</style>