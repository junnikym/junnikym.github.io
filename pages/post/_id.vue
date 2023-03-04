<template>
  <GithubReadme v-if="type==='repo'"
                :repoName="repoName"/>
</template>

<script>

import axios from "axios";
import GithubReadme from "@/components/post/GithubReadme.vue";

const username = "junnikym";
const repo = "blog-post";

export default {
  name: "PostIndexPage",
  components: { GithubReadme },
  data() {
    return {
      type: null,
      repoName: null,
    }
  },
  created() {
    this.loadPostInfos()
  },
  methods: {

    convertResponse(res) {
      for(let key in res) {
        const body = res[key].body;
        const repo = body.startsWith('!!repo')
        if(repo) {
          this.type = 'repo';
          this.repoName = body.slice(7);
          console.log(this.repoName);
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

      await axios.get(loadUrl)
        .then(issueCommentsLoadThen)
        .catch(issueCommentsLoadErr);
    },
  },
}
</script>

<style scoped>

</style>
