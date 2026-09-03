const CACHE='vehicle-registration-lookup-v2';
const SHELL=['./','./index.html','./styles.css','./app.js','./xlsx-parser.js','./manifest.webmanifest','./assets/icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r&&r.status===200&&new URL(e.request.url).origin===self.location.origin){const x=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,x));}return r;}).catch(()=>caches.match('./index.html'))));});
