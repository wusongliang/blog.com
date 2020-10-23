<template>
  <v-card class="mx-auto transparent py-6 px-sm-3" elevation="0" max-width="960">
    <v-row>
      <template v-for="category in categories">
        <v-col 
          v-if="category.thumbnail" 
          :key="category.title" 
          cols="12" 
          sm="6"
        >
          <v-img
            class="d-inline-block"
            :src="category.thumbnail"
            :alt="category.title"
            width="100%"
            aspect-ratio="1.66"
            gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,1)"
            v-ripple 
            @click="$router.push({path: category.path})"
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

            <v-row align="end" class="lightbox white--text pa-3">
              <v-col>
                <nuxt-link class="title white--text" :to="category.path">
                  {{ category.title }}
                </nuxt-link>
                <div class="body-1 mt-1">{{ category.description }}</div>
              </v-col>
            </v-row>
          </v-img>
        </v-col>

        <v-col 
          v-else 
          :key="category.title" 
          cols="12" 
          sm="6" 
        >
          <v-img 
            src="/images/placeholder.jpg" 
            aspect-ratio="1.66"
            gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,1)"
            v-ripple 
            @click="$router.push({path: category.path})"
          >
            <v-row align="end" class="lightbox white--text pa-2">
              <v-col>
                <nuxt-link class="title white--text" :to="category.path">
                  {{ category.title }}
                </nuxt-link>
                <div class="body-1 mt-1">{{ category.description }}</div>
              </v-col>
            </v-row>
          </v-img>
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