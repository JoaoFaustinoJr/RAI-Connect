self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil((async()=>{const url=new URL('./',self.registration.scope).href;const tabs=await self.clients.matchAll({type:'window',includeUncontrolled:true});for(const tab of tabs){if(tab.url.startsWith(url)){await tab.focus();return;}}await self.clients.openWindow(url);})());});
