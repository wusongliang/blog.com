<template>
  <v-card class="mx-auto transparent py-6 px-sm-3" elevation="0" max-width="860">
    <h1 class="headline mb-5">{{ about.title }}</h1>

    <div class="post-content">
      <nuxt-content :document="about" />
    </div>
  </v-card>
</template>

<script>
export default {
  async asyncData({ $content, params, error, store }) {
    const about = await $content("page/about")
    .fetch()
    .catch((err) => {
      error({ statusCode: 404, message: "Page not found" });
    });;

    return {
      about
    }
  },

  head() {
    return {
      title: this.about.title,
      meta: [
        { hid: 'description', name: 'description', content: this.about.description }
      ]
    }
  }
}
</script>