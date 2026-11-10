const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#main-nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}));
document.querySelectorAll('.language-link').forEach(a=>a.addEventListener('click',()=>{try{localStorage.setItem('wolffia-language',document.documentElement.lang==='ja'?'en':'ja')}catch{}}));
// Explicit / and /en/ URLs preserve language on reload; never override a shared URL.
const dialog=document.querySelector('#lightbox');let previousFocus;
document.querySelectorAll('.zoom').forEach(button=>button.addEventListener('click',()=>{previousFocus=button;const image=button.querySelector('img');document.querySelector('#lightbox-image').src=button.dataset.full;document.querySelector('#lightbox-image').alt=image.alt;document.querySelector('#lightbox-caption').textContent=image.alt;dialog.showModal();document.querySelector('#close-lightbox').focus()}));
document.querySelector('#close-lightbox').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
dialog.addEventListener('close',()=>previousFocus?.focus());
// Hash-based page views remain compatible with static GitHub Pages and
// Cloudflare hosting, while avoiding one very long scrolling document.
const pageSections=[...document.querySelectorAll('main section[data-page]')];
const routes=new Set(['home','workflow','interface','adapt','guide','download']);
const legacy={workflow:'workflow',example:'workflow','annotation-training':'workflow',charts:'workflow',screens:'interface',custom:'adapt',spec:'adapt',guide:'guide','dataset-request':'guide',docs:'guide',about:'guide',download:'download'};
function currentRoute(){const raw=location.hash.replace(/^#(?:page-)?/,'');return routes.has(raw)?raw:(legacy[raw]||'home')}
function showRoute(){const route=currentRoute();for(const section of pageSections){const show=section.dataset.page===route;section.classList.toggle('page-hidden',!show);section.classList.toggle('page-enter',show)}nav.querySelectorAll('a[data-route]').forEach(a=>{if(a.dataset.route===route)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});window.scrollTo({top:0,behavior:'instant'})}
window.addEventListener('hashchange',showRoute);showRoute();

// Release URLs are supplied explicitly when hosting is ready.
const releaseBase=document.documentElement.lang==='ja'?'':'../';
fetch(releaseBase+'release.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('release');return r.json()}).then(release=>{
  const ja=document.documentElement.lang==='ja';
  const details=document.querySelector('#release-details');
  if(!details)return;
  for(const [label,value] of [[ja?'バージョン':'Version',release.version],[ja?'形式':'Format','Windows x64 Setup.exe'],[ja?'サイズ':'Size',release.size_bytes?`${(release.size_bytes/1e9).toFixed(2)} GB`:null]]){
    if(!value)continue;
    const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;row.append(dt,dd);details.append(row);
  }
  if(release.sha256)document.querySelector('#release-hash').textContent='SHA-256: '+release.sha256;
  const valid=url=>{try{return new URL(url).protocol==='https:'}catch{return false}};
  if(release.published&&valid(release.download_url)&&valid(release.source_url)){
    const download=document.querySelector('#download-link');download.href=release.download_url;download.hidden=false;
    const source=document.querySelector('#source-link');source.href=release.source_url;source.hidden=false;
    document.querySelector('#download-pending').hidden=true;
    document.querySelector('#release-reason').textContent=ja?`フルセットアップ ${release.version}${release.build?'（ビルド '+release.build+'）':''}。`:`Full setup ${release.version}${release.build?' (build '+release.build+')':''}.`;
  }
}).catch(()=>{});

const patchList=document.querySelector('#patch-list');
if(patchList){
  const ja=document.documentElement.lang==='ja';
  const notice=(value)=>{const p=document.createElement('p');p.textContent=value;return p};
  fetch(releaseBase+'updates.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('updates');return r.json()}).then(catalog=>{
    const repo='https://github.com/wolffiavision-code/wolffiavision-code.github.io/releases/download/';
    const validHash=value=>typeof value==='string'&&/^[0-9a-f]{64}$/i.test(value);
    const patches=catalog.schema===1&&Number.isSafeInteger(catalog.build)&&Array.isArray(catalog.patches)?
      catalog.patches.filter(p=>typeof p.url==='string'&&p.url.startsWith(repo)&&/^[a-z0-9_.-]+\/[a-z0-9_.-]+\.exe$/i.test(p.url.slice(repo.length))&&validHash(p.sha256)&&validHash(p.base_sha256)&&Number.isSafeInteger(p.size_bytes)&&p.size_bytes>0):[];
    if(!patches.length)throw Error('No compatible download catalog');
    const nodes=[];
    for(const patch of patches){
      const a=document.createElement('a');a.href=patch.url;
      a.textContent=`${ja?'差分セットアップ':'Patch setup'} · ${catalog.version} / ${catalog.build} · ${(patch.size_bytes/1e6).toFixed(1)} MB ↓`;
      const p=document.createElement('p');p.append(a);nodes.push(p);
      const hash=notice('SHA-256: '+patch.sha256);hash.style.overflowWrap='anywhere';nodes.push(hash);
    }
    patchList.replaceChildren(...nodes);
  }).catch(()=>patchList.replaceChildren(notice(ja?'差分は未公開、または確認できませんでした。':'No published patch could be confirmed.')));
}
