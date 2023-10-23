<template>
  <div>
    <div class="markdown-body" v-html="readmeText"></div>
  </div>
</template>

<script>

import axios from "axios";

// LearningTDD/main/README.md
const username = "junnikym";
const githubRawContent = "https://raw.githubusercontent.com";
const loadUrl = githubRawContent+"/"+username;

export default {
  props: {
    repoName: {
      type: String,
      default: null
    },
    branchName: {
      type: String,
      default: 'main'
    },
    path: {
      type: String,
      default: "README.md"
    }
  },

  data() {
    return {
      readmeText: "",
    }
  },

  created() {
    this.loadGithubReadme();
  },

  methods: {
    async loadGithubReadme() {
      const readmeLoadThen = (res)=> {
        if(res.status != 200)
          return console.error("Can Not Found");

        this.renderMarkdown(res.data)
      }

      const readmeLoadErr = (err)=>{
        console.error(err);
      }

      axios.get(loadUrl+`/${this.repoName}/${this.branchName}/${this.path}`)
      .then(readmeLoadThen)
      .catch(readmeLoadErr);
    },

    async renderMarkdown(markdown) {
      const renderMarkdownLoadThen = (res)=> {
        if(res.status != 200)
          return console.error("Can Not Found");

        this.readmeText = res.data;
      }

      const renderMarkdownLoadErr = (err)=>{
        console.error(err);
      }

      await axios.post(
        "https://api.github.com/markdown", 
        {
          text: markdown
        },
        {
          headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": `${process.env.GITHUB_API_KEY}`,
            "X-GitHub-Api-Version": "2022-11-28",
          }
        }
      )
      .then(renderMarkdownLoadThen)
      .catch(renderMarkdownLoadErr);
    },
  },

  computed: {
    changeMarkdown() {
    }
  }

}

</script>

<style scoped lang="scss">
@import "@/assets/scss/colors.scss";

.markdown-body {
  background-color: $lighter-color;
}

</style>
