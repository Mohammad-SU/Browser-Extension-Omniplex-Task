"use strict";(()=>{function l(){let e=[],t=document.getElementsByTagName("button"),o=document.getElementsByTagName("a");for(let n of t)e.push({tagName:"button"});for(let n of o)e.push({tagName:"a",href:n.href});return e}function c(e=!1){let t=document.getElementsByTagName("button"),o=document.getElementsByTagName("a"),n=e?"orange":"blue",a=e?"blue":"orange";for(let s of t)s.style.boxShadow=`0 0 20px ${n}`;for(let s of o)s.style.boxShadow=`0 0 20px ${a}`}function r(){console.log("Content script initialized");let t=new URLSearchParams(window.location.search).get("reverse")==="true",o=l();chrome.runtime.sendMessage({type:"STORE_ELEMENTS",data:{url:window.location.href,elements:o}}),c(t)}r();})();