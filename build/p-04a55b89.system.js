System.register(["./p-353c9836.system.js","./p-dd63fbc0.system.js","./p-e8a4118d.system.js","./p-f0bb3aba.system.js"],(function(e){"use strict";var a,t;return{setters:[function(){},function(){},function(e){a=e.g},function(e){t=e.c}],execute:function(){var n=e("mdTransitionAnimation",(function(e,n){var r="40px";var i="0px";var o=n.direction==="back";var s=n.enteringEl;var c=n.leavingEl;var d=a(s);var f=d.querySelector("ion-toolbar");var u=t();u.addElement(d).fill("both").beforeRemoveClass("ion-page-invisible");if(o){u.duration(n.duration||200).easing("cubic-bezier(0.47,0,0.745,0.715)")}else{u.duration(n.duration||280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform","translateY("+r+")","translateY("+i+")").fromTo("opacity",.01,1)}if(f){var l=t();l.addElement(f);u.addAnimation(l)}if(c&&o){u.duration(n.duration||200).easing("cubic-bezier(0.47,0,0.745,0.715)");var m=t();m.addElement(a(c)).afterStyles({display:"none"}).fromTo("transform","translateY("+i+")","translateY("+r+")").fromTo("opacity",1,0);u.addAnimation(m)}return u}))}}}));