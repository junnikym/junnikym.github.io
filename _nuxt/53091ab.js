(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{391:function(e,t,n){"use strict";n.r(t);var r=n(11),o=(n(65),n(89),n(66)),c=n.n(o),d={props:{repoName:{type:String,default:null},branchName:{type:String,default:"main"},path:{type:String,default:"README.md"}},data:function(){return{readmeText:""}},created:function(){this.loadGithubReadme()},methods:{loadGithubReadme:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=function(t){if(200!=t.status)return console.error("Can Not Found");e.readmeText=t.data},r=function(e){console.error(e)},c.a.get("https://raw.githubusercontent.com/junnikym"+"/".concat(e.repoName,"/").concat(e.branchName,"/").concat(e.path)).then(n).catch(r);case 3:case"end":return t.stop()}}),t)})))()}},computed:{changeMarkdown:function(){}}},m=n(47),component=Object(m.a)(d,(function(){var e=this;return(0,e._self._c)("div",{domProps:{innerHTML:e._s(e.$md.render(e.readmeText))}})}),[],!1,null,null,null);t.default=component.exports}}]);