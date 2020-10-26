<template>
  <v-card class="blog mx-auto transparent py-6" max-width="760" elevation="0">
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
  watchQuery: true,

  async asyncData ({ $content, route }) {
    const q = route.query.q;

    const content = await $content("page/blog").fetch();

    let query = $content("blog", { deep: true })
      .sortBy("date", "desc")
      .only(["title", "path", "date", "thumbnail"]);

    if (q) {
      //query = query.search(q);
      query = query.search('title', q);
    }

    const limit = Number(content.limit);
    const blogsCount = await query.fetch();
    const blogs = await query.skip(0).limit(limit).fetch();

    return {
      q,
      limit,
      blogs,
      content,
      page: 1,
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