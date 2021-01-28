<template>
  <v-card class="blog mx-auto transparent py-6" max-width="720" elevation="0">
    <v-text-field
      v-model.trim="q"
      id="search"
      label="Search..."
      single
      dense
      outlined
      :append-icon="$vuetify.icons.values.mdiMagnify"
      @keyup.enter="search()"
      @click:append="search()"
    ></v-text-field>

    <v-card
      v-for="blog in blogs"
      :key="blog.slug"
      class="d-flex flex-no-wrap mb-4"
      outlined
      @click="$router.push({ path: blog.path })"
    >
      <div class="d-flex flex-column justify-space-between px-3 py-4">
        <nuxt-link 
          :to="blog.path" 
          class="d-block font-weight-regular mb-2"
        >
          {{ blog.title }}
        </nuxt-link>

        <span class="grey--text text--darken-1 body-2">{{ $formatDate(blog.date) }}</span>
      </div>
    </v-card>

    <div v-if="!blogs.length" class="text-center mb-5 mt-3 grey--text text--darken-1">
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
  async asyncData ({ $content }) {
    const content = await $content("page/blog").fetch();
    let query = $content("blog", { deep: true })
      .sortBy("date", "desc")
      .only(["title", "path", "date", "thumbnail"]);

    const limit = Number(content.limit) || 10;
    const blogsCount = await query.fetch();
    const blogs = await query.skip(0).limit(limit).fetch();
    const length = Math.ceil(blogsCount.length / limit);

    return {
      q: null,
      blogs,
      page: 1,
      length,
      content,
      limit,
      notWatchPage: false
    }
  },

  watch: {
    $route() {
      if (!Object.keys(this.$route.query).length) {
        this.notWatchPage = true;
        this.page = 1;
      }
      this.getBlogsByQuery();
    },
    page(val) {
      if (!this.notWatchPage) {
        this.setRouter(val);
      } else {
        this.notWatchPage = false;
      }
    }
  },

  created() {
    if (Object.keys(this.$route.query).length) {
      this.getBlogsByQuery();
    }
  },

  methods: {
    search() {
      this.setRouter(1);
    },
    async getBlogs(page) {
      let query = this.$content("blog", { deep: true })
        .sortBy("date", "desc")
        .only(["title", "path", "date", "thumbnail"]);

      if (this.q) query = query.search('title', this.q);

      const blogsCount = await query.fetch();
      this.blogs = await query.skip((page - 1) * this.limit).limit(this.limit).fetch();
      this.length = Math.ceil(blogsCount.length / this.limit);
    },
    setRouter(page) {
      const query = {};
      if (this.q) query.q = this.q;
      if (page) query.page = page;
      this.$router.push({ name: 'blog', query })
    },
    getBlogsByQuery() {
      this.q = this.$route.query.q;
      this.page = Number(this.$route.query.page) || this.page;
      this.getBlogs(this.page);
    }
  },

  head () {
    return {
      title: this.content.title,
      meta: [
        { hid: 'description', name: 'description', content: this.content.description }
      ]
    }
  }
}
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