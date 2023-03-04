<template>
  <GithubReadme v-if="type==='repo'"
                :repoName="repoName"
                :branchName="branchName"
                :path="path" />
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
      branchName: null,
      path: null
    }
  },
  created() {
    this.loadPostInfos()
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

      await axios.get(loadUrl)
        .then(issueCommentsLoadThen)
        .catch(issueCommentsLoadErr);
    },
  },
}
</script>

<style scoped>

</style>
