/* يفتح من الجهاز على طول حتى بدون نت، ويجيب النسخة الجديدة في الخلفية. شغل المستخدم محفوظ في مخزن التطبيق، وهنا ما ينلمس */
const C='tq-mwjdlds4',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>fetch(new Request(u,{cache:'reload'})).then(r=>{if(!r.ok)throw new Error(u);return c.put(u,r)})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k.indexOf('tq-')===0).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);const base=new URL('./',self.registration.scope);if(u.origin!==location.origin||u.pathname.indexOf(base.pathname)!==0)return;if(/start\.html$|\/guide\/|\/admin\//.test(u.pathname))return;
  const nav=r.mode==='navigate',key=nav?new URL('index.html',base).href:u.origin+u.pathname;
  if(u.searchParams.has('fresh')){e.respondWith(fetch(key,{cache:'no-store'}));return}
  e.respondWith(caches.open(C).then(c=>c.match(key).then(hit=>{
    const net=fetch(key,{cache:'no-store'}).then(async res=>{if(res&&res.ok)await c.put(key,res.clone());return res}).catch(()=>hit);
    if(hit){e.waitUntil(net.catch(()=>{}));return hit}return net})));});
