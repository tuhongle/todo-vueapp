import{d as _,u,r as g,c as l,a as e,b as d,w as r,e as h,f as a,v as c,g as t,t as f,h as b,i as v,j as p,o as m}from"./index-8d8425cf.js";import{_ as w}from"./todo-28c31abe.js";const x={class:"container-fluid"},k={class:"row align-items-center"},y={class:"col col-md-8 col-lg-6 text-start p-4 mx-auto"},S={class:"card shadow p-4 p-md-5 rounded-4 overflow-hidden"},V={class:"greetings-wrapper d-flex justify-content-between align-items-center mb-4"},C={class:"brand-logo d-flex align-items-center"},I=e("img",{src:w,alt:"",class:"img-fluid",width:"100"},null,-1),N=e("div",{class:"greetings"},[e("p",{class:"fw-bold fs-5 mb-3"},"Hello! let's get started"),e("p",{class:"mb-0"},"Sign in to continue.")],-1),M={class:"form-wrapper"},j={class:"form-group mb-3"},B={class:"form-group mb-3"},D={key:0,class:"text-danger mb-3"},L=e("button",{class:"btn btn-primary btn-block px-4 py-2 fs-4 text-light",type:"submit"},"SIGN IN",-1),T={class:"d-flex align-items-center justify-content-between my-4"},U={class:"me-2"},q={class:"form-check-label"},E=e("span",{class:"ms-2 text-muted"},"Keep me signed in",-1),R=e("a",{href:"#",class:"text-dark"},"Forgot password?",-1),F={class:"text-center lead"},z=_({__name:"LoginView",setup(G){const s=u();return(H,o)=>{const i=g("RouterLink");return m(),l("div",x,[e("div",k,[e("div",y,[e("div",S,[e("div",V,[e("div",C,[d(i,{to:{name:"home"}},{default:r(()=>[I]),_:1})]),N]),e("div",M,[e("form",{onSubmit:o[3]||(o[3]=h((...n)=>t(s).logIn&&t(s).logIn(...n),["prevent"]))},[e("div",j,[a(e("input",{class:"form-control shadow-none ps-4 py-3 rounded-0",type:"text",placeholder:"Email","onUpdate:modelValue":o[0]||(o[0]=n=>t(s).mail=n),required:""},null,512),[[c,t(s).mail]])]),e("div",B,[a(e("input",{class:"form-control shadow-none ps-4 py-3 rounded-0",type:"password",placeholder:"Password","onUpdate:modelValue":o[1]||(o[1]=n=>t(s).pass=n),required:""},null,512),[[c,t(s).pass]])]),t(s).loginMsg?(m(),l("p",D,f(t(s).loginMsg),1)):b("",!0),L,e("div",T,[e("div",U,[e("label",q,[a(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o[2]||(o[2]=n=>t(s).keepSignIn=n)},null,512),[[v,t(s).keepSignIn]]),E])]),R]),e("p",F,[p(" Don't have an account? "),d(i,{to:{name:"signup"}},{default:r(()=>[p("Create")]),_:1})])],32)])])])])])}}});export{z as default};