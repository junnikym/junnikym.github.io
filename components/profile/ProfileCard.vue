<template>
  <div class="__profile">
    <RoundProfileImage class="__profile-image"></RoundProfileImage>
    <div class="__profile-info">
      <h2> {{userInfo?.name}} </h2>
      <h5> {{userInfo?.login}} </h5>
      <h5> {{userInfo?.email}} </h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RoundProfileImage from "@/components/profile/RoundProfileImage.vue";

export default {
  name: "ProfileCard",

  components: {
    RoundProfileImage
  },

  created() {
    this.loadUserInfo();
  },

  data() {
    return {
      userInfo: null,
      profileInfoUrl: "https://api.github.com/users/junnikym",
    }
  },

  methods: {

    async loadUserInfo() {
      const loadThen = (res)=> {
        if(res.status != 200)
          return console.error("Can Not Found");

        this.userInfo = res.data;
      }

      const loadErr = (err)=>{
        console.error(err);
      }

      axios.get(this.profileInfoUrl)
        .then(loadThen)
        .catch(loadErr);
    }

  },
}
</script>

<style lang="scss">
@import "@/assets/scss/colors.scss";
@import "@/assets/scss/profile/profile-variables.scss";

.__profile {
  display: flex;
  flex-wrap: wrap;

  margin: 0;
  padding: $profile-padding;

  height: ($profile-padding * 2 + $profile-image-size);

  @media (min-width: ($profile-max-width + $profile-padding * 2 + $profile-margin * 2)) {
    width: $profile-max-width;
    height: $profile-min-height;

    .__profile-info {
      width: $profile-info-size;
      padding: 0 0 0 $profile-padding;
      color: $lightest-color;
    }
    .__profile-image {
    }
  }

  @media (max-width: ($profile-max-width + $profile-padding * 2 + $profile-margin * 2)) {
    width: $profile-min-width;
    height: $profile-max-height;

    .__profile-info {
      width: $profile-image-size;
      padding: $profile-padding 0 0;
      color: $darkest-color;
    }
    .__profile-image {
    }
  }

  * {
    margin: 0;
    padding: 0;
  }

  .__profile-info {

  }

  .__profile-image {
    width: $profile-image-size;
    height: $profile-image-size;
  }
}

</style>
