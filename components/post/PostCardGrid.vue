<template>
  <div class="post-card-grid">
    <masonry :cols="{ default: 3, 1300: 2, 880: 1 }">
      <PostCard v-for="(post, index) in posts"
                class="post-card"
                :key="index"
                data-aos="fade-up" />
    </masonry>
  </div>
</template>

<script>
import PostCard from "@/components/post/PostCard.vue";

export default {
  components: {
    PostCard,
  },
  data() {
    return {
      posts: [
        { title: "this is title" },
        { title: "this is title" },
        { title: "this is title" },
        { title: "this is title" },
        { title: "this is title" },
        { title: "this is title" },
        { title: "this is title" },
        { title: "this is title" },
        { title: "this is title" },
        { title: "this is title" },
        { title: "this is title" },
      ],
      page: 0
    }
  },
  methods: {
  },

};
</script>

<style scoped lang="scss">
.post-card-grid {
  max-width: 1500px;
}
.post-card{
  margin: 20px;
}
</style>
