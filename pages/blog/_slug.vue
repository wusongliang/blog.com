<template>
  <v-card class="mx-auto transparent py-6 px-sm-3" elevation="0" max-width="860">
    <h1 class="headline">{{post.title}}</h1>

    <ul class="d-flex align-center pl-2 mt-4 mb-6 body-2">
      <li class="d-inline-block mr-3">{{ $formatDate(post.date) }}</li>
      <li v-if="post.category" class="d-inline-block">
        <div class="tag">
          <nuxt-link
            :to="category.path"
            class="grey--text"
          >{{post.category}}</nuxt-link>
        </div>
      </li>
    </ul>

    <div class="post-content">
      <nuxt-content :document="post" />
    </div>
  </v-card>
</template>



<script>
export default {
  async asyncData({ $content, params, error }) {
    const post = await $content("blog", params.slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: "Page not found" });
      });

    const [category] = await $content("category")
      .where({ title: post.category })
      .fetch()
      .catch((err) => {
        console.error(err)
      });

    return {
      category,
      post,
    };
  },
  transition(to, from) {
    if (!from) {
      return "slide-left";
    } else {
      return "slide-right";
    }
  },
  head() {
    return {
      title: this.post.title + " | " + this.$store.state.info.sitename,
      meta: [
        // { hid: 'description', name: 'description', content: this.article.description },
        // Open Graph
        { hid: "og:title", property: "og:title", content: this.post.title },
        // { hid: 'og:description', property: 'og:description', content: this.article.description },
        // Twitter Card
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.post.title,
        },
        // { hid: 'twitter:description', name: 'twitter:description', content: this.page.description }
      ],
    };
  }
};
</script>
