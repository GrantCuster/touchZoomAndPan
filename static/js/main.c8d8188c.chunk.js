(this.webpackJsonppointerEvents=this.webpackJsonppointerEvents||[]).push([[0],{14:function(e,n,t){},17:function(e,n,t){"use strict";t.r(n);var o=t(2),i=t.n(o),r=t(8),a=t.n(r),c=(t(14),t(0)),s={pointers:[],selected:[],downCamera:new c.h,midpoint:null,cube:null,zoomData:{mouse:new c.g,clip:new c.h,ray:new c.h}},u=function(e){return function(e){return 2*Math.tan(s.camera.fov*Math.PI/360)*e}(e)/window.innerHeight},p=(t(9),t(1)),d=t.n(p),m=t(3),l=function(){var e=Object(m.a)(d.a.mark((function e(){var n,t,o,i,r,a,u,p,m,l,w;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w=function(){requestAnimationFrame(w),i.render(t,o)},n=s.canvas,t=new c.e,o=new c.c(75,window.innerWidth/window.innerHeight,.1,100),s.scene=t,s.camera=o,i=new c.i({canvas:n}),s.renderer=i,i.setSize(window.innerWidth,window.innerHeight),r=new c.f,a=function(e){return new Promise((function(n,t){r.load(e,(function(e){return n(e)}),null,t)}))},"grant_gracus-1573758087479.png",e.next=14,a("grant_gracus-1573758087479.png");case 14:u=e.sent,p=new c.d(2,2),m=new c.b({map:u}),l=new c.a(p,m),s.cube=l,t.add(l),o.position.z=5,w();case 22:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(e,n,t){var o=e.clip,i=e.ray;o.set(e.mouse.x/window.innerWidth*2-1,-e.mouse.y/window.innerHeight*2+1,.5),o.unproject(t),o.sub(t.position).normalize();var r=(n-t.position.z)/o.z;i.copy(t.position).add(o.multiplyScalar(r))},v=function(e){var n=new c.g,t=new c.h,o=new c.h;n.copy(e.mouse),t.copy(e.clip),o.copy(e.ray),e.down={mouse:n,clip:t,ray:o}},f=function(){var e=s.pointers[0],n=s.pointers[1],t=e.mouse.distanceTo(n.mouse),o=new c.g;o.subVectors(n.mouse,e.mouse),o.normalize(),o.multiplyScalar(t/2),o.add(e.mouse);var i={mouse:o,clip:new c.h,ray:new c.h,distance:t};w(i,0,s.camera),v(i),i.down.distance=t;var r=document.createElement("div");r.className="pointer m0",i.el=r,i.el.style.transform="translate(".concat(i.mouse.x,"px, ").concat(i.mouse.y,"px)"),document.body.appendChild(r),s.midpoint=i},h=function(){null!==s.midpoint&&(s.midpoint.el.remove(),s.midpoint=null)},y=function(e){for(var n=0;n<e.length;n++){var t=e[n];v(t)}},g=function(e){for(var n=0;n<e.length;n++){var t=e[n];t.order=n,t.el.className="pointer p"+n}},x=function(){s.downCamera=s.camera.clone()},b=t(5);var E=function(){var e=Object(o.useRef)(null);return Object(o.useEffect)((function(){var n=e.current,t=function(e){var t=function(e){var n={order:s.pointers.length,id:e.pointerId,mouse:new c.g(e.clientX,e.clientY),clip:new c.h,ray:new c.h};w(n,0,s.camera),v(n);var t=document.createElement("div");return t.className="pointer p"+s.pointers.length,document.body.appendChild(t),n.el=t,n.el.style.transform="translate(".concat(n.mouse.x,"px, ").concat(n.mouse.y,"px)"),n}(e);s.pointers.push(t),x(),g(s.pointers),y(s.pointers),s.pointers.length>1&&(h(),f()),n.setPointerCapture(e.pointerId)},o=function(e){if(s.pointers.length>0&&(function(e,n){e.mouse.x=n.clientX,e.mouse.y=n.clientY,w(e,s.camera.position.z,s.camera),e.el.style.transform="translate(".concat(e.mouse.x,"px, ").concat(e.mouse.y,"px)")}(function(e){var n=s.pointers.map((function(e){return e.id})).indexOf(e);return s.pointers[n]}(e.pointerId),e),null!==s.midpoint)){var n=s.midpoint;!function(){var e=s.midpoint,n=s.pointers[0],t=s.pointers[1],o=n.mouse.distanceTo(t.mouse),i=new c.g;i.subVectors(t.mouse,n.mouse),i.normalize(),i.multiplyScalar(o/2),i.add(n.mouse),e.mouse.x=i.x,e.mouse.y=i.y,e.distance=o,w(e,0,s.camera),e.el.style.transform="translate(".concat(e.mouse.x,"px, ").concat(e.mouse.y,"px)")}();var t=s.zoomData,o=n.distance/n.down.distance,i=Math.max(.1,Math.min(30,s.downCamera.position.z/o));t.mouse.copy(n.mouse),w(t,i,s.downCamera);var r=u(s.downCamera.position.z),a=n.mouse.x-n.down.mouse.x,p=n.mouse.y-n.down.mouse.y;s.camera.position.x=t.ray.x-a*r,s.camera.position.y=t.ray.y+p*r,s.camera.position.z=t.ray.z}},i=function(e){!function(e){var n=s.pointers.map((function(e){return e.id})).indexOf(e.pointerId);-1!==n&&(s.pointers[n].el.remove(),s.pointers.splice(n,1))}(e),x(),g(s.pointers),y(s.pointers),h(),s.pointers.length>1&&f(),n.releasePointerCapture(e.pointerId)},r=function(e){var n=s.zoomData,t=window.innerHeight;console.log(e.deltaMode);var o=(t-e.deltaY)/t,i=Math.max(.1,Math.min(30,s.camera.position.z/o)),r=new c.g(e.clientX,e.clientY);n.mouse.copy(r),w(n,i,s.camera),s.camera.position.copy(n.ray)};return n.addEventListener("pointerdown",t),n.addEventListener("pointermove",o),n.addEventListener("pointerup",i),n.addEventListener("pointercancel",i),n.addEventListener("mousewheel",r,{passive:!1}),function(){n.removeEventListener("pointerdown",t),n.removeEventListener("pointermove",o),n.removeEventListener("pointerup",i),n.removeEventListener("pointercancel",i),n.removeEventListener("mousewheel",r)}}),[]),Object(o.useEffect)((function(){var n=e.current;n.width=window.innerWidth,n.height=window.innerHeight,s.canvas=n,l()}),[e]),Object(o.useEffect)((function(){window.addEventListener("resize",(function(){s.camera.aspect=window.innerWidth/window.innerHeight,s.camera.updateProjectionMatrix(),s.renderer.setSize(window.innerWidth,window.innerHeight)}))}),[]),Object(b.jsx)("div",{children:Object(b.jsx)("canvas",{ref:e})})},z=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,18)).then((function(n){var t=n.getCLS,o=n.getFID,i=n.getFCP,r=n.getLCP,a=n.getTTFB;t(e),o(e),i(e),r(e),a(e)}))};a.a.render(Object(b.jsx)(i.a.StrictMode,{children:Object(b.jsx)(E,{})}),document.getElementById("root")),z()}},[[17,1,2]]]);
//# sourceMappingURL=main.c8d8188c.chunk.js.map