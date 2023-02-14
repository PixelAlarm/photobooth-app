"use strict";(globalThis["webpackChunkqPhotobooth"]=globalThis["webpackChunkqPhotobooth"]||[]).push([[319],{319:(e,o,l)=>{l.r(o),l.d(o,{default:()=>Q});var n=l(9835),t=l(6970);const s={class:"text-h6 q-mb-md"},r={class:"q-gutter-sm"};function a(e,o,l,a,c,i){const m=(0,n.up)("q-tab"),g=(0,n.up)("q-tabs"),u=(0,n.up)("q-separator"),p=(0,n.up)("blitz-form"),d=(0,n.up)("q-card"),f=(0,n.up)("q-btn"),b=(0,n.up)("q-page-sticky"),h=(0,n.up)("q-page");return(0,n.wg)(),(0,n.j4)(h,{padding:""},{default:(0,n.w5)((()=>[(0,n.Wm)(g,{modelValue:a.selected_group,"onUpdate:modelValue":o[0]||(o[0]=e=>a.selected_group=e),class:"text-grey","active-color":"secondary","indicator-color":"secondary","mobile-arrows":"",align:"justify"},{default:(0,n.w5)((()=>[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.main_groups,(e=>((0,n.wg)(),(0,n.j4)(m,{key:e,label:e,name:e},null,8,["label","name"])))),128))])),_:1},8,["modelValue"]),(0,n.Wm)(u),(0,n.Wm)(d,{class:"q-pa-md q-mt-md"},{default:(0,n.w5)((()=>[(0,n._)("div",s,(0,t.zw)(a.selected_group),1),((0,n.wg)(),(0,n.j4)(p,{modelValue:a.serverConfig[a.selected_group],"onUpdate:modelValue":o[1]||(o[1]=e=>a.serverConfig[a.selected_group]=e),key:a.selected_group,schema:a.schema_blitzar,internalLabels:!1,columnCount:2},null,8,["modelValue","schema"]))])),_:1}),(0,n.Wm)(b,{position:"bottom-right",offset:[25,25]},{default:(0,n.w5)((()=>[(0,n._)("div",r,[(0,n.Wm)(f,{label:"reset",onClick:o[2]||(o[2]=e=>a.remoteProcedureCall("/cmd/config/reset"))}),(0,n.Wm)(f,{label:"restore",onClick:o[3]||(o[3]=e=>a.restoreConfig())}),(0,n.Wm)(f,{color:"primary",label:"persist",onClick:o[4]||(o[4]=e=>a.uploadConfigAndPersist())})])])),_:1})])),_:1})}l(6727),l(9665);var c=l(499),i=l(1569),m=l(9302),g=l(7575),u=l(3746),p=l(6380);const d={components:{BlitzForm:p.lU},setup(){const e=(0,m.Z)(),o=(0,g.h)();let{serverConfig:l}=(0,u.Jk)(o),t={};const s=(0,c.iH)([]),r=(0,c.iH)(""),a=(0,n.Fl)((()=>""!=r.value?p(t[r.value]):[])),p=e=>{console.log("creating blitzar schema"),console.log(e);let o=[];return console.log("allOf"in e),"allOf"in e?Object.entries(e["allOf"][0]["properties"]).forEach((e=>{const[l,n]=e;let t={id:l,label:n["title"],component:"QInput",subLabel:`${n["description"]||""} (default=${n["default"]})`};"boolean"==n["type"]&&(t["component"]="QToggle"),"integer"!=n["type"]&&"float"!=n["type"]||(t["component"]="QInput",t["ui_component"]&&(t["component"]=n["ui_component"]),t["type"]="number",t["labelAlways"]=!0,n["exclusiveMinimum"]&&(t["min"]=n["exclusiveMinimum"]),n["exclusiveMaximum"]&&(t["max"]=n["exclusiveMaximum"]),n["minimum"]&&(t["min"]=n["minimum"]),n["maximum"]&&(t["max"]=n["maximum"])),Object.keys(n).includes("enum")&&(console.log("enum"),t["component"]="QSelect",t["options"]=n["enum"]),o.push(t)})):console.log("error, wrong format!, no direct props on main level"),console.log(o),o},d=()=>{i.api.get("/config/schema?type=dereferenced").then((async o=>{console.log(o.data),t=o.data.properties,s.value=Object.keys(t),r.value=s.value[0],e.notify({message:"got scheme!",color:"green"})})).catch((o=>{console.log(o),console.log("error"),e.notify({message:"error getting scheme!",color:"red"})}))};d();const f=()=>{i.api.get("/config/current").then((async o=>{console.log(o.data),console.log(l.value),l.value=o.data,e.notify({message:"config restored from server, pls reload page!",color:"green"})})).catch((o=>{console.log(o),console.log("error"),e.notify({message:"error getting config!",color:"red"})}))},b=()=>{console.log("sync config to server"),console.log(l.value),i.api.post("/config/current",l.value).then((o=>{e.notify({message:"Persisted config, trying to restart service",color:"green"}),console.log(o)})).catch((o=>{e.notify({message:"error saving config, check browser console",color:"red"}),o.response?(console.log(o.response.data),console.log(o.response.status),console.log(o.response.headers)):o.request?console.log(o.request):console.log("Error",o.message),console.log(o.config)}))};return(0,n.wF)((()=>console.log("Composition API beforemounted"))),(0,n.bv)((()=>console.log("Composition API mounted"))),{schema_blitzar:a,main_groups:s,selected_group:r,serverConfig:l,remoteProcedureCall:i.remoteProcedureCall,restoreConfig:f,uploadConfigAndPersist:b}}};var f=l(1639),b=l(9885),h=l(7817),v=l(7661),y=l(926),C=l(6764),_=l(4458),w=l(627),k=l(8879),q=l(9984),x=l.n(q);const P=(0,f.Z)(d,[["render",a]]),Q=P;x()(d,"components",{QPage:b.Z,QTabs:h.Z,QTab:v.Z,QSeparator:y.Z,QSelect:C.Z,QCard:_.Z,QPageSticky:w.Z,QBtn:k.Z})}}]);