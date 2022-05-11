var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function r(t,r){return t(r={exports:{}},r.exports),r.exports}var e=r(function(t,r){var e;t.exports=e=e||function(t,r){var e=Object.create||function(){function t(){}return function(r){var e;return t.prototype=r,e=new t,t.prototype=null,e}}(),i={},n=i.lib={},o=n.Base={extend:function(t){var r=e(this);return t&&r.mixIn(t),r.hasOwnProperty("init")&&this.init!==r.init||(r.init=function(){r.$super.init.apply(this,arguments)}),r.init.prototype=r,r.$super=this,r},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var r in t)t.hasOwnProperty(r)&&(this[r]=t[r]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},s=n.WordArray=o.extend({init:function(t,r){t=this.words=t||[],this.sigBytes=null!=r?r:4*t.length},toString:function(t){return(t||u).stringify(this)},concat:function(t){var r=this.words,e=t.words,i=this.sigBytes,n=t.sigBytes;if(this.clamp(),i%4)for(var o=0;o<n;o++)r[i+o>>>2]|=(e[o>>>2]>>>24-o%4*8&255)<<24-(i+o)%4*8;else for(o=0;o<n;o+=4)r[i+o>>>2]=e[o>>>2];return this.sigBytes+=n,this},clamp:function(){var r=this.words,e=this.sigBytes;r[e>>>2]&=4294967295<<32-e%4*8,r.length=t.ceil(e/4)},clone:function(){var t=o.clone.call(this);return t.words=this.words.slice(0),t},random:function(r){for(var e,i=[],n=function(r){r=r;var e=987654321,i=4294967295;return function(){var n=((e=36969*(65535&e)+(e>>16)&i)<<16)+(r=18e3*(65535&r)+(r>>16)&i)&i;return n/=4294967296,(n+=.5)*(t.random()>.5?1:-1)}},o=0;o<r;o+=4){var h=n(4294967296*(e||t.random()));e=987654071*h(),i.push(4294967296*h()|0)}return new s.init(i,r)}}),h=i.enc={},u=h.Hex={stringify:function(t){for(var r=t.words,e=t.sigBytes,i=[],n=0;n<e;n++){var o=r[n>>>2]>>>24-n%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(t){for(var r=t.length,e=[],i=0;i<r;i+=2)e[i>>>3]|=parseInt(t.substr(i,2),16)<<24-i%8*4;return new s.init(e,r/2)}},a=h.Latin1={stringify:function(t){for(var r=t.words,e=t.sigBytes,i=[],n=0;n<e;n++)i.push(String.fromCharCode(r[n>>>2]>>>24-n%4*8&255));return i.join("")},parse:function(t){for(var r=t.length,e=[],i=0;i<r;i++)e[i>>>2]|=(255&t.charCodeAt(i))<<24-i%4*8;return new s.init(e,r)}},f=h.Utf8={stringify:function(t){try{return decodeURIComponent(escape(a.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return a.parse(unescape(encodeURIComponent(t)))}},c=n.BufferedBlockAlgorithm=o.extend({reset:function(){this._data=new s.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=f.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(r){var e=this._data,i=e.words,n=e.sigBytes,o=this.blockSize,h=n/(4*o),u=(h=r?t.ceil(h):t.max((0|h)-this._minBufferSize,0))*o,a=t.min(4*u,n);if(u){for(var f=0;f<u;f+=o)this._doProcessBlock(i,f);var c=i.splice(0,u);e.sigBytes-=a}return new s.init(c,a)},clone:function(){var t=o.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),p=(n.Hasher=c.extend({cfg:o.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){c.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(r,e){return new t.init(e).finalize(r)}},_createHmacHelper:function(t){return function(r,e){return new p.HMAC.init(t,e).finalize(r)}}}),i.algo={});return i}(Math)}),i=r(function(t,r){var i;t.exports=(i=e,function(t){var r=i,e=r.lib,n=e.WordArray,o=e.Hasher,s=r.algo,h=[],u=[];!function(){function r(r){for(var e=t.sqrt(r),i=2;i<=e;i++)if(!(r%i))return!1;return!0}function e(t){return 4294967296*(t-(0|t))|0}for(var i=2,n=0;n<64;)r(i)&&(n<8&&(h[n]=e(t.pow(i,.5))),u[n]=e(t.pow(i,1/3)),n++),i++}();var a=[],f=s.SHA256=o.extend({_doReset:function(){this._hash=new n.init(h.slice(0))},_doProcessBlock:function(t,r){for(var e=this._hash.words,i=e[0],n=e[1],o=e[2],s=e[3],h=e[4],f=e[5],c=e[6],p=e[7],l=0;l<64;l++){if(l<16)a[l]=0|t[r+l];else{var d=a[l-15],v=a[l-2];a[l]=((d<<25|d>>>7)^(d<<14|d>>>18)^d>>>3)+a[l-7]+((v<<15|v>>>17)^(v<<13|v>>>19)^v>>>10)+a[l-16]}var y=i&n^i&o^n&o,m=p+((h<<26|h>>>6)^(h<<21|h>>>11)^(h<<7|h>>>25))+(h&f^~h&c)+u[l]+a[l];p=c,c=f,f=h,h=s+m|0,s=o,o=n,n=i,i=m+(((i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22))+y)|0}e[0]=e[0]+i|0,e[1]=e[1]+n|0,e[2]=e[2]+o|0,e[3]=e[3]+s|0,e[4]=e[4]+h|0,e[5]=e[5]+f|0,e[6]=e[6]+c|0,e[7]=e[7]+p|0},_doFinalize:function(){var r=this._data,e=r.words,i=8*this._nDataBytes,n=8*r.sigBytes;return e[n>>>5]|=128<<24-n%32,e[14+(n+64>>>9<<4)]=t.floor(i/4294967296),e[15+(n+64>>>9<<4)]=i,r.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=o.clone.call(this);return t._hash=this._hash.clone(),t}});r.SHA256=o._createHelper(f),r.HmacSHA256=o._createHmacHelper(f)}(Math),i.SHA256)}),n=r(function(t,r){var i,n;t.exports=(n=(i=e).lib.WordArray,i.enc.Base64={stringify:function(t){var r=t.words,e=t.sigBytes,i=this._map;t.clamp();for(var n=[],o=0;o<e;o+=3)for(var s=(r[o>>>2]>>>24-o%4*8&255)<<16|(r[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|r[o+2>>>2]>>>24-(o+2)%4*8&255,h=0;h<4&&o+.75*h<e;h++)n.push(i.charAt(s>>>6*(3-h)&63));var u=i.charAt(64);if(u)for(;n.length%4;)n.push(u);return n.join("")},parse:function(t){var r=t.length,e=this._map,i=this._reverseMap;if(!i){i=this._reverseMap=[];for(var o=0;o<e.length;o++)i[e.charCodeAt(o)]=o}var s=e.charAt(64);if(s){var h=t.indexOf(s);-1!==h&&(r=h)}return function(t,r,e){for(var i=[],o=0,s=0;s<r;s++)if(s%4){var h=e[t.charCodeAt(s-1)]<<s%4*2,u=e[t.charCodeAt(s)]>>>6-s%4*2;i[o>>>2]|=(h|u)<<24-o%4*8,o++}return n.create(i,o)}(t,r,i)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},i.enc.Base64)}),o=r(function(t,r){t.exports=e.enc.Hex}),s=r(function(r,e){(function(){var t;function e(t,r,e){null!=t&&("number"==typeof t?this.fromNumber(t,r,e):this.fromString(t,null==r&&"string"!=typeof t?256:r))}function i(){return new e(null)}var n="undefined"!=typeof navigator;n&&"Microsoft Internet Explorer"==navigator.appName?(e.prototype.am=function(t,r,e,i,n,o){for(var s=32767&r,h=r>>15;--o>=0;){var u=32767&this[t],a=this[t++]>>15,f=h*u+a*s;n=((u=s*u+((32767&f)<<15)+e[i]+(1073741823&n))>>>30)+(f>>>15)+h*a+(n>>>30),e[i++]=1073741823&u}return n},t=30):n&&"Netscape"!=navigator.appName?(e.prototype.am=function(t,r,e,i,n,o){for(;--o>=0;){var s=r*this[t++]+e[i]+n;n=Math.floor(s/67108864),e[i++]=67108863&s}return n},t=26):(e.prototype.am=function(t,r,e,i,n,o){for(var s=16383&r,h=r>>14;--o>=0;){var u=16383&this[t],a=this[t++]>>14,f=h*u+a*s;n=((u=s*u+((16383&f)<<14)+e[i]+n)>>28)+(f>>14)+h*a,e[i++]=268435455&u}return n},t=28),e.prototype.DB=t,e.prototype.DM=(1<<t)-1,e.prototype.DV=1<<t,e.prototype.FV=Math.pow(2,52),e.prototype.F1=52-t,e.prototype.F2=2*t-52;var o,s,h="0123456789abcdefghijklmnopqrstuvwxyz",u=new Array;for(o="0".charCodeAt(0),s=0;s<=9;++s)u[o++]=s;for(o="a".charCodeAt(0),s=10;s<36;++s)u[o++]=s;for(o="A".charCodeAt(0),s=10;s<36;++s)u[o++]=s;function a(t){return h.charAt(t)}function f(t,r){var e=u[t.charCodeAt(r)];return null==e?-1:e}function c(t){var r=i();return r.fromInt(t),r}function p(t){var r,e=1;return 0!=(r=t>>>16)&&(t=r,e+=16),0!=(r=t>>8)&&(t=r,e+=8),0!=(r=t>>4)&&(t=r,e+=4),0!=(r=t>>2)&&(t=r,e+=2),0!=(r=t>>1)&&(t=r,e+=1),e}function l(t){this.m=t}function d(t){this.m=t,this.mp=t.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<t.DB-15)-1,this.mt2=2*t.t}function v(t,r){return t&r}function y(t,r){return t|r}function m(t,r){return t^r}function g(t,r){return t&~r}function w(t){if(0==t)return-1;var r=0;return 0==(65535&t)&&(t>>=16,r+=16),0==(255&t)&&(t>>=8,r+=8),0==(15&t)&&(t>>=4,r+=4),0==(3&t)&&(t>>=2,r+=2),0==(1&t)&&++r,r}function T(t){for(var r=0;0!=t;)t&=t-1,++r;return r}function b(){}function _(t){return t}function S(t){this.r2=i(),this.q3=i(),e.ONE.dlShiftTo(2*t.t,this.r2),this.mu=this.r2.divide(t),this.m=t}l.prototype.convert=function(t){return t.s<0||t.compareTo(this.m)>=0?t.mod(this.m):t},l.prototype.revert=function(t){return t},l.prototype.reduce=function(t){t.divRemTo(this.m,null,t)},l.prototype.mulTo=function(t,r,e){t.multiplyTo(r,e),this.reduce(e)},l.prototype.sqrTo=function(t,r){t.squareTo(r),this.reduce(r)},d.prototype.convert=function(t){var r=i();return t.abs().dlShiftTo(this.m.t,r),r.divRemTo(this.m,null,r),t.s<0&&r.compareTo(e.ZERO)>0&&this.m.subTo(r,r),r},d.prototype.revert=function(t){var r=i();return t.copyTo(r),this.reduce(r),r},d.prototype.reduce=function(t){for(;t.t<=this.mt2;)t[t.t++]=0;for(var r=0;r<this.m.t;++r){var e=32767&t[r],i=e*this.mpl+((e*this.mph+(t[r]>>15)*this.mpl&this.um)<<15)&t.DM;for(t[e=r+this.m.t]+=this.m.am(0,i,t,r,0,this.m.t);t[e]>=t.DV;)t[e]-=t.DV,t[++e]++}t.clamp(),t.drShiftTo(this.m.t,t),t.compareTo(this.m)>=0&&t.subTo(this.m,t)},d.prototype.mulTo=function(t,r,e){t.multiplyTo(r,e),this.reduce(e)},d.prototype.sqrTo=function(t,r){t.squareTo(r),this.reduce(r)},e.prototype.copyTo=function(t){for(var r=this.t-1;r>=0;--r)t[r]=this[r];t.t=this.t,t.s=this.s},e.prototype.fromInt=function(t){this.t=1,this.s=t<0?-1:0,t>0?this[0]=t:t<-1?this[0]=t+this.DV:this.t=0},e.prototype.fromString=function(t,r){var i;if(16==r)i=4;else if(8==r)i=3;else if(256==r)i=8;else if(2==r)i=1;else if(32==r)i=5;else{if(4!=r)return void this.fromRadix(t,r);i=2}this.t=0,this.s=0;for(var n=t.length,o=!1,s=0;--n>=0;){var h=8==i?255&t[n]:f(t,n);h<0?"-"==t.charAt(n)&&(o=!0):(o=!1,0==s?this[this.t++]=h:s+i>this.DB?(this[this.t-1]|=(h&(1<<this.DB-s)-1)<<s,this[this.t++]=h>>this.DB-s):this[this.t-1]|=h<<s,(s+=i)>=this.DB&&(s-=this.DB))}8==i&&0!=(128&t[0])&&(this.s=-1,s>0&&(this[this.t-1]|=(1<<this.DB-s)-1<<s)),this.clamp(),o&&e.ZERO.subTo(this,this)},e.prototype.clamp=function(){for(var t=this.s&this.DM;this.t>0&&this[this.t-1]==t;)--this.t},e.prototype.dlShiftTo=function(t,r){var e;for(e=this.t-1;e>=0;--e)r[e+t]=this[e];for(e=t-1;e>=0;--e)r[e]=0;r.t=this.t+t,r.s=this.s},e.prototype.drShiftTo=function(t,r){for(var e=t;e<this.t;++e)r[e-t]=this[e];r.t=Math.max(this.t-t,0),r.s=this.s},e.prototype.lShiftTo=function(t,r){var e,i=t%this.DB,n=this.DB-i,o=(1<<n)-1,s=Math.floor(t/this.DB),h=this.s<<i&this.DM;for(e=this.t-1;e>=0;--e)r[e+s+1]=this[e]>>n|h,h=(this[e]&o)<<i;for(e=s-1;e>=0;--e)r[e]=0;r[s]=h,r.t=this.t+s+1,r.s=this.s,r.clamp()},e.prototype.rShiftTo=function(t,r){r.s=this.s;var e=Math.floor(t/this.DB);if(e>=this.t)r.t=0;else{var i=t%this.DB,n=this.DB-i,o=(1<<i)-1;r[0]=this[e]>>i;for(var s=e+1;s<this.t;++s)r[s-e-1]|=(this[s]&o)<<n,r[s-e]=this[s]>>i;i>0&&(r[this.t-e-1]|=(this.s&o)<<n),r.t=this.t-e,r.clamp()}},e.prototype.subTo=function(t,r){for(var e=0,i=0,n=Math.min(t.t,this.t);e<n;)i+=this[e]-t[e],r[e++]=i&this.DM,i>>=this.DB;if(t.t<this.t){for(i-=t.s;e<this.t;)i+=this[e],r[e++]=i&this.DM,i>>=this.DB;i+=this.s}else{for(i+=this.s;e<t.t;)i-=t[e],r[e++]=i&this.DM,i>>=this.DB;i-=t.s}r.s=i<0?-1:0,i<-1?r[e++]=this.DV+i:i>0&&(r[e++]=i),r.t=e,r.clamp()},e.prototype.multiplyTo=function(t,r){var i=this.abs(),n=t.abs(),o=i.t;for(r.t=o+n.t;--o>=0;)r[o]=0;for(o=0;o<n.t;++o)r[o+i.t]=i.am(0,n[o],r,o,0,i.t);r.s=0,r.clamp(),this.s!=t.s&&e.ZERO.subTo(r,r)},e.prototype.squareTo=function(t){for(var r=this.abs(),e=t.t=2*r.t;--e>=0;)t[e]=0;for(e=0;e<r.t-1;++e){var i=r.am(e,r[e],t,2*e,0,1);(t[e+r.t]+=r.am(e+1,2*r[e],t,2*e+1,i,r.t-e-1))>=r.DV&&(t[e+r.t]-=r.DV,t[e+r.t+1]=1)}t.t>0&&(t[t.t-1]+=r.am(e,r[e],t,2*e,0,1)),t.s=0,t.clamp()},e.prototype.divRemTo=function(t,r,n){var o=t.abs();if(!(o.t<=0)){var s=this.abs();if(s.t<o.t)return null!=r&&r.fromInt(0),void(null!=n&&this.copyTo(n));null==n&&(n=i());var h=i(),u=this.s,a=t.s,f=this.DB-p(o[o.t-1]);f>0?(o.lShiftTo(f,h),s.lShiftTo(f,n)):(o.copyTo(h),s.copyTo(n));var c=h.t,l=h[c-1];if(0!=l){var d=l*(1<<this.F1)+(c>1?h[c-2]>>this.F2:0),v=this.FV/d,y=(1<<this.F1)/d,m=1<<this.F2,g=n.t,w=g-c,T=null==r?i():r;for(h.dlShiftTo(w,T),n.compareTo(T)>=0&&(n[n.t++]=1,n.subTo(T,n)),e.ONE.dlShiftTo(c,T),T.subTo(h,h);h.t<c;)h[h.t++]=0;for(;--w>=0;){var b=n[--g]==l?this.DM:Math.floor(n[g]*v+(n[g-1]+m)*y);if((n[g]+=h.am(0,b,n,w,0,c))<b)for(h.dlShiftTo(w,T),n.subTo(T,n);n[g]<--b;)n.subTo(T,n)}null!=r&&(n.drShiftTo(c,r),u!=a&&e.ZERO.subTo(r,r)),n.t=c,n.clamp(),f>0&&n.rShiftTo(f,n),u<0&&e.ZERO.subTo(n,n)}}},e.prototype.invDigit=function(){if(this.t<1)return 0;var t=this[0];if(0==(1&t))return 0;var r=3&t;return(r=(r=(r=(r=r*(2-(15&t)*r)&15)*(2-(255&t)*r)&255)*(2-((65535&t)*r&65535))&65535)*(2-t*r%this.DV)%this.DV)>0?this.DV-r:-r},e.prototype.isEven=function(){return 0==(this.t>0?1&this[0]:this.s)},e.prototype.exp=function(t,r){if(t>4294967295||t<1)return e.ONE;var n=i(),o=i(),s=r.convert(this),h=p(t)-1;for(s.copyTo(n);--h>=0;)if(r.sqrTo(n,o),(t&1<<h)>0)r.mulTo(o,s,n);else{var u=n;n=o,o=u}return r.revert(n)},e.prototype.toString=function(t){if(this.s<0)return"-"+this.negate().toString(t);var r;if(16==t)r=4;else if(8==t)r=3;else if(2==t)r=1;else if(32==t)r=5;else{if(4!=t)return this.toRadix(t);r=2}var e,i=(1<<r)-1,n=!1,o="",s=this.t,h=this.DB-s*this.DB%r;if(s-- >0)for(h<this.DB&&(e=this[s]>>h)>0&&(n=!0,o=a(e));s>=0;)h<r?(e=(this[s]&(1<<h)-1)<<r-h,e|=this[--s]>>(h+=this.DB-r)):(e=this[s]>>(h-=r)&i,h<=0&&(h+=this.DB,--s)),e>0&&(n=!0),n&&(o+=a(e));return n?o:"0"},e.prototype.negate=function(){var t=i();return e.ZERO.subTo(this,t),t},e.prototype.abs=function(){return this.s<0?this.negate():this},e.prototype.compareTo=function(t){var r=this.s-t.s;if(0!=r)return r;var e=this.t;if(0!=(r=e-t.t))return this.s<0?-r:r;for(;--e>=0;)if(0!=(r=this[e]-t[e]))return r;return 0},e.prototype.bitLength=function(){return this.t<=0?0:this.DB*(this.t-1)+p(this[this.t-1]^this.s&this.DM)},e.prototype.mod=function(t){var r=i();return this.abs().divRemTo(t,null,r),this.s<0&&r.compareTo(e.ZERO)>0&&t.subTo(r,r),r},e.prototype.modPowInt=function(t,r){var e;return e=t<256||r.isEven()?new l(r):new d(r),this.exp(t,e)},e.ZERO=c(0),e.ONE=c(1),b.prototype.convert=_,b.prototype.revert=_,b.prototype.mulTo=function(t,r,e){t.multiplyTo(r,e)},b.prototype.sqrTo=function(t,r){t.squareTo(r)},S.prototype.convert=function(t){if(t.s<0||t.t>2*this.m.t)return t.mod(this.m);if(t.compareTo(this.m)<0)return t;var r=i();return t.copyTo(r),this.reduce(r),r},S.prototype.revert=function(t){return t},S.prototype.reduce=function(t){for(t.drShiftTo(this.m.t-1,this.r2),t.t>this.m.t+1&&(t.t=this.m.t+1,t.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);t.compareTo(this.r2)<0;)t.dAddOffset(1,this.m.t+1);for(t.subTo(this.r2,t);t.compareTo(this.m)>=0;)t.subTo(this.m,t)},S.prototype.mulTo=function(t,r,e){t.multiplyTo(r,e),this.reduce(e)},S.prototype.sqrTo=function(t,r){t.squareTo(r),this.reduce(r)};var A,B,D,x=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],E=(1<<26)/x[x.length-1];function M(){var t;t=(new Date).getTime(),B[D++]^=255&t,B[D++]^=t>>8&255,B[D++]^=t>>16&255,B[D++]^=t>>24&255,D>=N&&(D-=N)}if(e.prototype.chunkSize=function(t){return Math.floor(Math.LN2*this.DB/Math.log(t))},e.prototype.toRadix=function(t){if(null==t&&(t=10),0==this.signum()||t<2||t>36)return"0";var r=this.chunkSize(t),e=Math.pow(t,r),n=c(e),o=i(),s=i(),h="";for(this.divRemTo(n,o,s);o.signum()>0;)h=(e+s.intValue()).toString(t).substr(1)+h,o.divRemTo(n,o,s);return s.intValue().toString(t)+h},e.prototype.fromRadix=function(t,r){this.fromInt(0),null==r&&(r=10);for(var i=this.chunkSize(r),n=Math.pow(r,i),o=!1,s=0,h=0,u=0;u<t.length;++u){var a=f(t,u);a<0?"-"==t.charAt(u)&&0==this.signum()&&(o=!0):(h=r*h+a,++s>=i&&(this.dMultiply(n),this.dAddOffset(h,0),s=0,h=0))}s>0&&(this.dMultiply(Math.pow(r,s)),this.dAddOffset(h,0)),o&&e.ZERO.subTo(this,this)},e.prototype.fromNumber=function(t,r,i){if("number"==typeof r)if(t<2)this.fromInt(1);else for(this.fromNumber(t,i),this.testBit(t-1)||this.bitwiseTo(e.ONE.shiftLeft(t-1),y,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(r);)this.dAddOffset(2,0),this.bitLength()>t&&this.subTo(e.ONE.shiftLeft(t-1),this);else{var n=new Array,o=7&t;n.length=1+(t>>3),r.nextBytes(n),o>0?n[0]&=(1<<o)-1:n[0]=0,this.fromString(n,256)}},e.prototype.bitwiseTo=function(t,r,e){var i,n,o=Math.min(t.t,this.t);for(i=0;i<o;++i)e[i]=r(this[i],t[i]);if(t.t<this.t){for(n=t.s&this.DM,i=o;i<this.t;++i)e[i]=r(this[i],n);e.t=this.t}else{for(n=this.s&this.DM,i=o;i<t.t;++i)e[i]=r(n,t[i]);e.t=t.t}e.s=r(this.s,t.s),e.clamp()},e.prototype.changeBit=function(t,r){var i=e.ONE.shiftLeft(t);return this.bitwiseTo(i,r,i),i},e.prototype.addTo=function(t,r){for(var e=0,i=0,n=Math.min(t.t,this.t);e<n;)i+=this[e]+t[e],r[e++]=i&this.DM,i>>=this.DB;if(t.t<this.t){for(i+=t.s;e<this.t;)i+=this[e],r[e++]=i&this.DM,i>>=this.DB;i+=this.s}else{for(i+=this.s;e<t.t;)i+=t[e],r[e++]=i&this.DM,i>>=this.DB;i+=t.s}r.s=i<0?-1:0,i>0?r[e++]=i:i<-1&&(r[e++]=this.DV+i),r.t=e,r.clamp()},e.prototype.dMultiply=function(t){this[this.t]=this.am(0,t-1,this,0,0,this.t),++this.t,this.clamp()},e.prototype.dAddOffset=function(t,r){if(0!=t){for(;this.t<=r;)this[this.t++]=0;for(this[r]+=t;this[r]>=this.DV;)this[r]-=this.DV,++r>=this.t&&(this[this.t++]=0),++this[r]}},e.prototype.multiplyLowerTo=function(t,r,e){var i,n=Math.min(this.t+t.t,r);for(e.s=0,e.t=n;n>0;)e[--n]=0;for(i=e.t-this.t;n<i;++n)e[n+this.t]=this.am(0,t[n],e,n,0,this.t);for(i=Math.min(t.t,r);n<i;++n)this.am(0,t[n],e,n,0,r-n);e.clamp()},e.prototype.multiplyUpperTo=function(t,r,e){var i=e.t=this.t+t.t- --r;for(e.s=0;--i>=0;)e[i]=0;for(i=Math.max(r-this.t,0);i<t.t;++i)e[this.t+i-r]=this.am(r-i,t[i],e,0,0,this.t+i-r);e.clamp(),e.drShiftTo(1,e)},e.prototype.modInt=function(t){if(t<=0)return 0;var r=this.DV%t,e=this.s<0?t-1:0;if(this.t>0)if(0==r)e=this[0]%t;else for(var i=this.t-1;i>=0;--i)e=(r*e+this[i])%t;return e},e.prototype.millerRabin=function(t){var r=this.subtract(e.ONE),n=r.getLowestSetBit();if(n<=0)return!1;var o=r.shiftRight(n);(t=t+1>>1)>x.length&&(t=x.length);for(var s=i(),h=0;h<t;++h){s.fromInt(x[Math.floor(Math.random()*x.length)]);var u=s.modPow(o,this);if(0!=u.compareTo(e.ONE)&&0!=u.compareTo(r)){for(var a=1;a++<n&&0!=u.compareTo(r);)if(0==(u=u.modPowInt(2,this)).compareTo(e.ONE))return!1;if(0!=u.compareTo(r))return!1}}return!0},e.prototype.clone=function(){var t=i();return this.copyTo(t),t},e.prototype.intValue=function(){if(this.s<0){if(1==this.t)return this[0]-this.DV;if(0==this.t)return-1}else{if(1==this.t)return this[0];if(0==this.t)return 0}return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]},e.prototype.byteValue=function(){return 0==this.t?this.s:this[0]<<24>>24},e.prototype.shortValue=function(){return 0==this.t?this.s:this[0]<<16>>16},e.prototype.signum=function(){return this.s<0?-1:this.t<=0||1==this.t&&this[0]<=0?0:1},e.prototype.toByteArray=function(){var t=this.t,r=new Array;r[0]=this.s;var e,i=this.DB-t*this.DB%8,n=0;if(t-- >0)for(i<this.DB&&(e=this[t]>>i)!=(this.s&this.DM)>>i&&(r[n++]=e|this.s<<this.DB-i);t>=0;)i<8?(e=(this[t]&(1<<i)-1)<<8-i,e|=this[--t]>>(i+=this.DB-8)):(e=this[t]>>(i-=8)&255,i<=0&&(i+=this.DB,--t)),0!=(128&e)&&(e|=-256),0==n&&(128&this.s)!=(128&e)&&++n,(n>0||e!=this.s)&&(r[n++]=e);return r},e.prototype.equals=function(t){return 0==this.compareTo(t)},e.prototype.min=function(t){return this.compareTo(t)<0?this:t},e.prototype.max=function(t){return this.compareTo(t)>0?this:t},e.prototype.and=function(t){var r=i();return this.bitwiseTo(t,v,r),r},e.prototype.or=function(t){var r=i();return this.bitwiseTo(t,y,r),r},e.prototype.xor=function(t){var r=i();return this.bitwiseTo(t,m,r),r},e.prototype.andNot=function(t){var r=i();return this.bitwiseTo(t,g,r),r},e.prototype.not=function(){for(var t=i(),r=0;r<this.t;++r)t[r]=this.DM&~this[r];return t.t=this.t,t.s=~this.s,t},e.prototype.shiftLeft=function(t){var r=i();return t<0?this.rShiftTo(-t,r):this.lShiftTo(t,r),r},e.prototype.shiftRight=function(t){var r=i();return t<0?this.lShiftTo(-t,r):this.rShiftTo(t,r),r},e.prototype.getLowestSetBit=function(){for(var t=0;t<this.t;++t)if(0!=this[t])return t*this.DB+w(this[t]);return this.s<0?this.t*this.DB:-1},e.prototype.bitCount=function(){for(var t=0,r=this.s&this.DM,e=0;e<this.t;++e)t+=T(this[e]^r);return t},e.prototype.testBit=function(t){var r=Math.floor(t/this.DB);return r>=this.t?0!=this.s:0!=(this[r]&1<<t%this.DB)},e.prototype.setBit=function(t){return this.changeBit(t,y)},e.prototype.clearBit=function(t){return this.changeBit(t,g)},e.prototype.flipBit=function(t){return this.changeBit(t,m)},e.prototype.add=function(t){var r=i();return this.addTo(t,r),r},e.prototype.subtract=function(t){var r=i();return this.subTo(t,r),r},e.prototype.multiply=function(t){var r=i();return this.multiplyTo(t,r),r},e.prototype.divide=function(t){var r=i();return this.divRemTo(t,r,null),r},e.prototype.remainder=function(t){var r=i();return this.divRemTo(t,null,r),r},e.prototype.divideAndRemainder=function(t){var r=i(),e=i();return this.divRemTo(t,r,e),new Array(r,e)},e.prototype.modPow=function(t,r){var e,n,o=t.bitLength(),s=c(1);if(o<=0)return s;e=o<18?1:o<48?3:o<144?4:o<768?5:6,n=o<8?new l(r):r.isEven()?new S(r):new d(r);var h=new Array,u=3,a=e-1,f=(1<<e)-1;if(h[1]=n.convert(this),e>1){var v=i();for(n.sqrTo(h[1],v);u<=f;)h[u]=i(),n.mulTo(v,h[u-2],h[u]),u+=2}var y,m,g=t.t-1,w=!0,T=i();for(o=p(t[g])-1;g>=0;){for(o>=a?y=t[g]>>o-a&f:(y=(t[g]&(1<<o+1)-1)<<a-o,g>0&&(y|=t[g-1]>>this.DB+o-a)),u=e;0==(1&y);)y>>=1,--u;if((o-=u)<0&&(o+=this.DB,--g),w)h[y].copyTo(s),w=!1;else{for(;u>1;)n.sqrTo(s,T),n.sqrTo(T,s),u-=2;u>0?n.sqrTo(s,T):(m=s,s=T,T=m),n.mulTo(T,h[y],s)}for(;g>=0&&0==(t[g]&1<<o);)n.sqrTo(s,T),m=s,s=T,T=m,--o<0&&(o=this.DB-1,--g)}return n.revert(s)},e.prototype.modInverse=function(t){var r=t.isEven();if(this.isEven()&&r||0==t.signum())return e.ZERO;for(var i=t.clone(),n=this.clone(),o=c(1),s=c(0),h=c(0),u=c(1);0!=i.signum();){for(;i.isEven();)i.rShiftTo(1,i),r?(o.isEven()&&s.isEven()||(o.addTo(this,o),s.subTo(t,s)),o.rShiftTo(1,o)):s.isEven()||s.subTo(t,s),s.rShiftTo(1,s);for(;n.isEven();)n.rShiftTo(1,n),r?(h.isEven()&&u.isEven()||(h.addTo(this,h),u.subTo(t,u)),h.rShiftTo(1,h)):u.isEven()||u.subTo(t,u),u.rShiftTo(1,u);i.compareTo(n)>=0?(i.subTo(n,i),r&&o.subTo(h,o),s.subTo(u,s)):(n.subTo(i,n),r&&h.subTo(o,h),u.subTo(s,u))}return 0!=n.compareTo(e.ONE)?e.ZERO:u.compareTo(t)>=0?u.subtract(t):u.signum()<0?(u.addTo(t,u),u.signum()<0?u.add(t):u):u},e.prototype.pow=function(t){return this.exp(t,new b)},e.prototype.gcd=function(t){var r=this.s<0?this.negate():this.clone(),e=t.s<0?t.negate():t.clone();if(r.compareTo(e)<0){var i=r;r=e,e=i}var n=r.getLowestSetBit(),o=e.getLowestSetBit();if(o<0)return r;for(n<o&&(o=n),o>0&&(r.rShiftTo(o,r),e.rShiftTo(o,e));r.signum()>0;)(n=r.getLowestSetBit())>0&&r.rShiftTo(n,r),(n=e.getLowestSetBit())>0&&e.rShiftTo(n,e),r.compareTo(e)>=0?(r.subTo(e,r),r.rShiftTo(1,r)):(e.subTo(r,e),e.rShiftTo(1,e));return o>0&&e.lShiftTo(o,e),e},e.prototype.isProbablePrime=function(t){var r,e=this.abs();if(1==e.t&&e[0]<=x[x.length-1]){for(r=0;r<x.length;++r)if(e[0]==x[r])return!0;return!1}if(e.isEven())return!1;for(r=1;r<x.length;){for(var i=x[r],n=r+1;n<x.length&&i<E;)i*=x[n++];for(i=e.modInt(i);r<n;)if(i%x[r++]==0)return!1}return e.millerRabin(t)},e.prototype.square=function(){var t=i();return this.squareTo(t),t},e.prototype.Barrett=S,null==B){var C;if(B=new Array,D=0,"undefined"!=typeof window&&window.crypto)if(window.crypto.getRandomValues){var R=new Uint8Array(32);for(window.crypto.getRandomValues(R),C=0;C<32;++C)B[D++]=R[C]}else if("Netscape"==navigator.appName&&navigator.appVersion<"5"){var k=window.crypto.random(32);for(C=0;C<k.length;++C)B[D++]=255&k.charCodeAt(C)}for(;D<N;)C=Math.floor(65536*Math.random()),B[D++]=C>>>8,B[D++]=255&C;D=0,M()}function j(){if(null==A){for(M(),(A=new I).init(B),D=0;D<B.length;++D)B[D]=0;D=0}return A.next()}function O(){}function I(){this.i=0,this.j=0,this.S=new Array}O.prototype.nextBytes=function(t){var r;for(r=0;r<t.length;++r)t[r]=j()},I.prototype.init=function(t){var r,e,i;for(r=0;r<256;++r)this.S[r]=r;for(e=0,r=0;r<256;++r)i=this.S[r],this.S[r]=this.S[e=e+this.S[r]+t[r%t.length]&255],this.S[e]=i;this.i=0,this.j=0},I.prototype.next=function(){var t;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,t=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=t,this.S[t+this.S[this.i]&255]};var N=256;r.exports={default:e,BigInteger:e,SecureRandom:O}}).call(t)}).BigInteger,h={sha1:"3021300906052b0e03021a05000414",sha224:"302d300d06096086480165030402040500041c",sha256:"3031300d060960864801650304020105000420",sha384:"3041300d060960864801650304020205000430",sha512:"3051300d060960864801650304020305000440",md2:"3020300c06082a864886f70d020205000410",md5:"3020300c06082a864886f70d020505000410",ripemd160:"3021300906052b2403020105000414"},u={sha256:i};function a(t,r){if(this.n=null,this.e=0,!(null!=t&&null!=r&&t.length>0&&r.length>0))throw new Error("Invalid key data");this.n=new s(t,16),this.e=parseInt(r,16)}a.prototype.verify=function(t,r){r=r.replace(/[^0-9a-f]|[\s\n]]/gi,"");var e=new s(r,16);if(e.bitLength()>this.n.bitLength())throw new Error("Signature does not match with the key modulus.");var i=function(t){for(var r in h){var e=h[r],i=e.length;if(t.substring(0,i)===e)return{alg:r,hash:t.substring(i)}}return[]}(e.modPowInt(this.e,this.n).toString(16).replace(/^1f+00/,""));if(0===i.length)return!1;if(!u.hasOwnProperty(i.alg))throw new Error("Hashing algorithm is not supported.");var n=u[i.alg](t).toString();return i.hash===n};for(var f=[],c=[],p="undefined"!=typeof Uint8Array?Uint8Array:Array,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",d=0,v=l.length;d<v;++d)f[d]=l[d],c[l.charCodeAt(d)]=d;function y(t){var r=t.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=t.indexOf("=");return-1===e&&(e=r),[e,e===r?0:4-e%4]}function m(t,r,e){for(var i,n=[],o=r;o<e;o+=3)n.push(f[(i=(t[o]<<16&16711680)+(t[o+1]<<8&65280)+(255&t[o+2]))>>18&63]+f[i>>12&63]+f[i>>6&63]+f[63&i]);return n.join("")}c["-".charCodeAt(0)]=62,c["_".charCodeAt(0)]=63;var g={byteLength:function(t){var r=y(t),e=r[1];return 3*(r[0]+e)/4-e},toByteArray:function(t){var r,e,i=y(t),n=i[0],o=i[1],s=new p(function(t,r,e){return 3*(r+e)/4-e}(0,n,o)),h=0,u=o>0?n-4:n;for(e=0;e<u;e+=4)r=c[t.charCodeAt(e)]<<18|c[t.charCodeAt(e+1)]<<12|c[t.charCodeAt(e+2)]<<6|c[t.charCodeAt(e+3)],s[h++]=r>>16&255,s[h++]=r>>8&255,s[h++]=255&r;return 2===o&&(r=c[t.charCodeAt(e)]<<2|c[t.charCodeAt(e+1)]>>4,s[h++]=255&r),1===o&&(r=c[t.charCodeAt(e)]<<10|c[t.charCodeAt(e+1)]<<4|c[t.charCodeAt(e+2)]>>2,s[h++]=r>>8&255,s[h++]=255&r),s},fromByteArray:function(t){for(var r,e=t.length,i=e%3,n=[],o=0,s=e-i;o<s;o+=16383)n.push(m(t,o,o+16383>s?s:o+16383));return 1===i?n.push(f[(r=t[e-1])>>2]+f[r<<4&63]+"=="):2===i&&n.push(f[(r=(t[e-2]<<8)+t[e-1])>>10]+f[r>>4&63]+f[r<<2&63]+"="),n.join("")}};function w(t){var r=t.length%4;return 0===r?t:t+new Array(4-r+1).join("=")}function T(t){return t=w(t).replace(/\-/g,"+").replace(/_/g,"/"),decodeURIComponent(function(t){for(var r="",e=0;e<t.length;e++)r+=String.fromCharCode(t[e]);return r}(g.toByteArray(t)).split("").map(function(t){return"%"+("00"+t.charCodeAt(0).toString(16)).slice(-2)}).join(""))}function b(t){return function(t){for(var r="",e=0;e<t.length;e++){var i=t[e].toString(16);r+=2===i.length?i:"0"+i}return r}(g.toByteArray(w(t)))}var _=r(function(r,e){r.exports=function(){function r(t){return"function"==typeof t}var e=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},i=0,n=void 0,o=void 0,s=function(t,r){l[i]=t,l[i+1]=r,2===(i+=2)&&(o?o(d):w())},h="undefined"!=typeof window?window:void 0,u=h||{},a=u.MutationObserver||u.WebKitMutationObserver,f="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),c="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function p(){var t=setTimeout;return function(){return t(d,1)}}var l=new Array(1e3);function d(){for(var t=0;t<i;t+=2)(0,l[t])(l[t+1]),l[t]=void 0,l[t+1]=void 0;i=0}var v,y,m,g,w=void 0;function T(t,r){var e=this,i=new this.constructor(S);void 0===i[_]&&N(i);var n=e._state;if(n){var o=arguments[n-1];s(function(){return O(n,i,o,e._result)})}else k(e,i,t,r);return i}function b(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var r=new this(S);return E(r,t),r}f?w=function(){return process.nextTick(d)}:a?(y=0,m=new a(d),g=document.createTextNode(""),m.observe(g,{characterData:!0}),w=function(){g.data=y=++y%2}):c?((v=new MessageChannel).port1.onmessage=d,w=function(){return v.port2.postMessage(0)}):w=void 0===h?function(){try{var t=Function("return this")().require("vertx");return void 0!==(n=t.runOnLoop||t.runOnContext)?function(){n(d)}:p()}catch(t){return p()}}():p();var _=Math.random().toString(36).substring(2);function S(){}var A=void 0,B=1,D=2;function x(t,e,i){e.constructor===t.constructor&&i===T&&e.constructor.resolve===b?function(t,r){r._state===B?C(t,r._result):r._state===D?R(t,r._result):k(r,void 0,function(r){return E(t,r)},function(r){return R(t,r)})}(t,e):void 0===i?C(t,e):r(i)?function(t,r,e){s(function(t){var i=!1,n=function(e,n,o,s){try{e.call(n,function(e){i||(i=!0,r!==e?E(t,e):C(t,e))},function(r){i||(i=!0,R(t,r))})}catch(t){return t}}(e,r);!i&&n&&(i=!0,R(t,n))},t)}(t,e,i):C(t,e)}function E(t,r){if(t===r)R(t,new TypeError("You cannot resolve a promise with itself"));else if(n=typeof(i=r),null===i||"object"!==n&&"function"!==n)C(t,r);else{var e=void 0;try{e=r.then}catch(r){return void R(t,r)}x(t,r,e)}var i,n}function M(t){t._onerror&&t._onerror(t._result),j(t)}function C(t,r){t._state===A&&(t._result=r,t._state=B,0!==t._subscribers.length&&s(j,t))}function R(t,r){t._state===A&&(t._state=D,t._result=r,s(M,t))}function k(t,r,e,i){var n=t._subscribers,o=n.length;t._onerror=null,n[o]=r,n[o+B]=e,n[o+D]=i,0===o&&t._state&&s(j,t)}function j(t){var r=t._subscribers,e=t._state;if(0!==r.length){for(var i=void 0,n=void 0,o=t._result,s=0;s<r.length;s+=3)n=r[s+e],(i=r[s])?O(e,i,n,o):n(o);t._subscribers.length=0}}function O(t,e,i,n){var o=r(i),s=void 0,h=void 0,u=!0;if(o){try{s=i(n)}catch(t){u=!1,h=t}if(e===s)return void R(e,new TypeError("A promises callback cannot return that same promise."))}else s=n;e._state!==A||(o&&u?E(e,s):!1===u?R(e,h):t===B?C(e,s):t===D&&R(e,s))}var I=0;function N(t){t[_]=I++,t._state=void 0,t._result=void 0,t._subscribers=[]}var P=function(){function t(t,r){this._instanceConstructor=t,this.promise=new t(S),this.promise[_]||N(this.promise),e(r)?(this.length=r.length,this._remaining=r.length,this._result=new Array(this.length),0===this.length?C(this.promise,this._result):(this.length=this.length||0,this._enumerate(r),0===this._remaining&&C(this.promise,this._result))):R(this.promise,new Error("Array Methods must be provided an Array"))}return t.prototype._enumerate=function(t){for(var r=0;this._state===A&&r<t.length;r++)this._eachEntry(t[r],r)},t.prototype._eachEntry=function(t,r){var e=this._instanceConstructor,i=e.resolve;if(i===b){var n=void 0,o=void 0,s=!1;try{n=t.then}catch(t){s=!0,o=t}if(n===T&&t._state!==A)this._settledAt(t._state,r,t._result);else if("function"!=typeof n)this._remaining--,this._result[r]=t;else if(e===V){var h=new e(S);s?R(h,o):x(h,t,n),this._willSettleAt(h,r)}else this._willSettleAt(new e(function(r){return r(t)}),r)}else this._willSettleAt(i(t),r)},t.prototype._settledAt=function(t,r,e){var i=this.promise;i._state===A&&(this._remaining--,t===D?R(i,e):this._result[r]=e),0===this._remaining&&C(i,this._result)},t.prototype._willSettleAt=function(t,r){var e=this;k(t,void 0,function(t){return e._settledAt(B,r,t)},function(t){return e._settledAt(D,r,t)})},t}(),V=function(){function t(r){this[_]=I++,this._result=this._state=void 0,this._subscribers=[],S!==r&&("function"!=typeof r&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof t?function(t,r){try{r(function(r){E(t,r)},function(r){R(t,r)})}catch(r){R(t,r)}}(this,r):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return t.prototype.catch=function(t){return this.then(null,t)},t.prototype.finally=function(t){var e=this.constructor;return r(t)?this.then(function(r){return e.resolve(t()).then(function(){return r})},function(r){return e.resolve(t()).then(function(){throw r})}):this.then(t,t)},t}();return V.prototype.then=T,V.all=function(t){return new P(this,t).promise},V.race=function(t){var r=this;return e(t)?new r(function(e,i){for(var n=t.length,o=0;o<n;o++)r.resolve(t[o]).then(e,i)}):new r(function(t,r){return r(new TypeError("You must pass an array to race."))})},V.resolve=b,V.reject=function(t){var r=new this(S);return R(r,t),r},V._setScheduler=function(t){o=t},V._setAsap=function(t){s=t},V._asap=s,V.polyfill=function(){var r=void 0;if(void 0!==t)r=t;else if("undefined"!=typeof self)r=self;else try{r=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=r.Promise;if(e){var i=null;try{i=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===i&&!e.cast)return}r.Promise=V},V.Promise=V,V}()}),S=r(function(r){var e,i;e=t,i=function(){return function(){return function(t){var r=[];if(0===t.length)return"";if("string"!=typeof t[0])throw new TypeError("Url must be a string. Received "+t[0]);if(t[0].match(/^[^/:]+:\/*$/)&&t.length>1){var e=t.shift();t[0]=e+t[0]}t[0]=t[0].match(/^file:\/\/\//)?t[0].replace(/^([^/:]+):\/*/,"$1:///"):t[0].replace(/^([^/:]+):\/*/,"$1://");for(var i=0;i<t.length;i++){var n=t[i];if("string"!=typeof n)throw new TypeError("Url must be a string. Received "+n);""!==n&&(i>0&&(n=n.replace(/^[\/]+/,"")),n=n.replace(/[\/]+$/,i<t.length-1?"":"/"),r.push(n))}var o=r.join("/"),s=(o=o.replace(/\/(\?|&|#[^!])/g,"$1")).split("?");return s.shift()+(s.length>0?"?":"")+s.join("&")}("object"==typeof arguments[0]?arguments[0]:[].slice.call(arguments))}},r.exports?r.exports=i():e.urljoin=i()});function A(t){if(t.ok)return t.json();var r=new Error(t.statusText);return r.response=t,Promise.reject(r)}function B(t){this.name="ConfigurationError",this.message=t||""}function D(t){this.name="TokenValidationError",this.message=t||""}_.polyfill(),B.prototype=Error.prototype,D.prototype=Error.prototype;var x=function(){};x.prototype.get=function(){return null},x.prototype.has=function(){return null},x.prototype.set=function(){return null};var E=["RS256"];function M(t){var r=t||{};if(this.jwksCache=r.jwksCache||new x,this.expectedAlg=r.expectedAlg||"RS256",this.issuer=r.issuer,this.audience=r.audience,this.leeway=r.leeway||0,this.__disableExpirationCheck=r.__disableExpirationCheck||!1,this.jwksURI=r.jwksURI,this.leeway<0||this.leeway>300)throw new B("The leeway should be positive and lower than five minutes.");if(-1===E.indexOf(this.expectedAlg))throw new B("Algorithm "+this.expectedAlg+" is not supported. (Expected algs: ["+E.join(",")+"])")}M.prototype.verify=function(t,r,e){var i=this.decode(t);if(i instanceof Error)return e(i,!1);var n=i.encoded.header+"."+i.encoded.payload,o=b(i.encoded.signature),s=i.header.alg,h=i.header.kid,u=i.payload.aud,a=i.payload.iss,f=i.payload.exp,c=i.payload.nbf,p=i.payload.nonce||null,l=this;if(l.expectedAlg!==s)return e(new D("Algorithm "+s+" is not supported. (Expected algs: ["+E.join(",")+"])"),!1);this.getRsaVerifier(a,h,function(t,s){if(t)return e(t);if(s.verify(n,o)){if(l.issuer!==a)return e(new D("Issuer "+a+" is not valid."),!1);if(l.audience!==u)return e(new D("Audience "+u+" is not valid."),!1);if(p!==r)return e(new D("Nonce does not match."),!1);var h=l.verifyExpAndNbf(f,c);return h?e(h,!1):e(null,i.payload)}return e(new D("Invalid signature."))})},M.prototype.verifyExpAndNbf=function(t,r){console.warn("This method is deprecated and will be removed in the next major version");var e=new Date,i=new Date(0),n=new Date(0);return this.__disableExpirationCheck?null:(i.setUTCSeconds(t+this.leeway),e>i?new D("Expired token."):void 0===r?null:(n.setUTCSeconds(r-this.leeway),e<n?new D("The token is not valid until later in the future. Please check your computed clock."):null))},M.prototype.verifyExpAndIat=function(t,r){console.warn("This method is deprecated and will be removed in the next major version");var e=new Date,i=new Date(0),n=new Date(0);return this.__disableExpirationCheck?null:(i.setUTCSeconds(t+this.leeway),e>i?new D("Expired token."):(n.setUTCSeconds(r-this.leeway),e<n?new D("The token was issued in the future. Please check your computed clock."):null))},M.prototype.getRsaVerifier=function(t,r,e){var i=this,n=t+r;if(this.jwksCache.has(n)){var o=this.jwksCache.get(n);e(null,new a(o.modulus,o.exp))}else!function(t,r){("undefined"==typeof fetch?function(t,r){return r=r||{},new Promise(function(e,i){var n=new XMLHttpRequest,o=[],s=[],h={},u=function(){return{ok:2==(n.status/100|0),statusText:n.statusText,status:n.status,url:n.responseURL,text:function(){return Promise.resolve(n.responseText)},json:function(){return Promise.resolve(JSON.parse(n.responseText))},blob:function(){return Promise.resolve(new Blob([n.response]))},clone:u,headers:{keys:function(){return o},entries:function(){return s},get:function(t){return h[t.toLowerCase()]},has:function(t){return t.toLowerCase()in h}}}};for(var a in n.open(r.method||"get",t,!0),n.onload=function(){n.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(t,r,e){o.push(r=r.toLowerCase()),s.push([r,e]),h[r]=h[r]?h[r]+","+e:e}),e(u())},n.onerror=i,n.withCredentials="include"==r.credentials,r.headers)n.setRequestHeader(a,r.headers[a]);n.send(r.body||null)})}:fetch)(t.jwksURI||S(t.iss,".well-known","jwks.json")).then(A).then(function(e){var i,n,o,s=null;for(i=0;i<e.keys.length&&null===s;i++)(n=e.keys[i]).kid===t.kid&&(s=n);return r(null,{modulus:b((o=s).n),exp:b(o.e)})}).catch(function(t){r(t)})}({jwksURI:this.jwksURI,iss:t,kid:r},function(t,r){return t?e(t):(i.jwksCache.set(n,r),e(null,new a(r.modulus,r.exp)))})},M.prototype.decode=function(t){var r,e,i=t.split(".");if(3!==i.length)return new D("Cannot decode a malformed JWT");try{r=JSON.parse(T(i[0])),e=JSON.parse(T(i[1]))}catch(t){return new D("Token header or payload is not valid JSON")}return{header:r,payload:e,encoded:{header:i[0],payload:i[1],signature:i[2]}}},M.prototype.validateAccessToken=function(t,r,e,s){if(this.expectedAlg!==r)return s(new D("Algorithm "+r+" is not supported. (Expected alg: "+this.expectedAlg+")"));var h,u=i(t),a=o.stringify(u),f=a.substring(0,a.length/2),c=o.parse(f),p=n.stringify(c);return s((h={"+":"-","/":"_","=":""},p.replace(/[+/=]/g,function(t){return h[t]})!==e?new D("Invalid access_token"):null))},module.exports=M;
//# sourceMappingURL=idtoken-verifier.js.map