"use strict";(globalThis["webpackChunkqPhotobooth"]=globalThis["webpackChunkqPhotobooth"]||[]).push([[24],{9024:(e,t,n)=>{n.r(t),n.d(t,{default:()=>I});var i=n(9835),r=n(6970);const a={class:"absolute-bottom-left text-subtitle2"};function s(e,t,n,s,o,l){const d=(0,i.up)("q-linear-progress"),c=(0,i.up)("q-img"),m=(0,i.up)("q-card-section"),u=(0,i.up)("q-card"),h=(0,i.up)("q-page");return(0,i.wg)(),(0,i.j4)(h,{padding:"","full-height":"","full-width":""},{default:(0,i.w5)((()=>[(0,i.Wm)(d,{value:o.remainingSecondsNormalized,class:"q-mt-md","animation-speed":"200"},null,8,["value"]),(0,i.Wm)(u,{class:"column bg-image",style:{width:"100%",height:"100%"}},{default:(0,i.w5)((()=>[(0,i.Wm)(m,{class:"col no-padding",align:"center"},{default:(0,i.w5)((()=>[(0,i.Wm)(c,{"spinner-color":"white",src:s.store.gallery.newArrivalItem["preview"],style:{"max-width":"100%","max-height":"100%"},fit:"contain"},{default:(0,i.w5)((()=>[(0,i._)("div",a,(0,r.zw)(s.store.gallery.newArrivalItem.caption),1)])),_:1},8,["src"])])),_:1})])),_:1})])),_:1})}n(9665);var o=n(7575),l=n(6694);const d={components:{},data(){return{intervalId:0,remainingSeconds:0,remainingSecondsNormalized:0}},setup(){const e=(0,o.h)(),t=(0,l.R)();return{store:e,uiSettingsStore:t}},mounted(){this.startTimer()},beforeUnmount(){clearInterval(this.intervalId)},methods:{startTimer(){var e=this.uiSettingsStore.uiSettings["AUTOCLOSE_NEW_ITEM_ARRIVED"];console.log(`starting newitemarrived timer, duration=${e}`),this.remainingSeconds=e,this.intervalId=setInterval((()=>{this.remainingSecondsNormalized=this.remainingSeconds/e,this.remainingSeconds-=.1,this.remainingSeconds<=0&&(clearInterval(this.intervalId),this.$router.push({path:"/"}))}),100)}}};var c=n(1639),m=n(9885),u=n(8289),h=n(4458),g=n(3190),p=n(335),v=n(9984),w=n.n(v);const S=(0,c.Z)(d,[["render",s]]),I=S;w()(d,"components",{QPage:m.Z,QLinearProgress:u.Z,QCard:h.Z,QCardSection:g.Z,QImg:p.Z})}}]);