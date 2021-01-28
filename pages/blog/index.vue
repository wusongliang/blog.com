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
  watchQuery: ['page', 'q'],

  async asyncData ({ $content, route }) {
    const q = route.query.q;
    const page = Number(route.query.page) || 1;

    const content = await $content("page/blog").fetch();

    let query = $content("blog", { deep: true })
      .sortBy("date", "desc")
      .only(["title", "path", "date", "thumbnail"]);

    if (q) query = query.search('title', q);

    const limit = Number(content.limit);
    const blogsCount = await query.fetch();
    const blogs = await query.skip((page - 1) * limit).limit(limit).fetch();

    return {
      q,
      limit,
      blogs,
      content,
      page,
      length: Math.ceil(blogsCount.length / limit)
    }
  },

  watch: {
    page(val) {
      this.getBlogs(val);
    }
  },

  methods: {
    search() {
      this.getBlogs(1);
    },
    async getBlogs(page) {
      let query = this.$content("blog", { deep: true })
        .sortBy("date", "desc")
        .only(["title", "path", "date", "thumbnail"]);

      if (this.q) query = query.search('title', this.q);

      const blogsCount = await query.fetch();
      this.blogs = await query.skip((page - 1) * this.limit).limit(this.limit).fetch();
      this.length = Math.ceil(blogsCount.length / this.limit);
      this.setRouter(page);
    },
    setRouter(page) {
      const query = {};
      if (this.q) query.q = this.q;
      if (page) query.page = page;
      this.$router.push({ name: 'blog', query })
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