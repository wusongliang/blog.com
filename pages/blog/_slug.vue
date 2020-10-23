<template>
  <v-card class="mx-auto transparent py-6 px-sm-3" elevation="0" max-width="860">
    <h1 class="headline">{{post.title}}</h1>

    <div class="my-4 body-2">
      <ul class="d-flex align-center pl-2">
        <li v-if="post.category" class="d-inline-block mr-3">
          <div class="tag">
            <nuxt-link
              :to="`/category/${post.category.toLowerCase()}`"
              class="grey--text"
            >{{post.category}}</nuxt-link>
          </div>
        </li>
        <li class="d-inline-block">{{ $formatDate(post.date) }}</li>
      </ul>
    </div>

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

    return {
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
