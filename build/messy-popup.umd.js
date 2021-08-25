var __defProp=Object.defineProperty,__defNormalProp=(t,e,l)=>e in t?__defProp(t,e,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[e]=l,__publicField=(t,e,l)=>(__defNormalProp(t,"symbol"!=typeof e?e+"":e,l),l);!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).MessyPopup=e()}(this,(function(){"use strict";const t="data-messy-content",e="data-messy-draggable-handle",l="messy-popup";class o{convertTextToElement(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}show(t){return t.style.visibility="",t}hide(t){return t.style.visibility="hidden",t}destroy(t){var e,l;return null!=(l=null==(e=t.parentNode)?void 0:e.removeChild(t))?l:t}setDraggable(t,e){return!1===e?this.unbindDraggable.call(t,t):this.bindDraggable.call(t,t),t}insertCss(t){const e=Array.from(document.styleSheets).find((t=>null===t.href))||(()=>{var t;const e=document.createElement("style");return e.setAttribute("data-messy-popup","true"),null==(t=document.querySelector("head"))||t.appendChild(e),Array.from(document.styleSheets).find((t=>null===t.href))})();return!!e&&e.insertRule(t,e.cssRules.length)>=0}unbindDraggable(t){var l;(null!=(l=t.querySelector("["+e+"]"))?l:t).onmousedown=null}bindDraggable(t){var l;let o=0,n=0,i=0,s=0;function r(e){e.preventDefault(),o=i-e.clientX,n=s-e.clientY,i=e.clientX,s=e.clientY,t.style.bottom&&(t.style.top=t.offsetTop+"px",t.style.bottom=""),t.style.right&&(t.style.left=t.offsetLeft+"px",t.style.right=""),t.style.top=t.offsetTop-n+"px",t.style.left=t.offsetLeft-o+"px"}function u(){document.onmouseup=null,document.onmousemove=null}(null!=(l=t.querySelector("["+e+"]"))?l:t).onmousedown=function(t){t.preventDefault(),i=t.clientX,s=t.clientY,document.onmouseup=u,document.onmousemove=r}}}return(new class{constructor(){__publicField(this,"popupInfo"),__publicField(this,"_config"),__publicField(this,"instanceConfig"),__publicField(this,"htmlUtil"),this.htmlUtil=new o,this.popupInfo={},this.instanceConfig=void 0,this._config={root:"body",wrapper:document.createElement("div"),global:{draggable:!0,style:{zIndex:1e3}}}}init(){return[".messy-popup { background-color: #fff; }"].forEach(this.htmlUtil.insertCss),this}addPopupInfo(t,e){this.popupInfo[t]=e}removePopupInfo(t){delete this.popupInfo[t]}setConfig(t){var e,l,o,n,i,s,r,u,d,a,p,h,g,f,c,b,y,v,m,w,_,I,P,D,x,C,S;const E=(...t)=>t.find((t=>void 0!==t)),T=this._config,z={root:E(null==t?void 0:t.root,T.root),wrapper:E(null==t?void 0:t.wrapper,T.wrapper),global:{draggable:E(null==(e=null==t?void 0:t.global)?void 0:e.draggable,T.global.draggable),style:{zIndex:E(null==(o=null==(l=null==t?void 0:t.global)?void 0:l.style)?void 0:o.zIndex,null==(n=null==t?void 0:t.global)?void 0:n.zIndex,null==(s=null==(i=null==T?void 0:T.global)?void 0:i.style)?void 0:s.zIndex),top:E(null==(u=null==(r=null==t?void 0:t.global)?void 0:r.style)?void 0:u.top,null==(d=T.global.style)?void 0:d.top),left:E(null==(p=null==(a=null==t?void 0:t.global)?void 0:a.style)?void 0:p.left,null==(h=T.global.style)?void 0:h.left),bottom:E(null==(f=null==(g=null==t?void 0:t.global)?void 0:g.style)?void 0:f.bottom,null==(c=T.global.style)?void 0:c.bottom),right:E(null==(y=null==(b=null==t?void 0:t.global)?void 0:b.style)?void 0:y.right,null==(v=T.global.style)?void 0:v.right),position:E(null==(w=null==(m=null==t?void 0:t.global)?void 0:m.style)?void 0:w.position,null==(_=T.global.style)?void 0:_.position),width:E(null==(P=null==(I=null==t?void 0:t.global)?void 0:I.style)?void 0:P.width,null==(D=T.global.style)?void 0:D.width),height:E(null==(C=null==(x=null==t?void 0:t.global)?void 0:x.style)?void 0:C.height,null==(S=T.global.style)?void 0:S.height)}}};return this.instanceConfig=z,this}createPopup(...e){var o;const n=this.instanceConfig,i=document.querySelector(null!=(o=n.root)?o:"");return e.filter((t=>t.id)).map((e=>{var o,i,s,r,u,d,a;const{id:p,wrapper:h,content:g,style:f={}}=e,{zIndex:c}=n.global;console.log("config.wrapper",n.wrapper);const b=(t=>t instanceof HTMLElement?t:"string"==typeof t?this.htmlUtil.convertTextToElement(t):this._config.wrapper)(void 0===h?n.wrapper:h).cloneNode(!0);b.id=p,b.classList.add(l);(null!=(o=b.querySelector("[data-messy-content]"))?o:(b.setAttribute(t,""),b)).innerHTML=g,b.dataset.messyPopup="",b.style.top=(null==(i=null==f?void 0:f.top)?void 0:i.toString())||"",b.style.left=(null==(s=null==f?void 0:f.left)?void 0:s.toString())||"",b.style.bottom=(null==(r=null==f?void 0:f.bottom)?void 0:r.toString())||"",b.style.right=(null==(u=null==f?void 0:f.right)?void 0:u.toString())||"",b.style.position=(null==f?void 0:f.position)||"absolute",b.style.zIndex=(t=>{switch(typeof t){case"undefined":return"";case"number":return`${t}`;default:return t}})((null==f?void 0:f.zIndex)||(null==f?void 0:f["z-index"])||c);const y=b.querySelector("[data-messy-content] > *:first-child");return y&&(y.style.width=(null==(d=null==f?void 0:f.width)?void 0:d.toString())||"",y.style.height=(null==(a=null==f?void 0:f.height)?void 0:a.toString())||""),b.style.visibility="hidden",b.show=()=>this.htmlUtil.show(b),b.hide=()=>this.htmlUtil.hide(b),b.destroy=()=>(this.removePopupInfo(p),this.htmlUtil.destroy(b)),b.setDraggable=()=>this.htmlUtil.setDraggable(b),b.unsetDraggable=()=>this.htmlUtil.setDraggable(b,!1),this.addPopupInfo(p,b),[b,e]})).map((([t,e])=>{var l;const o=(...t)=>{for(const e of t){const t="function"==typeof e?e():e;if("boolean"==typeof t)return t}},s=null!=(l=o(e.draggable,n.global.draggable))&&l,r=o(e.show,(()=>"boolean"==typeof e.hide?!e.hide:void 0),n.global.show,(()=>"boolean"==typeof n.global.hide?!n.global.hide:void 0),!0);return i.appendChild(t),s&&t.setDraggable(),r&&t.show(),t})),this}getPopup(t){return this.popupInfo[t]}show(t){return this.getPopup(t).show(),this}hide(t){return this.getPopup(t).hide(),this}destroy(t){return this.getPopup(t).destroy(),this}destroyAll(){return Object.keys(this.popupInfo).forEach(this.destroy),this}setDraggable(t){return this.getPopup(t).setDraggable(),this}unsetDraggable(t){return this.getPopup(t).unsetDraggable(),this}unsetDraggableAll(){return Object.keys(this.popupInfo).forEach(this.unsetDraggable),this}getPopupCount(){return Object.keys(this.popupInfo).length}forEach(t){return Object.entries(this.popupInfo).forEach((([e,l],o,n)=>t.apply(this,[[e,l],o,n]))),this}noConflict(){return this}config(t){return this.setConfig(t)}}).init()}));
//# sourceMappingURL=messy-popup.umd.js.map