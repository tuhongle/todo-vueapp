import{d as u,u as _,r as f,c as i,a as e,b as r,w as p,e as g,f as a,v as l,g as t,i as h,t as b,h as v,j as c,o as m}from"./index-8d8425cf.js";import{_ as w}from"./todo-28c31abe.js";const x={class:"container-fluid"},y={class:"row align-items-center"},U={class:"col col-md-8 col-lg-6 text-start p-4 mx-auto"},k={class:"card shadow p-4 p-md-5 rounded-4 overflow-hidden"},V={class:"greetings-wrapper d-flex justify-content-between align-items-center mb-4"},S={class:"brand-logo d-flex align-items-center"},C=e("img",{src:w,alt:"",class:"img-fluid",width:"100"},null,-1),N=e("div",{class:"greetings ms-3"},[e("p",{class:"fs-4 fw-bold mb-1"},"New here?"),e("p",{class:"mb-0"},"Signing up is easy. It only takes a few steps")],-1),M={class:"form-wrapper"},A={class:"form-group mb-3"},L={class:"form-group mb-3"},T={class:"form-group mb-3"},j={class:"form-group mb-3"},B={class:"d-flex align-items-center justify-content-between my-3"},I={class:"ps-0"},R={class:"form-check-label text-muted"},q=e("span",{class:"ms-2 text-muted"},"I agree to all Terms & Conditions",-1),D={key:0,class:"text-danger"},E=e("button",{class:"btn btn-primary btn-block px-4 py-2 fs-4 text-light",type:"submit"},"SIGN UP",-1),P={class:"text-center lead mt-3"},J=u({__name:"SignUpView",setup(G){const s=_();return(z,o)=>{const d=f("RouterLink");return m(),i("div",x,[e("div",y,[e("div",U,[e("div",k,[e("div",V,[e("div",S,[r(d,{to:{name:"home"}},{default:p(()=>[C]),_:1})]),N]),e("div",M,[e("form",{onSubmit:o[5]||(o[5]=g((...n)=>t(s).signUp&&t(s).signUp(...n),["prevent"]))},[e("div",A,[a(e("input",{class:"form-control shadow-none ps-4 py-3 rounded-0",type:"email",placeholder:"Email","onUpdate:modelValue":o[0]||(o[0]=n=>t(s).mail=n),required:""},null,512),[[l,t(s).mail]])]),e("div",L,[a(e("input",{class:"form-control shadow-none ps-4 py-3 rounded-0",type:"password",placeholder:"Password","onUpdate:modelValue":o[1]||(o[1]=n=>t(s).pass=n),required:""},null,512),[[l,t(s).pass]])]),e("div",T,[a(e("input",{class:"form-control shadow-none ps-4 py-3 rounded-0",type:"text",placeholder:"Username","onUpdate:modelValue":o[2]||(o[2]=n=>t(s).name=n)},null,512),[[l,t(s).name]])]),e("div",j,[a(e("input",{class:"form-control shadow-none ps-4 py-3 rounded-0",type:"text",placeholder:"Avatar URL","onUpdate:modelValue":o[3]||(o[3]=n=>t(s).url=n)},null,512),[[l,t(s).url]])]),e("div",B,[e("div",I,[e("label",R,[a(e("input",{type:"checkbox",class:"form-check-input","onUpdate:modelValue":o[4]||(o[4]=n=>t(s).termAgree=n)},null,512),[[h,t(s).termAgree]]),q])])]),t(s).signUpMsg?(m(),i("p",D,b(t(s).signUpMsg),1)):v("",!0),E,e("p",P,[c(" Already have an account? "),r(d,{to:{name:"login"}},{default:p(()=>[c("Login")]),_:1})])],32)])])])])])}}});export{J as default};
