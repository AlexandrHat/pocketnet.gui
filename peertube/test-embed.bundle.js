!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./peertube/",n(n.s=156)}({1:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));function i(e,t,n,i){return new(n||(n=Promise))((function(o,r){function s(e){try{c(i.next(e))}catch(e){r(e)}}function a(e){try{c(i.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((i=i.apply(e,t||[])).next())}))}Object.create;Object.create},156:function(e,t,n){"use strict";n.r(t);var i=n(1),o=n(34);window.addEventListener("load",(()=>Object(i.a)(void 0,void 0,void 0,(function*(){const e=window.location.href.split("/"),t=e[e.length-1],n=window.location.pathname.startsWith("/video-playlists/"),r=-1===t.indexOf("?")?t:t.split("?")[0],s=document.createElement("iframe");s.src=n?`/video-playlists/embed/${r}?api=1`:`/videos/embed/${r}?api=1`;document.querySelector("#host").appendChild(s),console.log("Document finished loading.");const a=new o.PeerTubePlayer(document.querySelector("iframe"));window.player=a,console.log("Awaiting player ready..."),yield a.ready,console.log("Player is ready.");["pause","play","playbackStatusUpdate","playbackStatusChange"].forEach((e=>{a.addEventListener(e,(t=>console.log(`PLAYER: event '${e}' received`,t))),console.log(`PLAYER: now listening for event '${e}'`),a.getCurrentPosition().then((e=>document.getElementById("playlist-position").innerHTML=e+""))}));let c=[],d=yield a.getPlaybackRate();const l=()=>Object(i.a)(void 0,void 0,void 0,(function*(){const e=document.querySelector("#rate-list");e.innerHTML="",c.forEach((t=>{if(d===t){const n=document.createElement("strong");n.innerText=`${t} (active)`,n.style.display="block",e.appendChild(n)}else{const n=document.createElement("a");n.href="javascript:;",n.innerText=t.toString(),n.addEventListener("click",(()=>{a.setPlaybackRate(t),d=t,l()})),n.style.display="block",e.appendChild(n)}}))}));a.getPlaybackRates().then((e=>{c=e,l()}));const u=()=>Object(i.a)(void 0,void 0,void 0,(function*(){const e=yield a.getCaptions(),t=document.querySelector("#caption-list");t.innerHTML="",e.forEach((e=>{if(console.log(e),"showing"===e.mode){const n=document.createElement("strong");n.innerText=`${e.label} (active)`,n.style.display="block",t.appendChild(n)}else{const n=document.createElement("a");n.href="javascript:;",n.innerText=e.label,n.addEventListener("click",(()=>{a.setCaption(e.id),u()})),n.style.display="block",t.appendChild(n)}}))}));u();const h=e=>{const t=document.querySelector("#resolution-list");t.innerHTML="",e.forEach((e=>{if(e.active){const n=document.createElement("strong");n.innerText=`${e.label} (active)`,n.style.display="block",t.appendChild(n)}else{const n=document.createElement("a");n.href="javascript:;",n.innerText=e.label,n.addEventListener("click",(()=>{a.setResolution(e.id)})),n.style.display="block",t.appendChild(n)}}))};a.getResolutions().then((e=>h(e))),a.addEventListener("resolutionUpdate",(e=>h(e)));const f=e=>{document.getElementById("volume").innerText=100*e+"%"};a.getVolume().then((e=>f(e))),a.addEventListener("volumeChange",(e=>f(e)))}))))},23:function(e,t,n){e.exports=function(){"use strict";return function(){var e=Math.floor(1000001*Math.random()),t={};function n(e,n,i,o){function r(t){for(var n=0;n<t.length;n++)if(t[n].win===e)return!0;return!1}var s=!1;if("*"===n){for(var a in t)if(t.hasOwnProperty(a)&&"*"!==a&&"object"==typeof t[a][i]&&(s=r(t[a][i])))break}else t["*"]&&t["*"][i]&&(s=r(t["*"][i])),!s&&t[n]&&t[n][i]&&(s=r(t[n][i]));if(s)throw"A channel is already bound to the same window which overlaps with origin '"+n+"' and has scope '"+i+"'";"object"!=typeof t[n]&&(t[n]={}),"object"!=typeof t[n][i]&&(t[n][i]=[]),t[n][i].push({win:e,handler:o})}function i(e,n,i){for(var o=t[n][i],r=0;r<o.length;r++)o[r].win===e&&o.splice(r,1);0===t[n][i].length&&delete t[n][i]}function o(e){return Array.isArray?Array.isArray(e):-1!=e.constructor.toString().indexOf("Array")}var r={},s=function(e){try{var n=JSON.parse(e.data);if("object"!=typeof n||null===n)throw"malformed"}catch(e){return}var i,o,s,a=e.source,c=e.origin;if("string"==typeof n.method){var d=n.method.split("::");2==d.length?(i=d[0],s=d[1]):s=n.method}if(void 0!==n.id&&(o=n.id),"string"==typeof s){var l=!1;if(t[c]&&t[c][i])for(var u=0;u<t[c][i].length;u++)if(t[c][i][u].win===a){t[c][i][u].handler(c,s,n),l=!0;break}if(!l&&t["*"]&&t["*"][i])for(u=0;u<t["*"][i].length;u++)if(t["*"][i][u].win===a){t["*"][i][u].handler(c,s,n);break}}else void 0!==o&&r[o]&&r[o](c,s,n)};return window.addEventListener?window.addEventListener("message",s,!1):window.attachEvent&&window.attachEvent("onmessage",s),{build:function(t){var s=function(e){if(t.debugOutput&&window.console&&window.console.log){try{"string"!=typeof e&&(e=JSON.stringify(e))}catch(e){}window.console.log("["+d+"] "+e)}};if(!window.postMessage)throw"jschannel cannot run this browser, no postMessage";if(!window.JSON||!window.JSON.stringify||!window.JSON.parse)throw"jschannel cannot run this browser, no JSON parsing/serialization";if("object"!=typeof t)throw"Channel build invoked without a proper object argument";if(!t.window||!t.window.postMessage)throw"Channel.build() called without a valid window argument";window===t.window&&s("target window is same as present window -- use at your own risk");var a,c=!1;if("string"==typeof t.origin&&("*"===t.origin?c=!0:null!==(a=t.origin.match(/^https?:\/\/(?:[-a-zA-Z0-9_\.])+(?::\d+)?/))&&(t.origin=a[0].toLowerCase(),c=!0)),!c)throw"Channel.build() called with an invalid origin";if(void 0!==t.scope){if("string"!=typeof t.scope)throw"scope, when specified, must be a string";if(t.scope.split("::").length>1)throw"scope may not contain double colons: '::'"}else t.scope="__default";var d=function(){for(var e="",t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",n=0;n<5;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}(),l={},u={},h={},f=!1,p=[],g=[],m=function(e,t,n){var i=!1,o=!1;return{origin:t,invoke:function(t,i){if(!h[e])throw"attempting to invoke a callback of a nonexistent transaction: "+e;for(var o=!1,r=0;r<n.length;r++)if(t===n[r]){o=!0;break}if(!o)throw"request supports no such callback '"+t+"'";w({id:e,callback:t,params:i})},error:function(t,n){if(o=!0,!h[e])throw"error called for nonexistent message: "+e;delete h[e],w({id:e,error:t,message:n})},complete:function(t){if(o=!0,!h[e])throw"complete called for nonexistent message: "+e;delete h[e],w({id:e,result:t})},delayReturn:function(e){return"boolean"==typeof e&&(i=!0===e),i},completed:function(){return o}}},y=function(e,t,n){return window.setTimeout((function(){if(u[e]){var i="timeout ("+t+"ms) exceeded on method '"+n+"'";u[e].error&&u[e].error("timeout_error",i),delete u[e],delete r[e]}}),t)},v=function(e,n,i){if("function"==typeof t.gotMessageObserver)try{t.gotMessageObserver(e,i)}catch(e){s("gotMessageObserver() raised an exception: "+e.toString())}if(i.id&&n){h[i.id]={};var a=m(i.id,e,i.callbacks?i.callbacks:[]);if(l[n])try{if(i.callbacks&&o(i.callbacks)&&i.callbacks.length>0)for(var c=0;c<i.callbacks.length;c++){for(var d=i.callbacks[c],f=i.params,p=d.split("/"),g=0;g<p.length-1;g++){var y=p[g];"object"!=typeof f[y]&&(f[y]={}),f=f[y]}f[p[p.length-1]]=function(){var e=d;return function(t){return a.invoke(e,t)}}()}var v=l[n](a,i.params);a.delayReturn()||a.completed()||a.complete(v)}catch(e){var b="runtime_error",w=null;if("string"==typeof e?w=e:"object"==typeof e&&(e instanceof Error?(b=e.constructor.name,w=e.message):e&&o(e)&&2==e.length?(b=e[0],w=e[1]):"string"==typeof e.error&&(b=e.error,e.message?"string"==typeof e.message?w=e.message:e=e.message:w="")),null===w)try{void 0===(w=JSON.stringify(e))&&(w=e.toString())}catch(t){w=e.toString()}a.error(b,w)}else a.error("method_not_found","No method '"+n+"' was (yet) bound by the provider")}else i.id&&i.callback?u[i.id]&&u[i.id].callbacks&&u[i.id].callbacks[i.callback]?u[i.id].callbacks[i.callback](i.params):s("ignoring invalid callback, id:"+i.id+" ("+i.callback+")"):i.id?u[i.id]?(i.error?u[i.id].error&&u[i.id].error(i.error,i.message):void 0!==i.result?u[i.id].success(i.result):u[i.id].success(),delete u[i.id],delete r[i.id]):s("ignoring invalid response: "+i.id):n&&l[n]&&l[n]({origin:e},i.params)};n(t.window,t.origin,t.scope,v);var b=function(e){return[t.scope,e].join("::")},w=function(e,n){if(!e)throw"postMessage called with null message";if(n||f){if("function"==typeof t.postMessageObserver)try{t.postMessageObserver(t.origin,e)}catch(e){s("postMessageObserver() raised an exception: "+e.toString())}s("post message: "+JSON.stringify(e)+" with origin "+t.origin),t.window.postMessage(JSON.stringify(e),t.origin)}else s("queue message: "+JSON.stringify(e)),p.push(e)},k=function(e,n){if(s("ready msg received"),f&&!t.reconnect)throw"received ready message while in ready state.";f=!0,d.length<6&&("publish-request"===n.type?d+="-R":d+="-L"),s("ready msg accepted."),"publish-request"===n.type&&R.notify({method:"__ready",params:{type:"publish-reply",publish:g}});for(var i=0;i<n.publish.length;i++)"bind"===n.publish[i].action?O([n.publish[i].method],R.remote):delete R.remote[n.publish[i].method];for(t.reconnect||R.unbind("__ready",!0);p.length;)w(p.splice(0,1)[0]);g=[],"function"==typeof t.onReady&&t.onReady(R)},O=function(e,t){var n;e=[].concat(e);for(var i=0;i<e.length;i++)t[n=e[i].toString()]=function(e){return function(t,n,i){n?R.call({method:e,params:t,success:n,error:i}):R.notify({method:e,params:t})}}(n)},j=function(e,t){O([t],R.remote)},M=function(e,t){R.remote[t]&&delete R.remote[t]},R={remote:{},unbind:function(e,n){if(l[e]){if(!delete l[e])throw"can't delete method: "+e;return t.publish&&!n&&(f?R.notify({method:"__unbind",params:e}):g.push({action:"unbind",method:e})),!0}return!1},bind:function(e,n,i){if(!e||"string"!=typeof e)throw"'method' argument to bind must be string";if(!n||"function"!=typeof n)throw"callback missing from bind params";if(l[e])throw"method '"+e+"' is already bound!";return l[e]=n,t.publish&&!i&&(f?R.notify({method:"__bind",params:e}):g.push({action:"bind",method:e})),this},call:function(t){if(!t)throw"missing arguments to call function";if(!t.method||"string"!=typeof t.method)throw"'method' argument to call must be string";if(!t.success||"function"!=typeof t.success)throw"'success' callback missing from call";var n={},i=[],o=[],s=function(e,t){if(o.indexOf(t)>=0)throw"params cannot be a recursive data structure";if(t&&o.push(t),"object"==typeof t)for(var r in t)if(t.hasOwnProperty(r)){var a=e+(e.length?"/":"")+r;"function"==typeof t[r]?(n[a]=t[r],i.push(a),delete t[r]):"object"==typeof t[r]&&s(a,t[r])}};s("",t.params);var a={id:e,method:b(t.method),params:t.params};i.length&&(a.callbacks=i),t.timeout&&y(e,t.timeout,b(t.method)),u[e]={callbacks:n,error:t.error,success:t.success},r[e]=v,e++,w(a)},notify:function(e){if(!e)throw"missing arguments to notify function";if(!e.method||"string"!=typeof e.method)throw"'method' argument to notify must be string";w({method:b(e.method),params:e.params})},destroy:function(){i(t.window,t.origin,t.scope),window.removeEventListener?window.removeEventListener("message",v,!1):window.detachEvent&&window.detachEvent("onmessage",v),f=!1,l={},h={},u={},t.origin=null,p=[],s("channel destroyed"),d=""}};return R.bind("__ready",k,!0),R.bind("__bind",j,!0),R.bind("__unbind",M,!0),t.remote&&O(t.remote,R.remote),setTimeout((function(){d.length>0&&w({method:b("__ready"),params:{type:"publish-request",publish:g}},!0)}),0),R}}}()}()},34:function(e,t,n){"use strict";n.r(t),n.d(t,"PeerTubePlayer",(function(){return a}));var i=n(1),o=n(23);class r{constructor(){this.eventRegistrations={}}bindToChannel(e){for(const t of Object.keys(this.eventRegistrations))e.bind(t,((e,n)=>this.fire(t,n)))}registerTypes(e){for(const t of e)this.eventRegistrations[t]={registrations:[]}}fire(e,t){this.eventRegistrations[e].registrations.forEach((e=>e(t)))}addListener(e,t){return this.eventRegistrations[e]?(this.eventRegistrations[e].registrations.push(t),!0):(console.warn(`PeerTube: addEventListener(): The event '${e}' is not supported`),!1)}removeListener(e,t){return!!this.eventRegistrations[e]&&(this.eventRegistrations[e].registrations=this.eventRegistrations[e].registrations.filter((e=>e===t)),!0)}}const s=["pause","play","playbackStatusUpdate","playbackStatusChange","resolutionUpdate","volumeChange"];class a{constructor(e,t){this.embedElement=e,this.scope=t,this.eventRegistrar=new r,this.eventRegistrar.registerTypes(s),this.constructChannel(),this.prepareToBeReady()}destroy(){this.embedElement.remove()}addEventListener(e,t){return this.eventRegistrar.addListener(e,t)}removeEventListener(e,t){return this.eventRegistrar.removeListener(e,t)}get ready(){return this.readyPromise}play(){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("play")}))}pause(){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("pause")}))}setVolume(e){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("setVolume",e)}))}getVolume(){return Object(i.a)(this,void 0,void 0,(function*(){return this.sendMessage("getVolume")}))}setCaption(e){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("setCaption",e)}))}getCaptions(){return Object(i.a)(this,void 0,void 0,(function*(){return this.sendMessage("getCaptions")}))}seek(e){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("seek",e)}))}setResolution(e){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("setResolution",e)}))}getResolutions(){return Object(i.a)(this,void 0,void 0,(function*(){return this.sendMessage("getResolutions")}))}getPlaybackRates(){return Object(i.a)(this,void 0,void 0,(function*(){return this.sendMessage("getPlaybackRates")}))}getPlaybackRate(){return Object(i.a)(this,void 0,void 0,(function*(){return this.sendMessage("getPlaybackRate")}))}setPlaybackRate(e){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("setPlaybackRate",e)}))}playNextVideo(){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("playNextVideo")}))}playPreviousVideo(){return Object(i.a)(this,void 0,void 0,(function*(){yield this.sendMessage("playPreviousVideo")}))}getCurrentPosition(){return Object(i.a)(this,void 0,void 0,(function*(){return this.sendMessage("getCurrentPosition")}))}constructChannel(){this.channel=o.build({window:this.embedElement.contentWindow,origin:"*",scope:this.scope||"peertube"}),this.eventRegistrar.bindToChannel(this.channel)}prepareToBeReady(){let e,t;this.readyPromise=new Promise(((n,i)=>{e=n,t=i})),this.channel.bind("ready",(n=>n?e():t())),this.channel.call({method:"isReady",success:t=>t?e():null})}sendMessage(e,t){return new Promise(((n,i)=>{this.channel.call({method:e,params:t,success:e=>n(e),error:e=>i(e)})}))}}window.PeerTubePlayer=a}});
//# sourceMappingURL=test-embed.bundle.js.map