(window.webpackJsonp=window.webpackJsonp||[]).push([[5,3,4],{363:function(e,t,o){var content=o(365);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(114).default)("5ef5ba92",content,!0,{sourceMap:!1})},364:function(e,t,o){"use strict";o(363)},365:function(e,t,o){var n=o(113)((function(i){return i[1]}));n.push([e.i,".profile-image[data-v-30bfd974]{border-radius:50%}",""]),n.locals={},e.exports=n},366:function(e,t,o){var content=o(369);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(114).default)("1b96b3d6",content,!0,{sourceMap:!1})},367:function(e,t,o){"use strict";o.r(t);var n={name:"RoundProfileImage",data:function(){return{profileUrl:"https://avatars.githubusercontent.com/u/59278013"}}},r=(o(364),o(47)),component=Object(r.a)(n,(function(){return(0,this._self._c)("img",{staticClass:"profile-image",attrs:{src:this.profileUrl,alt:"profile image"}})}),[],!1,null,"30bfd974",null);t.default=component.exports},368:function(e,t,o){"use strict";o(366)},369:function(e,t,o){var n=o(113)((function(i){return i[1]}));n.push([e.i,".__profile{display:flex;flex-wrap:wrap;height:240px;margin:0;padding:20px}@media (min-width:610px){.__profile{height:200px;width:470px}.__profile .__profile-info{color:#e8e9ec;padding:0 0 0 20px;width:250px}}@media (max-width:610px){.__profile{height:300px;width:200px}.__profile .__profile-info{color:#020406;padding:20px 0 0;width:200px}}.__profile *{margin:0;padding:0}.__profile .__profile-image{height:200px;width:200px}",""]),n.locals={},e.exports=n},370:function(e,t,o){"use strict";o.r(t);o(30);var n=o(11),r=(o(65),o(85)),l=o.n(r),f={name:"ProfileCard",components:{RoundProfileImage:o(367).default},created:function(){this.loadUserInfo()},data:function(){return{userInfo:null,profileInfoUrl:"https://api.github.com/users/junnikym"}},methods:{loadUserInfo:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var o,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:o=function(t){if(200!=t.status)return console.error("Can Not Found");e.userInfo=t.data},n=function(e){console.error(e)},l.a.get(e.profileInfoUrl).then(o).catch(n);case 3:case"end":return t.stop()}}),t)})))()}}},c=(o(368),o(47)),component=Object(c.a)(f,(function(){var e,t,o,n=this,r=n._self._c;return r("div",{staticClass:"__profile"},[r("RoundProfileImage",{staticClass:"__profile-image"}),n._v(" "),r("div",{staticClass:"__profile-info"},[r("h2",[n._v(" "+n._s(null===(e=n.userInfo)||void 0===e?void 0:e.name)+" ")]),n._v(" "),r("h5",[n._v(" "+n._s(null===(t=n.userInfo)||void 0===t?void 0:t.login)+" ")]),n._v(" "),r("h5",[n._v(" "+n._s(null===(o=n.userInfo)||void 0===o?void 0:o.email)+" ")])])],1)}),[],!1,null,null,null);t.default=component.exports},371:function(e,t,o){var content=o(373);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(114).default)("402b8c2d",content,!0,{sourceMap:!1})},372:function(e,t,o){"use strict";o(371)},373:function(e,t,o){var n=o(113)((function(i){return i[1]}));n.push([e.i,"html{-webkit-font-smoothing:antialiased;background-color:#e8e9ec;box-sizing:border-box}body{margin:0 auto;padding:0}.contents{align-content:start;justify-content:stretch}.contents,header{display:grid;width:100vw}header{align-content:center;background-color:#152540;height:280px;justify-content:center;position:relative}.profile-card{justify-self:center;position:absolute;top:130px}",""]),n.locals={},e.exports=n},374:function(e,t,o){"use strict";o.r(t);var n={name:"IndexPage",components:{ProfileCard:o(370).default}},r=(o(372),o(47)),component=Object(r.a)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"contents"},[t("header",[t("ProfileCard",{staticClass:"profile-card"})],1),e._v(" "),t("section"),e._v(" "),t("footer")])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{ProfileCard:o(370).default})}}]);