import{_ as c,R as _,r as s,o as l,c as u,a as e,w as n,b as t,d as a}from"./index-5fac9801.js";const d={components:{RouterView:_}},i={class:"container"},p=a("h1",null,"這是前台首頁",-1),f=a("hr",null,null,-1);function m(h,V,w,x,k,R){const o=s("router-link"),r=s("RouterView");return l(),u("div",i,[p,e(o,{to:"/"},{default:n(()=>[t("首頁")]),_:1}),t(" | "),e(o,{to:"/products"},{default:n(()=>[t("前台產品列表")]),_:1}),t(" | "),e(o,{to:"/cart"},{default:n(()=>[t("前台購物車")]),_:1}),t(" | "),e(o,{to:"/login"},{default:n(()=>[t("登入後台")]),_:1}),t(" | "),f,e(r)])}const B=c(d,[["render",m]]);export{B as default};