(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[723],{7553:(e,t,n)=>{var r,s=Object.create,i=Object.defineProperty,a=Object.getOwnPropertyDescriptor,o=Object.getOwnPropertyNames,l=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty,h=(e,t,n,r)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let s of o(t))p.call(e,s)||s===n||i(e,s,{get:()=>t[s],enumerable:!(r=a(t,s))||r.enumerable});return e},u=(e,t,n)=>(((e,t,n)=>{t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n})(e,"symbol"!=typeof t?t+"":t,n),n),d={};((e,t)=>{for(var n in t)i(e,n,{get:t[n],enumerable:!0})})(d,{default:()=>m}),e.exports=(r=d,h(i({},"__esModule",{value:!0}),r));var c=((e,t,n)=>(n=null!=e?s(l(e)):{},h(!t&&e&&e.__esModule?n:i(n,"default",{value:e,enumerable:!0}),e)))(n(6540)),y=n(327);class m extends c.Component{constructor(){super(...arguments),u(this,"onReady",((...e)=>this.props.onReady(...e))),u(this,"onPlay",((...e)=>this.props.onPlay(...e))),u(this,"onBuffer",((...e)=>this.props.onBuffer(...e))),u(this,"onBufferEnd",((...e)=>this.props.onBufferEnd(...e))),u(this,"onPause",((...e)=>this.props.onPause(...e))),u(this,"onEnded",((...e)=>this.props.onEnded(...e))),u(this,"onError",((...e)=>this.props.onError(...e))),u(this,"onPlayBackRateChange",(e=>this.props.onPlaybackRateChange(e.target.playbackRate))),u(this,"onEnablePIP",((...e)=>this.props.onEnablePIP(...e))),u(this,"onSeek",(e=>{this.props.onSeek(e.target.currentTime)})),u(this,"onDurationChange",(()=>{const e=this.getDuration();this.props.onDuration(e)})),u(this,"mute",(()=>{this.player.muted=!0})),u(this,"unmute",(()=>{this.player.muted=!1})),u(this,"ref",(e=>{this.player=e}))}componentDidMount(){this.props.onMount&&this.props.onMount(this),this.addListeners(this.player);const e=this.getPlaybackId(this.props.url);e&&(this.player.playbackId=e)}componentWillUnmount(){this.player.playbackId=null,this.removeListeners(this.player)}addListeners(e){const{playsinline:t}=this.props;e.addEventListener("play",this.onPlay),e.addEventListener("waiting",this.onBuffer),e.addEventListener("playing",this.onBufferEnd),e.addEventListener("pause",this.onPause),e.addEventListener("seeked",this.onSeek),e.addEventListener("ended",this.onEnded),e.addEventListener("error",this.onError),e.addEventListener("ratechange",this.onPlayBackRateChange),e.addEventListener("enterpictureinpicture",this.onEnablePIP),e.addEventListener("leavepictureinpicture",this.onDisablePIP),e.addEventListener("webkitpresentationmodechanged",this.onPresentationModeChange),e.addEventListener("canplay",this.onReady),t&&e.setAttribute("playsinline","")}removeListeners(e){e.removeEventListener("canplay",this.onReady),e.removeEventListener("play",this.onPlay),e.removeEventListener("waiting",this.onBuffer),e.removeEventListener("playing",this.onBufferEnd),e.removeEventListener("pause",this.onPause),e.removeEventListener("seeked",this.onSeek),e.removeEventListener("ended",this.onEnded),e.removeEventListener("error",this.onError),e.removeEventListener("ratechange",this.onPlayBackRateChange),e.removeEventListener("enterpictureinpicture",this.onEnablePIP),e.removeEventListener("leavepictureinpicture",this.onDisablePIP),e.removeEventListener("canplay",this.onReady)}async load(e){var t;const{onError:n,config:r}=this.props;if(!(null==(t=globalThis.customElements)?void 0:t.get("mux-player")))try{const e="https://cdn.jsdelivr.net/npm/@mux/mux-player@VERSION/dist/mux-player.mjs".replace("VERSION",r.version);await import(`${e}`),this.props.onLoaded()}catch(i){n(i)}const[,s]=e.match(y.MATCH_URL_MUX);this.player.playbackId=s}play(){const e=this.player.play();e&&e.catch(this.props.onError)}pause(){this.player.pause()}stop(){this.player.playbackId=null}seekTo(e,t=!0){this.player.currentTime=e,t||this.pause()}setVolume(e){this.player.volume=e}enablePIP(){this.player.requestPictureInPicture&&document.pictureInPictureElement!==this.player&&this.player.requestPictureInPicture()}disablePIP(){document.exitPictureInPicture&&document.pictureInPictureElement===this.player&&document.exitPictureInPicture()}setPlaybackRate(e){try{this.player.playbackRate=e}catch(t){this.props.onError(t)}}getDuration(){if(!this.player)return null;const{duration:e,seekable:t}=this.player;return e===1/0&&t.length>0?t.end(t.length-1):e}getCurrentTime(){return this.player?this.player.currentTime:null}getSecondsLoaded(){if(!this.player)return null;const{buffered:e}=this.player;if(0===e.length)return 0;const t=e.end(e.length-1),n=this.getDuration();return t>n?n:t}getPlaybackId(e){const[,t]=e.match(y.MATCH_URL_MUX);return t}render(){const{url:e,playing:t,loop:n,controls:r,muted:s,config:i,width:a,height:o}=this.props,l={width:"auto"===a?a:"100%",height:"auto"===o?o:"100%"};return!1===r&&(l["--controls"]="none"),c.default.createElement("mux-player",{ref:this.ref,"playback-id":this.getPlaybackId(e),style:l,preload:"auto",autoPlay:t||void 0,muted:s?"":void 0,loop:n?"":void 0,...i.attributes})}}u(m,"displayName","Mux"),u(m,"canPlay",y.canPlay.mux)}}]);