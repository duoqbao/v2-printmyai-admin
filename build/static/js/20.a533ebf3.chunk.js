(this["webpackJsonpprint-admin"]=this["webpackJsonpprint-admin"]||[]).push([[20],{398:function(e,t,n){"use strict";var c=n(106);t.a={getUsers:function(e){var t=e.limit,n=void 0===t?5:t,a=e.skip,r=void 0===a?0:a,o={};return n&&(o.limit=n),o.skip=r||0,c.b.get("/users",{params:o})},getPaymentById:function(e){return c.b.get("/ecommerc/payments/list/".concat(e))},deleteUser:function(e){return c.b.delete("/users/".concat(e))}}},417:function(e,t,n){"use strict";var c=n(4),a=n(1),r=n(9),o=n(84),l=n(2),i=n.n(l),s=n(22),u=n(0),b=n(47),d=n(218),f=n(215),p=function(e,t){var n={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(n[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(c=Object.getOwnPropertySymbols(e);a<c.length;a++)t.indexOf(c[a])<0&&Object.prototype.propertyIsEnumerable.call(e,c[a])&&(n[c[a]]=e[c[a]])}return n},m=function(e){var t,n=e.prefixCls,r=e.className,o=e.checked,l=e.onChange,s=e.onClick,d=p(e,["prefixCls","className","checked","onChange","onClick"]),f=(0,u.useContext(b.b).getPrefixCls)("tag",n),m=i()(f,(t={},Object(c.a)(t,"".concat(f,"-checkable"),!0),Object(c.a)(t,"".concat(f,"-checkable-checked"),o),t),r);return u.createElement("span",Object(a.a)({},d,{className:m,onClick:function(e){null===l||void 0===l||l(!o),null===s||void 0===s||s(e)}}))},O=function(e,t){var n={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(n[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(c=Object.getOwnPropertySymbols(e);a<c.length;a++)t.indexOf(c[a])<0&&Object.prototype.propertyIsEnumerable.call(e,c[a])&&(n[c[a]]=e[c[a]])}return n},j=new RegExp("^(".concat(d.a.join("|"),")(-inverse)?$")),v=new RegExp("^(".concat(d.b.join("|"),")$")),y=function(e,t){var n,l=e.prefixCls,d=e.className,p=e.style,m=e.children,y=e.icon,g=e.color,h=e.onClose,x=e.closeIcon,k=e.closable,C=void 0!==k&&k,P=O(e,["prefixCls","className","style","children","icon","color","onClose","closeIcon","closable"]),w=u.useContext(b.b),E=w.getPrefixCls,N=w.direction,I=u.useState(!0),S=Object(r.a)(I,2),Y=S[0],A=S[1];u.useEffect((function(){"visible"in P&&A(P.visible)}),[P.visible]);var B=function(){return!!g&&(j.test(g)||v.test(g))},D=Object(a.a)({backgroundColor:g&&!B()?g:void 0},p),R=B(),$=E("tag",l),H=i()($,(n={},Object(c.a)(n,"".concat($,"-").concat(g),R),Object(c.a)(n,"".concat($,"-has-color"),g&&!R),Object(c.a)(n,"".concat($,"-hidden"),!Y),Object(c.a)(n,"".concat($,"-rtl"),"rtl"===N),n),d),J=function(e){e.stopPropagation(),null===h||void 0===h||h(e),e.defaultPrevented||"visible"in P||A(!1)},M="onClick"in P||m&&"a"===m.type,U=Object(s.a)(P,["visible"]),z=y||null,F=z?u.createElement(u.Fragment,null,z,u.createElement("span",null,m)):m,T=u.createElement("span",Object(a.a)({},U,{ref:t,className:H,style:D}),F,C?x?u.createElement("span",{className:"".concat($,"-close-icon"),onClick:J},x):u.createElement(o.a,{className:"".concat($,"-close-icon"),onClick:J}):null);return M?u.createElement(f.a,null,T):T},g=u.forwardRef(y);g.CheckableTag=m;t.a=g},528:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return y}));var c=n(44),a=n.n(c),r=n(126),o=n(65),l=n(62),i=n(0),s=n(217),u=n.n(s),b=n(417),d=n(379),f=n(378),p=n(82),m=n(45),O=n(398),j=n(7),v={initialize:"blue",successed:"green",failed:"red"};function y(){var e=Object(m.i)(),t=Object(m.g)(),n=Object(p.c)((function(e){return e.user})).user,c=e.id,s=Object(i.useState)([]),y=Object(l.a)(s,2),g=y[0],h=y[1],x=Object(i.useState)(!1),k=Object(l.a)(x,2),C=k[0],P=k[1],w=[{title:"Payment Name",dataIndex:"name",key:"name"},{title:"Payment Date",dataIndex:"createdAt",key:"createdAt",render:function(e){return Object(j.jsx)("span",{children:u()(e).format("DD-MM-YYYY HH:mm")})}},{title:"Amount",dataIndex:"amount",key:"amount",render:function(e){return Object(j.jsx)("span",{children:"$ ".concat((t=e/100||0,(t?t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):"")||0))});var t}},{title:"Status",dataIndex:"status",key:"status",render:function(e){return Object(j.jsx)(b.a,{color:v[e],children:e})}}],E=function(){var e=Object(o.a)(a.a.mark((function e(){var t,n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,P(!0),e.next=4,O.a.getPaymentById(c);case 4:n=e.sent,h(null===n||void 0===n||null===(t=n.map((function(e){return Object(r.a)(Object(r.a)({},e),{},{key:e._id})})))||void 0===t?void 0:t.reverse()),P(!1),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();return Object(i.useEffect)((function(){null===n&&t.push("/users"),E()}),[c]),Object(j.jsx)("div",{className:"layout-styles order",children:Object(j.jsx)(d.a,{bordered:!1,className:"criclebox tablespace mb-24",title:"Payment by ".concat(null===n||void 0===n?void 0:n.username),children:Object(j.jsx)(f.a,{loading:C,columns:w,dataSource:g})})})}}}]);
//# sourceMappingURL=20.a533ebf3.chunk.js.map