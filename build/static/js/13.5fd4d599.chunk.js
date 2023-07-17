(this["webpackJsonpprint-admin"]=this["webpackJsonpprint-admin"]||[]).push([[13],{399:function(e,t,c){"use strict";var n=c(106);t.a={getList:function(e){return n.b.get("/ecommerc/products/".concat(e,"/"))},creted:function(e,t){return n.b.post("/ecommerc/products/".concat(e),t)},getAllBlueprint:function(){return n.b.get("ecommerc/products/blueprints")},update:function(e,t){return n.b.put("/ecommerc/products/".concat(e,"/detail"),t)},delete:function(e){return n.b.delete("/ecommerc/products/".concat(e,"/detail"))},getPrintProvider:function(e){return n.b.get("/ecommerc/products/".concat(e,"/print-providers"))},getVariantsByProvider:function(e,t){return n.b.get("/ecommerc/products/".concat(e,"/print-providers/").concat(t,"/variants"))},getProductBySales:function(){return n.b.get("/ecommerc/products/on-sale")},toggleSale:function(e,t){return n.b.put("/ecommerc/products/".concat(t,"/sale"),{salePrice:e})}}},406:function(e,t,c){"use strict";c(62),c(0),c(407),c(419),c(420),c(7)},407:function(e,t,c){},515:function(e,t,c){},525:function(e,t,c){"use strict";c.r(t),c.d(t,"default",(function(){return w}));var n=c(44),r=c.n(n),i=c(65),a=c(62),s=c(0),l=c(254),o=c(255),u=c(181),d=c(376),p=c(377),b=c(379),j=c(531),f=c(68),x=c(382),v=c(416),h=c(66),g=c(89),O=c(399),m=(c(406),c(515),c(544)),y=c(7),k=function(e){return e?e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):""},P=function(e){var t=e.value,c=e.setPriceSale;return Object(y.jsxs)("div",{style:{display:"flex",gap:"12px",flexDirection:"column"},children:[Object(y.jsx)("label",{children:"Price Sale"}),Object(y.jsx)(l.a,{prefix:"%",value:k(t),onKeyPress:S,onChange:function(e){var t=e.target.value;c(t.replace(/,/g,""))}})]})},S=function(e){if(e.key.match(/[^0-9.]/g))e.preventDefault();else if(-1!==e.target.value.indexOf(".")&&"."===e.key)e.preventDefault();else{if(e.target.value.split(".").length>1&&"."===e.key)return!0;if(!(e.target.value.split(".").length>1&&2===e.target.value.split(".")[1].length))return!0;e.preventDefault()}};function w(){var e=Object(s.useState)(!1),t=Object(a.a)(e,2),c=t[0],n=t[1],l=Object(s.useState)([]),S=Object(a.a)(l,2),w=S[0],N=S[1],C=Object(s.useState)(!1),B=Object(a.a)(C,2),D=(B[0],B[1],Object(s.useState)(0)),T=Object(a.a)(D,2),W=T[0],$=T[1],E=function(){var e=Object(i.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(!0),e.prev=1,e.next=4,O.a.getProductBySales();case 4:t=e.sent,N(t),$(0),n(!1),e.next=12;break;case 10:e.prev=10,e.t0=e.catch(1);case 12:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}();Object(s.useEffect)((function(){E()}),[]);var F=function(){var e=Object(i.a)(r.a.mark((function e(){var t,c,n=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:0,c=n.length>1?n[1]:void 0,e.prev=2,e.next=5,O.a.toggleSale(t,c._id);case 5:e.sent,E(),o.b.success("Off sale successful"),e.next=12;break;case 10:e.prev=10,e.t0=e.catch(2);case 12:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(){return e.apply(this,arguments)}}();return Object(y.jsx)("div",{className:"layout-styles",children:Object(y.jsx)(u.a,{spinning:c,children:Object(y.jsx)(d.a,{gutter:[24,24],children:Object(y.jsx)(p.a,{xs:"24",span:24,children:Object(y.jsx)(b.a,{bordered:!1,className:"criclebox tablespace mb-24",title:"Product by Sales",children:Object(y.jsx)(d.a,{className:"rowgap-vbox",gutter:[24,0],style:{padding:24},children:w.length>0?null===w||void 0===w?void 0:w.map((function(e,t){return Object(y.jsx)(p.a,{xs:24,sm:24,md:12,lg:6,xl:6,className:"mb-24",children:Object(y.jsx)(b.a,{bordered:!1,className:"criclebox ",children:Object(y.jsxs)("div",{className:"card",children:[Object(y.jsx)(j.a,{style:{width:"230px",height:"150px"},src:e.image}),Object(y.jsx)("h1",{children:e.title}),Object(y.jsx)("p",{className:"price sale",children:"-".concat(k(e.salePrice||0)||0,"%")}),Object(y.jsx)(f.a,{placement:"left",title:Object(y.jsx)("div",{style:{minHeight:300,minWidth:200,background:"#fff"},children:e.sizes.map((function(t){return Object(y.jsxs)("div",{style:{padding:10},children:[Object(y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0px"},children:[Object(y.jsxs)(x.a,{style:{color:"#333",fontWeight:"bold"},children:[t.title," :"]}),Object(y.jsxs)(x.a,{style:{color:"#bd4040",fontWeight:"bold"},children:[parseFloat((null===t||void 0===t?void 0:t.price)?(null===t||void 0===t?void 0:t.price)-(null===t||void 0===t?void 0:t.price)*((null===e||void 0===e?void 0:e.salePrice)/100):e.price-(null===e||void 0===e?void 0:e.price)*((null===e||void 0===e?void 0:e.salePrice)/100)).toFixed(2)," ","$"]})]}),Object(y.jsx)("div",{style:{display:"flex",justifyContent:"flex-end"},children:Object(y.jsxs)(x.a,{style:{fontWeight:"bold",textDecoration:"line-through"},children:[(null===t||void 0===t?void 0:t.price)?null===t||void 0===t?void 0:t.price:e.price," $"]})})]})}))}),children:Object(y.jsx)(m.a,{style:{color:"#0a5266"}})}),Object(y.jsx)("p",{class:"price",children:"".concat(k(e.price||0),"$")}),Object(y.jsx)("p",{children:e.type}),Object(y.jsxs)("div",{className:"button-flex",children:[Object(y.jsx)(v.a,{title:Object(y.jsx)(P,{value:W,setPriceSale:$}),onConfirm:Object(i.a)(r.a.mark((function t(){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(Number(W)>100)){t.next=3;break}return o.b.error("The availabel input in 0-100"),t.abrupt("return");case 3:if(!(Number(W)<0)){t.next=6;break}return o.b.error("The availabel input in 0-100"),t.abrupt("return");case 6:return t.prev=6,t.next=9,O.a.update(e._id,{salePrice:W});case 9:t.sent,o.b.success("Update successful"),E(),t.next=16;break;case 14:t.prev=14,t.t0=t.catch(6);case 16:case"end":return t.stop()}}),t,null,[[6,14]])}))),onCancel:function(){$(0)},okText:"Yes",cancelText:"No",children:Object(y.jsx)(h.a,{type:"warning",children:"Edit"})}),Object(y.jsxs)(h.a,{ghost:!0,danger:!0,onClick:function(){return F(0,e)},children:[" ","Off Sales"]})]})]})})},t)})):Object(y.jsx)("div",{style:{display:"flex",justifyContent:"center",width:"100%"},children:Object(y.jsx)(g.a,{})})})})})})})})}}}]);
//# sourceMappingURL=13.5fd4d599.chunk.js.map