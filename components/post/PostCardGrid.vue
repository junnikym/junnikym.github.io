<template>
  <div class="post-card-grid">
    <masonry :cols="{ default: 3, 1300: 2, 880: 1 }">
      <PostCard v-for="(post, index) in posts"
                class="post-card"
                :key="index"
                :number="post.number"
                :title="post.title"
                :preview="post.preview"
                :createdAt="post.createdAt"
                data-aos="fade-up" />
    </masonry>
  </div>
</template>

<script>
import PostCard from "@/components/post/PostCard.vue";
import axios from "axios";

const username = "junnikym";
const repo = "blog-post";
const loadUrl = `https://api.github.com/repos/${username}/${repo}/issues?state=closed`;

export default {
  components: {
    PostCard,
  },
  data() {
    return {
      posts: [],
      page: 0
    }
  },

  created() {
    this.loadPostList()
  },

  methods: {

    convertResponse(res) {
      return {
        number: res.number,
        title: res.title,
        preview: res.body,
        createdAt: res.created_at.split("T")[0],
      }
    },

    async loadPostList() {
      const issuesLoadThen = (res)=> {
        if(res.status != 200)
          return console.error("Can Not Found");

        this.posts = this.posts.concat(
          res.data.map( it=> this.convertResponse(it) )
        );
      }

      const issuesLoadErr = (err)=>{
        console.error(err);
      }

      await axios.get(loadUrl)
        .then(issuesLoadThen)
        .catch(issuesLoadErr);

      return this.posts;
    }

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
