(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{394:function(e,n,t){"use strict";t.r(n);var r=t(11),o=(t(65),t(66)),c=t.n(o),d={data:function(){return{readmeText:""}},created:function(){this.loadGithubReadme()},methods:{loadGithubReadme:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var t,r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t=function(n){if(200!=n.status)return console.error("Can Not Found");e.readmeText=n.data},r=function(e){console.error(e)},c.a.get("https://raw.githubusercontent.com/junnikym/LearningTDD/main/README.md").then(t).catch(r);case 3:case"end":return n.stop()}}),n)})))()}},computed:{changeMarkdown:function(){}}},m=t(47),component=Object(m.a)(d,(function(){var e=this;return(0,e._self._c)("div",{domProps:{innerHTML:e._s(e.$md.render(e.readmeText))}})}),[],!1,null,null,null);n.default=component.exports}}]);