/* eslint-disable */

import Dexie from 'dexie';
import {
  registerRoute,
  NavigationRoute,
} from 'workbox-routing';
import {
  NetworkOnly,
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
  Strategy,
} from 'workbox-strategies';
import {
  createHandlerBoundToURL,
  PrecacheFallbackPlugin,
  precacheAndRoute,
} from 'workbox-precaching';
import { WorkboxError } from 'workbox-core/_private/WorkboxError.js';
// Used for filtering matches based on status code, header, or both
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// Used to limit entries in cache, remove entries after a certain period of time
import { ExpirationPlugin } from 'workbox-expiration';
import { timeout } from 'workbox-core/_private/timeout.js';

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);

// NOTE: below is v5 code I found so not sure if a change since then has been made
// Make sure to return a specific response for all navigation requests.
// Since we have a SPA here, this should be index.html always.
// https://stackoverflow.com/questions/49963982/vue-router-history-mode-with-pwa-in-offline-mode
// const handler = createHandlerBoundToURL("/index.html");
// const navRoute = new NavigationRoute(handler);
// registerRoute(navRoute);

// This one below does not seem to work
// registerRoute(
//   ({ request }) => request.mode === 'navigate',
//   new NetworkOnly({
//     plugins: [
//       new PrecacheFallbackPlugin({
//         fallbackURL: '/index.html',
//       }),
//     ],
//   }),
// );

addEventListener('message', (event) => {
  console.log(event, event.data, event.data.type)
  if (!event.data) return;
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
});

// default page handler for offline usage,
// where the browser does not how to handle deep links
// it's a SPA, so each path that is a navigation should default to index.html
const matchCb = ({ url, event }) => {
  return (url.pathname === '/');
};
registerRoute(matchCb, new NetworkFirst());
// registerRoute(
//   ({ event }) => event.request.mode === 'navigate',
//   async () => {
//     const defaultBase = '/index.html';
//     return caches
//       .match(workbox.precaching.getCacheKeyForURL(defaultBase))
//       .then(response => {
//           return response || fetch(defaultBase);
//       })
//       .catch(err => {
//         return fetch(defaultBase);
//       });
//   }
// );

// const options = {
//   databaseName: "tile-cache-data", // optional
//   databaseVersion: 1, // optional
//   objectStoreName: "OSM", // optional
//   tileUrl: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", // optional
//   tileUrlSubDomains: ["a", "b", "c"], // optional
//   crawlDelay: 500, // optional
//   maxAge: 1000 * 60 * 60 * 24 * 7, // optional
// };

// const indexedDbTileCache = require('@yaga/indexed-db-tile-cache');
// const tileCache = new indexedDbTileCache.IndexedDbTileCache(options);

// import Dexie from 'dexie';
// const db = new Dexie('tiles-cache');
// db.version(1).stores({
//   tiles: '++id,url,tile',
// });

// async function test() {
//   var id = await db.tasks.put({ date: Date.now(), description: 'Test Dexie', done: 0 });
//   console.log("Got id " + id);
//   // Now lets add a bunch of tasks
//   await db.tasks.bulkPut([
//     { date: Date.now(), description: 'Test Dexie bulkPut()', done: 1 },
//     { date: Date.now(), description: 'Finish testing Dexie bulkPut()', done: 1 }
//   ]);
//   // Ok, so let's query it

//   var tasks = await db.tasks.where('done').above(0).toArray();
//   console.log("Completed tasks: " + JSON.stringify(tasks, 0, 2));

//   // Ok, so let's complete the 'Test Dexie' task.
//   await db.tasks
//     .where('description')
//     .startsWithIgnoreCase('test dexi')
//     .modify({ done: 1 });

//   console.log("All tasks should be completed now.");
//   console.log("Now let's delete all old tasks:");

//   // And let's remove all old tasks:
//   await db.tasks
//     .where('date')
//     .below(Date.now())
//     .delete();

//   console.log("Done.");
// }

// async function tileCacheMatch(request) {
//   var tile = await db.tiles.
// }
// test().catch(err => {
//   console.error("Uh oh! " + err.stack);
// });

// const db = new Dexie('hellodb');
// db.version(1).stores({
//   tiles: '++id,url,tile',
// });

// const tileHandlerCb = async ({ url, event, params }) => {

//   // cacheMatch
//   let cachedTile = await db.tiles.filter(function (tile) {
//     return tile.url === url.href;
//   }).first()
//   console.log(cachedTile)
  
//   // let response = await db.tiles.filter(function (tile) {
//   //   return tile.url === url.href;
//   // }).first()
//   // console.log(response)
  
//   const response = await fetch(request);
//   const responseBody = await response.text();
//   return new Response(`${responseBody} <!-- Look Ma. Added Content. -->`, {
//     headers: response.headers,
//   });
// };

class CacheMapTiles extends Strategy {
  async cacheMatch(input) {
    console.log('in cacheMatch')
    let url = input.url
    let response = await this._db.tiles.filter(tile => tile.url === url).first().catch((err) => console.log('db err', err))
    return response
  }

  async cachePut(handler, input, response) {
    console.log('in cachePut')
    // Run in the next task to avoid blocking other cache reads.
    await timeout(0);
    // const responseToCache = await handler._ensureResponseSafeToCache(response);
    // console.log('toCache', responseToCache)
    await this._db.tiles.put({ url: input.url, tile: response })
  }

  async fetchAndCachePut(handler, input) {
    const response = await handler.fetch(input);
    const responseClone = response.clone();
    // TODO save cloned response to our cache
    // await this.cachePut(handler, input, responseClone)
    console.log('clone in facp', responseClone)
    handler.waitUntil(this.cachePut(handler, input, responseClone));
    // this.cachePut(handler, input, responseClone)
    return response
  }

  constructor(options) {
    super(options);
    this._db = new Dexie('hellodb')
    this._db.version(1).stores({
      tiles: '++id,url,tile'
    })
  }

  async _handle(request, handler) {
    let response = await this.cacheMatch(request);
    let error;
    if (!response) {
      try {
        response = await this.fetchAndCachePut(handler, request);
      }
      catch (err) {
        error = err;
      }
      // TODO log got or error
      
      
    }
    else {
      // TODO log found a cached response
    }
    // TODO maybe log like CacheFirst
    if (!response) {
      throw new WorkboxError('no-response', { url: request.url, error })
    }
    return response;
  }
}

registerRoute(
  ({ url }) => url.href.includes('tile.openstreetmap.org'),
  new CacheMapTiles(),
);

// const matchTileReqFunction = ({ url, request, e }) => {
//   return url.href.includes('tile.openstreetmap.org')}

// class CacheTileStrategy extends Strategy {
//   async _handle(request, handler) {
//     // const fetchAndCachePutDone = handler.fetchAndCachePut(request);
//     // const cacheMatchDone = handler.cacheMatch(request); 
//     console.log(request)
//     console.log(tileCacheDb)

//     let key = request.url.split('/')
//     console.log('fetching tile key', key)
//     let response = await tileCacheDb.get(key)
//     console.log('!!', response)
//     // return new Promise((resolve, reject) => {
//     //   fetchAndCachePutDone.then(resolve);
//     //   cacheMatchDone.then((response) => response && resolve(response));
      
//     //   // Reject if both network and cache error or find no response.
//     //   Promise.allSettled([fetchAndCachePutDone, cacheMatchDone]).then((results) => {
//     //     const [fetchAndCachePutResult, cacheMatchResult] = results;
//     //     if (fetchAndCachePutResult.status === 'rejected' && !cacheMatchResult.value) {
//     //       reject(fetchAndCachePutResult.reason);
//     //     }  
//     //   });
//     // });
//   }
// }

// registerRoute(
//   matchTileReqFunction,
//   new CacheTileStrategy({
//     cacheName: 'map-tiles-1',
//     // plugins: [
//     //   new CacheableResponsePlugin({
//     //     status: [0, 200],
//     //   }),
//     //   new ExpirationPlugin({
//     //     maxEntries: 50,
//     //     maxAgeSeconds: 60,
//     //   })
//     // ]
//   })
// );

// Not useful for our SPA I believe
// // Cache page navigations (html) with a Network First strategy
// registerRoute(
//   // Check to see if the request is a navigation to a new page
//   ({ request }) => request.mode === 'navigate',
//   // Use a Network First caching strategy
//   new NetworkFirst({
//     // Put all cached files in a cache named 'pages'
//     cacheName: 'pages',
//     plugins: [
//       // Ensure that only requests that result in a 200 status are cached
//       new CacheableResponsePlugin({
//         statuses: [200],
//       }),
//     ],
//   }),
// );

// // Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
// registerRoute(
//   // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
//   ({ request }) =>
//     request.destination === 'style' ||
//     request.destination === 'script' ||
//     request.destination === 'worker',
//   // Use a Stale While Revalidate caching strategy
//   new StaleWhileRevalidate({
//     // Put all cached files in a cache named 'assets'
//     cacheName: 'assets',
//     plugins: [
//       // Ensure that only requests that result in a 200 status are cached
//       new CacheableResponsePlugin({
//         statuses: [200],
//       }),
//     ],
//   }),
// );

// // Cache images with a Cache First strategy
// registerRoute(
//   // Check to see if the request's destination is style for an image
//   ({ request }) => request.destination === 'image',
//   // Use a Cache First caching strategy
//   new CacheFirst({
//     // Put all cached files in a cache named 'images'
//     cacheName: 'images',
//     plugins: [
//       // Ensure that only requests that result in a 200 status are cached
//       new CacheableResponsePlugin({
//         statuses: [200],
//       }),
//       // Don't cache more than 50 items, and expire them after 30 days
//       new ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
//       }),
//     ],
//   }),
// );

// const ourDomains = ["localhost:8000"];
// const mapTilesDomain = "tile.openstreetmap.org/";
// const ignoreDomains = ["googleapis", "facebook", "gstatic"];
// function fetchApplicationAsset(event) {
//   if (ourDomains.reduce(function(cum, domain) {
//     return cum || event.request.url.indexOf(domain) != -1;
//   }, false)) {
//     return fetchUserAsset(event);
//   }

//   return caches.match(event.request).then(function(response) {
//     if (response) {
//       return response;
//     }
//     var isMapTilesReq = event.request.url.indexOf(mapTilesDomain) != -1;
//     if (isMapTilesReq) {
    
//       console.log(event.request.url)

//       var re = /\/(\d+)\/(\d+)\/(\d+).vector.pbf/;
//       var matched = event.request.url.match(re);
//       if (matched) {
//         console.log(matched)
//         var key = {z:matched[1],x:matched[2],y:matched[3]};
//         return tileCacheDb.get(key)
//         .then(function(tileBuffer) {
//           if (tileBuffer) {
//             return new Response(tileBuffer);
//           }
//           return fetch(event.request)
//         });
//       }
//     }

//     if (!ignoreDomains.find(function(domain) {return event.request.url.indexOf(domain) != -1})) {
//       console.log("Unmatched URL '" + event.request.url+"'");
//     }
//     return fetch(event.request);
//   });
// }

self.addEventListener('push', (e) => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  };
  
  console.log('push:', e.data.json());
  let push_data = e.data.json();
  const options = {
    actions: push_data.actions,
    body: push_data.body,
    icon: './img/icon.png',
    image: './img/notification.jpg',
  };
  e.waitUntil(
    self.registration.showNotification(push_data.title, options)
  )
})

// Could make click on the notification open our app
self.addEventListener('notificationclick', (e) => {
  console.log(e);
  if (e.action === 'some_action') {
    // Do something...
  } else {
    self.clients.openWindow('/');
  };
})