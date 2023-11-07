<template>
  <div class="contents"> 
    <header>
      <LayoutHeader></LayoutHeader>
      <PostHeader class="post-header"
                :postNumber="postNumber"
                :title="title"
                :preview="preview"
                :createdAt="createdAt"/>
    </header>
    <section>
      <Post class="post-contents"
            :id="id"
            :type="type"
            :repoName="repoName"
            :branchName="branchName"
            :path="path" />
    </section>
  </div>
</template>

<script>

import axios from "axios";
import LayoutHeader from "@/components/common/Header.vue";
import PostHeader from "@/components/post/PostHeader.vue";
import Post from "@/components/post/Post.vue";

const username = "junnikym";
const repo = "blog-post";

export default {
  name: "PostIndexPage",
  components: { Post, PostHeader, LayoutHeader },
  data() {
    return {
      id: null,
      type: null,
      repoName: null,
      branchName: null,
      path: null,
      postNumber: null,
      title: null,
      preview: null,
      createdAt: null,
    }
  },
  created() {
    this.id = parseInt(this.$route.params.id);
    this.postNumber = parseInt(this.$route.params.id);
    this.loadPostInfos();
  },
  methods: {
    async loadPostInfos() {

      const loadUrl = `https://api.github.com/repos/${username}/${repo}/issues/${this.$route.params.id}?owner=${username}`;

      const issueCommentsLoadThen = (res)=> {
        if(res.status != 200)
          return console.error("Can Not Found");

        const issue = res.data
        const details = JSON.parse(res.data.body)

        this.type = details.type;
        this.repoName = details.repo;
        this.branchName = details.branch;
        this.path = details.path;
        this.postNumber = details.number ? details.number : this.postNumber;
        this.title = issue.title;
        this.preview = details.preview;
        this.createdAt = details.createdAt ? details.createdAt : issue.createdAt;
      }

      const issueCommentsLoadErr = (err)=>{
        console.error(err);
      }

      await axios.get(loadUrl, {
          headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": `${process.env.GITHUB_API_KEY}`,
            "X-GitHub-Api-Version": "2022-11-28",
          }
        })
        .then(issueCommentsLoadThen)
        .catch(issueCommentsLoadErr);
    },
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/colors.scss";
@import "@/assets/scss/layout.scss";

$post-header-max-width: 820px;
$post-contents-max-width: 820px;

.contents {
  place-items: center;

  header {
    display: flex;
    position: relative;
    margin: 0; 
    padding: 25px;
    box-sizing: border-box;
    width: 100%;
    height: auto;

    .post-header {
      position: relative;
      display: flex;
      margin: 0 auto;
      margin-top: 90px;
      justify-content: center;
      width: 100%;
      max-width: $post-header-max-width;
    }
  }

  section {
    width: 100%;
    max-width: $post-contents-max-width;
    overflow: hidden;
    margin: 25px 0 25px 0;
    border-radius: 15px;
    box-shadow: -5px -5px 20px $shadow-white-color,  5px 5px 20px $shadow-dark-color;

    @media (max-width: $post-contents-max-width) {
      border-radius: 0px;
    }
  }

}
</style>
