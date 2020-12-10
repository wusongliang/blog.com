<template>
  <v-card class="mx-auto transparent py-6 px-sm-3" elevation="0" max-width="960">
    <v-row>
      <template v-for="category in categories">
        <v-col 
          :key="category.title" 
          cols="12" 
          sm="6"
        >
          <v-card class="pa-3" outlined>
            <nuxt-link class="title primary--text" :to="category.path">
              {{ category.title }}
            </nuxt-link>
            <div class="body-1 mt-1">{{ category.description }}</div>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-card>
</template>

<script>
export default {
  async asyncData({ $content, params, store, error }) {
    const categories = await $content("category")
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: "Page not found" });
      });

    return {
      categories
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>