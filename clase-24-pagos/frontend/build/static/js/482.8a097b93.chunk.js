"use strict";(self.webpackChunkrecursopasareladepago=self.webpackChunkrecursopasareladepago||[]).push([[482],{482:function(e,t,n){n.r(t),n.d(t,{default:function(){return R}});var c=n(165),r=n(861),a=n(439),i=n(791),s=n(694),o=n.n(s),l=n(764),u=n(473),d=n(830),p=n.n(d),h=function(e,t,n,c){return p().fire({icon:e,title:t,text:n,timer:3e3,showConfirmButton:!1}).then((function(e){c()}))},f="Stripe_container__bO9Q8",m="Stripe_highlighted__ViBRC",k="Stripe_title__msbud",b="Stripe_productsContainer__G2SNT",v="Stripe_productCard__lHCTa",g="Stripe_genericButton__rT8+m",x="Stripe_buttonPanel__x-qaj",_=n(184),j=function(){var e=(0,l.useStripe)(),t=(0,l.useElements)(),n=function(){var n=(0,r.Z)((0,c.Z)().mark((function n(r){var a,i;return(0,c.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r.preventDefault(),n.next=3,e.confirmPayment({elements:t,redirect:"if_required"});case 3:a=n.sent,i=a.error,a.paymentIntent,i?(console.log(i),c="error",s="Error al procesar el pago",o=i.message,p().fire({icon:c,title:s,text:o,timer:3e3,showConfirmButton:!1})):h("success","\xa1Pago completado!","El pago ha sido procesado con \xe9xito",(function(){return window.location.replace("/")}));case 7:case"end":return n.stop()}var c,s,o}),n)})));return function(e){return n.apply(this,arguments)}}();return(0,_.jsx)(_.Fragment,{children:(0,_.jsxs)("form",{children:[(0,_.jsx)(l.PaymentElement,{}),(0,_.jsx)("div",{className:x,children:(0,_.jsx)("button",{className:g,onClick:n,children:"Pagar"})})]})})},S=function(e){var t=e.hidden,n=e.children;return t?null:n},y=function(e){var t=e.product,n=e.setCurrentProduct;return(0,_.jsx)(_.Fragment,{children:(0,_.jsxs)("div",{className:v,onClick:function(){return n(t.id)},children:[(0,_.jsx)("p",{children:t.name}),(0,_.jsx)("p",{children:t.price})]})})},E=n(144),Z=n(671),w=n(340),C=(0,E.Z)((function e(){(0,Z.Z)(this,e),this.makeGetRequest=function(e){var t=e.url,n=e.config,c=e.callbackSuccess,r=e.callbackError;w.Z.get(t,n).then(c).catch(r)},this.makePostRequest=function(e){var t=e.url,n=e.body,c=e.config,r=e.callbackSuccess,a=e.callbackError;w.Z.post(t,n,c).then(r).catch(a)},this.makePutRequest=function(e){var t=e.url,n=e.body,c=e.config,r=e.callbackSuccess,a=e.callbackError;w.Z.put(t,n,c).then(r).catch(a)},this.makeDeleteRequest=function(e){var t=e.url,n=e.config,c=e.callbackSuccess,r=e.callbackError;w.Z.delete(t,n).then(c).catch(r)}})),P="http://localhost:8080",q="/api/payments",N=(0,E.Z)((function e(){var t=this;(0,Z.Z)(this,e),this.createPaymentIntent=function(e){var n=e.productId,c=e.callbackSuccess,r=e.callbackError,a={url:"".concat(P).concat(q,"/payment-intents?id=").concat(n),callbackSuccess:c,callbackError:r};t.client.makePostRequest(a)},this.pay=function(e){var n=e.body,c=e.callbackSuccess,r=e.callbackError,a={url:"".concat(P).concat(q,"/checkout"),body:n,config:{headers:{"Content-Type":"application/json",Accept:"application/json"},withCredentials:!0},callbackSuccess:c,callbackError:r};t.client.makePostRequest(a)},this.client=new C})),I=(0,u.J)("pk_test_51I890uI9wiE8tE7ltC7wUIsfivgKfXMqq5QYmvwbUcyZ9z5hiTWD3HS6nFHbug6vNeLWJehOpPkjtbjgRPy7AqN300LL70n6Ku"),R=function(){var e=(0,i.useState)(null),t=(0,a.Z)(e,2),n=t[0],s=t[1],u=(0,i.useState)(null),d=(0,a.Z)(u,2),p=d[0],h=d[1];(0,i.useEffect)((function(){var e=function(){var e=(0,r.Z)((0,c.Z)().mark((function e(){return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(n),(new N).createPaymentIntent({productId:n,callbackSuccess:v,callbackError:g});case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();n&&e()}),[n]);var v=function(e){h(e.data.payload.client_secret)},g=function(e){console.log(e)};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("div",{className:f,children:(0,_.jsx)("h1",{className:k,children:"Stripe"})}),(0,_.jsxs)("div",{className:o()([f,m]),children:[(0,_.jsx)(S,{hidden:n,children:(0,_.jsx)("div",{className:b,children:[{id:1,name:"papas",price:1e3},{id:2,name:"queso",price:500},{id:3,name:"hamburguesa",price:1500},{id:4,name:"soda",price:1e3},{id:5,name:"golosinas",price:800}].map((function(e){return(0,_.jsx)(y,{product:e,setCurrentProduct:s},e.id)}))})}),(0,_.jsx)(S,{hidden:!p||!I,children:(0,_.jsx)(l.Elements,{stripe:I,options:{clientSecret:p},children:(0,_.jsx)(j,{})})})]})]})}}}]);
//# sourceMappingURL=482.8a097b93.chunk.js.map