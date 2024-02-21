import{a as O,S as R,i as f}from"./assets/vendor-527658dd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const a={form:document.querySelector(".form"),gallery:document.querySelector(".gallery-list"),loader:document.querySelector("span"),loadMoreBtn:document.querySelector('[data-action="load-more"]')};let i=1,h=0,u="",p=0;const g=40,D=O.create({headers:{"Content-Type":"application/json"},params:{image_type:"photo",orientation:"horizontal",safesearch:!0}});a.form.addEventListener("submit",I);a.loadMoreBtn.addEventListener("click",T);async function I(t){t.preventDefault(),i=1,a.gallery.innerHTML="",L(),v(),u=t.currentTarget.elements.search.value;try{const o=await y(u);o.total?(w(o),b(),i+=1,h=o.totalHits/g):d("Sorry, there are no images matching your search query. Please try again!")}catch(o){d(o.message)}finally{m()}a.form.reset()}async function y(t){const r=new URLSearchParams({per_page:g,page:i});try{return(await D.get(`https://pixabay.com/api/?key=41464538-044fa7fe64ee4a60fb4972757&q=${t}&${r}`)).data}catch(o){d(o.message)}}function w(t){const l=t.hits.map(n=>({preview:n.webformatURL,original:n.largeImageURL,description:n.tags,views:n.views,comments:n.comments,downloads:n.downloads,likes:n.likes})).reduce((n,{preview:S,original:M,description:x,views:B,comments:$,downloads:q,likes:P})=>n+`<li class="gallery">
          <a class="gallery-link" href=${M} >       
           <img
            class="gallery-image"
            src=${S}
            alt="${x}"
            />          <ul class="desc">
            <li class="desc-item">
              <h2 class="desc-title">likes</h2>
              <p class="desc-text">${P}</p>
            </li>
            <li class="desc-item">
              <h2 class="desc-title">views</h2>
              <p class="desc-text">${B}</p>
            </li>
            <li class="desc-item">
              <h2 class="desc-title">comments</h2>
              <p class="desc-text">${$}</p>
            </li>
            <li class="desc-item">
              <h2 class="desc-title">downloads</h2>
              <p class="desc-text">${q}</p>
            </li>
          </ul></a>
        </li>`,"");a.gallery.insertAdjacentHTML("beforeend",l),p=document.querySelector(".gallery").getBoundingClientRect().height*2,new R(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function d(t="Something went wrong!"){f.error({position:"topRight",message:t})}async function T(t){if(v(),L(),i>h)return m(),f.show({position:"topRight",message:"We're sorry, but you've reached the end of search results."});try{const r=await y(u);w(r),E(p),b(),i+=1}catch(r){d(r.message)}finally{m()}}function L(){a.loader.hidden=!1,a.loader.classList.add("loader")}function m(){a.loader.hidden=!0,a.loader.classList.remove("loader")}function b(){a.loadMoreBtn.classList.remove("is-hidden")}function v(){a.loadMoreBtn.classList.add("is-hidden")}function E(t){window.scrollBy({top:t,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
