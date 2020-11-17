<template>
  <v-card class="blog mx-auto transparent py-6" max-width="760" elevation="0">
    <v-card
      v-for="blog in posts"
      :key="blog.slug"
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

    <div v-if="!posts.length" class="text-center mb-5 mt-3 grey--text text--darken-1">
      没有相关文章
    </div>

    <v-pagination
      v-model="page"
      :length="length"
      :total-visible="7"
    ></v-pagination>
  </v-card>
</template>

<script>
export default {
  async asyncData({ $content, params, store, error }) {
    const content = await $content("page/blog").fetch();

    const category = await $content("category", params.slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: "Page not found" });
      });

    const blogsCount = await $content("blog")
      .sortBy("createdAt", "desc")
      .where({ category: params.slug })
      .fetch();

    const limit = Number(content.limit);

    const posts = await $content("blog")
      .sortBy("createdAt", "desc")
      .only(["title", "path", "date", "thumbnail"])
      .where({ category: params.slug })
      .skip(0)
      .limit(limit)
      .fetch();

    return {
      category,
      posts,
      limit,
      page: 1,
      length: Math.ceil(blogsCount.length / limit)
    };
  },

  watch: {
    async page() {
      const blogsCount = await this.$content("blog")
      .sortBy("createdAt", "desc")
      .where({ category: this.$route.params.slug })
      .fetch();

     this.posts = await this.$content("blog")
      .sortBy("createdAt", "desc")
      .only(["title", "path", "date", "thumbnail"])
      .where({ category: this.$route.params.slug })
      .skip((this.page - 1) * this.limit)
      .limit(this.limit)
      .fetch();

      this.length = Math.ceil(blogsCount.length / this.limit);
    }
  },

  head() {
    return {
      title: this.category.title + " | " + this.$store.state.info.sitename,
    };
  }
};
</script>

<style lang="scss" scoped>
.blog {
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
