import{C as b,aO as p,aP as m,c as d,w as f,_ as L,y as T,q as h,z as A,A as o,j as a,Z as s,a0 as B}from"./index.9cd9a530.js";import{u as g,a as $,b as E,Q,c as v}from"./QToolbarTitle.81e5af3d.js";import{Q as c}from"./QSpace.4e0d9895.js";import{a as w,Q as k}from"./QHeader.ff1f132e.js";import{Q as y,a as R}from"./QLayout.f1bdb81a.js";import"./rtl.bfefc57d.js";var t=b({name:"QRouteTab",props:{...p,...g},emits:$,setup(e,{slots:n,emit:r}){const l=m({useDisableForRouterLinkProps:!1}),{renderTab:i,$tabs:u}=E(e,n,r,{exact:d(()=>e.exact),...l});return f(()=>`${e.name} | ${e.exact} | ${(l.resolvedLink.value||{}).href}`,()=>{u.verifyRouteModel()}),()=>i(l.linkTag.value,l.linkAttrs.value)}});const C={},D=s("a",{href:"https://photobooth-app.org/",target:"_new",class:"q-mr-lg"},[s("img",{src:"icons/logo-notext-white-transparent.png",style:{"max-height":"40px"}})],-1);function N(e,n,r,l,i,u){const _=T("router-view");return h(),A(R,{view:"hHh lpR fFf"},{default:o(()=>[a(k,{elevated:"",class:"bg-secondary text-white"},{default:o(()=>[a(w,{class:"q-pa-none"},{default:o(()=>[a(Q,{"mobile-arrows":"",shrink:""},{default:o(()=>[a(t,{class:"bg-primary",to:"/",icon:"arrow_back_ios_new",label:e.$t("BTN_LABEL_BACK")},null,8,["label"]),a(t,{to:"/admin",icon:"dashboard",label:e.$t("TAB_LABEL_DASHBOARD")},null,8,["label"]),a(t,{to:"/admin/gallery",icon:"photo_library",label:e.$t("TAB_LABEL_GALLERY")},null,8,["label"]),a(t,{to:{name:"config"},icon:"settings",label:e.$t("TAB_LABEL_CONFIG")},null,8,["label"]),a(t,{to:"/admin/files",icon:"folder_shared",label:e.$t("TAB_LABEL_FILES")},null,8,["label"]),a(t,{to:"/admin/status",icon:"insights",label:e.$t("TAB_LABEL_STATUS")},null,8,["label"]),a(t,{to:"/admin/help",icon:"help",label:e.$t("TAB_LABEL_HELP")},null,8,["label"])]),_:1}),a(c),a(v,null,{default:o(()=>[s("span",null,B(e.$t("TITLE_ADMIN_CENTER")),1)]),_:1}),a(c),D]),_:1})]),_:1}),a(y,null,{default:o(()=>[a(_)]),_:1})]),_:1})}var x=L(C,[["render",N]]);export{x as default};