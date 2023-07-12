<template>
	<viewer :value=readmeText></viewer>
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

				this.readmeText = res.data;
			}

			const readmeLoadErr = (err)=>{
				console.error(err);
			}

			axios.get(loadUrl+`/${this.repoName}/${this.branchName}/${this.path}`)
        .then(readmeLoadThen)
        .catch(readmeLoadErr);
		}
	},

	computed: {
		changeMarkdown() {
		}
	}

}

</script>

<style scoped lang="scss">
@import "@/assets/scss/colors.scss";

</style>
