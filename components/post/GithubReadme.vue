<template>
	<div v-html="$md.render(readmeText)">
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
    repoName: String,
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

			axios.get(loadUrl+`/${this.repoName}/main/README.md`)
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

<style>

</style>
