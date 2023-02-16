"use strict";(globalThis["webpackChunkqPhotobooth"]=globalThis["webpackChunkqPhotobooth"]||[]).push([[999],{3999:(e,o,l)=>{l.r(o),l.d(o,{default:()=>q});var t=l(9835);const r={class:"q-gutter-sm"};function n(e,o,l,n,a,s){const c=(0,t.up)("q-tab"),i=(0,t.up)("q-tabs"),m=(0,t.up)("q-separator"),u=(0,t.up)("blitz-form"),g=(0,t.up)("q-card"),p=(0,t.up)("q-btn"),d=(0,t.up)("q-page-sticky"),f=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(f,{padding:""},{default:(0,t.w5)((()=>[(0,t.Wm)(i,{modelValue:n.selected_group,"onUpdate:modelValue":o[0]||(o[0]=e=>n.selected_group=e),class:"text-grey","active-color":"secondary","indicator-color":"secondary","mobile-arrows":"",align:"justify"},{default:(0,t.w5)((()=>[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(n.main_groups,(e=>((0,t.wg)(),(0,t.j4)(c,{key:e,label:e,name:e},null,8,["label","name"])))),128))])),_:1},8,["modelValue"]),(0,t.Wm)(m),(0,t.Wm)(g,{class:"q-pa-md q-mt-md"},{default:(0,t.w5)((()=>[n.renderBlitzForm?((0,t.wg)(),(0,t.j4)(u,{modelValue:n.serverConfig[n.selected_group],"onUpdate:modelValue":o[1]||(o[1]=e=>n.serverConfig[n.selected_group]=e),key:n.selected_group,schema:n.schema_blitzar,internalLabels:!1,columnCount:2,class:"blitzar-form"},null,8,["modelValue","schema"])):(0,t.kq)("",!0)])),_:1}),(0,t.Wm)(d,{position:"bottom-right",offset:[25,25]},{default:(0,t.w5)((()=>[(0,t._)("div",r,[(0,t.Wm)(p,{label:"reset",onClick:o[2]||(o[2]=e=>n.remoteProcedureCall("/cmd/config/reset"))}),(0,t.Wm)(p,{label:"restore",onClick:o[3]||(o[3]=e=>n.restoreConfig())}),(0,t.Wm)(p,{color:"primary",label:"persist",onClick:o[4]||(o[4]=e=>n.uploadConfigAndPersist())})])])),_:1})])),_:1})}l(6727),l(9665);var a=l(499),s=l(1569),c=l(9302),i=l(7575),m=l(3746),u=l(6380);const g={components:{BlitzForm:u.lU},setup(){const e=(0,c.Z)(),o=(0,i.h)();let{serverConfig:l}=(0,m.Jk)(o),r={};const n=(0,a.iH)([]),u=(0,a.iH)(!1),g=(0,a.iH)(""),p=(0,t.Fl)((()=>""!=g.value?d(r[g.value]):[])),d=e=>{console.log("creating blitzar schema"),console.log(e);let o=[];return console.log("allOf"in e),"allOf"in e?Object.entries(e["allOf"][0]["properties"]).forEach((e=>{const[l,t]=e;let r={id:l,label:t["title"],component:"QInput"};"boolean"==t["type"]&&(r["component"]="QToggle"),"integer"!=t["type"]&&"float"!=t["type"]||(r["component"]="QInput",r["ui_component"]&&(r["component"]=t["ui_component"]),r["type"]="number",r["labelAlways"]=!0,t["exclusiveMinimum"]&&(r["min"]=t["exclusiveMinimum"]),t["exclusiveMaximum"]&&(r["max"]=t["exclusiveMaximum"]),t["minimum"]&&(r["min"]=t["minimum"]),t["maximum"]&&(r["max"]=t["maximum"])),Object.keys(t).includes("enum")&&(console.log("enum"),r["component"]="QSelect",r["options"]=t["enum"]),r["slots"]={label:{component:"QTooltip",slot:`ℹ️ ${t["description"]||""} (default=${t["default"]})`,anchor:"bottom left",self:"top left"}},o.push(r)})):console.log("error, wrong format!, no direct props on main level"),console.log(o),o},f=()=>{s.api.get("/config/schema?type=dereferenced").then((async e=>{console.log(e.data),r=e.data.properties,n.value=Object.keys(r),g.value=n.value[0],u.value=!0})).catch((o=>{console.log(o),console.log("error"),e.notify({message:"error getting scheme! check logs",color:"red"})}))};f();const b=()=>{u.value=!1,s.api.get("/config/current").then((async o=>{console.log(o.data),console.log(l.value),l.value=o.data,u.value=!0,e.notify({message:"config restored from server, pls reload page!",color:"green"})})).catch((o=>{console.log(o),console.log("error"),e.notify({message:"error getting config!",color:"red"})}))},v=()=>{console.log("sync config to server"),console.log(l.value),s.api.post("/config/current",l.value).then((o=>{e.notify({message:"Persisted config, trying to restart service",color:"green"}),console.log(o)})).catch((o=>{if(o.response.data.detail){let l="check following fields:<br/>";return Object.values(o.response.data.detail).forEach((e=>{l+=e["loc"].join(" -> "),l+=`: ${e["msg"]}`,l+="<br/>"})),void e.notify({caption:"validation error",icon:"error",html:!0,message:`${l}`,color:"red"})}e.notify({message:"error saving config, check browser console and logs",color:"red"})}))};return(0,t.wF)((()=>console.log("Composition API beforemounted"))),(0,t.bv)((()=>console.log("Composition API mounted"))),{schema_blitzar:p,renderBlitzForm:u,mainStore:o,main_groups:n,selected_group:g,serverConfig:l,remoteProcedureCall:s.remoteProcedureCall,restoreConfig:b,uploadConfigAndPersist:v}}};var p=l(1639),d=l(9885),f=l(7817),b=l(7661),v=l(926),h=l(4458),y=l(627),C=l(8879),k=l(9984),_=l.n(k);const w=(0,p.Z)(g,[["render",n]]),q=w;_()(g,"components",{QPage:d.Z,QTabs:f.Z,QTab:b.Z,QSeparator:v.Z,QCard:h.Z,QPageSticky:y.Z,QBtn:C.Z})}}]);