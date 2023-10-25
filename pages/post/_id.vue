<template>
  <div class="contents"> 
    <header>
      <LayoutHeader></LayoutHeader>
      <PostHeader class="post-header"
                :number="postNumber"
                :title="'test'"
                :preview="'test'"
                :createdAt="'test'"/>
    </header>
    <section>
      <Post class="post-contents"
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
      type: null,
      repoName: null,
      branchName: null,
      path: null,
      postNumber: null,
    }
  },
  created() {
    this.loadPostInfos();
    this.postNumber = parseInt(this.$route.params.id);
  },
  methods: {
    textToJson(txt) {
      try {
        return JSON.parse(txt)
      } catch(e) {
        return null;
      }
    },
    convertResponse(res) {
      for(let key in res) {
        const body = res[key].body;
        const json = this.textToJson(body);
        if(json) {
          this.type = json.type;
          this.repoName = json.repo;
          this.branchName = json.branch;
          this.path = json.path
          return;
        }
      }
    },
    async loadPostInfos() {

      const loadUrl = `https://api.github.com/repos/${username}/${repo}/issues/${this.$route.params.id}/comments?owner=${username}`;

      const issueCommentsLoadThen = (res)=> {
        if(res.status != 200)
          return console.error("Can Not Found");

        return this.convertResponse(res.data);
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

$post-header-max-width: 620px;
$post-contents-max-width: 820px;

.contents {
  place-items: center;

  header {
    display: flex;
    position: relative;
    margin: 0; padding: 0;
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

    .post-content {
      width: 100%;
    }
  }

}
</style>
