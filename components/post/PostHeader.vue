<template>
  <div class="post-header">
    <h1 class="post-header-number">#{{number}}</h1>
    <h3 class="post-header-title">{{title}}</h3>
    <div class="post-header-contents">
      {{preview}}
    </div>
    <div class="post-header-created-at">{{createdAt}}</div>

    <div class="header-dividing-line"></div>
    <div class="post-header-share">
      <a><span class='link-icon'></span></a>
      <div class="vertical-dividing-line"></div>
    </div>

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
	color: $main-color;
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
    top: 185px; right: 0;
  }

  .header-dividing-line {
    position: absolute;
    top: 220px;
    width: 120%;
    height: 10px;
    border-radius: 5px;
    background-color: $main-color;
    box-shadow: -5px -5px 10px 5px $shadow-white-color,  5px 5px 10px 5px $shadow-dark-color;
  }

  .post-header-share {
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 45px;
    width: calc(100% - 50px);
    top: 245px; left: 0;
    padding: 10px 25px ;
    box-shadow: inset 2px 2px 8px $shadow-dark-color, inset -2px -2px 8px $shadow-white-color;
    border-radius: 15px;
    
    > *:not(.vertical-dividing-line) {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0;
      padding: 10px;

      box-shadow: -5px -5px 20px $shadow-white-color,  5px 5px 20px $shadow-dark-color;
      border-radius: 50%;

      &:hover {
        box-shadow: -2px -2px 5px $shadow-white-color, 2px 2px 5px $shadow-dark-color;
      }

      &:active {
        box-shadow: inset 1px 1px 2px $shadow-white-color, inset -1px -1px 2px $shadow-white-color;
      }
    }

    .vertical-dividing-line {
      padding: 0px;
      margin: 0px 15px;
      width: 2px;
      height: 70%;
      background-color: $main-color;
      box-shadow: -1px -1px 2px 1px $shadow-white-color,  1px 1px 2px 1px $shadow-dark-color;
      border-radius: 1px;
    }
  }
}
</style>
