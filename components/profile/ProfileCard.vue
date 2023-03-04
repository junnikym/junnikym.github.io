<template>
  <div class="__profile">
    <RoundProfileImage class="__profile-image"></RoundProfileImage>
    <div class="__profile-info">
      <h2> {{userInfo?.name}} </h2>
      <a href="https://github.com/junnikym">
        <b class="__porifle_info_text"> <span class='github-icon'></span> {{userInfo?.login}} </b>
      </a>
      <a href="mailto:junnikym@gmail.com">
        <b class="__porifle_info_text"> <span class='email-icon'></span> {{userInfo?.email}} </b>
      </a>
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
    // this.loadUserInfo();
  },

  data() {
    return {
      userInfo: {
        name: "김형준",
        login: "junnikym",
        email: "junnikym@gmail.com"
      },
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
@import '@/assets/scss/icons.scss';
@import "assets/scss/profile/ProfileVariables.scss";

.__profile {
  display: flex;
  flex-wrap: wrap;

  margin: 0;
  padding: $profile-padding;

  height: ($profile-padding * 2 + $profile-image-size);

  @media (min-width: $profile-transforms-at) {
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

  @media (max-width: $profile-transforms-at) {
    width: $profile-min-width;
    height: $profile-max-height;

    .__profile-info {
      width: $profile-image-size;
      padding: $profile-padding 0 0;
      color: $darkest-color;
    }
    .__profile-image {
    }
    .github-icon, .email-icon {
      filter: invert(100%);
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

  $profile-info-text-size: 15px;
  $profile-info-icon-size: 15px;
  .__porifle_info_text {
    display: flex;
    align-items: center;
    font-size: $profile-info-text-size;
  }
  .github-icon, .email-icon {
    margin: 5px;
    width: $profile-info-icon-size;
    height: $profile-info-icon-size;
  }
  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      .__porifle_info_text, .github-icon, .email-icon {
        filter: invert(20%);
      }
    }
  }

}

</style>
