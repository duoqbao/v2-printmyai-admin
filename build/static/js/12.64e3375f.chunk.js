(this["webpackJsonpprint-admin"]=this["webpackJsonpprint-admin"]||[]).push([[12],{392:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var a=n(44),c=n.n(a),r=n(65),s=n(214),i=n.n(s),u=n(106),l=n(397),o=n.n(l),d=function(e){var t;t=e.split(",")[0].indexOf("base64")>=0?atob(e.split(",")[1]):unescape(e.split(",")[1]);for(var n=e.split(",")[0].split(":")[1].split(";")[0],a=new Uint8Array(t.length),c=0;c<t.length;c++)a[c]=t.charCodeAt(c);return new Blob([a],{type:n})},p=function(e){if(e)return new Promise((function(t,n){o.a.imageFileResizer(e,1920,1080,"PNG",90,0,function(){var e=Object(r.a)(c.a.mark((function e(a){var r,s,l;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=new FormData,s=d(a),r.append("file",s),e.next=6,i.a.post("".concat(u.a,"/upload"),r);case 6:l=e.sent,t(l.data),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),n(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),"base64")}))}},393:function(e,t,n){"use strict";n.d(t,"a",(function(){return j}));var a=n(62),c=n(0),r=n(376),s=n(377),i=n(254),u=n(532),l=n(181),o=n(389),d=(n(396),n(7));function p(e){return!!new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i").test(e)}function j(e){var t=e.data,n=e.setData,j=e.uploadFile,b=e.title,f=void 0===b?"Url":b,h=e.isInput,v=void 0!==h&&h,x=Object(c.useState)(!1),O=Object(a.a)(x,2),m=O[0],g=O[1];Object(c.useEffect)((function(){g(!1)}),[t]);var w=Object(d.jsxs)("div",{children:[Object(d.jsx)(o.a,{}),Object(d.jsx)("div",{style:{marginTop:8},children:"Upload"})]});return Object(d.jsxs)(r.a,{gutter:[24,24],className:"UploadInput",children:[Object(d.jsx)(s.a,{span:12,hidden:v,children:Object(d.jsxs)("div",{className:"input",children:[Object(d.jsx)("label",{children:f}),Object(d.jsx)(i.a,{value:t,onChange:function(e){return function(e){var t=e.target.value;n(t)}(e)}})]})}),Object(d.jsx)(s.a,{span:v?24:12,children:Object(d.jsx)(u.a,{name:"avatar",listType:t&&p(t)?"text":"picture-card",className:"avatar-uploader",showUploadList:!1,beforeUpload:function(e){g(!0),j(e)},accept:"image/*",children:Object(d.jsx)(l.a,{spinning:m,children:t&&p(t)?Object(d.jsx)("div",{className:"card-credit img-hover",style:{width:"20rem",height:"11em",backgroundImage:"url(".concat(t,")"),backgroundRepeat:"no-repeat",backgroundSize:"contain",cursor:"pointer"}}):w})})})]})}},396:function(e,t,n){},418:function(e,t,n){"use strict";var a=n(3),c=n(0),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"},s=n(107),i=function(e,t){return c.createElement(s.a,Object(a.a)(Object(a.a)({},e),{},{ref:t,icon:r}))};i.displayName="DeleteOutlined";t.a=c.forwardRef(i)},517:function(e,t,n){},542:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return z}));var a=n(44),c=n.n(a),r=n(65),s=n(62),i=n(0),u=n(255),l=n(181),o=n(379),d=n(376),p=n(377),j=n(66),b=n(531),f=n(416),h=n(383),v=n(418),x=n(393),O=n(106),m=function(){return O.b.get("/assets")},g=function(e){return O.b.post("/assets",{url:e})},w=function(e){return O.b.delete("/assets/".concat(e))},y=n(392),k=(n(517),n(7));function z(){var e=Object(i.useState)(!1),t=Object(s.a)(e,2),n=t[0],a=t[1],O=Object(i.useState)(!1),z=Object(s.a)(O,2),C=z[0],N=z[1],U=Object(i.useState)(""),S=Object(s.a)(U,2),T=S[0],D=S[1],F=Object(i.useState)([]),R=Object(s.a)(F,2),A=R[0],E=R[1],H=function(){var e=Object(r.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a(!0),e.prev=1,e.next=4,m();case 4:t=e.sent,E(t),a(!1),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(1);case 11:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(){return e.apply(this,arguments)}}();Object(i.useEffect)((function(){H()}),[]);var _=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Object(y.a)(t).then((function(e){D(e)})).catch((function(e){D(null),u.b.error("Failed to upload image")}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(r.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g(T);case 3:e.sent,N(!1),D(""),u.b.success("Created successfully"),H(),e.next=12;break;case 10:e.prev=10,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();return Object(k.jsxs)(l.a,{spinning:n,children:[Object(k.jsx)("div",{className:"layout-styles textTemplate",children:Object(k.jsx)(o.a,{title:"Text Template",children:Object(k.jsxs)(d.a,{gutter:[12,12],children:[Object(k.jsx)(p.a,{span:24,children:Object(k.jsx)("div",{style:{display:"flex",justifyContent:"flex-end"},children:Object(k.jsx)(j.a,{onClick:function(){N(!0)},type:"primary",children:"Create Template"})})}),Object(k.jsx)(p.a,{span:24,children:Object(k.jsx)(d.a,{gutter:[12,12],children:A.map((function(e,t){return Object(k.jsx)(p.a,{lg:6,xxl:3,xs:24,children:Object(k.jsxs)("div",{className:"image-item",children:[Object(k.jsx)(b.a,{style:{width:180,height:180,borderRadius:8},src:e.url,alt:e.createdAt}),Object(k.jsx)(f.a,{title:"Are you sure delete this template?",onConfirm:Object(r.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,w(e._id);case 3:t.sent,u.b.success("Deleted successfully"),H(),t.next=10;break;case 8:t.prev=8,t.t0=t.catch(0);case 10:case"end":return t.stop()}}),t,null,[[0,8]])}))),onCancel:function(){},children:Object(k.jsx)(j.a,{type:"link",className:"image-icon",icon:Object(k.jsx)(v.a,{}),danger:!0})})]})},t)}))})})]})})}),Object(k.jsx)(h.a,{title:"Upload",visible:C,onCancel:function(){D(""),N(!1)},onOk:I,width:600,children:Object(k.jsx)(d.a,{gutter:[12,12],children:Object(k.jsx)(p.a,{span:24,children:Object(k.jsx)(x.a,{data:T,setData:function(e){return D(e)},uploadFile:_})})})})]})}}}]);
//# sourceMappingURL=12.64e3375f.chunk.js.map