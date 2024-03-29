<template>
  <div class="post-card-grid">
    <masonry :cols="{ default: 3, 1300: 2, 880: 1 }">
      <PostCard v-for="(post, index) in posts"
                class="post-card"
                :key="index"
                :number="post.number"
                :title="post.title"
                :imageUrl="post.imageUrl"
                :imageSize="post.imageSize"
                :preview="post.preview"
                :createdAt="post.createdAt"
                :style="{'z-index': 100000-index}" />
    </masonry>
  </div>
</template>

<script>
import PostCard from "@/components/post/PostCard.vue";
import axios from "axios";

const username = "junnikym";
const repo = "blog-post";

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
    convertIssue(issue, detailInfo) {
      return {
        number: parseInt(issue.number),
        title: issue.title,
        preview: detailInfo.preview,
        createdAt: issue.created_at.split("T")[0],
        imageUrl: detailInfo.image ? `https://github.com/junnikym/blog-post/blob/main/images/${detailInfo.image}?raw=true` : undefined,
        imageSize: detailInfo.imageSize,
      }
    },

    async loadPostList() {
      const issuesLoadThen = (res)=> {
        if(res.status != 200)
          return console.error("Can Not Found");
        
          res.data.map( it=> this.loadPostInfos(it) )
      }

      const issuesLoadErr = (err)=>{
        console.error("on issue load : \n", err);
      }

      await axios.get(`https://api.github.com/repos/${username}/${repo}/issues?state=closed`, {
          headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": `${process.env.GITHUB_API_KEY}`,
            "X-GitHub-Api-Version": "2022-11-28",
          }
        })
        .then(issuesLoadThen)
        .catch(issuesLoadErr);
    },

    async loadPostInfos(issue) {
      const detailInfo = JSON.parse(issue.body)
      const post = this.convertIssue(issue, detailInfo)
      this.posts = this.posts.concat(post);
      this.posts.sort((lhs, rhs)=> rhs.number-lhs.number )
    },
  },

}
</script>

<style scoped lang="scss">
@import "@/assets/scss/colors.scss";
@import "@/assets/scss/post/PostVariables.scss";

.post-card-grid {
  max-width: 1500px;
  padding: 20px;

  @media (max-width: $small-mode-width) {
    padding: 50px 10px;
  }
}
</style>