(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-983f8b6e"],{"4e11":function(e,t,r){"use strict";r("5d0f")},"5d0f":function(e,t,r){},a55b:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"login-wrapper"}},[r("div",{attrs:{id:"login"}},[e._m(0),r("div",{attrs:{id:"credentials"}},[r("span",{attrs:{id:"credentials-title"}},[e._v("Login")]),r("label",[e._v("Username")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.credentials.username,expression:"credentials.username"}],attrs:{type:"text"},domProps:{value:e.credentials.username},on:{input:function(t){t.target.composing||e.$set(e.credentials,"username",t.target.value)}}}),r("label",[e._v("Password")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.credentials.password,expression:"credentials.password"}],attrs:{type:"password"},domProps:{value:e.credentials.password},on:{input:function(t){t.target.composing||e.$set(e.credentials,"password",t.target.value)}}}),r("button",{staticClass:"main",attrs:{id:"login-button"},on:{click:e.attemptLogin}},[e._v("Login")])])])])},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"logo-pane"}},[n("img",{attrs:{id:"logo",src:r("cf05"),alt:"RMS logo"}}),n("div",{attrs:{id:"title"}},[e._v("RMS")]),n("div",{attrs:{id:"version"}},[e._v("V1.0.0")])])}],s=r("1da1"),i=(r("96cf"),r("99af"),r("5ce5")),o={attemptLogin:function(e,t){return Object(s["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=btoa("".concat(e,":").concat(t)),localStorage.setItem("authHeader",n),r.prev=2,r.next=5,i["a"].get("general/get-info");case 5:return r.abrupt("return",!0);case 8:return r.prev=8,r.t0=r["catch"](2),r.abrupt("return",!1);case 11:case"end":return r.stop()}}),r,null,[[2,8]])})))()}},c={data:function(){return{credentials:{password:"",username:""}}},methods:{attemptLogin:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o.attemptLogin(e.credentials.username,e.credentials.password);case 2:if(r=t.sent,!r){t.next=10;break}return t.next=6,e.$router.push("rms/dashboard");case 6:e.$router.go(1),notifications.add("info","Login successful"),t.next=11;break;case 10:notifications.add("error","Login attempt failed");case 11:case"end":return t.stop()}}),t)})))()}}},u=c,d=(r("4e11"),r("2877")),l=Object(d["a"])(u,n,a,!1,null,"37794927",null);t["default"]=l.exports},cf05:function(e,t,r){e.exports=r.p+"img/logo.4aeaac5c.png"}}]);
//# sourceMappingURL=chunk-983f8b6e.a000201a.js.map