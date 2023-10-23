<template>
  <div class="post-header">
    <h1 class="post-header-number">#{{number}}</h1>
    <h3 class="post-header-title">{{title}}</h3>
    <div class="post-header-contents">
      {{preview}}
    </div>
    <div class="post-header-created-at">{{createdAt}}</div>
  </div>
</template>

<script>
import axios from "axios";

const username = "junnikym";
const repo = "blog-post";

export default {
  name: "PostHeader",

  props: {
    number: Number,
  },

  created() {
    this.loadPostHeaderInfos()
  },

  data() {
    return {
      title: "",
      preview: "",
      createdAt: "",
    }
  },

  methods: {

    async loadPostHeaderInfos() {
      
      const issuesLoadThen = (res)=> {
        if(res.status != 200)
          return console.error("Can Not Found");

        this.title = res.data.title;
        this.preview = res.data.body;
        this.createdAt = res.data.created_at.split("T")[0];  
      }

      const issuesLoadErr = (err)=>{
        console.error(err);
      }

	    const loadUrl = `https://api.github.com/repos/${username}/${repo}/issues/${this.number}`;
      await axios.get(loadUrl, {
          headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": `${process.env.GITHUB_API_KEY}`,
            "X-GitHub-Api-Version": "2022-11-28",
          }
        })
        .then(issuesLoadThen)
        .catch(issuesLoadErr);

      return this.posts;
    }

  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/colors.scss";

* {
    margin: 0 auto;
    padding: 0;
}

.post-header {
  position: absolute;
  width: 100%;
  font-weight: 600;

  * {
	color: white;
	opacity: 0.75;
  }

  color: $dark-color;

  .post-header-number {
    position: absolute;
    bottom: 15px; right: 0;
    font-size: 100px;
  }

  .post-header-title {
    position: absolute;
    top: 15px; left: 0;
    font-size: 32px;
  }
  .post-header-contents {
    position: absolute;
    top: 60px; left: 0;
    font-size: 18px;
  }

  .post-header-created-at {
    position: absolute;
    font-weight: bold;
    bottom: 15px; right: 0;
  }
}
</style>
