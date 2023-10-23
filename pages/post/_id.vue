<template>
  <div class="contents"> 
    <header>
      <PostHeader class="post-card"
                :number="postNumber"
                :title="'test'"
                :preview="'test'"
                :createdAt="'test'"/>
    </header>
    <section>
      <GithubReadme class="post"
                    v-if="type==='repo'"
                    :repoName="repoName"
                    :branchName="branchName"
                    :path="path" />
	  <Comment/>
    </section>
  </div>
</template>

<script>

import axios from "axios";
import PostHeader from "@/components/post/PostHeader.vue";
import GithubReadme from "@/components/post/GithubReadme.vue";
import Comment from "@/components/comment/Comment.vue";

const username = "junnikym";
const repo = "blog-post";

export default {
  name: "PostIndexPage",
  components: { GithubReadme },
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

.contents {
  place-items: center;
}

.post {
  display: flex;
  position: relative;
  justify-content: center;
  
  width: 100%;
  max-width: 820px;
}
header {
  display: flex;
  position: relative;
  width: 100%;

  .post-card {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    height: 100%;
  }
}
</style>
