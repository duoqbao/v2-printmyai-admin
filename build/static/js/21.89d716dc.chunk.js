(this["webpackJsonpprint-admin"]=this["webpackJsonpprint-admin"]||[]).push([[21],{416:function(e,t,n){"use strict";var c=n(1),a=n(9),r=n(147),o=n(2),i=n.n(o),s=n(35),l=n(12),u=n(0),d=n(47),p=n(216),f=n(24),b=n(66),v=n(109),m=n(203),j=n(63),O=n(67),x=n(202),h=function(e){var t=e.prefixCls,n=e.okButtonProps,a=e.cancelButtonProps,r=e.title,o=e.cancelText,i=e.okText,s=e.okType,l=e.icon,p=e.showCancel,f=void 0===p||p,h=e.close,y=e.onConfirm,g=e.onCancel,C=u.useContext(d.b).getPrefixCls;return u.createElement(j.a,{componentName:"Popconfirm",defaultLocale:O.a.Popconfirm},(function(e){return u.createElement("div",{className:"".concat(t,"-inner-content")},u.createElement("div",{className:"".concat(t,"-message")},l&&u.createElement("span",{className:"".concat(t,"-message-icon")},l),u.createElement("div",{className:"".concat(t,"-message-title")},Object(x.a)(r))),u.createElement("div",{className:"".concat(t,"-buttons")},f&&u.createElement(b.a,Object(c.a)({onClick:g,size:"small"},a),null!==o&&void 0!==o?o:e.cancelText),u.createElement(m.a,{buttonProps:Object(c.a)(Object(c.a)({size:"small"},Object(v.a)(s)),n),actionFn:y,close:h,prefixCls:C("btn"),quitOnNullishReturnValue:!0,emitEvent:!0},null!==i&&void 0!==i?i:e.okText)))}))},y=void 0,g=function(e,t){var n={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(n[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(c=Object.getOwnPropertySymbols(e);a<c.length;a++)t.indexOf(c[a])<0&&Object.prototype.propertyIsEnumerable.call(e,c[a])&&(n[c[a]]=e[c[a]])}return n},C=u.forwardRef((function(e,t){var n=u.useContext(d.b).getPrefixCls,o=Object(s.a)(!1,{value:void 0!==e.open?e.open:e.visible,defaultValue:void 0!==e.defaultOpen?e.defaultOpen:e.defaultVisible}),b=Object(a.a)(o,2),v=b[0],m=b[1],j=function(t,n){var c,a;m(t,!0),null===(c=e.onVisibleChange)||void 0===c||c.call(e,t,n),null===(a=e.onOpenChange)||void 0===a||a.call(e,t,n)},O=e.prefixCls,x=e.placement,C=void 0===x?"top":x,k=e.trigger,w=void 0===k?"click":k,E=e.okType,N=void 0===E?"primary":E,S=e.icon,P=void 0===S?u.createElement(r.a,null):S,T=e.children,_=e.overlayClassName,D=g(e,["prefixCls","placement","trigger","okType","icon","children","overlayClassName"]),V=n("popover",O),z=n("popconfirm",O),L=i()(z,_);return u.createElement(p.a,Object(c.a)({},D,{trigger:w,prefixCls:V,placement:C,onOpenChange:function(t){var n=e.disabled;void 0!==n&&n||j(t)},open:v,ref:t,overlayClassName:L,_overlay:u.createElement(h,Object(c.a)({okType:N,icon:P},e,{prefixCls:V,close:function(e){j(!1,e)},onConfirm:function(t){var n;return null===(n=e.onConfirm)||void 0===n?void 0:n.call(y,t)},onCancel:function(t){var n;j(!1,t),null===(n=e.onCancel)||void 0===n||n.call(y,t)}}))}),Object(f.a)(T,{onKeyDown:function(e){var t,n;u.isValidElement(T)&&(null===(n=null===T||void 0===T?void 0:(t=T.props).onKeyDown)||void 0===n||n.call(t,e)),function(e){e.keyCode===l.a.ESC&&v&&j(!1,e)}(e)}}))}));t.a=C},434:function(e,t,n){"use strict";var c=n(3),a=n(0),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"}}]},name:"edit",theme:"filled"},o=n(107),i=function(e,t){return a.createElement(o.a,Object(c.a)(Object(c.a)({},e),{},{ref:t,icon:r}))};i.displayName="EditFilled";t.a=a.forwardRef(i)},540:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return S}));var c=n(44),a=n.n(c),r=n(65),o=n(62),i=n(0),s=n(383),l=n(66),u=n(416),d=n(255),p=n(376),f=n(377),b=n(379),v=n(378),m=n(254),j=n(434),O=n(388),x=n(389),h=n(106),y=function(){return h.b.get("/ecommerc/categories")},g=function(e){return h.b.post("/ecommerc/categories",e)},C=function(e,t){return h.b.put("/ecommerc/categories/".concat(e),t)},k=function(e){return h.b.delete("/ecommerc/categories/".concat(e))},w=function(e){return h.b.delete("ecommerc/categories/".concat(e,"/delete-force"))},E=n(45),N=n(7);function S(){var e=Object(E.g)(),t=s.a.useModal(),n=Object(o.a)(t,2),c=(n[0],n[1],Object(i.useState)([])),h=Object(o.a)(c,2),S=h[0],P=h[1],T=Object(i.useState)(""),_=Object(o.a)(T,2),D=_[0],V=_[1],z=Object(i.useState)({}),L=Object(o.a)(z,2),A=L[0],B=L[1],F=Object(i.useState)(!1),I=Object(o.a)(F,2),R=I[0],J=I[1],K=Object(i.useState)(!1),M=Object(o.a)(K,2),q=M[0],H=M[1],U=[{title:"Name",dataIndex:"name",key:"name"},{width:"20%",title:"Action",key:"action",render:function(e){return Object(N.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[Object(N.jsx)(l.a,{icon:Object(N.jsx)(j.a,{}),onClick:function(){V(null===e||void 0===e?void 0:e.name),B(e),J(!0)},type:"warring",children:"Edit"}),Object(N.jsx)(u.a,{title:"Are You Sure?",onConfirm:function(){return G(e._id)},onCancel:function(){},children:Object(N.jsx)(l.a,{icon:Object(N.jsx)(O.a,{}),type:"primary",danger:!0,children:"Delete"})})]})}},{width:"20%",key:"product",render:function(t){return Object(N.jsx)("div",{children:Object(N.jsx)(l.a,{onClick:function(){e.push("/category/".concat(t._id,"/products"))},children:"Show product by Category"})})}}],Y=function(){var e=Object(r.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,H(!0),e.next=4,y();case 4:t=e.sent,P(t||[]),H(!1),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();Object(i.useEffect)((function(){document.title="Category",Y()}),[]);var G=function(){var e=Object(r.a)(a.a.mark((function e(t){var n,c,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k(t);case 3:e.sent,d.b.success("Delete Success"),Y(),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),o=null===e.t0||void 0===e.t0||null===(n=e.t0.response)||void 0===n||null===(c=n.data)||void 0===c?void 0:c.stack.split("\n"),s.a.confirm({title:"Are you sure you want to delete ?",content:o[0],onOk:function(){var e=Object(r.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(t);case 2:e.sent,d.b.success("Delete Success"),Y();case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),onCancel:function(){var e=Object(r.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()});case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}(),Q=function(){var e=Object(r.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t={name:D},!A._id){e.next=9;break}return e.next=5,C(A._id,t);case 5:e.sent,d.b.success("Updated successfully"),e.next=13;break;case 9:return e.next=11,g(t);case 11:e.sent,d.b.success("Created successfully");case 13:W(),Y(),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(0),d.b.error("Failed");case 20:case"end":return e.stop()}}),e,null,[[0,17]])})));return function(){return e.apply(this,arguments)}}(),W=function(){B({}),V(""),J(!1)};return Object(N.jsxs)("div",{className:"layout-styles",children:[Object(N.jsx)(p.a,{gutter:[24,24],children:Object(N.jsx)(f.a,{xs:"24",xl:24,children:Object(N.jsxs)(b.a,{bordered:!1,className:"criclebox tablespace mb-24",title:"Category",children:[Object(N.jsx)("div",{style:{display:"flex",justifyContent:"right",padding:12},children:Object(N.jsx)(l.a,{onClick:function(){J(!0)},type:"primary",icon:Object(N.jsx)(x.a,{}),children:"Create"})}),Object(N.jsx)("div",{className:"table-responsive",children:Object(N.jsx)(v.a,{columns:U,dataSource:S,pagination:!1,className:"ant-border-space",loading:q})})]})})}),Object(N.jsx)(s.a,{title:A._id?"Edit Name":"Create Name",visible:R,onOk:function(){return Q()},onCancel:function(){return W()},okText:A._id?"Save":"Create",children:Object(N.jsx)("div",{children:Object(N.jsx)(p.a,{children:Object(N.jsxs)(f.a,{span:12,children:[Object(N.jsx)("div",{className:"input",children:"Name"}),Object(N.jsx)(m.a,{value:D,onChange:function(e){V(e.target.value)}})]})})})})]})}}}]);
//# sourceMappingURL=21.89d716dc.chunk.js.map