!function(){"use strict";var e=window.wp.element;const{useState:t,useEffect:n}=wp.element;var l=function(){const[l,a]=t(!1),[r,c]=t([]),[u,i]=t(null),[o,d]=t(null),[s,m]=t(null);let p,E;n((()=>{f()}),[]);const f=async function(){let e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"GET",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;n?(e=`${n.id}/?author=${wp_api_react_poc.current_user_id}&status=any`,n=JSON.stringify(n)):e=`?author=${wp_api_react_poc.current_user_id}&status=any`,a(!0);const l=`${wp_api_react_poc.rest_url}wp/v2/posts/${e}`;try{const e=await fetch(l,{method:t,headers:{"Content-Type":"application/json","X-WP-Nonce":wp_api_react_poc.nonce},body:n}),r=await e.json();"GET"==t&&c(r),a(!1)}catch(e){console.log("error",e)}};return l?p=(0,e.createElement)("div",null,"Loading..."):(E=r.map(((t,n)=>(0,e.createElement)("li",null,(0,e.createElement)("a",{html:"#",onClick:e=>function(e,t){i(t.id),d(t.title.rendered),m(t.content.rendered)}(0,t)},t.title.rendered),(0,e.createElement)("a",{href:"#",title:"DELETE",onClick:e=>{f("DELETE",{id:u})}},"[–]")))),p=(0,e.createElement)("ul",null,E)),(0,e.createElement)("div",null,(0,e.createElement)("form",{onSubmit:e=>function(e){e.preventDefault(),u?f("PUT",{id:u,title:o,content:s}):f("POST",{title:o,content:s})}(e)},(0,e.createElement)("div",null,(0,e.createElement)("label",null,"Title"),(0,e.createElement)("input",{type:"text",required:"","aria-required":"true",defaultValue:o,onChange:e=>function(e){d(e.target.value)}(e)})),(0,e.createElement)("div",null,(0,e.createElement)("label",null,"Content"),(0,e.createElement)("textarea",{rows:"8",cols:"20",defaultValue:s,onChange:e=>function(e){m(e.target.value)}(e)})),(0,e.createElement)("input",{type:"submit",value:"Submit"})),p)};const{useState:a,useEffect:r}=wp.element;const{render:c}=wp.element;c((0,e.createElement)((function(){return(0,e.createElement)("div",null,(0,e.createElement)(l,null))}),null),document.getElementById("react-app"))}();