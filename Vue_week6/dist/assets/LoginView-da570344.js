import{S as a}from"./sweetalert2.all-3e6723c9.js";import{_ as c,o as u,c as m,d as s,j as p,g as l,v as d,F as _}from"./index-5fac9801.js";const{VITE_APP_URL:f}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/V2",VITE_APP_PATH:"tttom3669",BASE_URL:"/Vue_homework/Vue_week6/dist/",MODE:"production",DEV:!1,PROD:!0},h={data(){return{user:{username:"",password:""}}},methods:{login(){this.$http.post(`${f}/admin/signin`,this.user).then(r=>{a.fire({icon:"success",title:`${r.data.message}`});const{token:e,expired:n}=r.data;document.cookie=`yoToken=${e}; expires=${new Date(n)};`,this.$router.push("/admin/products")}).catch(()=>{a.fire({icon:"error",title:"帳號密碼錯誤，請重新輸入"})})}}},w=s("div",null,"登入後台頁面",-1),g={class:"row justify-content-center"},b=s("h1",{class:"h3 mb-3 font-weight-normal"},"請先登入",-1),V={class:"col-8"},v={class:"form-floating mb-3"},P=s("label",{for:"username"},"Email address",-1),x={class:"form-floating"},E=s("label",{for:"password"},"Password",-1),k=s("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"}," 登入 ",-1),y=s("p",{class:"mt-5 mb-3 text-muted"},"© 2021~∞ - 六角學院",-1);function T(r,e,n,A,t,i){return u(),m(_,null,[w,s("div",g,[b,s("div",V,[s("form",{id:"form",class:"form-signin",onSubmit:e[2]||(e[2]=p((...o)=>i.login&&i.login(...o),["prevent"]))},[s("div",v,[l(s("input",{type:"email",class:"form-control",id:"username","onUpdate:modelValue":e[0]||(e[0]=o=>t.user.username=o),placeholder:"name@example.com",required:"",autofocus:""},null,512),[[d,t.user.username]]),P]),s("div",x,[l(s("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":e[1]||(e[1]=o=>t.user.password=o),placeholder:"Password",required:""},null,512),[[d,t.user.password]]),E]),k],32)])]),y],64)}const B=c(h,[["render",T]]);export{B as default};
