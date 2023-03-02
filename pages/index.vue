<template>
  <div class="contents">
    <header>
      <div class="__profile">
        <RoundProfileImage class="__profile-image"></RoundProfileImage>
        <div class="__profile-info">
<!--          <h2> {{userInfo?.name}} </h2>-->
<!--          <h3> {{userInfo?.login}} </h3>-->
<!--          <h4> {{userInfo?.email}} </h4>-->
          <h2>김형준</h2>
          <h4>Junnikym</h4>
          <h4>junnikym@gmail.com</h4>
        </div>
      </div>
    </header>
    <section>

    </section>
    <footer>

    </footer>
  </div>
</template>

<script>
import RoundProfileImage from '@/components/profile/RoundProfileImage.vue'
import axios from "axios";

export default {

	name: 'IndexPage',

  data() {
    return {
      userInfo: null,
      profileInfoUrl: "https://api.github.com/users/junnikym",
    }
  },

	components: {
    RoundProfileImage
	},

  created() {
    this.loadUserInfo();
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
@import "@/assets/scss/layout.scss";

$profile-image-size: 200px;
$profile-info-size: $profile-image-size * 1.25;
$profile-padding: 20px;
$profile-margin: 50px;

$profile-max-width: ($profile-image-size + $profile-info-size + $profile-padding);
$profile-min-width: $profile-image-size;
$profile-max-height: ($profile-image-size * 1.5);
$profile-min-height: $profile-image-size;

.__profile {
  position: absolute;
  display: flex;
  flex-wrap: wrap;

  justify-self: center;
  top: $header-size - ($profile-image-size * (3/4));

  margin: 0;
  padding: $profile-padding;

  height: ($profile-padding * 2 + $profile-image-size);

  @media (min-width: ($profile-max-width + $profile-padding * 2 + $profile-margin * 2)) {
    width: $profile-max-width;
    height: $profile-min-height;

    .__profile-info {
      width: $profile-info-size;
      padding: 0 0 0 $profile-padding;
      color: white;
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
      color: black;
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
