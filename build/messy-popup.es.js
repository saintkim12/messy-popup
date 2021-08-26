var t=Object.defineProperty,e=(e,l,o)=>(((e,l,o)=>{l in e?t(e,l,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[l]=o})(e,"symbol"!=typeof l?l+"":l,o),o);class l{convertTextToElement(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}show(t){return t.style.visibility="",t}hide(t){return t.style.visibility="hidden",t}destroy(t){var e,l;return null!=(l=null==(e=t.parentNode)?void 0:e.removeChild(t))?l:t}setDraggable(t,e){return!1===e?this.unbindDraggable.call(t,t):this.bindDraggable.call(t,t),t}insertCss(t){const e=Array.from(document.styleSheets).find((t=>null===t.href))||(()=>{var t;const e=document.createElement("style");return e.setAttribute("data-messy-popup","true"),null==(t=document.querySelector("head"))||t.appendChild(e),Array.from(document.styleSheets).find((t=>null===t.href))})();return!!e&&e.insertRule(t,e.cssRules.length)>=0}unbindDraggable(t){var e;(null!=(e=t.querySelector("[data-messy-draggable-handle]"))?e:t).onmousedown=null}bindDraggable(t){var e;let l=0,o=0,n=0,i=0;function s(e){e.preventDefault(),l=n-e.clientX,o=i-e.clientY,n=e.clientX,i=e.clientY,t.style.bottom&&(t.style.top=t.offsetTop+"px",t.style.bottom=""),t.style.right&&(t.style.left=t.offsetLeft+"px",t.style.right=""),t.style.top=t.offsetTop-o+"px",t.style.left=t.offsetLeft-l+"px"}function r(){document.onmouseup=null,document.onmousemove=null}(null!=(e=t.querySelector("[data-messy-draggable-handle]"))?e:t).onmousedown=function(t){t.preventDefault(),n=t.clientX,i=t.clientY,document.onmouseup=r,document.onmousemove=s}}}const o=(new class{constructor(){e(this,"popupInfo"),e(this,"_config"),e(this,"instanceConfig"),e(this,"htmlUtil"),this.htmlUtil=new l,this.popupInfo={},this.instanceConfig=void 0,this._config={root:"body",wrapper:document.createElement("div"),global:{draggable:!0,style:{zIndex:1e3}}}}init(){return[".messy-popup { background-color: #fff; }","[data-messy-draggable-handle] { cursor: move; }"].forEach(this.htmlUtil.insertCss),this}addPopupInfo(t,e){this.popupInfo[t]=e}removePopupInfo(t){delete this.popupInfo[t]}setConfig(t){var e,l,o,n,i,s,r,u,d,a,h,g,p,c,v,b,y,f,m,w,I,D,x,C,P,S,E;const z=(...t)=>t.find((t=>void 0!==t)),T=this._config,U={root:z(null==t?void 0:t.root,T.root),wrapper:z(null==t?void 0:t.wrapper,T.wrapper),global:{draggable:z(null==(e=null==t?void 0:t.global)?void 0:e.draggable,T.global.draggable),style:{zIndex:z(null==(o=null==(l=null==t?void 0:t.global)?void 0:l.style)?void 0:o.zIndex,null==(n=null==t?void 0:t.global)?void 0:n.zIndex,null==(s=null==(i=null==T?void 0:T.global)?void 0:i.style)?void 0:s.zIndex),top:z(null==(u=null==(r=null==t?void 0:t.global)?void 0:r.style)?void 0:u.top,null==(d=T.global.style)?void 0:d.top),left:z(null==(h=null==(a=null==t?void 0:t.global)?void 0:a.style)?void 0:h.left,null==(g=T.global.style)?void 0:g.left),bottom:z(null==(c=null==(p=null==t?void 0:t.global)?void 0:p.style)?void 0:c.bottom,null==(v=T.global.style)?void 0:v.bottom),right:z(null==(y=null==(b=null==t?void 0:t.global)?void 0:b.style)?void 0:y.right,null==(f=T.global.style)?void 0:f.right),position:z(null==(w=null==(m=null==t?void 0:t.global)?void 0:m.style)?void 0:w.position,null==(I=T.global.style)?void 0:I.position),width:z(null==(x=null==(D=null==t?void 0:t.global)?void 0:D.style)?void 0:x.width,null==(C=T.global.style)?void 0:C.width),height:z(null==(S=null==(P=null==t?void 0:t.global)?void 0:P.style)?void 0:S.height,null==(E=T.global.style)?void 0:E.height)}}};return this.instanceConfig=U,this}createPopup(...t){var e;const l=this.instanceConfig,o=document.querySelector(null!=(e=l.root)?e:"");return t.filter((t=>t.id)).map((t=>{var e,o,n,i,s,r,u;const{id:d,wrapper:a,content:h,style:g={}}=t,{zIndex:p}=l.global,c=(t=>t instanceof HTMLElement?t:"string"==typeof t?this.htmlUtil.convertTextToElement(t):this._config.wrapper)(void 0===a?l.wrapper:a).cloneNode(!0);c.id=d,c.classList.add("messy-popup");(null!=(e=c.querySelector("[data-messy-content]"))?e:(c.setAttribute("data-messy-content",""),c)).innerHTML=h,c.dataset.messyPopup="",c.style.top=(null==(o=null==g?void 0:g.top)?void 0:o.toString())||"0",c.style.left=(null==(n=null==g?void 0:g.left)?void 0:n.toString())||"0",c.style.bottom=(null==(i=null==g?void 0:g.bottom)?void 0:i.toString())||"",c.style.right=(null==(s=null==g?void 0:g.right)?void 0:s.toString())||"",c.style.position=(null==g?void 0:g.position)||"absolute",c.style.zIndex=(t=>{switch(typeof t){case"undefined":return"";case"number":return`${t}`;default:return t}})((null==g?void 0:g.zIndex)||(null==g?void 0:g["z-index"])||p);const v=c.querySelector("[data-messy-content] > *:first-child");return v&&(v.style.width=(null==(r=null==g?void 0:g.width)?void 0:r.toString())||"",v.style.height=(null==(u=null==g?void 0:g.height)?void 0:u.toString())||""),c.style.visibility="hidden",c.show=()=>this.htmlUtil.show(c),c.hide=()=>this.htmlUtil.hide(c),c.destroy=()=>(this.removePopupInfo(d),this.htmlUtil.destroy(c)),c.setDraggable=()=>this.htmlUtil.setDraggable(c),c.unsetDraggable=()=>this.htmlUtil.setDraggable(c,!1),this.addPopupInfo(d,c),[c,t]})).map((([t,e])=>{var n;const i=(...t)=>{for(const e of t){const t="function"==typeof e?e():e;if("boolean"==typeof t)return t}},s=null!=(n=i(e.draggable,l.global.draggable))&&n,r=i(e.show,(()=>"boolean"==typeof e.hide?!e.hide:void 0),l.global.show,(()=>"boolean"==typeof l.global.hide?!l.global.hide:void 0),!0);return o.appendChild(t),s&&t.setDraggable(),r&&t.show(),t})),this}getPopup(t){return this.popupInfo[t]}show(t){return this.getPopup(t).show(),this}hide(t){return this.getPopup(t).hide(),this}destroy(t){return this.getPopup(t).destroy(),this}destroyAll(){return Object.keys(this.popupInfo).forEach(this.destroy),this}setDraggable(t){return this.getPopup(t).setDraggable(),this}unsetDraggable(t){return this.getPopup(t).unsetDraggable(),this}unsetDraggableAll(){return Object.keys(this.popupInfo).forEach(this.unsetDraggable),this}getPopupCount(){return Object.keys(this.popupInfo).length}forEach(t){return Object.entries(this.popupInfo).forEach((([e,l],o,n)=>t.apply(this,[[e,l],o,n]))),this}noConflict(){return this}config(t){return this.setConfig(t)}}).init();export{o as default};
//# sourceMappingURL=messy-popup.es.js.map
